# AgniVision website design specification

`context.md` is the product and marketing source of truth. The old Van Rakshak concept, field staff, incident command, emergency tools, and roadmap are not part of this landing page.

## Visual direction

Modern editorial public information: substantial typography, white space, forest-green feature sections, restrained thermal-orange accents, fine grid geometry, and framed screenshot placeholders. The site is designed around the actual public mobile application.

- Primary: #14532D; accent: #17633A; text: #17251B; surface: #F8F9FC.
- Headings/body: locally hosted Bricolage Grotesque, with small and large optical sizes.
- Select italic headline accents: locally hosted Newsreader.
- The owner explicitly requested distinctive, researched typography instead of the original default/app typography.
- The supplied `public/logo.png` is used for the site identity and `public/appicon.png` is used as the browser icon.
- No old Van Rakshak images or mascot appear.

## Product and interactions

Satellite observations, official NDMA advisories, destination watches, on-device opt-in proximity alerts, provenance, and privacy. Never imply verified incidents, real-time coverage, safety guidance, prediction, government endorsement, or configured remote push delivery.

Every download action opens a beta-interest modal because the app is in testing. Store links will be added after release. Beta names/emails go to admin@wtitsolutions.cc, through direct email delivery when configured or an explicitly labelled prepared-email fallback.

## Screenshots and responsive behavior

Exact asset slots are documented in `public/screens/README.md`. Preserve Google branding in complete screenshots. Placeholder labels must not masquerade as app observations or data. Desktop split layouts stack on mobile; tabs support arrows/Home/End; navigation has a mobile menu; FAQ uses native disclosures; the beta modal uses native dialog focus containment and Escape dismissal. Respect reduced-motion preferences.

## Owner-confirmed details and open items

Dehradun jurisdiction, intended minimum age 13, admin@wtitsolutions.cc for support/privacy/beta. Legal entity, registered address, final legal clauses, standard support and deletion times, beta-mail retention, and full app-record deletion still need completion. Keep the relevant legal pages marked as drafts.
