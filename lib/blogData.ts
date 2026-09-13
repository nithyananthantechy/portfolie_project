export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    category: "EMPIRE & LEADERSHIP" | "CYBERSECURITY" | "LINUX SRE & DEVOPS" | "AI ENGINEERING";
    tags: string[];
    author: {
        name: string;
        role: string;
        avatar: string;
    };
    featured?: boolean;
}

export const blogPosts: BlogPost[] = [
    {
        id: "sovereign-technology-empire-blueprint",
        slug: "sovereign-technology-empire-blueprint",
        title: "Building a Sovereign Technology Empire from Erode: The NSK Groups Blueprint",
        excerpt:
            "How we architected a multi-venture conglomerate governing enterprise cybersecurity, autonomous AI recruitment, and orbital ground systems from Tamil Nadu, India.",
        date: "SEPTEMBER 2026",
        readTime: "7 min read",
        category: "EMPIRE & LEADERSHIP",
        tags: ["NSK Groups", "Executive Leadership", "Venture Building", "MSME Tech", "India"],
        featured: true,
        author: {
            name: "Nithyananthan Nagarajan",
            role: "Founder, Chairman & Managing Director · NSK Groups",
            avatar: "/favicon.svg",
        },
        content: `
### The Sovereign Vision

When I founded **NSK Groups** in Erode, Tamil Nadu, the conventional advice was to either move to a tier-1 metropolitan tech hub or build a single narrow software tool. Both paradigms ignore the compounding advantage of building a sovereign, vertically aligned enterprise conglomerate.

A technology holding company must not merely exist on paper; it must govern real, operational systems that solve existential problems for businesses and societies.

### The Three Pillars of the NSK Empire

1. **NiTechSpark (The Defensive Shield & Infrastructure)**: Enterprise IT cannot survive on reactive ticketing. We built NiTechSpark to deliver zero-trust Linux server administration, continuous vulnerability telemetry, and compliance mapping under the DPDP Act 2023.
2. **NiteHire (The Autonomous Workforce Engine)**: Traditional recruitment is crippled by bias, keyword manipulation, and sluggish response times. NiteHire brings 2-level autonomous AI screening to automate hiring pipelines with extreme precision.
3. **NiteOrbit (The Frontier Frontier)**: As the global New Space economy surges, resilient ground station DevOps and orbital cybersecurity telemetry become critical sovereign infrastructure.

### The MSME Advantage

Holding an official **Udyam MSME Registration** has grounded our engineering philosophy: create lean, resilient, high-margin software systems that operate without bloated burn rates. Sovereign tech is built on cash-flow discipline and uncompromising architectural depth.
        `,
    },
    {
        id: "modern-linux-zero-trust-hardening",
        slug: "modern-linux-zero-trust-hardening",
        title: "Modern Linux Zero-Trust Hardening: What Most SRE Teams Overlook",
        excerpt:
            "Beyond basic UFW firewall rules and SSH keys: deep kernel parameter isolation, eBPF telemetry, and immutable filesystem integrity.",
        date: "AUGUST 2026",
        readTime: "9 min read",
        category: "CYBERSECURITY",
        tags: ["Linux Hardening", "Zero-Trust", "Kernel Security", "eBPF", "SRE", "NiTechSpark"],
        featured: true,
        author: {
            name: "Nithyananthan Nagarajan",
            role: "Enterprise Cybersecurity & Linux SRE Architect",
            avatar: "/favicon.svg",
        },
        content: `
### The Illusion of the Perimeter

Most production Linux servers in production environments operate under a false assumption: that the external cloud firewall or load balancer provides adequate protection. Once an attacker establishes an edge foothold via a web vulnerability or dependency exploit, the internal server environment is shockingly permissive.

### Crucial Kernel Hardening Parameters

At **NiTechSpark**, every Linux node under our governance undergoes low-level kernel isolation before handling enterprise workloads:

- **Restricting Kernel Pointer Leaks**: \`kernel.kptr_restrict = 2\`
- **Restricting dmesg Access**: \`kernel.dmesg_restrict = 1\`
- **eBPF Hardening**: \`kernel.unprivileged_bpf_disabled = 1\`
- **TCP SYN Cookie Protection**: \`net.ipv4.tcp_syncookies = 1\`
- **IP Spoofing Protection**: \`net.ipv4.conf.all.rp_filter = 1\`

### Real-Time Behavioral Guardrails with eBPF

Traditional auditd logs produce immense noise. Using lightweight eBPF hooks allows real-time trapping of suspicious \`execve\` syscalls, unauthorized listening sockets, and attempted privilege escalations without degrading server throughput.
        `,
    },
    {
        id: "why-keyword-ats-is-dead",
        slug: "why-keyword-ats-is-dead",
        title: "Why Keyword-Based ATS Is Dead: Engineering Autonomous AI Evaluation in NiteHire",
        excerpt:
            "How we engineered a 2-tier screening architecture using Groq Llama 3.3 and Gemini 2.5 to eliminate resume hallucination and recruiter fatigue.",
        date: "JULY 2026",
        readTime: "8 min read",
        category: "AI ENGINEERING",
        tags: ["NiteHire", "AI Recruitment", "Groq", "Gemini AI", "ATS", "HR Tech"],
        featured: false,
        author: {
            name: "Nithyananthan Nagarajan",
            role: "Founder & Lead Architect · NiteHire",
            avatar: "/favicon.svg",
        },
        content: `
### The Flaw of Traditional Resume Screening

Candidates have learned to beat legacy ATS software by stuffing white-font keywords or prompting ChatGPT to rewrite their resumes to match every job description bullet. The result is recruiters receiving 500 'perfect' resumes, 90% of which cannot pass a basic architectural whiteboard interview.

### The NiteHire 2-Level Screening Engine

In building **NiteHire**, I separated candidate evaluation into two non-overlapping, mathematically grounded tiers:

1. **Level-1 Semantic Ingestion (Groq Llama 3.3 70B)**: Real-time parsing of project complexity, timeline coherence, and technical depth rather than raw keyword frequencies. Latency stays under 450ms.
2. **Level-2 Interactive Dynamic Screening (Gemini 2.5 Multi-Modal)**: Interactive candidate interview where the AI adapts questions based on the candidate's previous responses, actively checking for genuine experiential depth.

This ensures companies hire true technical builders rather than prompt-engineering resume spammers.
        `,
    },
    {
        id: "practical-dpdp-act-2023-guide",
        slug: "practical-dpdp-act-2023-guide",
        title: "Defending Micro-Enterprises: Practical DPDP Act 2023 Implementation Guide",
        excerpt:
            "Statutory obligations, consent managers, and automated GRC telemetry pipelines for Indian startups and tech founders.",
        date: "JUNE 2026",
        readTime: "6 min read",
        category: "CYBERSECURITY",
        tags: ["DPDP Act 2023", "Compliance", "sparkAudit", "Data Privacy", "GRC"],
        featured: false,
        author: {
            name: "Nithyananthan Nagarajan",
            role: "Founder & CMD · NSK Groups",
            avatar: "/favicon.svg",
        },
        content: `
### What the DPDP Act Demands from Data Fiduciaries

India's Digital Personal Data Protection Act 2023 is no longer a theoretical debate; statutory enforcement introduces penalties up to ₹250 Crores for failing to take reasonable security safeguards.

### Three Non-Negotiables for Tech Founders:

1. **Purpose Limitation & Clear Notice**: Every database column storing personal identifiers must be mapped to an explicit business consent event.
2. **Automated Incident Logging**: Security breaches must be detectable and documentable in under 6 hours. This is why we built **sparkAudit** and **NiteSentinel**.
3. **Immutability of Audit Trails**: Deletion requests must cascade through cache layers, backups, and analytical pipelines.
        `,
    },
    {
        id: "satellite-ground-devops-future",
        slug: "satellite-ground-devops-future",
        title: "From Ground DevOps to Orbit: Cybersecurity Challenges in New Space Telemetry",
        excerpt:
            "Exploring the intersection of containerized Linux infrastructure and Low Earth Orbit satellite command-and-control with NiteOrbit.",
        date: "MAY 2026",
        readTime: "10 min read",
        category: "LINUX SRE & DEVOPS",
        tags: ["NiteOrbit", "Space Tech", "Telemetry", "DevOps", "Cybersecurity", "LEO"],
        featured: false,
        author: {
            name: "Nithyananthan Nagarajan",
            role: "Lead Architect · NiteOrbit",
            avatar: "/favicon.svg",
        },
        content: `
### The New Space Reality

Space is no longer solely the domain of sovereign government agencies. Private constellations in Low Earth Orbit (LEO) demand modern cloud-native DevOps principles: zero-downtime rolling upgrades, automated RF switchovers, and encrypted telemetry pipelines.

At **NiteOrbit**, we are pioneering ground systems software that treats orbital passes with the exact same automated reliability engineering principles that power global high-frequency trading platforms.
        `,
    },
];
