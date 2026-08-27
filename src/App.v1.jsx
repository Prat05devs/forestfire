import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Broadcast,
  Buildings,
  CaretDown,
  Check,
  CheckCircle,
  CloudArrowDown,
  Database,
  Eye,
  HardDrives,
  ListChecks,
  NavigationArrow,
  Pulse,
  Radio,
  ShieldCheck,
  Tree,
  UsersThree,
  Warning,
  WifiSlash,
  X,
} from "@phosphor-icons/react";

const navigation = [
  ["Platform", "#platform"],
  ["Flows", "#flows"],
  ["Data", "#data"],
  ["Screens", "#screens"],
  ["Roadmap", "#roadmap"],
  ["FAQ", "#faq"],
];

const benefits = [
  {
    icon: Eye,
    title: "Public clarity",
    copy: "Translate detections, warnings, and verified incidents into a plain answer about place, distance, freshness, and action.",
  },
  {
    icon: Radio,
    title: "Field continuity",
    copy: "Give crews one next action, an offline incident pack, evidence capture, and an explicit synchronization state.",
  },
  {
    icon: Buildings,
    title: "Command oversight",
    copy: "Connect statewide priorities, incident dossiers, resources, data health, and recovery evidence in one operational view.",
  },
  {
    icon: ShieldCheck,
    title: "Visible provenance",
    copy: "Carry the source, verification level, observation time, publication time, and freshness state with every important fact.",
  },
  {
    icon: Tree,
    title: "Recovery evidence",
    copy: "Extend the incident story beyond containment with satellite comparison, vegetation indicators, and governed situation reports.",
  },
];

const platformModes = [
  {
    eyebrow: "Public mobile",
    title: "What affects my place right now?",
    copy: "A calm public experience for residents and visitors. It starts with value, not authentication, and keeps map and list views equivalent.",
    actions: ["Check a place", "Understand confidence", "Watch a trip", "Report an observation"],
    image: "/screens/public-home.png",
    tone: "light",
  },
  {
    eyebrow: "Forest staff mobile",
    title: "What must I act on next?",
    copy: "An action first field tool for authorized personnel, designed around assignments, offline continuity, evidence, and auditable state changes.",
    actions: ["Acknowledge priority", "Download incident pack", "Verify on site", "Close and synchronize"],
    image: "/screens/staff-task.png",
    tone: "dark",
  },
  {
    eyebrow: "Command web",
    title: "Where does intervention matter now?",
    copy: "A dense command surface for incident coordination, resource allocation, data health, intelligence review, and recovery governance.",
    actions: ["Inspect priority", "Coordinate resources", "Audit evidence", "Review recovery"],
    image: "/screens/command-dossier.png",
    tone: "command",
  },
];

const flowColumns = [
  {
    label: "Public flow",
    icon: UsersThree,
    steps: ["Open in a language", "See the selected area", "Search or explore the map", "Open an incident", "Read source and guidance", "Watch, share, or report"],
  },
  {
    label: "Field flow",
    icon: NavigationArrow,
    steps: ["Authenticate with department access", "Review the priority queue", "Accept an assignment", "Work from the offline pack", "Verify and capture evidence", "Resolve and synchronize"],
  },
  {
    label: "Command flow",
    icon: Buildings,
    steps: ["Read the state situation", "Filter by administrative level", "Open the incident dossier", "Coordinate teams and resources", "Monitor source health", "Review analytics and recovery"],
  },
];

const trustLevels = [
  ["01", "Satellite detection", "A thermal anomaly is observed. It is not yet a confirmed forest fire.", "satellite"],
  ["02", "Official automated data", "An alert arrives through an authorized source and keeps its issuing context.", "official"],
  ["03", "Field verified", "Authorized forest personnel confirm what is happening on site.", "verified"],
  ["04", "Active official incident", "A response operation is underway with an auditable operational state.", "active"],
  ["05", "Resolved", "The department closes the incident and preserves its evidence and timeline.", "resolved"],
];

const sources = [
  {
    name: "NASA FIRMS",
    purpose: "MODIS and VIIRS thermal detections for the prototype area.",
    status: "Planned prototype connection",
    className: "planned",
  },
  {
    name: "NDMA SACHET",
    purpose: "Official CAP and RSS warnings from participating government agencies.",
    status: "Planned prototype connection",
    className: "planned",
  },
  {
    name: "IMD",
    purpose: "Weather, rainfall, warnings, and nowcast context. Not a custom fire predictor.",
    status: "Planned context source",
    className: "planned",
  },
  {
    name: "Copernicus Data Space",
    purpose: "Sentinel 2 scene discovery, before and after imagery, and recovery indicators.",
    status: "Planned imagery source",
    className: "planned",
  },
  {
    name: "Bhuvan",
    purpose: "Indian place search and selected geospatial context where service access is suitable.",
    status: "Planned after reliability testing",
    className: "review",
  },
  {
    name: "Forest Survey of India",
    purpose: "Official fire detections, large fire information, and FWI based fire danger for departmental deployment.",
    status: "Department access required",
    className: "pending",
  },
  {
    name: "Uttarakhand Forest Department systems",
    purpose: "Incident state, field verification, administrative boundaries, stations, crews, and resources.",
    status: "Approval and system access required",
    className: "pending",
  },
];

const excludedSources = [
  "No custom wildfire prediction service in the initial prototype",
  "No Google Earth Engine dependency",
  "No Google Maps dependency unless later justified",
  "No paid commercial weather feed in the initial scope",
  "No generative AI deciding incident truth or public warnings",
  "No drone integration in the initial scope",
];

const gallery = [
  ["Public situation", "/screens/public-home.png", "Public home showing area status, sources, and freshness"],
  ["Live intelligence map", "/screens/live-map.png", "Map with official, satellite, and warning layers"],
  ["Fire danger", "/screens/fire-danger.png", "Fire danger map with source and weather context"],
  ["Incident story", "/screens/incident-details.png", "Incident detail with verification and source timeline"],
  ["Public reporting", "/screens/report-fire.png", "Public observation flow with photo and location"],
  ["Staff priority", "/screens/staff-priority.png", "Staff priority queue with explainable status"],
  ["Field assignment", "/screens/staff-task.png", "Operational task with route and mission details"],
  ["Command dossier", "/screens/command-dossier.png", "Command incident dossier with telemetry and imagery"],
];

const roadmap = [
  {
    phase: "Now",
    title: "Product system and prototype",
    copy: "Define the incident model, role based flows, confidence grammar, screen system, and trustworthy integration plan.",
  },
  {
    phase: "Next",
    title: "Working data prototype",
    copy: "Connect selected public sources through a normalization layer, add PostGIS, and validate freshness, caching, and failure states.",
  },
  {
    phase: "With department access",
    title: "Operational pilot",
    copy: "Integrate FSI and departmental systems, validate permissions and terminology, test field workflows, and establish governance.",
  },
  {
    phase: "After pilot evidence",
    title: "Scaled public service",
    copy: "Expand language coverage, accessibility testing, source resilience, recovery intelligence, and multi district operations.",
  },
];

const faqs = [
  ["Is Van Rakshak a live government service?", "No. This page presents a product concept and interactive prototype. It does not currently provide emergency information or confirm a formal Uttarakhand Forest Department deployment."],
  ["Who is the platform designed for?", "It is designed as one incident platform with three role shaped experiences: public mobile for residents and visitors, staff mobile for authorized forest teams, and command web for coordination and oversight."],
  ["Does the public need to create an account?", "No. The public experience is designed to show place based value before any optional personalization. Department staff access remains protected."],
  ["Which data sources are already connected?", "No production feeds are represented as connected on this prototype page. NASA FIRMS, SACHET, IMD, Copernicus, and Bhuvan are proposed prototype sources. FSI and department systems require access and approval."],
  ["How does the platform avoid confusing a detection with a confirmed fire?", "Every important record carries a visible trust level. Satellite detection, official automated data, field verification, active response, and resolution remain distinct. Community observations remain unverified until reviewed."],
  ["Will it work with weak connectivity?", "The product architecture includes cached incident packs, explicit last update times, queued field actions, and clear synchronization states. Those behaviors still require implementation and field testing."],
  ["Can people report smoke or fire?", "The proposed public flow accepts an observation, photo, and location for review. It never presents a community report as an official incident before verification."],
  ["Does Van Rakshak predict where fire will spread?", "Not in the initial scope. The platform can display approved source information and contextual weather, but it should not create an unsupported public prediction or warning."],
  ["How will privacy be handled?", "The design minimizes public personal data, separates public and staff permissions, and requires policy for location, image metadata, retention, moderation, and audit access before deployment."],
  ["What needs validation before a pilot?", "Institutional ownership, approved terminology, emergency guidance, data agreements, access control, privacy policy, accessibility, offline reliability, and the operational incident state machine all require stakeholder validation."],
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -80px", threshold: 0.12 },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Mark({ inverse = false }) {
  return (
    <span className={`brand-mark ${inverse ? "brand-mark-inverse" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d="M24 3 42 9v13c0 11-6 19-18 24C12 41 6 33 6 22V9Z" />
        <path d="m11 27 7-9 6 7 7-11 7 13" />
      </svg>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false";
    const close = event => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="island-wrap">
        <nav className="island" aria-label="Primary navigation">
          <a className="brand-link" href="#top" aria-label="Van Rakshak home">
            <Mark />
            <span>Van Rakshak</span>
          </a>
          <div className="desktop-nav">
            {navigation.map(([label, href]) => <a key={href} href={href} aria-current={href === "#platform" ? "page" : undefined}>{label}</a>)}
          </div>
          <a className="nav-cta button-press" href="#platform">Explore the platform <ArrowRight weight="bold" /></a>
          <button
            ref={buttonRef}
            className="menu-button button-press"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(value => !value)}
          >
            <span className={open ? "open" : ""}><i /><i /></span>
          </button>
        </nav>
      </header>
      <div className="mobile-menu" data-open={open} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          {navigation.map(([label, href], index) => (
            <a key={href} href={href} aria-current={href === "#platform" ? "page" : undefined} style={{ "--delay": `${100 + index * 50}ms` }} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="mobile-primary" href="#platform" onClick={() => setOpen(false)}>Explore the platform <ArrowRight /></a>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ children, status = "concept" }) {
  return <span className={`status-badge ${status}`}><span />{children}</span>;
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="contour-field" aria-hidden="true">
        <svg viewBox="0 0 1200 700" preserveAspectRatio="none">
          {Array.from({ length: 12 }).map((_, index) => (
            <path key={index} d={`M-80 ${70 + index * 46} C180 ${10 + index * 48}, 280 ${140 + index * 42}, 520 ${74 + index * 47} S850 ${135 + index * 43}, 1280 ${55 + index * 47}`} />
          ))}
        </svg>
      </div>
      <div className="signal-field" aria-hidden="true"><i /><i /><i /></div>
      <div className="page-shell hero-grid">
        <div className="hero-copy" data-reveal>
          <StatusBadge>Product concept and interactive prototype</StatusBadge>
          <h1>Know what is happening.<br />Know what to do next.</h1>
          <p>Van Rakshak is a proposed forest fire intelligence and safety platform for people, field teams, and command operations across Uttarakhand.</p>
          <div className="hero-actions">
            <a className="primary-button button-press" href="#platform">Explore the platform <ArrowRight weight="bold" /></a>
          </div>
          <div className="proof-line" aria-label="Platform architecture summary">
            <span><strong>One</strong> incident model</span>
            <span><strong>Three</strong> coordinated experiences</span>
            <span><strong>Five</strong> trust levels</span>
          </div>
          <p className="prototype-note"><Warning weight="fill" /> Prototype only. No live emergency feed is connected and this page is not an emergency service.</p>
        </div>
        <div className="hero-visual" data-reveal>
          <div className="command-frame">
            <img src="/screens/command-dossier.png" alt="Van Rakshak command incident dossier prototype" />
          </div>
          <div className="phone phone-public">
            <img src="/screens/public-home.png" alt="Van Rakshak public home prototype" />
          </div>
          <div className="phone phone-staff">
            <img src="/screens/staff-task.png" alt="Van Rakshak field assignment prototype" />
          </div>
          <div className="hero-data-card source-card">
            <Database weight="duotone" />
            <div><strong>Source visible</strong><span>Every operational fact</span></div>
          </div>
          <div className="hero-data-card offline-card">
            <WifiSlash weight="duotone" />
            <div><strong>Offline aware</strong><span>Age and sync remain clear</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy, dark = false }) {
  return (
    <div className={`section-heading ${dark ? "dark" : ""}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="section problem-section" id="problem">
      <div className="page-shell">
        <SectionHeading eyebrow="The problem" title="Signals exist. A shared incident story does not." copy="A satellite point, an official warning, a public observation, and a field report can describe the same event while carrying very different authority. Van Rakshak is designed to preserve those differences and connect them into one understandable operational record." />
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, copy }, index) => (
            <article className="benefit-card" data-reveal key={title} style={{ "--delay": `${index * 60}ms` }}>
              <span className="icon-tile"><Icon size={24} weight="duotone" /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TaglineReveal() {
  const ref = useRef(null);
  const words = "One source aware system that tells each person what matters, without pretending every signal means the same thing.".split(" ");

  useEffect(() => {
    const nodes = ref.current?.querySelectorAll("span");
    if (!nodes) return undefined;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.dataset.active = "true";
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -28%", threshold: 0.8 },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tagline-section" aria-label="Core platform benefit">
      <p ref={ref}>{words.map((word, index) => <span key={`${word}-${index}`} style={{ "--word-delay": `${index * 35}ms` }}>{word} </span>)}</p>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="section platform-section" id="platform">
      <div className="page-shell">
        <SectionHeading eyebrow="One platform, three experiences" title="The same incident, shaped around the decision each role must make." copy="Public screens stay calm and progressive. Field screens make the next operational action dominant. Command screens preserve density, provenance, and auditability." />
        <div className="mode-stack">
          {platformModes.map((mode, index) => (
            <article className={`mode-card ${mode.tone}`} key={mode.eyebrow} data-reveal>
              <div className="mode-copy">
                <p className="eyebrow">0{index + 1} · {mode.eyebrow}</p>
                <h3>{mode.title}</h3>
                <p>{mode.copy}</p>
                <ul>{mode.actions.map(item => <li key={item}><Check size={18} weight="bold" />{item}</li>)}</ul>
              </div>
              <div className="mode-visual">
                <img src={mode.image} alt={`${mode.eyebrow} prototype screen`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowsSection() {
  return (
    <section className="section flows-section" id="flows">
      <div className="page-shell">
        <SectionHeading eyebrow="Application flows" title="Each journey begins with one urgent question and ends with a clear next state." copy="The flows are designed around role, authority, connectivity, and evidence. They do not force public users through a login experience." />
        <div className="flow-grid">
          {flowColumns.map(({ label, icon: Icon, steps }, columnIndex) => (
            <article className="flow-card" key={label} data-reveal>
              <div className="flow-title"><span><Icon size={24} weight="duotone" /></span><h3>{label}</h3></div>
              <ol>
                {steps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                    {index < steps.length - 1 && <i aria-hidden="true" style={{ "--flow-delay": `${columnIndex * 100 + index * 60}ms` }} />}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="section trust-section">
      <div className="page-shell">
        <SectionHeading eyebrow="Confidence before colour" title="A detection is not a warning. A report is not a verified incident." copy="Van Rakshak uses named trust levels, distinct shapes, source labels, and timestamps so people can understand both the information and its limits." dark />
        <div className="trust-list">
          {trustLevels.map(([number, title, copy, status]) => (
            <article className="trust-row" data-reveal key={number}>
              <span className={`trust-mark ${status}`}>{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <StatusBadge status={status}>{title}</StatusBadge>
            </article>
          ))}
          <article className="community-note" data-reveal>
            <UsersThree size={24} weight="duotone" />
            <div><h3>Community observation remains separate</h3><p>A public report stays visibly unverified until an authorized review changes its state.</p></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function DataSection() {
  return (
    <section className="section data-section" id="data">
      <div className="page-shell">
        <SectionHeading eyebrow="Data architecture" title="Designed around authoritative sources, with missing access made explicit." copy="The frontend should never call external feeds directly. A normalization layer turns source specific records into a consistent incident model while preserving provenance and freshness." />
        <div className="data-layout">
          <div className="source-table" data-reveal>
            <div className="table-head"><span>Source</span><span>Role in the platform</span><span>Current project status</span></div>
            {sources.map(source => (
              <article className="source-row" key={source.name}>
                <h3>{source.name}</h3>
                <p>{source.purpose}</p>
                <StatusBadge status={source.className}>{source.status}</StatusBadge>
              </article>
            ))}
          </div>
          <aside className="not-source-card" data-reveal>
            <span className="icon-tile"><X size={24} weight="bold" /></span>
            <p className="eyebrow">Intentionally outside initial scope</p>
            <h3>What the prototype will not depend on</h3>
            <ul>{excludedSources.map(item => <li key={item}><Check size={18} />{item}</li>)}</ul>
          </aside>
        </div>
        <div className="architecture" data-reveal aria-label="Proposed data flow architecture">
          <div className="architecture-sources">
            {["NASA FIRMS", "FSI", "IMD", "SACHET", "Copernicus", "Bhuvan"].map(name => <span key={name}>{name}</span>)}
          </div>
          <ArrowRight className="architecture-arrow" size={28} />
          <div className="architecture-node primary"><HardDrives size={28} weight="duotone" /><strong>Van Rakshak backend</strong><span>Normalize · deduplicate · preserve source</span></div>
          <ArrowRight className="architecture-arrow" size={28} />
          <div className="architecture-node"><Database size={28} weight="duotone" /><strong>PostGIS and clean API</strong><span>Incidents · warnings · places · source health</span></div>
          <ArrowRight className="architecture-arrow" size={28} />
          <div className="architecture-products"><span>Public mobile</span><span>Staff mobile</span><span>Command web</span></div>
        </div>
      </div>
    </section>
  );
}

function OfflineSection() {
  const items = [
    [CloudArrowDown, "Cached incident packs", "Field teams retain essential maps, instructions, contacts, and incident context."],
    [Pulse, "Visible freshness", "The last successful observation and synchronization time remain readable."],
    [WifiSlash, "Honest degraded states", "The interface says what is unavailable, what is cached, and what can still be trusted."],
    [ListChecks, "Queued field work", "Authorized actions can be stored locally and synchronized with a visible outcome."],
  ];
  return (
    <section className="section offline-section">
      <div className="page-shell offline-layout">
        <div>
          <SectionHeading eyebrow="Field reality" title="Weak connectivity is a product state, not an edge case." copy="The experience is designed to remain useful when a network is unreliable, while never making cached information look live." />
          <div className="offline-grid">
            {items.map(([Icon, title, copy]) => <article key={title} data-reveal><Icon size={24} weight="duotone" /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
        <div className="sync-demo" data-reveal>
          <div className="sync-top"><Radio size={24} weight="duotone" /><span>Field incident pack</span><StatusBadge status="planned">Offline ready</StatusBadge></div>
          <div className="sync-map" aria-hidden="true"><span /><i /><i /></div>
          <div className="sync-actions">
            <div><CheckCircle size={22} weight="fill" /><span><strong>Arrival captured</strong><small>Stored on this device</small></span></div>
            <div><CheckCircle size={22} weight="fill" /><span><strong>Evidence attached</strong><small>Waiting to synchronize</small></span></div>
            <div className="waiting"><Broadcast size={22} /><span><strong>Command update</strong><small>Queued until connection returns</small></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section gallery-section" id="screens">
      <div className="page-shell">
        <SectionHeading eyebrow="Prototype screens" title="The interface is already being explored across public, field, and command contexts." copy="These screens are design prototypes. They demonstrate hierarchy and flow, not production data, approved branding, or a live service." dark />
        <div className="gallery-track">
          {gallery.map(([title, image, alt]) => (
            <figure className={title === "Command dossier" ? "wide" : ""} key={title} data-reveal>
              <div><img src={image} alt={alt} loading="lazy" /></div>
              <figcaption>{title}<span>Prototype</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section className="section roadmap-section" id="roadmap">
      <div className="page-shell">
        <SectionHeading eyebrow="Development path" title="From coherent prototype to governed public service." copy="The technology is only one part of readiness. Institutional approval, source access, privacy, language, accessibility, operational policy, and field validation must advance together." />
        <div className="roadmap-list">
          {roadmap.map((item, index) => (
            <article key={item.phase} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p className="eyebrow">{item.phase}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="readiness-banner" data-reveal>
          <ShieldCheck size={32} weight="duotone" />
          <div><p className="eyebrow">Readiness gate</p><h3>Nothing becomes an official claim simply because it appears in a prototype.</h3><p>Government relationship, source rights, warnings, emergency guidance, terminology, and operational metrics require the relevant authority’s approval.</p></div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <div className="page-shell faq-layout">
        <SectionHeading eyebrow="Questions and boundaries" title="What the platform is, and what it is not yet." copy="The most important product promise is honesty about confidence, source access, and operational readiness." />
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question} data-reveal>
              <summary>{question}<CaretDown size={20} weight="bold" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" id="architecture">
      <div className="final-contours" aria-hidden="true" />
      <div className="page-shell" data-reveal>
        <Mark inverse />
        <p className="eyebrow">Built as one understandable incident story</p>
        <h2>Explore how Van Rakshak connects public clarity, field action, and command oversight.</h2>
        <a className="light-button button-press" href="#platform">Explore the platform <ArrowRight weight="bold" /></a>
        <p className="final-note">Concept and prototype only. Not for emergency use.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="page-shell footer-grid">
        <div className="footer-brand"><Mark inverse /><div><strong>Van Rakshak</strong><span>Forest intelligence for Uttarakhand</span></div></div>
        <div className="footer-links">
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <div className="footer-legal">
          <details id="privacy"><summary>Privacy approach</summary><p>The prototype minimizes personal data and requires approved policy for location, images, metadata, retention, moderation, and access before deployment.</p></details>
          <details id="terms"><summary>Prototype terms</summary><p>This experience is a design and engineering concept. It is not an emergency service, operational warning source, or statement of government approval.</p></details>
        </div>
      </div>
      <div className="page-shell footer-bottom"><span>Concept developed for Uttarakhand, India</span><span>Design status · working prototype</span></div>
    </footer>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <Mark />
      <p className="eyebrow">404 · Route not found</p>
      <h1>This trail does not continue.</h1>
      <p>Return to the Van Rakshak platform story.</p>
      <a className="primary-button button-press" href="/">Return home <ArrowRight /></a>
    </main>
  );
}

export default function App() {
  useReveal();
  if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") return <NotFound />;
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProblemSection />
        <TaglineReveal />
        <PlatformSection />
        <FlowsSection />
        <TrustSection />
        <DataSection />
        <OfflineSection />
        <GallerySection />
        <RoadmapSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
