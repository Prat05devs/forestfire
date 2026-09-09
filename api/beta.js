import { createHash } from 'node:crypto';

const recipient = 'admin@wtitsolutions.cc';
const recentRequests = new Map();
const validEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.BETA_FROM_EMAIL);
  if (req.method === 'GET') return res.status(200).json({ available: configured });
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'Method not allowed.' }); }

  const origins = new Set(['https://agnivision.live', 'https://www.agnivision.live']);
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.BETA_SITE_ORIGIN) origins.add(process.env.BETA_SITE_ORIGIN);
  if (!origins.has(req.headers.origin)) return res.status(403).json({ error: 'Request origin not allowed.' });
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ error: 'JSON required.' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return res.status(400).json({ error: 'Invalid request.' }); }
  if (!body || Array.isArray(body) || typeof body !== 'object') return res.status(400).json({ error: 'Invalid request.' });
  if (JSON.stringify(body).length > 4096) return res.status(413).json({ error: 'Request too large.' });
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (body.website || name.length < 2 || name.length > 100 || /[\r\n\x00-\x1f]/.test(name) || email.length > 254 || !validEmail.test(email) || /[\r\n]/.test(email) || body.consent !== true || !['android', 'ios', 'both'].includes(body.platform)) {
    return res.status(400).json({ error: 'Enter a valid name and email and agree to beta-related contact.' });
  }
  if (!configured) return res.status(503).json({ error: 'Use the email option to submit your beta request.' });

  // Basic per-instance protection; production edge rate limits should cover all instances.
  const now = Date.now();
  for (const [key, value] of recentRequests) if (value.expires < now) recentRequests.delete(key);
  const requester = createHash('sha256').update(String(req.headers['x-vercel-forwarded-for'] || req.socket?.remoteAddress || 'unknown')).digest('hex');
  const limit = recentRequests.get(requester) || { count: 0, expires: now + 60_000 };
  if (limit.count >= 5 || recentRequests.size > 10000) { res.setHeader('Retry-After', '60'); return res.status(429).json({ error: 'Please wait before trying again.' }); }
  limit.count += 1; recentRequests.set(requester, limit);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': createHash('sha256').update(`${email}:${body.platform}:${new Date().toISOString().slice(0, 10)}`).digest('hex') },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ from: process.env.BETA_FROM_EMAIL, to: [recipient], reply_to: email, subject: `AgniVision beta request — ${body.platform}`, text: `New AgniVision beta request\n\nName: ${name}\nEmail: ${email}\nPlatform: ${body.platform}\n\nConsent: Agreed to beta-related contact only.\nReceived: ${new Date().toISOString()}\n\nNo general marketing subscription was requested.` }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.id) return res.status(502).json({ error: 'Email delivery could not be confirmed.' });
    return res.status(200).json({ success: true });
  } catch { return res.status(502).json({ error: 'Email delivery is unavailable. Please use the email option.' }); }
}
