"use client";

import { motion } from "framer-motion";
import { Server, Activity, Shield, Code2 } from "lucide-react";

const skillDomains = [
    {
        title: "Infrastructure & DevOps",
        icon: Server,
        skills: [
            "Linux (Ubuntu, Parrot OS, Kali)",
            "Docker & KVM Virtualization",
            "Nginx & PM2",
            "Shell Scripting & PowerShell",
            "Vercel, Railway, Render",
            "SSL/Domain Configuration",
            "Server Management",
        ],
    },
    {
        title: "Monitoring & Observability",
        icon: Activity,
        subtitle: "AIOps",
        skills: [
            "Prometheus & Grafana",
            "ELK Stack",
            "Loki & Promtail",
            "PRTG Network Monitor",
            "Syslog Management",
            "Alerting Pipelines",
        ],
    },
    {
        title: "Cybersecurity",
        icon: Shield,
        skills: [
            "Security Auditing",
            "Vulnerability Assessment",
            "DPDP Act 2023",
            "ISO 27001 & SOC 2",
            "Penetration Testing",
            "SSL/TLS Hardening",
            "DEFCON Community (DCG Kovai)",
        ],
    },
    {
        title: "Development & AI Stack",
        icon: Code2,
        skills: [
            "Python (Flask)",
            "React 19 + Vite",
            "Node.js + Express",
            "PostgreSQL & Prisma ORM",
            "Groq SDK, Gemini API, Claude API",
            "n8n Automation",
            "JWT, Tailwind CSS, Framer Motion",
        ],
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const skillVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
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
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        TECHNICAL SKILLS
                    </h2>
                    <p className="text-text-primary/40 text-sm font-mono mt-4">
                        {">"} Hard-won, hands-on expertise — not a keyword dump
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 tilt-card-parent"
                >
                    {skillDomains.map((domain) => {
                        const Icon = domain.icon;
                        return (
                            <motion.div
                                key={domain.title}
                                variants={cardVariants}
                                className="glass-card rounded-lg p-5 group tilt-card"
                            >
                                {/* Icon + Title */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded border flex items-center justify-center transition-all duration-300 group-hover:border-neon/40 group-hover:bg-neon/5"
                                        style={{ borderColor: "rgba(0,245,196,0.15)" }}>
                                        <Icon size={18} className="text-neon/60 group-hover:text-neon transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-orbitron text-xs font-bold text-white tracking-wide">
                                            {domain.title}
                                        </h3>
                                        {domain.subtitle && (
                                            <span className="text-[10px] font-mono text-accent/60">
                                                {domain.subtitle}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Skills list with cascade */}
                                <motion.ul
                                    variants={containerVariants}
                                    className="space-y-1.5"
                                >
                                    {domain.skills.map((skill, si) => (
                                        <motion.li
                                            key={skill}
                                            variants={skillVariants}
                                            transition={{ delay: si * 0.05 }}
                                            className="flex items-center text-text-primary/50 text-sm group/item hover:text-text-primary/80 transition-colors"
                                        >
                                            <span className="text-neon/40 mr-2 text-xs group-hover/item:text-neon transition-colors">
                                                ▹
                                            </span>
                                            {skill}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
