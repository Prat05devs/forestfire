# AgniVision landing page

A responsive React/Vite landing page for the public-information app described in `context.md`. The page uses a forest-green editorial direction with locally hosted Bricolage Grotesque and Newsreader fonts.

## Development

Use Node 22.12+ and the existing Yarn lockfile.

```sh
yarn install
yarn dev
yarn build
node --test tests/beta.test.js
```

Vite previews the website at its printed local URL. The Vercel API function runs on Vercel (or through `vercel dev`), not plain Vite. Plain Vite and static hosting automatically use the email-app fallback.

## Screenshots

See `public/screens/README.md` for the supplied filename mapping. The Home, India map, official advisories, Uttarakhand updates, notification settings, activity log, observation detail, and zoomed map screenshots are integrated. Map screenshots use `object-fit: contain` to retain attribution. The old Van Rakshak assets are not used; archived v1 source files remain untouched.

## Beta signup

Every Get the app / Android / iOS button opens an accessible modal with name, email, and consent for beta-related contact. The destination is **admin@wtitsolutions.cc**.

- With no email-service configuration: submitting opens a prepared email. Visitors must send it from their email app; the website explicitly does not claim it sent or stored a request.
- With direct delivery enabled: `api/beta.js` validates requests and sends plain-text email via Resend. No signup database or localStorage is used. Success is shown only when the provider accepts the email; delivery to the inbox is not independently confirmed.
- Failed delivery falls back to the email-app option. Submitted fields stay available while the dialog remains open.

To enable direct delivery on the existing Vercel project, set server-only `RESEND_API_KEY` and `BETA_FROM_EMAIL` (on a Resend-verified domain). See `.env.example`. Do not prefix secrets with `VITE_`. No credentials were supplied or installed by this task. No test email was sent.

Origin validation permits agnivision.live, www.agnivision.live, the trusted VERCEL_URL, and optional BETA_SITE_ORIGIN. Honeypot validation, body limits, idempotency, and per-instance rate limits are included. Apply an edge rate limit on `/api/beta` before enabling a high-traffic public form; an in-memory limit is not global across serverless instances.

## Routes and content

Home, About, Privacy, Terms, Data Deletion, Support, and Attributions are available. Vercel SPA rewrites preserve the API route. Legal pages are explicitly draft; developer identity/entity details, registered address, final legal terms, response timelines, beta-mail retention, and the full-installation deletion process remain incomplete.

Confirmed by the owner: jurisdiction Dehradun, Uttarakhand, India; intended minimum age 13; support/privacy and beta contact admin@wtitsolutions.cc. The app is in testing, so there are no invented store URLs. The marketing site distinguishes public satellite data from optional installation/location records and beta contact details.

## Fonts

- Bricolage Grotesque: https://ateliertriay.github.io/bricolage/
- Newsreader: https://productiontype.com/font/newsreader

Both fonts are served locally from `public/fonts` with their SIL Open Font License files. No Google Fonts request is made by a visitor's browser.
