export interface DailyUpdate {
    id: string;
    date: string;
    timestamp: string;
    title: string;
    channel: "CYBER & TECH DISPATCH" | "NSK BUSINESS & MARKET WIRE";
    severity: "CRITICAL" | "OPERATIONAL" | "MILESTONE" | "INTEL";
    summary: string;
    tags: string[];
    actionTakeaway?: string;
}

export const dailyUpdates: DailyUpdate[] = [
    {
        id: "wire-01",
        date: "TODAY // LIVE",
        timestamp: "09:30 IST",
        channel: "CYBER & TECH DISPATCH",
        severity: "CRITICAL",
        title: "Zero-Day Mitigation Advisory: OpenSSH Remote Code Execution & Kernel Hardening",
        summary:
            "NiTechSpark Security Operations has pushed immediate automated kernel parameter hardening patches and SSH key rotation protocols across all client infrastructure clusters.",
        tags: ["CVE Advisory", "OpenSSH", "Zero-Trust", "NiTechSpark"],
        actionTakeaway:
            "Enforce LoginGraceTime=0 and isolate administrative bastion hosts behind WireGuard mesh.",
    },
    {
        id: "wire-02",
        date: "TODAY // LIVE",
        timestamp: "07:15 IST",
        channel: "NSK BUSINESS & MARKET WIRE",
        severity: "MILESTONE",
        title: "NSK Groups Surpasses 12+ Enterprise Products Across 3 Core Subsidiary Holdings",
        summary:
            "Founder & CMD Nithyananthan Nagarajan announces the consolidation of 12 production enterprise web and mobile applications under NiTechSpark, NiteHire, and NiteOrbit portfolios.",
        tags: ["NSK Groups", "Conglomerate", "Holding Portfolio", "Erode HQ"],
        actionTakeaway:
            "Unified executive telemetry dashboard deployed across all production instances.",
    },
    {
        id: "wire-03",
        date: "YESTERDAY",
        timestamp: "18:45 IST",
        channel: "CYBER & TECH DISPATCH",
        severity: "INTEL",
        title: "Llama 3.3 70B & Groq Inference Optimization in NiteHire ATS",
        summary:
            "Achieved 380 tokens/sec evaluation velocity on candidate technical scoring pipeline. Average resume vetting latency dropped to 420ms without accuracy degradation.",
        tags: ["AI ATS", "Groq", "Llama 3.3", "NiteHire", "Performance"],
        actionTakeaway:
            "Implemented vector-memory caching in Qdrant to avoid redundant embedding queries.",
    },
    {
        id: "wire-04",
        date: "11 SEP 2026",
        timestamp: "14:20 IST",
        channel: "NSK BUSINESS & MARKET WIRE",
        severity: "OPERATIONAL",
        title: "NiTechSpark Expands DPDP Act Compliance Audits for Tamil Nadu MSME Startups",
        summary:
            "Onboarded new enterprise cohorts for automated GRC evidence collection using sparkAudit and NiteSentinel, reducing audit turnaround by 78%.",
        tags: ["DPDP Act", "MSME", "Compliance", "Tamil Nadu", "NiTechSpark"],
        actionTakeaway:
            "Free compliance baseline scanning tools opened for regional tech enterprises.",
    },
    {
        id: "wire-05",
        date: "10 SEP 2026",
        timestamp: "11:00 IST",
        channel: "CYBER & TECH DISPATCH",
        severity: "INTEL",
        title: "NiteOrbit Ground Telemetry Station Simulates 10 Gbps Orbital Downlink",
        summary:
            "Successfully validated zero-copy UDP ring buffer pipeline on Linux kernel 6.x. Zero packet loss observed during simulated low-elevation LEO satellite passes.",
        tags: ["NiteOrbit", "Space Tech", "Linux Kernel", "CCSDS", "Telemetry"],
        actionTakeaway:
            "Published preliminary technical whitepaper NSK-TR-2026-03 in the research archive.",
    },
    {
        id: "wire-06",
        date: "08 SEP 2026",
        timestamp: "16:10 IST",
        channel: "NSK BUSINESS & MARKET WIRE",
        severity: "MILESTONE",
        title: "SENTRIYA Mission-Critical Safety App Finalizes WebSockets Geo-Mesh Architecture",
        summary:
            "Integration of real-time SOS cryptographic verification with court-admissible forensic media hashing successfully tested across distributed edge networks.",
        tags: ["SENTRIYA", "Public Safety", "SOS Mesh", "NSK Groups"],
        actionTakeaway:
            "Public beta preparation underway for regional safety organizations.",
    },
];
