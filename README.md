# AgniVision landing page

Production-ready marketing site for [AgniVision.live](https://agnivision.live), a free Android and iOS public-information app for recent satellite thermal observations, official NDMA SACHET advisories, destination watches, and opt-in proximity alerts across India.

The site is built with React 19 and Vite. It includes the landing page, About, Privacy, Terms, Data Deletion, Support, and Attributions routes, plus an optional server-side beta-registration email endpoint for Vercel.

## Requirements

- Node.js 22.12 or newer
- Yarn 1.x

## Local development

```sh
yarn install --frozen-lockfile
yarn dev
```

The URL printed by Vite opens the website. Plain Vite does not run the Vercel function in `api/beta.js`, so beta registration uses the email-app fallback during normal local development.

## Validation

```sh
yarn test
yarn build
yarn preview
```

The production site is generated in `dist/`. This directory is intentionally ignored and should not be committed.

## Production deployment on Vercel

Import the repository into Vercel and use the included `vercel.json`. The expected settings are:

- Framework: Vite
- Build command: `yarn build`
- Output directory: `dist`
- Node.js: 22.x or newer

The rewrite rule serves the React routes through `index.html` while preserving `/api/*` for serverless functions.

### Optional direct beta-email delivery

The download buttons open a beta-interest dialog that asks for a name, email address, platform, and consent to beta-related contact. Requests are addressed to `admin@wtitsolutions.cc`.

Direct delivery uses the Resend API. Configure these server-only variables in Vercel:

```text
RESEND_API_KEY=your_resend_api_key
BETA_FROM_EMAIL=AgniVision <beta@your-verified-domain.example>
```

`BETA_FROM_EMAIL` must use a domain verified in Resend. `BETA_SITE_ORIGIN` may be added when another exact trusted origin needs access to the endpoint.

Never prefix these values with `VITE_`; that would expose them to browser code. Do not commit `.env` files. When direct delivery is not configured or temporarily fails, the form opens a prepared message in the visitor's email app and clearly asks them to send it themselves.

The endpoint validates the origin, request size, name, email, platform, consent, and honeypot field. It also uses idempotency and a per-instance request limit. Add a Vercel edge-level rate limit for `/api/beta` before a high-traffic public launch.

## Supplied brand and app assets

- `public/logo.png` — transparent AgniVision logo used in the header and beta dialog
- `public/appicon.png` — browser and app icon
- `public/home_overview.png` — Home overview
- `public/map-screen.png` — India-wide map
- `public/official_advisories-weather.png` — official advisories
- `public/recent_updates-uttarakhand.png` — Uttarakhand updates
- `public/personalise-notification.png` — notification settings
- `public/all-fire-alers.png` — observation activity log
- `public/alert-detail.png` — detection details and sharing
- `public/zoomed-map.png` — close map view

Screenshots use `object-fit: contain`, preserving Google Maps branding and attribution.

## Typography

The website self-hosts two open-source typefaces:

- Bricolage Grotesque by Mathieu Triay for interface text and expressive headings
- Newsreader by Production Type for editorial italic accents

The WOFF2 files and SIL Open Font License files are stored under `public/fonts/`. A visitor's browser does not contact Google Fonts.

## Responsive layout

Full-width storytelling bands are used for the hero, destination story, screenshot gallery, data section, and beta call-to-action. Content uses fluid gutters and constrained reading widths.

- Wide desktop layout: split content and product imagery with full-height feature bands
- Tablet layout: primary composition change at 900px
- Mobile layout: refinements at 600px and 380px
- Mobile screenshot galleries and feature tabs scroll inside their sections without creating page-level horizontal overflow
- Reduced-motion preferences are respected

## Product language and data boundaries

`context.md` is the product and marketing source of truth. Keep these distinctions intact:

- Say “satellite observation,” “thermal anomaly,” or “thermal detection”; do not claim a verified ground fire.
- Say “recent” or “latest available”; satellite passes are periodic.
- Confidence is a source-data quality class, not the probability that a fire exists.
- No recent detections does not mean an area is safe.
- AgniVision is independent and is not affiliated with or endorsed by NASA, NDMA, or Google.
- Public satellite and advisory feeds are separate from optional beta contact details, installation records, notification preferences, and coarse location data.

Required landing-page disclaimer:

> AgniVision.live reports satellite detections and thermal anomalies — not verified ground incidents or safety clearances.

## Legal and launch status

Confirmed details:

- Developer: Team AgniVision
- Jurisdiction: Dehradun, Uttarakhand, India
- Intended minimum age: 13
- Support, privacy, and beta email: `admin@wtitsolutions.cc`

The Privacy, Terms, and Data Deletion pages remain clearly marked as drafts. Before production store submission, confirm the legal entity, registered address, grievance contact if applicable, beta-mail retention period, response timelines, final governing-law language, and the full installation-record deletion process. The privacy and terms text should receive qualified Indian legal review.

The app is currently in testing. Store URLs are intentionally omitted until release.
