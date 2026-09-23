import { NextResponse } from "next/server";
import { productCount, NITEORBIT_STATUS, LINKS, BOILERPLATE_100, offers, services, WORKFLOW, PRIMARY_MESSAGE } from "@/lib/siteData";

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

        if (lower.includes("nitechspark") || lower.includes("company") || lower.includes("about") || lower.includes("who") || lower.includes("venture")) {
            reply = `**NITECHSPARK** is a Udyam MSME-registered cybersecurity & IT infrastructure studio founded by **${"Nithyananthan Nagarajan"}** (Founder & CEO), headquartered in Erode, Tamil Nadu, India.

${BOILERPLATE_100}

**Primary message:** ${PRIMARY_MESSAGE}

**Workflow:** ${WORKFLOW.join(" → ")}

Portfolio ventures:
1. **NITECHSPARK**: Cybersecurity assessments, VAPT, hardening, monitoring and DPDP Act readiness. [nitechspark.site](${LINKS.nitechspark})
2. **NiteHire**: AI recruitment ATS with 2-level candidate screening. [nitehire.site](${LINKS.nitehire})
3. **NiteOrbit**: ${NITEORBIT_STATUS}. [niteorbit.space](${LINKS.niteorbit})

Would you like details on a specific service or how to get in touch?`;
        } else if (lower.includes("service") || lower.includes("vapt") || lower.includes("assessment") || lower.includes("penetration")) {
            reply = `**NITECHSPARK services:**

${services.map((s, i) => `${i + 1}. ${s}`).join("\n")}

**Workflow:** ${WORKFLOW.join(" → ")}

${PRIMARY_MESSAGE}

**Price anchors:** ${offers.filter((o) => ["essential", "professional", "business"].includes(o.id)).map((o) => `${o.name.split("—").pop()?.trim()} ${o.price}`).join(" · ")}.

Direct consultations: WhatsApp **${LINKS.phoneDisplay}** or the free intro call.`;
        } else if (lower.includes("nitehire") || lower.includes("ats") || lower.includes("recruitment") || lower.includes("hire") || lower.includes("resume")) {
            reply = `**NiteHire** is an AI recruitment and talent platform architected by Nithyananthan Nagarajan.

**Key capabilities:**
- **2-level screening**: Level-1 semantic resume evaluation (Groq Llama 3.3); Level-2 multi-turn technical evaluation (Gemini 2.5).
- **Recruiter override**: AI scores assist humans — they do not auto-reject.
- **Craft Resume**: ATS resume helper under the same ecosystem.
- **Production status**: Live at [nitehire.site](${LINKS.nitehire}).

Book a demo on your own open roles via the free 15-min intro call.`;
        } else if (lower.includes("cyber") || lower.includes("security") || lower.includes("linux") || lower.includes("sre") || lower.includes("dpdp") || lower.includes("zero trust") || lower.includes("audit")) {
            reply = `**Cybersecurity & Linux/DevOps via NITECHSPARK:**

- **Structured assessment**: assets, access control, network exposure, patching, backup, monitoring, incident response, privacy/DPDP, process.
- **Hardening**: SSH/firewall/user hardening, kernel baselines, monitoring setup.
- **Workflow:** ${WORKFLOW.join(" → ")}
- **Tools built**: CyberScan (ports/SSL), sparkAudit (GRC evidence), NiteSentinel (endpoint auditor, beta), RCA Engine (incident triage, pilot).
- **Price anchors**: ${offers.filter((o) => ["essential", "professional", "business"].includes(o.id)).map((o) => `${o.name.split("—").pop()?.trim()} ${o.price}`).join(" · ")}.

${PRIMARY_MESSAGE}

Direct consultations: WhatsApp **${LINKS.phoneDisplay}** or the free intro call.`;
        } else if (lower.includes("niteorbit") || lower.includes("space") || lower.includes("satellite") || lower.includes("ground") || lower.includes("orbit")) {
            reply = `**NiteOrbit**:

${NITEORBIT_STATUS}

Ground-segment DevOps and satellite telemetry tooling is in early build. No services are sold from this venture yet. Design notes live under Research (NS-TR-2026-03).

Site: [niteorbit.space](${LINKS.niteorbit})`;
        } else if (lower.includes("product") || lower.includes("fleet") || lower.includes("software") || lower.includes("app")) {
            reply = `Nithyananthan has built **${productCount} applications** across cybersecurity, AI and enterprise categories (count from the live product list on /work):

1. PropoTrack — proposal & contract pipeline
2. NiteSentinel (SecureScope) — endpoint auditor (beta)
3. sparkAudit — GRC evidence hub
4. CyberScan — ports & SSL scanner
5. NiteHire ATS — 2-level AI screening
6. Alone AI (NiteBuddy) — vector-memory companion (beta)
7. RCA Engine — incident root-cause helper (pilot)
8. PDF2Excel AI — OCR document pipeline (pilot)
9. SustainHub — ESG metrics tracker
10. SENTRIYA — emergency safety concept (in development)
11. NiteConnect — incident comms Android app (in development)
12. Craft Resume — ATS resume engine (beta)

Full problem → solution → status on **/work**.`;
        } else if (lower.includes("paper") || lower.includes("research") || lower.includes("whitepaper") || lower.includes("publication")) {
            reply = `**Research & technical reports** (internal technical reports, not peer-reviewed journals):

- NS-TR-2026-01: 2-Level AI Screening architecture (NiteHire)
- NS-TR-2026-02: Zero-Trust Linux hardening & DPDP readiness
- NS-TR-2026-03: Orbital telemetry & ground-station design note (pre-launch)
- NS-TR-2026-04: Tamper-evident SOS messaging design note

Browse abstracts under **Research & Publications** on the portfolio.`;
        } else if (lower.includes("contact") || lower.includes("whatsapp") || lower.includes("email") || lower.includes("reach") || lower.includes("partner") || lower.includes("hire")) {
            reply = `**Connect with Nithyananthan Nagarajan:**

- **Headquarters**: NITECHSPARK, Erode, Tamil Nadu, India
- **WhatsApp**: [${LINKS.phoneDisplay}](${LINKS.whatsapp})
- **Email**: [${LINKS.email}](mailto:${LINKS.email})
- **LinkedIn**: [profile](${LINKS.linkedin})
- **Book a call**: [calendly](${LINKS.calendly})

Portals: [nitechspark.site](${LINKS.nitechspark}) · [nitehire.site](${LINKS.nitehire})`;
        } else {
            reply = `Greetings from **NITECHSPARK Cortex** — the portfolio assistant for **Nithyananthan Nagarajan**, Founder & CEO of **NITECHSPARK**.

${PRIMARY_MESSAGE}

How may I help?
- **[1]** NITECHSPARK services (assess → report → remediate → re-test)
- **[2]** Cybersecurity, Linux/DevOps & DPDP assessments
- **[3]** The ${productCount}-product fleet on /work
- **[4]** Research & technical reports
- **[5]** Contact, WhatsApp & booking a call`;
        }

        return NextResponse.json({
            success: true,
            reply,
            timestamp: new Date().toISOString(),
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to process query in NITECHSPARK Cortex engine." },
            { status: 500 }
        );
    }
}
