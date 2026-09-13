import { NextResponse } from "next/server";

interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}

export async function POST(request: Request) {
    try {
        const { messages, query } = await request.json();
        const userPrompt: string = query || (messages && messages[messages.length - 1]?.content) || "";

        if (!userPrompt.trim()) {
            return NextResponse.json(
                { error: "Query cannot be empty." },
                { status: 400 }
            );
        }

        const lower = userPrompt.toLowerCase();
        let reply = "";

        // Intelligent Domain-Specific Executive Synthesis
        if (lower.includes("nsk") || lower.includes("empire") || lower.includes("company") || lower.includes("holding") || lower.includes("venture")) {
            reply = `**NSK Groups** is a sovereign technology holding conglomerate founded by **Nithyananthan Nagarajan**, headquartered in Erode, Tamil Nadu, India (Udyam MSME Registered).

Under the leadership of Chairman & MD Nithyananthan, NSK Groups governs three primary subsidiary ventures:
1. 🛡️ **NiTechSpark**: Enterprise IT infrastructure, Linux SRE, and zero-trust cybersecurity audits (aligned with DPDP Act 2023 & ISO 27001). [nitechspark.site](https://nitechspark.site)
2. 🤖 **NiteHire**: Autonomous AI recruitment ATS featuring proprietary 2-tier screening (Groq Llama 3.3 + Gemini 2.5) that reduces recruiter overhead by 87%. [nitehire.site](https://nitehire.site)
3. 🛰️ **NiteOrbit**: Space Tech Ground Systems DevOps, satellite telemetry operations, and orbital cybersecurity infrastructure. [niteorbit.space](https://niteorbit.space)

Would you like details on a specific venture or how to partner with the conglomerate?`;
        } else if (lower.includes("nitehire") || lower.includes("ats") || lower.includes("recruitment") || lower.includes("hire") || lower.includes("resume")) {
            reply = `**NiteHire** is NSK Groups' flagship AI recruitment and talent platform architected by Nithyananthan Nagarajan.

**Key Technical Capabilities:**
- **2-Level Autonomous Screening**:
  - *Tier 1*: High-velocity semantic vetting via Groq Llama 3.3 70B (<450ms latency).
  - *Tier 2*: Multi-turn interactive technical evaluation via Gemini 2.5.
- **Anti-Hallucination Guardrails**: Eliminates keyword-stuffing exploits and false credentials.
- **Craft Resume Integration**: Automated ATS resume optimizer for candidates.
- **Production Status**: Live at [nitehire.site](https://nitehire.site).

You can also read Nithyananthan's published research paper on this architecture: *NSK-TR-2026-01*.`;
        } else if (lower.includes("cyber") || lower.includes("security") || lower.includes("nitechspark") || lower.includes("linux") || lower.includes("sre") || lower.includes("dpdp") || lower.includes("zero trust") || lower.includes("audit")) {
            reply = `🛡️ **Enterprise Cybersecurity & Linux SRE Leadership**:

Nithyananthan Nagarajan architects sovereign, military-grade security systems through **NiTechSpark**:
- **Zero-Trust Hardening**: Kernel-level parameter isolation, SELinux/AppArmor enforcement, and eBPF syscall telemetry.
- **DPDP Act 2023 Compliance**: Automated GRC compliance mapping, audit trails, and data sovereignty using **sparkAudit** and **NiteSentinel**.
- **Security Tools Built**:
  - **CyberScan**: Asynchronous network port & SSL certificate vulnerability scanner.
  - **NiteSentinel**: Endpoint security auditor and ISO 27001 compliance mapper.
  - **RCA Engine**: AI-driven root cause incident diagnostics powered by n8n and Llama 3.3.

Direct consultations can be initiated via WhatsApp at **+91 63855 76354**.`;
        } else if (lower.includes("niteorbit") || lower.includes("space") || lower.includes("satellite") || lower.includes("ground") || lower.includes("orbit")) {
            reply = `🛰️ **NiteOrbit (Space Tech & Ground Systems)**:

Founded under NSK Groups, NiteOrbit develops software infrastructure for the New Space economy:
- **Ground Segment DevOps**: Containerized telemetry pipelines handling CCSDS decommutation and Doppler shift corrections in sub-millisecond loops.
- **Orbital Cybersecurity**: Cryptographic verification protocols against RF spoofing and ground station unauthorized access.
- **Technical Paper**: Published as *NSK-TR-2026-03: Resilient Orbital Telemetry Pipelines & Ground Station DevOps in the New Space Economy*.`;
        } else if (lower.includes("product") || lower.includes("fleet") || lower.includes("software") || lower.includes("app")) {
            reply = `Nithyananthan Nagarajan has built and deployed a production fleet of **12+ enterprise platforms**:

1. **PropoTrack**: Sales proposal & corporate contract tracker.
2. **NiteSentinel**: AI endpoint auditor & compliance mapper.
3. **sparkAudit**: Automated GRC evidence hub (NIST / DPDP Act).
4. **CyberScan**: Asynchronous vulnerability & SSL scanner.
5. **NiteHire ATS**: 2-level autonomous AI screening ATS.
6. **Alone AI (NiteBuddy)**: Vector-memory AI companion with Qdrant.
7. **RCA Engine**: AI incident root cause analyzer.
8. **PDF2Excel AI**: High-precision OCR financial pipeline.
9. **SustainHub**: Corporate ESG & telemetry tracker.
10. **SENTRIYA**: Mission-critical emergency SOS mesh.
11. **NSK Connect**: Android C-Suite incident response app.
12. **Craft Resume**: Intelligent ATS resume optimization engine.`;
        } else if (lower.includes("paper") || lower.includes("research") || lower.includes("whitepaper") || lower.includes("publication")) {
            reply = `📚 **Research Publications & Technical Whitepapers**:

Nithyananthan has authored several groundbreaking technical papers under NSK Groups:
- **NSK-TR-2026-01**: *Autonomous 2-Level AI Screening & Non-Hallucinatory ATS Architecture*
- **NSK-TR-2026-02**: *Zero-Trust Linux SRE Hardening & DPDP Act 2023 Compliance Mapping*
- **NSK-TR-2026-03**: *Resilient Orbital Telemetry Pipelines & Ground Station DevOps in New Space*
- **NSK-TR-2026-04**: *Tamper-Proof Cryptographic Telemetry in Low-Bandwidth SOS Networks (SENTRIYA)*

You can browse full abstracts, key findings, and citations in the **Research & Publications** section of this portfolio!`;
        } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("whatsapp") || lower.includes("email") || lower.includes("reach") || lower.includes("partner")) {
            reply = `🤝 **Connect with Chairman & MD Nithyananthan Nagarajan**:

- **Official Headquarters**: NSK Groups, Erode, Tamil Nadu, India
- **Direct WhatsApp**: [+91 63855 76354](https://wa.me/916385576354)
- **Executive Email**: [nithyananthank@gmail.com](mailto:nithyananthank@gmail.com)
- **Official Portals**:
  - Holding: [nskgroups.website](https://nskgroups.website)
  - IT & Cyber: [nitechspark.site](https://nitechspark.site)
  - AI ATS: [nitehire.site](https://nitehire.site)

You can also submit an inquiry directly through the secure transmission portal in the **CONNECT** section below.`;
        } else {
            reply = `Greetings from **NSK Executive Cortex**. I am the digital intelligence advisor representing **Nithyananthan Nagarajan** — Founder, Chairman & Managing Director of **NSK Groups**, and **Enterprise Cybersecurity & Linux SRE Architect**.

How may I assist your inquiry today?
- **[1] Explore the NSK Groups Empire & 3 Core Subsidiaries** (NiTechSpark, NiteHire, NiteOrbit)
- **[2] Cybersecurity, Linux SRE & DPDP Act Compliance Audits**
- **[3] Deep-Dive into the 12+ Production Products Fleet**
- **[4] Research Publications & Whitepapers**
- **[5] Executive Partnership & Direct WhatsApp Channel**`;
        }

        return NextResponse.json({
            success: true,
            reply,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to process query in NSK Cortex engine." },
            { status: 500 }
        );
    }
}
