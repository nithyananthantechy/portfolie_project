"use client";

import { motion } from "framer-motion";

const skills = {
    "Linux & Servers": ["Ubuntu", "CentOS", "Red Hat", "Server Hardening", "Patch Management", "User Permissions"],
    "Cybersecurity": ["Vulnerability Assessment", "Log Analysis", "Incident Response", "Security Baselines", "ISC2 Candidate"],
    "DevOps & Automation": ["Python", "Bash", "PowerShell", "Docker", "AIOps Automation", "Git & GitHub"],
    "Monitoring & Net": ["Zabbix", "ELK Stack", "Syslog", "TCP/IP", "DNS", "Firewalls"]
};

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 px-4">
            <h2 className="text-3xl font-mono text-neon-green mb-12 text-center decoration-wavy underline decoration-blue-500">
                &gt; SYSTEM_CAPABILITIES
            </h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(skills).map(([category, items], idx) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-900/50 border border-gray-700 hover:border-green-500 p-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] group"
                    >
                        <h3 className="text-xl font-bold text-blue-400 mb-4 group-hover:text-neon-green transition-colors">
                            {category}
                        </h3>
                        <ul className="space-y-2">
                            {items.map(skill => (
                                <li key={skill} className="flex items-center text-gray-400 text-sm">
                                    <span className="text-green-500 mr-2">➜</span>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
