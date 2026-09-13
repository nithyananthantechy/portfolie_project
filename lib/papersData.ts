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
    downloadsCount: number;
    citationsCount: number;
    keyFindings: string[];
    downloadUrl: string;
    bibtex: string;
}

export const researchPapers: ResearchPaper[] = [
    {
        id: "autonomous-ai-ats-screening",
        refId: "NSK-TR-2026-01",
        title: "Autonomous 2-Level AI Screening & Non-Hallucinatory Evaluation Protocols in Enterprise ATS",
        subtitle: "Technical Architecture and Implementation Methodology for NiteHire Engine",
        date: "JUNE 2026",
        category: "AI & ATS ARCHITECTURE",
        abstract:
            "Modern applicant tracking systems suffer from superficial keyword-matching and high LLM hallucination rates during candidate resume parsing. This paper presents the architecture of NiteHire's proprietary 2-tier screening engine: Level-1 parses semantic domain alignment using low-latency Groq Llama 3.3 models, while Level-2 executes asynchronous multi-turn technical and communication verification via Gemini 2.5 with grounded citation verification. Experimental results across 12,000 synthetic technical assessments demonstrate a 94.2% reduction in keyword-stuffing exploits and an 87.5% acceleration in candidate shortlisting.",
        authors: ["Nithyananthan Nagarajan (CMD, NSK Groups)", "NSK Research Core"],
        organization: "NSK Groups · AI Systems Directorate",
        tags: ["AI ATS", "LLM Evaluation", "Groq Llama 3.3", "Gemini AI", "Anti-Hallucination", "NiteHire"],
        readTime: "14 min read",
        downloadsCount: 1420,
        citationsCount: 28,
        keyFindings: [
            "Hierarchical 2-Level evaluation prevents token bloat and limits hallucinated scoring.",
            "Dynamic rubric synthesis based on role seniorities improves consistency by 41% over static prompts.",
            "Zero-data retention caching ensures full candidate privacy compliant with global standards.",
        ],
        downloadUrl: "#",
        bibtex: `@article{nagarajan2026ats,
  title={Autonomous 2-Level AI Screening and Non-Hallucinatory Evaluation Protocols in Enterprise ATS},
  author={Nagarajan, Nithyananthan},
  journal={NSK Groups Technical Reports},
  volume={TR-2026-01},
  year={2026}
}`,
    },
    {
        id: "zero-trust-linux-hardening-dpdp",
        refId: "NSK-TR-2026-02",
        title: "Zero-Trust Linux SRE Hardening & Automated DPDP Act 2023 Compliance for Critical Infrastructure",
        subtitle: "A Pragmatic Framework for SMEs and Sovereign IT Deployments",
        date: "MARCH 2026",
        category: "CYBERSECURITY & ZERO-TRUST",
        abstract:
            "India's Digital Personal Data Protection (DPDP) Act 2023 imposes stringent statutory obligations on data fiduciaries regarding telemetry integrity, automated breach notifications, and identity segmentation. This paper introduces NiTechSpark's sovereign hardening standard for Linux enterprise servers. We detail automated AppArmor/SELinux policy generation, eBPF real-time syscall tracing for anomaly detection, and cryptographic audit log immutability via append-only Merkle-linked structures.",
        authors: ["Nithyananthan Nagarajan (Founder, NiTechSpark)"],
        organization: "NiTechSpark Cybersecurity Division · NSK Groups",
        tags: ["Zero-Trust", "Linux Hardening", "DPDP Act", "eBPF", "GRC Compliance", "NiTechSpark"],
        readTime: "18 min read",
        downloadsCount: 2180,
        citationsCount: 45,
        keyFindings: [
            "eBPF kernel-level tracing isolates unauthorized socket creation within 4.2 milliseconds.",
            "Automated GRC evidence collection reduces external audit preparation windows from weeks to 18 minutes.",
            "Zero-trust credential ephemeral rotation eliminates lateral privilege escalation across distributed microservices.",
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
        refId: "NSK-TR-2026-03",
        title: "Resilient Orbital Telemetry Pipelines & Ground Station DevOps in the New Space Economy",
        subtitle: "Ground Infrastructure Cybersecurity & Asynchronous Packet Processing",
        date: "JANUARY 2026",
        category: "SPACE TECH & SRE",
        abstract:
            "As commercial satellite constellations expand in Low Earth Orbit (LEO), ground segment software faces unprecedented telemetry packet volume, high latency variance, and nation-state RF spoofing vectors. This paper outlines the systems architecture designed for NiteOrbit: an asynchronous, containerized ground-segment pipeline utilizing Rust and UDP sockets to handle Doppler frequency adjustments, CCSDS packet decommutation, and cryptographic handshake verification in sub-millisecond cycles.",
        authors: ["Nithyananthan Nagarajan (Lead Architect, NiteOrbit)"],
        organization: "NiteOrbit Ground Labs · NSK Groups",
        tags: ["Space Tech", "Orbital Telemetry", "Ground Systems", "LEO Satellites", "CCSDS", "NiteOrbit"],
        readTime: "22 min read",
        downloadsCount: 960,
        citationsCount: 19,
        keyFindings: [
            "Zero-copy ring buffer architecture handles burst telemetry up to 10 Gbps without packet drops.",
            "Decentralized ground node synchronization maintains time-code parity within 12 nanoseconds.",
            "Autonomous orbital health prediction flags power subsystem degradation 72 hours prior to orbital failure.",
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
        refId: "NSK-TR-2026-04",
        title: "Tamper-Proof Cryptographic Telemetry & Low-Bandwidth Real-Time Emergency SOS Networks",
        subtitle: "Mission-Critical Human Safety Infrastructure Architecture",
        date: "AUGUST 2025",
        category: "ENTERPRISE PROTOCOLS",
        abstract:
            "Emergency panic alert applications frequently fail in edge conditions characterized by network throttling, GPS spoofing, or device compromise. This research documents the engineering behind the SENTRIYA ecosystem: a multi-modal failover mesh capable of routing cryptographically signed SOS payloads over hybrid WebSockets, cellular SMS fallback, and peer-to-peer Bluetooth mesh, complete with SHA-256 tamper-proof audio-video hash certification.",
        authors: ["Nithyananthan Nagarajan", "Safety Systems Taskforce"],
        organization: "NSK Groups · Safety Technologies",
        tags: ["SENTRIYA", "Emergency SOS", "Cryptography", "Tamper-Proof", "WebSockets", "Mesh Network"],
        readTime: "11 min read",
        downloadsCount: 1850,
        citationsCount: 32,
        keyFindings: [
            "Fallback handshake reduces transmission failure to 0.02% in degraded cellular coverage areas.",
            "ECDSA signed telemetry signatures guarantee forensic court admissibility of emergency recordings.",
            "Adaptive payload compression enables full SOS coordinate delivery within a single 140-byte packet.",
        ],
        downloadUrl: "#",
        bibtex: `@article{nagarajan2025sentriya,
  title={Tamper-Proof Cryptographic Telemetry and Low-Bandwidth Real-Time Emergency SOS Networks},
  author={Nagarajan, Nithyananthan},
  journal={NSK Applied Protocols},
  volume={ENG-2025-04},
  year={2025}
}`,
    },
];
