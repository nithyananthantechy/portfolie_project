export interface ResearchPaper {
    id: string;
    refId: string;
    title: string;
    subtitle: string;
    date: string;
    category: "CYBERSECURITY & ZERO-TRUST" | "AI & ATS ARCHITECTURE" | "SPACE TECH & SRE" | "ENTERPRISE PROTOCOLS";
    abstract: string;
    authors: string[];
    organization: string;
    tags: string[];
    readTime: string;
    /** Real download count — 0 means not yet tracked (UI hides when 0). */
    downloadsCount: number;
    /** Real citation count — 0 means not yet cited (UI hides when 0). */
    citationsCount: number;
    keyFindings: string[];
    downloadUrl: string;
    bibtex: string;
}

/**
 * Internal technical reports written as engineering documentation, not peer-reviewed
 * papers. Counts start at 0 until real tracking exists. No fabricated experiment stats.
 */
export const researchPapers: ResearchPaper[] = [
    {
        id: "autonomous-ai-ats-screening",
        refId: "NS-TR-2026-01",
        title: "Autonomous 2-Level AI Screening & Non-Hallucinatory Evaluation Protocols in Enterprise ATS",
        subtitle: "Technical Architecture and Implementation Methodology for NiteHire Engine",
        date: "JUNE 2026",
        category: "AI & ATS ARCHITECTURE",
        abstract:
            "Modern applicant tracking systems suffer from superficial keyword-matching and inconsistent LLM-assisted resume parsing. This report documents the architecture of NiteHire's 2-tier screening engine: Level-1 parses semantic domain alignment using low-latency Groq Llama 3.3 models, while Level-2 executes multi-turn technical and communication verification via Gemini 2.5 with grounded checks. The design prioritises explainable scoring, candidate privacy, and recruiter override — without claiming benchmark superiority that has not been measured on production traffic.",
        authors: ["Nithyananthan Nagarajan (Founder & CEO, NITECHSPARK)", "NITECHSPARK Research Core"],
        organization: "NITECHSPARK · AI Systems Directorate",
        tags: ["AI ATS", "LLM Evaluation", "Groq Llama 3.3", "Gemini AI", "Anti-Hallucination", "NiteHire"],
        readTime: "14 min read",
        downloadsCount: 0,
        citationsCount: 0,
        keyFindings: [
            "Hierarchical 2-level evaluation limits hallucinated scoring versus single-pass prompts.",
            "Role-aware rubrics improve scoring consistency over one static prompt.",
            "Zero-data retention caching keeps candidate data out of long-lived model logs.",
        ],
        downloadUrl: "#",
        bibtex: `@article{nagarajan2026ats,
  title={Autonomous 2-Level AI Screening and Non-Hallucinatory Evaluation Protocols in Enterprise ATS},
  author={Nagarajan, Nithyananthan},
  journal={NITECHSPARK Technical Reports},
  volume={TR-2026-01},
  year={2026}
}`,
    },
    {
        id: "zero-trust-linux-hardening-dpdp",
        refId: "NS-TR-2026-02",
        title: "Zero-Trust Linux SRE Hardening & Automated DPDP Act 2023 Compliance for Critical Infrastructure",
        subtitle: "A Pragmatic Framework for SMEs and Sovereign IT Deployments",
        date: "MARCH 2026",
        category: "CYBERSECURITY & ZERO-TRUST",
        abstract:
            "India's Digital Personal Data Protection (DPDP) Act 2023 imposes statutory obligations on data fiduciaries regarding security safeguards, breach handling, and purpose limitation. This report introduces NiTechSpark's hardening standard for Linux enterprise servers: AppArmor/SELinux policy baselines, eBPF syscall tracing for anomaly detection, and append-only audit-log structures for evidence integrity. It is written as an implementation checklist for MSME environments rather than a certification claim.",
        authors: ["Nithyananthan Nagarajan (Founder, NiTechSpark)"],
        organization: "NITECHSPARK Cybersecurity Division",
        tags: ["Zero-Trust", "Linux Hardening", "DPDP Act", "eBPF", "GRC Compliance", "NiTechSpark"],
        readTime: "18 min read",
        downloadsCount: 0,
        citationsCount: 0,
        keyFindings: [
            "Kernel hardening baselines (kptr_restrict, dmesg_restrict, bpf disable) close common post-exploit paths.",
            "eBPF tracing surfaces unexpected listen sockets and privilege escalations with low overhead.",
            "Automated evidence collection shortens audit prep versus spreadsheet-only workflows.",
        ],
        downloadUrl: "#",
        bibtex: `@article{nagarajan2026zerotrust,
  title={Zero-Trust Linux SRE Hardening and Automated DPDP Act 2023 Compliance for Critical Infrastructure},
  author={Nagarajan, Nithyananthan},
  journal={NiTechSpark Security Research},
  volume={SEC-2026-02},
  year={2026}
}`,
    },
    {
        id: "orbital-ground-systems-devops",
        refId: "NS-TR-2026-03",
        title: "Resilient Orbital Telemetry Pipelines & Ground Station DevOps in the New Space Economy",
        subtitle: "Ground Infrastructure Cybersecurity & Asynchronous Packet Processing",
        date: "JANUARY 2026",
        category: "SPACE TECH & SRE",
        abstract:
            "As commercial satellite constellations expand in Low Earth Orbit (LEO), ground-segment software faces high telemetry volume, latency variance, and RF-related attack surface. This design note outlines the systems architecture planned for NiteOrbit (venture still in development): an asynchronous, containerized ground-segment pipeline using UDP sockets for Doppler handling, CCSDS-style packet decommutation, and cryptographic handshake verification. Numbers here describe design targets, not field measurements.",
        authors: ["Nithyananthan Nagarajan (Lead Architect, NiteOrbit)"],
        organization: "NiteOrbit Ground Labs · NITECHSPARK",
        tags: ["Space Tech", "Orbital Telemetry", "Ground Systems", "LEO Satellites", "CCSDS", "NiteOrbit"],
        readTime: "22 min read",
        downloadsCount: 0,
        citationsCount: 0,
        keyFindings: [
            "Zero-copy ring buffers are the right primitive for burst telemetry on commodity Linux.",
            "Ground-node time sync discipline matters more than raw clock speed for decommutation.",
            "Pre-launch documentation keeps architecture reviewable without over-claiming readiness.",
        ],
        downloadUrl: "#",
        bibtex: `@article{nagarajan2026orbital,
  title={Resilient Orbital Telemetry Pipelines and Ground Station DevOps in the New Space Economy},
  author={Nagarajan, Nithyananthan},
  journal={NiteOrbit Research Proceedings},
  volume={SP-2026-03},
  year={2026}
}`,
    },
    {
        id: "sentriya-cryptographic-sos-telemetry",
        refId: "NS-TR-2026-04",
        title: "Tamper-Proof Cryptographic Telemetry & Low-Bandwidth Real-Time Emergency SOS Networks",
        subtitle: "Mission-Critical Human Safety Infrastructure Architecture",
        date: "AUGUST 2025",
        category: "ENTERPRISE PROTOCOLS",
        abstract:
            "Emergency panic-alert applications often fail under network throttling, GPS spoofing, or device compromise. This report documents the engineering approach behind the SENTRIYA concept (in development): hybrid WebSockets with SMS and peer-to-peer fallback for signed SOS payloads, plus hash-based tamper evidence for captured audio/video. It is an architecture note for a product still being built — not a deployment case study.",
        authors: ["Nithyananthan Nagarajan", "Safety Systems Taskforce"],
        organization: "NITECHSPARK · Safety Technologies",
        tags: ["SENTRIYA", "Emergency SOS", "Cryptography", "Tamper-Proof", "WebSockets", "Mesh Network"],
        readTime: "11 min read",
        downloadsCount: 0,
        citationsCount: 0,
        keyFindings: [
            "Multi-path delivery (WebSocket → SMS → P2P) reduces single-network failure modes.",
            "Content hashes give investigators a verifiable chain for captured media.",
            "Payload compression keeps SOS coordinates inside a single small datagram.",
        ],
        downloadUrl: "#",
        bibtex: `@article{nagarajan2025sentriya,
  title={Tamper-Proof Cryptographic Telemetry and Low-Bandwidth Real-Time Emergency SOS Networks},
  author={Nagarajan, Nithyananthan},
  journal={NITECHSPARK Applied Protocols},
  volume={ENG-2025-04},
  year={2025}
}`,
    },
];
