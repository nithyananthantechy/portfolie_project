"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Terminal } from "lucide-react";

const projects = [
    {
        title: "Linux Server Health Dashboard",
        tech: ["Python", "Docker", "InfluxDB"],
        description: "Real-time monitoring dashboard tracking CPU, Memory, and Disk I/O metrics across distributed Linux clusters.",
        link: "https://github.com/nithyananthantechy"
    },
    {
        title: "Monitoring Stack Implementation",
        tech: ["Zabbix", "ELK Stack", "Grafana"],
        description: "Deployed comprehensive monitoring solution for enterprise infrastructure, reducing downtime by 40%.",
        link: "https://github.com/nithyananthantechy"
    },
    {
        title: "Cybersecurity Lab Environment",
        tech: ["VirtualBox", "Kali", "Metasploitable"],
        description: "Simulated vulnerability assessments and DoS attacks to hardened network security protocols.",
        link: "https://github.com/nithyananthantechy"
    },
    {
        title: "WiFi Automation Script",
        tech: ["Python", "NetworkManager"],
        description: "Automated wlan0 interface configuration and credential management for rapid deployment.",
        link: "https://github.com/nithyananthantechy"
    }
];

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 px-4 bg-black">
            <h2 className="text-3xl font-mono text-neon-green mb-12 text-center">
                &gt; DEPLOYED_OPERATIONS
            </h2>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-black border border-gray-800 p-8 hover:border-blue-500 transition-colors duration-300 group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Terminal size={100} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                <a href={project.link} target="_blank" className="text-gray-500 hover:text-white transition-colors">
                                    <Github />
                                </a>
                            </div>

                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-gray-900 border border-gray-700 text-xs text-green-500 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
