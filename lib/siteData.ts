/**
 * SINGLE SOURCE OF TRUTH for all engineering bio, experience, skills,
 * achievements, selected projects, ventures, services and proof data.
 * Every page/component imports from here — never hardcode facts twice.
 *
 * Honesty rules (strictly enforced):
 * - Never add clients, testimonials, revenue, user counts, awards or certifications
 *   that do not exist. Proof slots stay empty until real engagements happen.
 * - metrics.json values that are `null` are hidden by the UI (never rendered as 0).
 * - testimonials.json starts as `[]` and stays empty until real, permissioned quotes exist.
 * - Private repository details and private credentials are never exposed publicly.
 */
import metricsJson from "@/data/metrics.json";
import testimonialsJson from "@/data/testimonials.json";

/* ─────────────────────────── Primary Identity & Positioning ─────────────────────────── */

export const SITE = {
    name: "Nithyananthan Nagarajan",
    role: "Cybersecurity & IT Infrastructure Analyst & Consultant",
    roleShort: "Cybersecurity & IT Infrastructure Consultant",
    founderRole: "Founder & CEO — NITECHSPARK",
    company: "NITECHSPARK",
    tagline:
        "Cybersecurity & IT Infrastructure Analyst & Consultant focused on building, troubleshooting, securing and automating real-world systems.",
    secondaryTagline:
        "Founder building practical cybersecurity, infrastructure and AI products.",
    baseUrl: "https://nithyananthan.nskgroups.website",
    description:
        "Cybersecurity & IT Infrastructure Analyst & Consultant and Founder & CEO of NITECHSPARK, focused on building, troubleshooting, securing and automating real-world systems — with hands-on AIOps, Linux administration, and infrastructure automation experience.",
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

/* ─────────────────────────── Verified Links ─────────────────────────── */

export const LINKS = {
    github: "https://github.com/nithyananthantechy",
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
    label: "Book a Technical Consultation",
    href: LINKS.calendly,
} as const;

export const SECONDARY_CTA = {
    label: "View My Work",
    href: "#projects",
} as const;

export const WHATSAPP_CTA = {
    label: "WhatsApp Me",
    href: LINKS.whatsapp,
} as const;

/* ─────────────────────────── Professional Experience ─────────────────────────── */

export interface ExperienceRole {
    company: string;
    role: string;
    period: string;
    location: string;
    summary: string;
    responsibilities: string[];
    technologies: string[];
}

export const professionalExperience: ExperienceRole[] = [
    {
        company: "DesiCrew Solutions Pvt. Ltd.",
        role: "Junior AIOps Engineer",
        period: "Professional Experience",
        location: "India",
        summary:
            "Hands-on engineering role executing AIOps operations, full-stack infrastructure and application monitoring, Linux administration, and root cause analysis across production environments.",
        responsibilities: [
            "AIOps operations & automated health surveillance across Linux servers and multi-tier systems.",
            "Infrastructure and application monitoring with proactive alerting pipelines using Zabbix, Prometheus, and Grafana.",
            "Centralized log ingestion, parsing, and real-time visualization utilizing the Elastic Stack (Elasticsearch, Logstash, Beats, Kibana) and Syslog.",
            "Linux system administration, server troubleshooting, system performance tuning, and access control.",
            "Incident investigation, alert correlation, and root cause analysis (RCA) to minimize MTTR.",
            "Docker container deployment, service isolation, and virtualization support.",
            "Infrastructure automation with custom Python, Bash, and PowerShell scripts for routine operational maintenance.",
            "System health monitoring, capacity tracking, and operational support.",
        ],
        technologies: [
            "Linux (Ubuntu/Debian)",
            "Zabbix",
            "Prometheus",
            "Grafana",
            "ELK Stack",
            "Docker",
            "Virtualization",
            "Syslog",
            "Python",
            "Bash / Shell",
            "PowerShell",
        ],
    },
];

/* ─────────────────────────── Technical Skills (Grouped by Domain) ─────────────────────────── */

export interface SkillGroup {
    groupNumber: number;
    title: string;
    category: string;
    skills: string[];
}

export const skillGroups: SkillGroup[] = [
    {
        groupNumber: 1,
        title: "Infrastructure",
        category: "LINUX & SYSTEMS",
        skills: [
            "Linux",
            "Ubuntu",
            "Server Administration",
            "Docker",
            "KVM / Virtualization",
            "Nginx",
            "Apache",
            "DNS",
            "SSL/TLS",
        ],
    },
    {
        groupNumber: 2,
        title: "Monitoring & AIOps",
        category: "OBSERVABILITY & RCA",
        skills: [
            "Zabbix",
            "Prometheus",
            "Grafana",
            "ELK / Elastic Stack",
            "Syslog",
            "Application Monitoring",
            "Incident Analysis",
            "RCA",
        ],
    },
    {
        groupNumber: 3,
        title: "Cybersecurity",
        category: "HARDENING & DEFENSE",
        skills: [
            "Security Auditing",
            "Vulnerability Assessment",
            "Network Security",
            "Linux Hardening",
            "Security Monitoring",
            "Incident Readiness",
            "Infrastructure Security",
        ],
    },
    {
        groupNumber: 4,
        title: "Development & Automation",
        category: "SCRIPTING & APIS",
        skills: [
            "Python",
            "Bash / Shell Scripting",
            "PowerShell",
            "JavaScript / TypeScript",
            "Next.js",
            "React",
            "Flask",
            "REST APIs",
            "Automation",
        ],
    },
    {
        groupNumber: 5,
        title: "Databases",
        category: "STORAGE & ORM",
        skills: ["PostgreSQL", "MySQL", "Prisma", "SQL"],
    },
];

/* ────────────────── Cisco Networking Academy Achievements ────────────────── */

export type AchievementType = "Badge" | "Certificate" | "Module" | "Achievement";

export interface CiscoAchievement {
    id: number;
    title: string;
    type: AchievementType;
    issuedDate: string;
    issuer: string;
}

export const ciscoAchievements: CiscoAchievement[] = [
    {
        id: 1,
        title: "Networking Basics",
        type: "Badge",
        issuedDate: "January 18, 2026",
        issuer: "Cisco Networking Academy",
    },
    {
        id: 2,
        title: "Networking Basics",
        type: "Certificate",
        issuedDate: "January 18, 2026",
        issuer: "Cisco Networking Academy",
    },
    {
        id: 3,
        title: "Networking Protocols Basics",
        type: "Module",
        issuedDate: "January 18, 2026",
        issuer: "Cisco Networking Academy",
    },
    {
        id: 4,
        title: "Network Communications Basics",
        type: "Module",
        issuedDate: "January 18, 2026",
        issuer: "Cisco Networking Academy",
    },
    {
        id: 5,
        title: "Internet Protocol Basics",
        type: "Module",
        issuedDate: "November 22, 2025",
        issuer: "Cisco Networking Academy",
    },
    {
        id: 6,
        title: "Network Access Basics",
        type: "Module",
        issuedDate: "October 21, 2025",
        issuer: "Cisco Networking Academy",
    },
    {
        id: 7,
        title: "Network Basics",
        type: "Module",
        issuedDate: "October 21, 2025",
        issuer: "Cisco Networking Academy",
    },
    {
        id: 8,
        title: "Introduction to Cybersecurity",
        type: "Badge",
        issuedDate: "October 8, 2025",
        issuer: "Cisco Networking Academy",
    },
];

/* ─────────────────────────── AIOps & Infrastructure Focus ─────────────────────────── */

export interface AiOpsFocusArea {
    area: string;
    description: string;
    technologies: string[];
}

export const aiopsFocusAreas: AiOpsFocusArea[] = [
    {
        area: "Monitoring & Metric Collection",
        description:
            "Designing proactive telemetry pipelines to collect server, network, and application health metrics with real-time threshold detection.",
        technologies: ["Zabbix", "Prometheus", "Node Exporter", "SNMP"],
    },
    {
        area: "Observability & Dashboards",
        description:
            "Building centralized visualization dashboards that unify multi-server telemetry into operational single-pane-of-glass views.",
        technologies: ["Grafana", "Kibana", "Prometheus"],
    },
    {
        area: "Centralized Logging",
        description:
            "Aggregating system, daemon, and firewall logs across distributed Linux endpoints into structured, searchable indices.",
        technologies: ["Syslog", "Logstash", "Elasticsearch", "Beats"],
    },
    {
        area: "Incident Investigation & RCA",
        description:
            "Analyzing alert storms, correlating telemetry with system logs, and executing systematic root cause isolation to reduce downtime.",
        technologies: ["ELK Stack", "Syslog", "Incident Correlation", "RCA Runbooks"],
    },
    {
        area: "Linux Administration & Hardening",
        description:
            "Managing core Linux infrastructure: systemd services, SSH access policies, user privileges, firewall rules, and kernel tuning.",
        technologies: ["Ubuntu", "Debian", "iptables", "UFW", "systemd"],
    },
    {
        area: "Infrastructure Automation",
        description:
            "Developing maintainable automation scripts for unattended system health verification, disk rotation, and operational tasks.",
        technologies: ["Python", "Bash", "Shell Scripting", "Cron Jobs"],
    },
];

/* ───────────────────── Selected Engineering Projects (6-8) ───────────────────── */

export type ProjectStatus = "Live" | "Beta" | "Pilot" | "In Development" | "Completed";

export interface EngineeringProject {
    id: string;
    name: string;
    problem: string;
    whatIBuilt: string;
    techStack: string[];
    engineeringFocus:
        | "Infrastructure Automation"
        | "Cybersecurity"
        | "AIOps"
        | "Monitoring"
        | "Linux Hardening"
        | "Full Stack"
        | "Incident Diagnostics";
    status: ProjectStatus;
    githubUrl?: string;
    demoUrl?: string;
    isPrivate?: boolean;
    privateNote?: string;
    image?: string;
    images?: string[];
}

export const selectedEngineeringProjects: EngineeringProject[] = [
    {
        id: "zabbix-monitoring",
        name: "Zabbix Network Monitoring Tool",
        problem:
            "IT administrators and network engineers lack a centralized, automated monitoring setup to track server health, endpoint availability, and network devices.",
        whatIBuilt:
            "Configured a complete Zabbix network monitoring environment for servers, switches, and endpoints. Implemented proactive alert thresholds, custom metrics gathering, and automated availability dashboards.",
        techStack: ["Zabbix", "Linux", "SNMP", "Shell Scripting", "Network Monitoring"],
        engineeringFocus: "Monitoring",
        status: "Completed",
        githubUrl: "https://github.com/nithyananthantechy/Zabbix_Network_Monitoring_tool",
    },
    {
        id: "syslog-elk-stack",
        name: "Centralized Syslog & Elastic Stack (ELK) Telemetry",
        problem:
            "Dispersed infrastructure logs across firewalls, Linux servers, and Active Directory make incident triage and security auditing slow and manual.",
        whatIBuilt:
            "Engineered a centralized Syslog ingestion server on Ubuntu integrated with Elasticsearch, Logstash, Beats, and Kibana. Enabled structured parsing, index lifecycle management, and real-time visualization for multi-device log streams.",
        techStack: ["Elasticsearch", "Logstash", "Kibana", "Syslog", "Ubuntu Linux", "Beats"],
        engineeringFocus: "AIOps",
        status: "Completed",
        githubUrl: "https://github.com/nithyananthantechy/syslog-server-ubuntu-elastic-stack-kibana",
    },
    {
        id: "packet-firewall",
        name: "Stateful Linux Packet-Filtering Firewall",
        problem:
            "Unprotected Linux server endpoints are vulnerable to unauthorized access and port exploitation without custom packet filtering and logging.",
        whatIBuilt:
            "Implemented a stateful packet-filtering firewall using Linux iptables on Ubuntu Server with a default-deny policy. Configured granular rule sets allowing SSH, HTTP, and HTTPS while strictly dropping unwanted traffic and logging dropped packet telemetry.",
        techStack: ["iptables", "Linux", "Ubuntu Server", "Bash", "Network Security", "Nmap"],
        engineeringFocus: "Linux Hardening",
        status: "Completed",
        githubUrl: "https://github.com/nithyananthantechy/basic-packet-filtering-firewall",
    },
    {
        id: "cyberscan",
        name: "CyberScan — Async Network Reconnaissance & SSL Auditor",
        problem:
            "Expired SSL certificates and unexpected exposed open ports often go unnoticed until external systems fail or security audits flag them.",
        whatIBuilt:
            "Developed a high-performance, multi-threaded asynchronous port scanner and SSL monitoring dashboard. Built socket-based network discovery, real-time service detection, and SSL certificate expiration alerting.",
        techStack: ["Python", "Flask", "Async Sockets", "SSL/TLS", "Tailwind CSS"],
        engineeringFocus: "Cybersecurity",
        status: "Live",
        githubUrl: "https://github.com/nithyananthantechy/Port_Sacnner",
        demoUrl: "https://cyberscan.nitechspark.site",
    },
    {
        id: "sys-mgmt-scripts",
        name: "System Management & Automation Suite",
        problem:
            "Repetitive system administration tasks—process monitoring, directory health checks, and log rotations—consume excessive administrative time when handled manually.",
        whatIBuilt:
            "Built a modular automation toolset using Python and Bash for headless Linux server management. Automated critical process health surveillance, disk utilization threshold checks, and automated system remediation routines.",
        techStack: ["Python", "Bash", "Linux Administration", "Cron", "Systemd"],
        engineeringFocus: "Infrastructure Automation",
        status: "Completed",
        githubUrl: "https://github.com/nithyananthantechy/System-Management-Scripts-Python-and-Shell",
    },
    {
        id: "pdf2excel-ai",
        name: "PDF2Excel AI — Industrial OCR Extraction Pipeline",
        problem:
            "Operations and finance teams spend hours manually re-typing unstructured data from complex multi-page industrial PDFs, OBL sheets, and warrants into spreadsheets.",
        whatIBuilt:
            "Engineered a full-stack OCR and table extraction pipeline using React and Express. Integrated high-precision tabular parsing to process complex industrial documents into clean, multi-sheet formatted Excel workbooks.",
        techStack: ["React", "Express", "Node.js", "OCR", "TypeScript", "ExcelJS"],
        engineeringFocus: "Full Stack",
        status: "Pilot",
        githubUrl: "https://github.com/nithyananthantechy/PDF2Excel-AI",
    },
    {
        id: "private-aiops-platform",
        name: "Private AIOps Alert Triage & Root Cause Analysis Platform",
        problem:
            "Complex infrastructure monitoring environments flood engineering teams with cascading alerts, obscuring root cause dependencies during major incidents.",
        whatIBuilt:
            "Built as part of professional infrastructure engineering work. Connects monitoring signals with workflow automation and incident correlation routines to accelerate root-cause identification and operational response.",
        techStack: ["Python", "Flask", "n8n", "Observability Pipelines", "RCA Workflows", "Linux"],
        engineeringFocus: "Incident Diagnostics",
        status: "Pilot",
        isPrivate: true,
        privateNote: "Built as part of professional infrastructure engineering work.",
    },
];

/* ───────────────────── Commercial Engineering Services ───────────────────── */

export interface CommercialService {
    id: string;
    title: string;
    problem: string;
    scope: string;
    deliverables: string[];
    priceAnchor?: string;
    ctaLabel: string;
    ctaHref: string;
}

export const commercialServices: CommercialService[] = [
    {
        id: "linux-admin",
        title: "Linux & Server Administration",
        problem: "Unmanaged Linux servers suffer from security drift, unpatched dependencies, and unoptimized resource allocations.",
        scope: "Single or multi-node Linux environments (Ubuntu/Debian/CentOS).",
        deliverables: [
            "Operating system baseline configuration & package updates",
            "User access controls, SSH key enforcement, and sudo privilege auditing",
            "Systemd service setup, auto-restart triggers, and log rotation policies",
            "Storage volume management and automated backup verification",
        ],
        priceAnchor: "From ₹7,500 / server",
        ctaLabel: "Consult on Server Admin",
        ctaHref: LINKS.calendly,
    },
    {
        id: "server-troubleshooting",
        title: "Server Troubleshooting & Incident RCA",
        problem: "Production servers crash, run out of memory, or exhibit network connectivity drops without a clear diagnostic trail.",
        scope: "Immediate on-demand triage and root cause investigation for live Linux servers.",
        deliverables: [
            "Deep log inspection (syslog, journalctl, dmesg, application logs)",
            "Process memory and CPU bottleneck profiling",
            "Network connectivity, DNS resolution, and port binding diagnostics",
            "Incident post-mortem report with remediation runbook",
        ],
        priceAnchor: "On-demand / Emergency Scope",
        ctaLabel: "Request Troubleshooting",
        ctaHref: LINKS.whatsapp,
    },
    {
        id: "infra-deployment",
        title: "Infrastructure & Docker Deployment",
        problem: "Deploying applications manually leads to configuration inconsistencies and broken environments.",
        scope: "Docker containerization and multi-container environment deployment.",
        deliverables: [
            "Dockerfile and docker-compose.yml architecture",
            "Environment variable isolation and security secret injection",
            "Reverse proxy setup with automatic container health monitoring",
            "Production deploy runbook and rollback plan",
        ],
        priceAnchor: "From ₹10,000 / project",
        ctaLabel: "Discuss Deployment",
        ctaHref: LINKS.calendly,
    },
    {
        id: "nginx-apache",
        title: "Nginx & Apache Web Server Configuration",
        problem: "Misconfigured web servers expose private directories, leak server tokens, or drop requests under traffic spikes.",
        scope: "Web server optimization, reverse proxying, and caching configuration.",
        deliverables: [
            "High-concurrency worker connection & buffer tuning",
            "Virtual hosts / server blocks configuration",
            "Security headers implementation (HSTS, CSP, X-Frame-Options)",
            "Rate limiting and anti-DDoS buffer protections",
        ],
        priceAnchor: "From ₹5,000 / server",
        ctaLabel: "Optimize Web Server",
        ctaHref: LINKS.calendly,
    },
    {
        id: "dns-ssl",
        title: "DNS & SSL/TLS Configuration",
        problem: "Misconfigured DNS records cause email deliverability failures and expired certificates result in browser downtime warnings.",
        scope: "Authoritative DNS record setup and automated TLS certificate lifecycles.",
        deliverables: [
            "A, CNAME, MX, TXT, SPF, DKIM, and DMARC configuration",
            "Automated Let's Encrypt SSL/TLS issuance via Certbot",
            "Zero-downtime certificate auto-renewal cron verification",
            "TLS 1.2/1.3 cipher hardening eliminating deprecated protocols",
        ],
        priceAnchor: "From ₹4,000 / domain",
        ctaLabel: "Configure DNS & SSL",
        ctaHref: LINKS.calendly,
    },
    {
        id: "monitoring-setup",
        title: "Monitoring Setup (Zabbix / Grafana / Prometheus)",
        problem: "Engineering teams find out their infrastructure is down from customers rather than internal monitoring alerts.",
        scope: "Full-stack monitoring architecture deployed across servers and services.",
        deliverables: [
            "Zabbix agent or Prometheus node-exporter deployment",
            "Custom Grafana operational dashboards for CPU, RAM, Disk, and Network",
            "Real-time alerting thresholds routed to Telegram, WhatsApp, or Email",
            "Uptime verification synthetic check integration",
        ],
        priceAnchor: "From ₹12,000 / environment",
        ctaLabel: "Deploy Monitoring",
        ctaHref: LINKS.calendly,
    },
    {
        id: "cyber-assessment",
        title: "Cybersecurity Assessment",
        problem: "Businesses operate without knowing where external adversaries or insider misconfigurations can compromise operations.",
        scope: "Structured 9-area security evaluation of external exposure, access, and server posture.",
        deliverables: [
            "Comprehensive 9-area evaluation across infrastructure assets",
            "Prioritized findings report with severity ratings (Critical, High, Medium, Low)",
            "Remediation roadmap with step-by-step technical instructions",
            "30-minute executive findings walkthrough",
        ],
        priceAnchor: "Essential ₹7,500 / Professional ₹15,000 / Business ₹25,000+",
        ctaLabel: "Book Assessment",
        ctaHref: LINKS.calendly,
    },
    {
        id: "linux-hardening",
        title: "Linux Security Hardening",
        problem: "Default Linux installations leave SSH passwords enabled, unneeded ports open, and lack brute-force defense.",
        scope: "Hands-on hardening applied directly to production or staging Linux hosts.",
        deliverables: [
            "SSH key-only authentication with root login disabled",
            "UFW / iptables strict default-deny ingress firewall configuration",
            "Fail2ban rate-limiting on sensitive daemon ports",
            "Auditd logging and kernel parameter hardening (sysctl.conf)",
        ],
        priceAnchor: "From ₹8,000 / host",
        ctaLabel: "Harden Linux Servers",
        ctaHref: LINKS.calendly,
    },
    {
        id: "infra-security-review",
        title: "Infrastructure Security Review",
        problem: "Cloud VPS, networks, and internal storage lack defined boundaries, exposing sensitive internal data.",
        scope: "Full infrastructure perimeter, access control, and storage boundary review.",
        deliverables: [
            "Network topology and exposed service audit",
            "Database access restrictions and network isolation verification",
            "Backup immutability and recovery testing verification",
            "Incident readiness checklist and action matrix",
        ],
        priceAnchor: "Custom Scope",
        ctaLabel: "Request Review",
        ctaHref: LINKS.calendly,
    },
    {
        id: "technical-consulting",
        title: "Technical Consulting",
        problem: "Founders and IT heads need unbiased engineering expertise before migrating, purchasing, or re-architecting systems.",
        scope: "1-on-1 technical advisory sessions with actionable architectural guidance.",
        deliverables: [
            "Review of proposed infrastructure architecture",
            "Honest tool recommendations (avoiding expensive vendor lock-in)",
            "Written architectural recommendation memorandum",
        ],
        priceAnchor: "Per consultation",
        ctaLabel: "Book Consultation",
        ctaHref: LINKS.calendly,
    },
];

export const WORKFLOW = ["ASSESS", "REPORT", "REMEDIATE", "RE-TEST"] as const;

export const PRIMARY_MESSAGE =
    "Building, securing and troubleshooting Linux, servers, networks and business infrastructure — with hands-on AIOps and automation experience.";

/* ─────────────────────────── Founder Ventures (Secondary) ─────────────────────────── */

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

export const ventures: Venture[] = [
    {
        name: "NITECHSPARK",
        role: "FOUNDER & CEO — CYBERSECURITY & IT INFRASTRUCTURE",
        status: "OPERATIONAL",
        since: "EST. JAN 2026",
        description:
            "Founder-led cybersecurity and IT infrastructure studio: technical assessments, Linux hardening, monitoring setups, and DPDP Act readiness for MSMEs and enterprises. Clear engineering workflow: ASSESS → REPORT → REMEDIATE → RE-TEST.",
        url: LINKS.nitechspark,
        tags: ["CYBERSECURITY", "LINUX HARDENING", "AIOPS", "MSME"],
    },
    {
        name: "NITEHIRE",
        role: "FOUNDER — AI TALENT ATS PLATFORM",
        status: "LIVE",
        since: "LAUNCHED MAY 2026",
        description:
            "AI recruitment platform built by Nithyananthan: 2-level candidate screening (semantic domain evaluation + interactive technical interview), HR Kanban pipelines, and candidate coaching.",
        url: LINKS.nitehire,
        tags: ["AI SCREENING", "ATS", "GROQ SDK", "GEMINI AI"],
    },
    {
        name: "NITEORBIT",
        role: "FOUNDER — SPACE TECH & GROUND SYSTEMS",
        status: "IN DEVELOPMENT",
        statusLabel: "Ground Systems & Telemetry — In Development",
        since: "IN DEVELOPMENT",
        description:
            "Ground-segment DevOps and satellite telemetry tooling in early build; details limited while in development.",
        url: LINKS.niteorbit,
        tags: ["SPACE TECH", "GROUND SYSTEMS", "TELEMETRY", "PRE-LAUNCH"],
    },
];

/* ───────────── Other Projects & Experiments (Secondary Applications) ───────────── */

export interface SecondaryProduct {
    name: string;
    tagline: string;
    problem: string;
    description: string;
    status: "Live" | "Beta" | "Pilot" | "In Development";
    url?: string;
    techStack: string[];
}

export const secondaryProjects: SecondaryProduct[] = [
    {
        name: "SustainHub",
        tagline: "Corporate ESG & Operational Telemetry Helpdesk",
        problem: "Data centers and enterprises lack unified telemetry to track sustainability metrics and internal service tickets.",
        description:
            "Full-stack MVP application integrating real-time telemetry metrics, corporate CSR statistics, and a ticketing helpdesk system.",
        status: "Live",
        url: "https://sustainhub.nitechspark.site",
        techStack: ["React", "Vite", "Tailwind CSS", "PostgreSQL", "Node.js"],
    },
    {
        name: "PropoTrack",
        tagline: "Client Proposal & Contract Pipeline",
        problem: "Proposals and contracts live in scattered spreadsheets with no owner, stage, or follow-up visibility.",
        description:
            "Multi-vendor proposal and contract pipeline tracker with stage milestones, owner assignments, and automated follow-up reminders.",
        status: "Live",
        url: "https://tracker.nitechspark.site",
        techStack: ["React", "Express", "SQLite", "Prisma"],
    },
    {
        name: "NiteHire ATS",
        tagline: "2-Level AI Screening Recruitment Engine",
        problem: "SME recruiters drown in resumes while keyword ATS tools filter for formatting tricks rather than real engineering capability.",
        description:
            "Autonomous recruitment engine featuring Level-1 semantic resume ingestion and Level-2 interactive technical evaluation.",
        status: "Live",
        url: LINKS.nitehire,
        techStack: ["React 19", "Groq Llama 3.3", "Gemini 2.5", "Neon DB"],
    },
    {
        name: "Alone AI (NiteBuddy)",
        tagline: "Vector-Memory AI Companion",
        problem: "Journaling and companion apps forget context between sessions, preventing conversational continuity.",
        description:
            "AI companion engineered with vector memory, mood tracking, reflective journaling, and growth analytics.",
        status: "Beta",
        techStack: ["FastAPI", "Qdrant", "Vector Search", "Gemini AI", "TypeScript"],
    },
    {
        name: "SENTRIYA",
        tagline: "Women & Child Safety Ecosystem",
        problem: "Emergency SOS tools fail in low-bandwidth or disconnected conditions without tamper-proof evidence.",
        description:
            "Real-time safety platform concept with active geofencing, encrypted media capture, and emergency dispatch network integration.",
        status: "In Development",
        techStack: ["Node.js", "WebSockets", "Geo-Fencing", "Encryption"],
    },
    {
        name: "HillSafe",
        tagline: "Mountain Terrain Vehicle Hazard Detection",
        problem: "Hair-pin bends in hilly terrains cause severe accidents due to stationary or stalled vehicles in blind spots.",
        description:
            "Safety and monitoring system designed to detect non-moving vehicles at blind curves in challenging mountain road environments.",
        status: "In Development",
        techStack: ["Python", "Computer Vision", "Sensors", "IoT"],
    },
];

/* Compatibility export for existing components */
export const products = secondaryProjects.map((p, idx) => ({
    number: String(idx + 1).padStart(2, "0"),
    name: p.name,
    category: "ENTERPRISE & SAFETY APPS" as const,
    tagline: p.tagline,
    problem: p.problem,
    description: p.description,
    status: p.status,
    url: p.url,
    techStack: p.techStack,
}));

export const productCount = selectedEngineeringProjects.length + secondaryProjects.length;

/* ─────────────────────────── Credentials Strip ─────────────────────────── */

export const credentials = [
    "DesiCrew Junior AIOps Experience",
    "Cisco Networking Academy Certified",
    "Udyam MSME Registered",
    "Erode, Tamil Nadu",
    "Linux / AIOps / Cybersecurity",
    "Python · Shell · Docker · ELK · Zabbix",
] as const;

export const BADGES = {
    aiops: "AIOPS & LINUX",
    cisco: "CISCO NETACAD",
    erode: "ERODE, TAMIL NADU",
    udyam: "UDYAM MSME",
    est: "EST. 2026",
} as const;

export const META_BADGES = [
    BADGES.aiops,
    BADGES.cisco,
    BADGES.erode,
    BADGES.udyam,
    BADGES.est,
];

/* ─────────────────────────── Offers / Fixed-Scope Packages ─────────────────────────── */

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
];

/* ────────────────── Why Work With Us (Honest Proof) ────────────────── */

export const whyUs = [
    {
        title: "Hands-on engineering delivery",
        body: "Direct engineering work by Nithyananthan Nagarajan with real experience across Linux systems, AIOps telemetry, network security, and production troubleshooting.",
    },
    {
        title: "Udyam MSME registered",
        body: "Government of India Udyam registration for NITECHSPARK. Proper business invoicing, clear documentation, and transparent terms.",
    },
    {
        title: "Written scope + NDA available",
        body: "Every engagement starts with a written scope of work. Confidentiality/NDA signed before any access to servers, code, or networks.",
    },
    {
        title: "Structured 4-step workflow",
        body: "ASSESS → REPORT → REMEDIATE → RE-TEST ensures no finding is left unresolved without measurable verification.",
    },
    {
        title: "Transparent pricing anchors",
        body: "Clear published price anchors — Essential ₹7,500 / Professional ₹15,000 / Business ₹25,000+. No hidden surprises.",
    },
    {
        title: "Erode-based, remote across India",
        body: "Based in Erode, Tamil Nadu. Hands-on on-site work available regionally and high-efficiency remote execution across India.",
    },
] as const;

export const HONEST_BADGE =
    "Building in public — early-stage consulting portfolio. Proof slots stay empty until client engagements happen under mutual NDA.";

export const FOUNDING_SLOTS = 3;

/* ───────────── Case Templates (Illustrative scenarios, not clients) ───────────── */

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
            "Hardening checklist applied: key-only SSH, root login disabled, per-user accounts with sudo audit, shared password retired, UFW reduced to required ports only, fail2ban rate limiting configured.",
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
            "External port scan and certificate inventory run; findings listed with severity; expiry monitoring and a patch/close plan handed over; risky staging service locked down.",
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
            "Personal-data map built (what is stored, where, why), least-privilege access applied, retention/deletion steps written down, and an incident-reporting checklist handed over.",
        outcomeType:
            "Illustrative scenario describing the type of problem fixed — not a client story. No client has engaged yet.",
    },
];

/* ─────────────────────────── Social Proof / Metrics ─────────────────────────── */

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company?: string;
    approved: boolean;
}

export const testimonials: Testimonial[] = testimonialsJson as Testimonial[];

export const metrics = {
    clients: (metricsJson as { clients: number | null }).clients,
    assessmentsSold: (metricsJson as { assessmentsSold: number | null }).assessmentsSold,
    productsShipped: (metricsJson as { productsShipped: number | null }).productsShipped,
    betaUsers: (metricsJson as { betaUsers: number | null }).betaUsers,
};

export function realMetric(value: number | null | undefined): number | null {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/* ─────────────────────────── Press / Boilerplate ─────────────────────────── */

export const BOILERPLATE_50 =
    "Nithyananthan Nagarajan is a Cybersecurity & IT Infrastructure Engineer and the Founder & CEO of NITECHSPARK in Erode, Tamil Nadu. He focuses on building, securing, troubleshooting, and automating real-world Linux, network, and business infrastructure systems.";

export const BOILERPLATE_100 =
    "Nithyananthan Nagarajan is a Cybersecurity & IT Infrastructure Engineer and the Founder & CEO of NITECHSPARK, an Udyam MSME-registered studio based in Erode, Tamil Nadu. With professional engineering experience including Junior AIOps Engineer at DesiCrew Solutions and Cisco Networking Academy achievements, he specializes in Linux administration, server troubleshooting, AIOps monitoring (Zabbix, Prometheus, Grafana, ELK), network security, and infrastructure automation. NITECHSPARK provides hands-on cybersecurity assessments, Linux hardening, and infrastructure consulting following the workflow: ASSESS → REPORT → REMEDIATE → RE-TEST.";

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

export const NITEORBIT_STATUS =
    "Space Ground Systems & Satellite Telemetry — In Development";

export interface Product {
    number: string;
    name: string;
    category?: string;
    tagline?: string;
    problem: string;
    description: string;
    status: string;
    url?: string;
    techStack: string[];
}

export const services: string[] = commercialServices.map((s) => s.title);

export function copyrightYear(): number {
    return new Date().getFullYear();
}
