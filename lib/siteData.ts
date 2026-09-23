/**
 * SINGLE SOURCE OF TRUTH for all bio, venture, product, offer and proof data.
 * Every page/component must import from here — never hardcode the same fact twice.
 *
 * Honesty rules (do not break these):
 * - Never add clients, testimonials, revenue, user counts, awards or certifications
 *   that do not exist. Proof slots stay empty until engagements actually happen.
 * - metrics.json values that are `null` are hidden by the UI (never rendered as 0).
 * - testimonials.json starts as `[]` and must stay empty until real, permissioned
 *   quotes exist.
 */
import metricsJson from "@/data/metrics.json";
import testimonialsJson from "@/data/testimonials.json";

/* ─────────────────────────── Site / identity ─────────────────────────── */

export const SITE = {
    name: "Nithyananthan Nagarajan",
    role: "Founder & CEO",
    roleShort: "Founder & CEO",
    company: "NITECHSPARK",
    tagline: "Cybersecurity & IT Infrastructure — helping businesses find risks before they become problems",
    baseUrl: "https://nitechspark.site",
    description:
        "Helping businesses identify cybersecurity and IT infrastructure risks before they become business problems. Book a free 15-min intro call.",
    ogImage: "/og-image.png",
    headshot: "/nithyananthan_executive.png",
    logo: "/logo.svg",
    themeColor: "#020612",
    established: "2026",
    geo: { lat: "11.3410", lon: "77.7172", region: "IN-TN", placename: "Erode, Tamil Nadu, India" },
    address: {
        addressLocality: "Erode",
        addressRegion: "Tamil Nadu",
        postalCode: "638001",
        addressCountry: "IN",
    },
} as const;

/* ─────────────────────────── Verified links ─────────────────────────── */
/* ONE LinkedIn URL for the whole site. Change it here only. */

export const LINKS = {
    linkedin: "https://www.linkedin.com/in/nithyananthan-nagarajan/",
    instagram: "https://www.instagram.com/nithyananthan.tech.founder/",
    calendly: "https://calendly.com/nithyananthannagarajan-nitechspark",
    whatsapp: "https://wa.me/916385576354",
    phone: "tel:+916385576354",
    phoneDisplay: "+91 63855 76354",
    phoneRaw: "+916385576354",
    email: "nithyananthan@nitechspark.site",
    nitechspark: "https://nitechspark.site",
    nitehire: "https://nitehire.site",
    niteorbit: "https://niteorbit.space",
    pricing: "https://nitechspark.site#pricing",
    checklist: "/msme-cyber-risk-self-check.pdf",
} as const;

export const PRIMARY_CTA = {
    label: "Book a Free 15-Min Intro Call",
    href: LINKS.calendly,
} as const;

export const SECONDARY_CTA = {
    label: "WhatsApp",
    href: LINKS.whatsapp,
} as const;

/* ─────────────────────── NiteOrbit single status ─────────────────────── */
/* Used verbatim on every page. Flip this string when the venture ships. */

export const NITEORBIT_STATUS =
    "Space Ground Systems & Satellite Telemetry — In Development";

/* ─────────────────────────── Ventures ─────────────────────────── */

export type VentureStatus = "OPERATIONAL" | "LIVE" | "IN DEVELOPMENT";

export interface Venture {
    name: string;
    role: string;
    status: VentureStatus;
    statusLabel?: string;
    since: string;
    description: string;
    url: string;
    tags: string[];
}

export const services: string[] = [
    "Cybersecurity Assessment",
    "IT Infrastructure Review",
    "Vulnerability Assessment & Penetration Testing (VAPT)",
    "Network Security Audit",
    "Cloud Security Review",
    "Security Policy & Compliance Guidance",
    "Endpoint & Server Hardening",
    "Monitoring, Logging & Incident Readiness",
    "DPDP Act Readiness",
    "Security & IT Infrastructure Remediation",
];

export const WORKFLOW = ["ASSESS", "REPORT", "REMEDIATE", "RE-TEST"] as const;

export const PRIMARY_MESSAGE =
    "Helping businesses identify cybersecurity and IT infrastructure risks before they become business problems.";

export const ventures: Venture[] = [
    {
        name: "NITECHSPARK",
        role: "CYBERSECURITY & IT INFRASTRUCTURE",
        status: "OPERATIONAL",
        since: "EST. JAN 2026",
        description:
            "Founder-led cybersecurity and IT infrastructure services with a dedicated security team: assessments, VAPT, hardening, monitoring and DPDP Act readiness for MSMEs and startups. Fixed-scope packages with transparent pricing. Workflow: ASSESS → REPORT → REMEDIATE → RE-TEST.",
        url: LINKS.nitechspark,
        tags: ["ASSESSMENTS", "VAPT", "CYBERSECURITY", "MSME"],
    },
    {
        name: "NITEHIRE",
        role: "AI RECRUITMENT & TALENT ATS",
        status: "LIVE",
        since: "LAUNCHED MAY 2026",
        description:
            "AI recruitment platform built by Nithyananthan: 2-level candidate screening (communication + resume-based technical evaluation), HR Kanban pipelines, and candidate onboarding flows.",
        url: LINKS.nitehire,
        tags: ["AI RECRUITMENT", "ATS PLATFORM", "GROQ SDK", "GEMINI AI"],
    },
    {
        name: "NITEORBIT",
        role: "SPACE TECH & GROUND SYSTEMS",
        status: "IN DEVELOPMENT",
        statusLabel: NITEORBIT_STATUS,
        since: "IN DEVELOPMENT",
        description: NITEORBIT_STATUS + ". Ground-segment DevOps and satellite telemetry tooling in early build; details limited while in development.",
        url: LINKS.niteorbit,
        tags: ["SPACE TECH", "GROUND SYSTEMS", "TELEMETRY", "PRE-LAUNCH"],
    },
];

/* ─────────────────────────── Products ─────────────────────────── */

export type ProductStatus = "Live" | "Beta" | "Pilot" | "In development";

export interface Product {
    number: string;
    name: string;
    category: "CYBERSECURITY & SRE" | "AI & TALENT ATS" | "ENTERPRISE & SAFETY APPS";
    tagline: string;
    problem: string;
    description: string;
    status: ProductStatus;
    url?: string;
    techStack: string[];
}

export const products: Product[] = [
    {
        number: "01",
        name: "PropoTrack",
        category: "CYBERSECURITY & SRE",
        tagline: "Contract & Proposal Pipeline",
        problem:
            "Proposals and contracts live in scattered spreadsheets with no owner, stage, or follow-up visibility.",
        description:
            "Multi-vendor proposal and contract pipeline tracker: stages, owners, and follow-ups in one place.",
        status: "Live",
        url: "https://tracker.nitechspark.site",
        techStack: ["React", "Vite", "Express", "Prisma", "Neon DB"],
    },
    {
        number: "02",
        name: "NiteSentinel (SecureScope)",
        category: "CYBERSECURITY & SRE",
        tagline: "Detect. Assess. Harden.",
        problem:
            "Teams only discover weak endpoints and missing compliance evidence when an audit or incident forces the question.",
        description:
            "Local-first endpoint security auditor and compliance mapper aligned with DPDP Act 2023, ISO 27001 and SOC 2 control language.",
        status: "Beta",
        url: LINKS.nitechspark,
        techStack: ["Python", "Flask", "Zero-Trust", "DPDP Act"],
    },
    {
        number: "03",
        name: "sparkAudit",
        category: "CYBERSECURITY & SRE",
        tagline: "Automated GRC Evidence Hub",
        problem:
            "Compliance evidence is collected by hand the week before an audit, then lost in email threads.",
        description:
            "GRC checklist automation: task audits, evidence collection and sync mapped to NIST and DPDP-style controls.",
        status: "Live",
        url: "https://sparkaudit.nitechspark.site",
        techStack: ["React", "Node.js", "GRC Automation", "NIST"],
    },
    {
        number: "04",
        name: "CyberScan",
        category: "CYBERSECURITY & SRE",
        tagline: "Async Network & SSL Scanner",
        problem:
            "Expired SSL certificates and forgotten open ports are usually found by customers or attackers, not by the team.",
        description:
            "Automated infrastructure scanner: open port discovery, basic vulnerability checks and SSL certificate expiry monitoring.",
        status: "Live",
        url: "https://cyberscan.nitechspark.site",
        techStack: ["Python", "Flask", "Async Socket", "SSL Security"],
    },
    {
        number: "05",
        name: "NiteHire ATS",
        category: "AI & TALENT ATS",
        tagline: "2-Level AI Screening",
        problem:
            "SME recruiters drown in resumes while keyword ATS tools filter for formatting tricks, not actual skill.",
        description:
            "Recruitment platform with 2-level AI screening (communication + resume-based technical scoring), HR pipelines and candidate coaching.",
        status: "Live",
        url: LINKS.nitehire,
        techStack: ["React 19", "Groq Llama 3.3", "Gemini 2.5", "Neon"],
    },
    {
        number: "06",
        name: "Alone AI (NiteBuddy)",
        category: "AI & TALENT ATS",
        tagline: "Vector-Memory AI Companion",
        problem:
            "Journaling and companion apps forget context between sessions, so conversations never build on each other.",
        description:
            "AI companion with vector memory, mood tracking, reflective journaling and growth analytics.",
        status: "Beta",
        url: "https://nitebuddy.nitechspark.site",
        techStack: ["Qdrant", "FastAPI", "Vector Search", "Gemini AI"],
    },
    {
        number: "07",
        name: "RCA Engine",
        category: "CYBERSECURITY & SRE",
        tagline: "Incident Root-Cause Diagnostics",
        problem:
            "Monitoring alerts fire, but finding the root cause means an engineer greps across a dozen log sources for hours.",
        description:
            "Alert triage helper that correlates incidents with workflow automation and LLM summaries to suggest likely root causes.",
        status: "Pilot",
        techStack: ["Flask", "n8n Workflows", "Groq", "Llama 3.3"],
    },
    {
        number: "08",
        name: "PDF2Excel AI",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "OCR Document Pipeline",
        problem:
            "Finance and ops teams re-type data from PDFs into spreadsheets by hand — slow and error-prone.",
        description:
            "OCR document text extraction pipeline that outputs structured, formatted spreadsheets for enterprise records.",
        status: "Pilot",
        techStack: ["Python", "Tesseract OCR", "Pandas", "FastAPI"],
    },
    {
        number: "09",
        name: "SustainHub",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "Corporate ESG Telemetry",
        problem:
            "Sustainability and ESG metrics sit in one-off slide decks with no time series or owner.",
        description:
            "ESG metrics tracking, operational telemetry helpdesk, circular-economy logging and embeddable public widgets.",
        status: "Live",
        url: "https://sustainhub.nitechspark.site",
        techStack: ["Next.js", "ESG Metrics", "PostgreSQL", "Tailwind"],
    },
    {
        number: "10",
        name: "SENTRIYA",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "Emergency Safety Ecosystem",
        problem:
            "Emergency SOS apps fail in the cases that matter: low bandwidth, tampered evidence, or lost connectivity.",
        description:
            "Safety ecosystem concept: real-time SOS triggers, location sharing and tamper-evident encrypted audio/video capture.",
        status: "In development",
        url: LINKS.nitechspark,
        techStack: ["WebSockets", "Geo-Fencing", "Encryption", "React Native"],
    },
    {
        number: "11",
        name: "NiteConnect",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "Incident Comms Android App",
        problem:
            "Incident and executive coordination happens over consumer chat apps with no security boundary or audit trail.",
        description:
            "Secure Android communication app for incident responders and leadership, built with Jetpack Compose and Gemini AI.",
        status: "In development",
        techStack: ["Kotlin", "Jetpack Compose", "Gemini AI", "Android"],
    },
    {
        number: "12",
        name: "Craft Resume",
        category: "AI & TALENT ATS",
        tagline: "ATS Resume Engine",
        problem:
            "Strong candidates get screened out by ATS keyword matching before a human ever reads their resume.",
        description:
            "Resume builder and ATS optimisation helper under the NiteHire ecosystem.",
        status: "Beta",
        url: LINKS.nitehire,
        techStack: ["React 19", "AI Scoring", "PDF Generation", "ATS Parser"],
    },
];

/** Dynamic product count — never hardcode "5+", "9" or "12" anywhere else. */
export const productCount = products.length;

/* ─────────────────────────── Credentials strip ─────────────────────────── */
/* Facts only. No ISO / awards / partner logos — ever. */

export const credentials = [
    "Udyam MSME Registered",
    "Erode, Tamil Nadu",
    "Linux / DevOps / Cybersecurity",
    "Next.js · React · Node · Python · AI stack",
    "Open to founding-client engagements",
] as const;

export const BADGES = {
    erode: "ERODE, TAMIL NADU",
    udyam: "UDYAM MSME",
    est: "EST. 2026",
    defcon: "DEFCON KOVAI",
    linux: "LINUX / DEVOPS",
} as const;

/* ─────────────────── Why work with us (honest proof) ─────────────────── */

export const whyUs = [
    {
        title: "Founder-led & dedicated cyber team",
        body: "Direct founder oversight backed by a dedicated cybersecurity engineering team — specialized hands-on delivery, no account-manager relay.",
    },
    {
        title: "Udyam MSME registered",
        body: "Government of India Udyam registration for NITECHSPARK. Proper invoicing from day one.",
    },
    {
        title: "Written scope + NDA available",
        body: "Every engagement starts with a written scope. Confidentiality/NDA signed before access to systems or data.",
    },
    {
        title: "Structured 9-area assessment",
        body: "Assets, access control, network exposure, patching, backup, monitoring, incident response, privacy/DPDP, and process.",
    },
    {
        title: "Transparent pricing",
        body: "Published price anchors — Essential ₹7,500 / Professional ₹15,000 / Business ₹25,000+. See full pricing before you book.",
    },
    {
        title: "Erode-based, remote-friendly",
        body: "Based in Erode, serving Tamil Nadu on-site where needed and remote across India.",
    },
] as const;

export const HONEST_BADGE =
    "Building in public — early-stage portfolio. References available for founding-cohort clients under NDA once engagements begin.";

export const FOUNDING_SLOTS = 3;

/* ─────────────────────────── Offers / services ─────────────────────────── */

export interface Offer {
    id: string;
    venture: string;
    name: string;
    price: string;
    priceNote?: string;
    summary: string;
    deliverables: string[];
    timeline: string;
    cta: { label: string; href: string; primary?: boolean };
    secondaryCta?: { label: string; href: string };
}

export const offers: Offer[] = [
    {
        id: "essential",
        venture: "NiTechSpark",
        name: "Cyber Risk Assessment — Essential",
        price: "₹7,500",
        summary:
            "Entry-level 9-area security review of one server or small environment, delivered as a prioritised findings report.",
        deliverables: [
            "9-area assessment across the structured methodology",
            "Prioritised findings report (PDF) with risk ratings",
            "Hardening checklist you can hand to any engineer",
            "30-min walkthrough call of the findings",
        ],
        timeline: "3–5 working days after access is granted",
        cta: { label: "Book assessment", href: LINKS.calendly, primary: true },
        secondaryCta: { label: "See full pricing", href: LINKS.pricing },
    },
    {
        id: "professional",
        venture: "NiTechSpark",
        name: "Cyber Risk Assessment — Professional",
        price: "₹15,000",
        summary:
            "Everything in Essential plus hands-on hardening, a DPDP Act gap check, and basic monitoring on the assessed systems.",
        deliverables: [
            "Everything in Essential",
            "SSH/firewall/user hardening applied on up to 2 servers",
            "DPDP Act 2023 gap checklist with remediation steps",
            "Uptime + certificate expiry monitoring set up",
            "14 days of async email support after delivery",
        ],
        timeline: "1–2 weeks",
        cta: { label: "Book assessment", href: LINKS.calendly, primary: true },
        secondaryCta: { label: "See full pricing", href: LINKS.pricing },
    },
    {
        id: "business",
        venture: "NiTechSpark",
        name: "Cyber Risk Assessment — Business",
        price: "₹25,000+",
        summary:
            "Multi-server or multi-team scope: full assessment, policy starter pack, and a working session with your team.",
        deliverables: [
            "Everything in Professional, scoped across your environment",
            "Policy starter pack (access, backup, incident basics)",
            "Team working session (60–90 min)",
            "Re-check pass after remediation",
        ],
        timeline: "2–4 weeks depending on scope",
        cta: { label: "Book assessment", href: LINKS.calendly, primary: true },
        secondaryCta: { label: "See full pricing", href: LINKS.pricing },
    },
    {
        id: "nitehire",
        venture: "NiteHire",
        name: "NiteHire AI Recruitment ATS — Demo",
        price: "Custom",
        priceNote: "Demo first; pricing after scope",
        summary:
            "See the 2-level AI screening, pipelines and candidate flows on your own sample roles before deciding anything.",
        deliverables: [
            "Live walkthrough of screening levels and pipelines",
            "Trial on 1–2 of your real open roles",
            "Honest fit assessment — including when NOT to use AI screening",
        ],
        timeline: "30–45 min demo, scheduled same week",
        cta: { label: "Request demo", href: LINKS.calendly, primary: true },
        secondaryCta: { label: "Visit nitehire.site", href: LINKS.nitehire },
    },
    {
        id: "custom",
        venture: "Custom / product work",
        name: "Custom Build or Product Partnership",
        price: "Scoped per project",
        summary:
            "Internal tools, automations, or product partnerships across the NITECHSPARK portfolio. You describe the problem; we reply with scope, timeline and price.",
        deliverables: [
            "Written scope document before any commitment",
            "Milestone-based delivery plan",
            "NDA available before details are shared",
        ],
        timeline: "Scoping reply within 2 working days",
        cta: { label: "Describe your project", href: "#contact", primary: true },
        secondaryCta: { label: "See product work", href: "/work" },
    },
    {
        id: "niteorbit",
        venture: "NiteOrbit",
        name: NITEORBIT_STATUS,
        price: "Not yet offered",
        summary:
            "NiteOrbit is pre-launch. No services are sold from it today — this page will change when it ships.",
        deliverables: ["Early partner conversations only"],
        timeline: "—",
        cta: { label: "Talk to the founder", href: LINKS.calendly, primary: true },
    },
];

/* ───────────── /work — illustrative case templates (NOT clients) ───────────── */

export interface CaseTemplate {
    id: string;
    title: string;
    patternLabel: string;
    problem: string;
    approach: string;
    outcomeType: string;
}

export const caseTemplates: CaseTemplate[] = [
    {
        id: "ssh-hardening",
        title: "Exposed SSH + shared admin passwords on a Linux server",
        patternLabel: "Case Template (Anonymized Pattern)",
        problem:
            "A typical small-team Linux box allows password login over SSH, root login is enabled, and the same admin password is shared across two founders and a contractor.",
        approach:
            "Hardening checklist applied: key-only SSH, root login disabled, per-user accounts with sudo audit, shared password retired, UFW reduced to required ports only, fail2ban-style rate limiting, and a short access-review note left with the team.",
        outcomeType:
            "Illustrative scenario describing the type of problem fixed — not a client story. No client has engaged yet.",
    },
    {
        id: "cert-and-port-drift",
        title: "Nobody notices expiring certificates or forgotten open ports",
        patternLabel: "Case Template (Anonymized Pattern)",
        problem:
            "A production site's TLS certificate expires on a Sunday, and an old staging service has been internet-facing for months with default credentials nobody remembers.",
        approach:
            "External port scan and certificate inventory run; findings listed with severity; expiry monitoring and a patch/close plan handed over; risky staging service taken offline or locked down on the spot.",
        outcomeType:
            "Illustrative scenario describing the type of problem fixed — not a client story. No client has engaged yet.",
    },
    {
        id: "dpdp-pii-sprawl",
        title: "Customer PII in shared drives with no consent record",
        patternLabel: "Case Template (Anonymized Pattern)",
        problem:
            "A 20-person business keeps customer spreadsheets in a shared drive: sales, support and an intern all have edit access, and nobody can say where personal data lives or what consent was captured.",
        approach:
            "Personal-data map built (what is stored, where, why), least-privilege access applied, a plain-language consent notice drafted, retention/deletion steps written down, and an incident-reporting checklist the team can actually follow.",
        outcomeType:
            "Illustrative scenario describing the type of problem fixed — not a client story. No client has engaged yet.",
    },
];

/* ─────────────────────────── Social proof (future-proof) ─────────────────────────── */

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company?: string;
    approved: boolean;
}

/** Empty until founding-cohort engagements produce real, permissioned quotes. */
export const testimonials: Testimonial[] = testimonialsJson as Testimonial[];

/**
 * Real metrics. `null` means "not true yet" — the UI must hide the stat entirely
 * rather than render 0 or an invented number.
 */
export const metrics = {
    clients: (metricsJson as { clients: number | null }).clients,
    assessmentsSold: (metricsJson as { assessmentsSold: number | null }).assessmentsSold,
    productsShipped: (metricsJson as { productsShipped: number | null }).productsShipped,
    betaUsers: (metricsJson as { betaUsers: number | null }).betaUsers,
};

/** Returns the value only when it is a real non-null number; otherwise null (hidden). */
export function realMetric(value: number | null | undefined): number | null {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/* ─────────────────────────── Press / boilerplate ─────────────────────────── */

export const BOILERPLATE_50 =
    "Nithyananthan Nagarajan is the Founder & CEO of NITECHSPARK, a Udyam-registered MSME cybersecurity and IT infrastructure studio in Erode, Tamil Nadu. He helps businesses identify cybersecurity and IT infrastructure risks before they become business problems through assessments, hardening and remediation.";

export const BOILERPLATE_100 =
    "Nithyananthan Nagarajan is the Founder & CEO of NITECHSPARK, a Government of India Udyam MSME-registered cybersecurity and IT infrastructure studio based in Erode, Tamil Nadu. NITECHSPARK helps businesses identify cybersecurity and IT infrastructure risks before they become business problems — covering cybersecurity assessments, IT infrastructure reviews, VAPT, network and cloud security audits, policy and compliance guidance, endpoint and server hardening, monitoring and incident readiness, DPDP Act readiness, and remediation. Engagements follow a clear workflow: ASSESS → REPORT → REMEDIATE → RE-TEST. Founder-led delivery backed by a dedicated cybersecurity team, scoped in writing, NDA available. NITECHSPARK is early-stage and building in public, with engagements available to a small founding cohort of clients.";

export const PRESS_CONTACT = {
        label: "Press & partnerships",
        email: LINKS.email,
        whatsapp: LINKS.phoneDisplay,
    };

export const BRAND_COLORS = [
    { name: "Midnight (background)", hex: "#020612" },
    { name: "Panel navy", hex: "#050e1f" },
    { name: "Neon sky (accent)", hex: "#38bdf8" },
    { name: "Slate text", hex: "#cbe3f7" },
] as const;

export const BRAND_TYPE = {
    display: "Orbitron — headlines & wordmark",
    body: "Rajdhani / Inter — body copy",
    mono: "JetBrains Mono — labels & code",
} as const;

/* ─────────────────────────── Helpers ─────────────────────────── */

export function copyrightYear(): number {
    return new Date().getFullYear();
}

export function calendlyUrl(source?: string): string {
    if (!source) return LINKS.calendly;
    const sep = LINKS.calendly.includes("?") ? "&" : "?";
    return `${LINKS.calendly}${sep}utm_content=${encodeURIComponent(source)}`;
}

export const META_BADGES = [
    BADGES.erode,
    BADGES.udyam,
    BADGES.est,
    BADGES.defcon,
    BADGES.linux,
];
