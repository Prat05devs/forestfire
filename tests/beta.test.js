import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/beta.js';

const originalFetch = globalThis.fetch;
const originalKey = process.env.RESEND_API_KEY;
const originalFrom = process.env.BETA_FROM_EMAIL;
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey;
  if (originalFrom === undefined) delete process.env.BETA_FROM_EMAIL; else process.env.BETA_FROM_EMAIL = originalFrom;
});
function request(overrides = {}) {
  return { method: 'POST', headers: { origin: 'https://agnivision.live', 'content-type': 'application/json' }, body: { name: 'Beta Tester', email: 'tester@example.com', platform: 'android', consent: true, website: '' }, ...overrides };
}
function response() { return { statusCode: 200, headers: {}, setHeader(k,v) { this.headers[k] = v; }, status(code) { this.statusCode=code; return this; }, json(body) { this.body=body; return this; } }; }
function configure() { process.env.RESEND_API_KEY='test-only-key'; process.env.BETA_FROM_EMAIL='Test <test@example.com>'; }

test('availability reports unconfigured delivery without exposing settings', async () => {
  delete process.env.RESEND_API_KEY; delete process.env.BETA_FROM_EMAIL;
  const res=response(); await handler(request({ method:'GET' }),res);
  assert.equal(res.statusCode,200); assert.deepEqual(res.body,{ available:false }); assert.equal(res.headers['Cache-Control'],'no-store');
});
test('unconfigured submissions do not claim success', async () => {
  delete process.env.RESEND_API_KEY;
  const res=response(); await handler(request(),res); assert.equal(res.statusCode,503); assert.equal(res.body.success,undefined);
});
test('invalid input, missing consent, and honeypots cannot send mail', async () => {
  configure(); globalThis.fetch=async()=>{assert.fail('Invalid input must not send email');};
  for (const change of [{email:'not-an-email'},{name:'   '},{email:'a@example.com\r\nBcc:x@example.com'},{consent:false},{website:'bot'},{platform:'arbitrary'},{name:'N'.repeat(101)}]) {
    const req=request();req.body={...req.body,...change}; const res=response(); await handler(req,res);assert.equal(res.statusCode,400);
  }
});
test('requests from a different origin are rejected', async () => {
  const req=request();req.headers.origin='https://unrelated.example';const res=response(); await handler(req,res);assert.equal(res.statusCode,403);
});
test('unsupported methods and malformed JSON are rejected', async () => {
  const res=response();await handler(request({method:'DELETE'}),res);assert.equal(res.statusCode,405);
  const bad=response();await handler(request({body:'{broken'}),bad);assert.equal(bad.statusCode,400);
});
test('valid signup sends only to the owner and acknowledges provider acceptance', async () => {
  configure();let sent;
  globalThis.fetch=async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');sent=JSON.parse(options.body);assert.ok(options.headers['Idempotency-Key']);return {ok:true,json:async()=>({id:'test-message-id'})};};
  const res=response();await handler(request(),res);assert.deepEqual(res.body,{success:true});assert.deepEqual(sent.to,['admin@wtitsolutions.cc']);assert.equal(sent.reply_to,'tester@example.com');assert.match(sent.text,/Name: Beta Tester/);assert.match(sent.text,/beta-related contact only/);assert.equal(sent.html,undefined);
});
test('provider failures never return signup success', async () => {
  configure();
  for (const provider of [{ok:false,json:async()=>({error:'provider rejected'})},{ok:true,json:async()=>({})}]) {
    globalThis.fetch=async()=>provider;const res=response();await handler(request(),res);assert.equal(res.statusCode,502);assert.equal(res.body.success,undefined);
  }
});
test('network failures produce a recoverable error', async () => {
  configure();globalThis.fetch=async()=>{throw new Error('network failure');};const res=response();await handler(request(),res);assert.equal(res.statusCode,502);assert.equal(res.body.success,undefined);
});
