"use client";

import { motion } from "framer-motion";
import { Server, Activity, Shield, Code2, Cpu, Database, Cloud } from "lucide-react";

const skillDomains = [
    {
        title: "Linux & Cloud Infrastructure",
        icon: Server,
        category: "DEVOPS & SRE",
        skills: [
            { name: "Linux Administration (Ubuntu, Parrot, Kali, Debian)", level: 95 },
            { name: "Docker Containerization & KVM Virtualization", level: 90 },
            { name: "Nginx Reverse Proxy, PM2 & SSL/TLS Hardening", level: 92 },
            { name: "Bash & PowerShell Automation Scripting", level: 88 },
            { name: "Cloud Deployments (Railway, Render, Vercel, AWS VPS)", level: 85 },
        ],
    },
    {
        title: "Monitoring & Observability",
        icon: Activity,
        category: "AIOPS & TELEMETRY",
        skills: [
            { name: "Prometheus & Grafana Dashboard Telemetry", level: 90 },
            { name: "ELK Stack (Elasticsearch, Logstash, Kibana)", level: 85 },
            { name: "Loki, Promtail & Centralized Syslog", level: 86 },
            { name: "PRTG Network Monitoring & Alerting Pipelines", level: 88 },
            { name: "AI Root Cause Analysis (RCA Engine + n8n)", level: 92 },
        ],
    },
    {
        title: "Cybersecurity & Governance",
        icon: Shield,
        category: "ZERO-TRUST & GRC",
        skills: [
            { name: "DPDP Act 2023 Compliance & Privacy Engineering", level: 94 },
            { name: "ISO 27001 & SOC 2 Readiness Auditing", level: 88 },
            { name: "Vulnerability Assessment & Network Penetration Testing", level: 86 },
            { name: "sparkAudit Automated GRC Evidence Collection", level: 92 },
            { name: "DEFCON Community Member (DCG Kovai Chapter)", level: 95 },
        ],
    },
    {
        title: "AI Stack & Fullstack Software",
        icon: Code2,
        category: "APPLICATIONS & LLMS",
        skills: [
            { name: "Python (Flask, FastAPI, Data Pipelines, OCR)", level: 92 },
            { name: "React 19, Next.js, Vite & Tailwind CSS", level: 90 },
            { name: "Groq SDK, Gemini API & Claude 3.5 Automation", level: 94 },
            { name: "PostgreSQL, Neon Serverless & Prisma ORM", level: 88 },
            { name: "Qdrant Vector Database & Memory Orchestration", level: 85 },
        ],
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                        <span className="text-xs font-mono text-neon tracking-widest uppercase">
                            SYSTEM CAPABILITIES
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        TECHNICAL ARSENAL
                    </h2>
                    <p className="text-text-primary/40 text-xs sm:text-sm font-mono mt-3">
                        {">"} Battle-tested infrastructure engineering, cybersecurity, and production AI architectures.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    {skillDomains.map((domain, index) => {
                        const Icon = domain.icon;
                        return (
                            <motion.div
                                key={domain.title}
                                variants={cardVariants}
                                className="glass-card rounded-2xl p-6 sm:p-7 border border-neon/15 hover:border-neon/30 transition-all duration-300 backdrop-blur-xl relative overflow-hidden group"
                                style={{ background: "rgba(3, 7, 18, 0.75)" }}
                            >
                                {/* Top Edge Glow */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl border border-neon/30 bg-neon/5 flex items-center justify-center text-neon">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-orbitron font-bold text-lg text-white">
                                                {domain.title}
                                            </h3>
                                            <span className="text-[10px] font-mono text-neon/70 tracking-widest">
                                                {domain.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3.5">
                                    {domain.skills.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between text-xs font-mono mb-1.5">
                                                <span className="text-text-primary/75">{skill.name}</span>
                                                <span className="text-neon/70 font-semibold">{skill.level}%</span>
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-panel/80 overflow-hidden border border-neon/10">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="h-full rounded-full bg-gradient-to-r from-neon via-cyan-400 to-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
