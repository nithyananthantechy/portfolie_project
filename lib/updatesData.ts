import { productCount, NITEORBIT_STATUS } from "@/lib/siteData";

export interface DailyUpdate {
    id: string;
    date: string;
    timestamp: string;
    title: string;
    channel: "CYBER & TECH DISPATCH" | "NITECHSPARK BUSINESS & MARKET WIRE";
    severity: "CRITICAL" | "OPERATIONAL" | "MILESTONE" | "INTEL";
    summary: string;
    tags: string[];
    actionTakeaway?: string;
}

export const dailyUpdates: DailyUpdate[] = [
    {
        id: "wire-01",
        date: "BUILD NOTES",
        timestamp: "FLEET",
        channel: "NITECHSPARK BUSINESS & MARKET WIRE",
        severity: "MILESTONE",
        title: `Product fleet now lists ${productCount} applications across cybersecurity, AI and enterprise categories`,
        summary:
            "Every product on /work is computed from the live site data list — status, problem statement and stack stay in one place so counts never drift from reality.",
        tags: ["NITECHSPARK", "Product Fleet", "Build Notes", "Erode HQ"],
        actionTakeaway: "Browse the full problem → solution → status list on /work.",
    },
    {
        id: "wire-02",
        date: "BUILD NOTES",
        timestamp: "NITEORBIT",
        channel: "NITECHSPARK BUSINESS & MARKET WIRE",
        severity: "OPERATIONAL",
        title: NITEORBIT_STATUS,
        summary:
            "NiteOrbit remains pre-launch. Ground-segment and telemetry tooling is in early build; no services are sold from this venture yet.",
        tags: ["NiteOrbit", "Pre-launch", "Space Tech", "Honest Status"],
        actionTakeaway: "Status will change on this site the day the venture ships.",
    },
    {
        id: "wire-03",
        date: "BUILD NOTES",
        timestamp: "NITEHIRE",
        channel: "CYBER & TECH DISPATCH",
        severity: "INTEL",
        title: "NiteHire ATS live with 2-level AI screening",
        summary:
            "NiteHire is live at nitehire.site: Level-1 semantic resume screening plus Level-2 interactive technical evaluation, with HR pipelines and candidate coaching.",
        tags: ["AI ATS", "NiteHire", "Live Product", "Groq", "Gemini"],
        actionTakeaway: "Request a demo of screening levels on your own open roles via the intro call.",
    },
    {
        id: "wire-04",
        date: "BUILD NOTES",
        timestamp: "NITECHSPARK",
        channel: "NITECHSPARK BUSINESS & MARKET WIRE",
        severity: "OPERATIONAL",
        title: "NiTechSpark publishes fixed-scope cyber risk assessment packages",
        summary:
            "Essential ₹7,500 / Professional ₹15,000 / Business ₹25,000+ anchors now appear on this site and nitechspark.site with deliverables and timelines spelled out.",
        tags: ["DPDP Act", "MSME", "Pricing", "NiTechSpark"],
        actionTakeaway: "See full pricing under Services, then book the free 15-min intro call.",
    },
    {
        id: "wire-05",
        date: "BUILD NOTES",
        timestamp: "LEAD MAGNET",
        channel: "CYBER & TECH DISPATCH",
        severity: "INTEL",
        title: "MSME Cyber Risk Self-Check Checklist released as a free 1-page PDF",
        summary:
            "20 yes/no questions covering asset inventory, access, network exposure, patching, backup, monitoring, incident response, privacy and process — free download, no gate.",
        tags: ["Checklist", "MSME", "Cyber Risk", "Lead Magnet"],
        actionTakeaway: "Download from the header, footer or /about — then book a call if the answers worry you.",
    },
    {
        id: "wire-06",
        date: "BUILD NOTES",
        timestamp: "PORTFOLIO",
        channel: "NITECHSPARK BUSINESS & MARKET WIRE",
        severity: "MILESTONE",
        title: "Portfolio rebuilt as a server-rendered sales asset",
        summary:
            "Hero, proof, services, FAQ and contact are server-rendered for shareability. Tamil locale toggle, hreflang, honest metrics and a single primary CTA path are live.",
        tags: ["SEO", "SSR", "i18n", "Conversion", "Honesty"],
        actionTakeaway: "Share /portfolio on WhatsApp or LinkedIn — preview metadata now matches the page.",
    },
];
