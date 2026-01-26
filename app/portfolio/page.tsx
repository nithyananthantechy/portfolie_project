"use client";

import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { useState, useEffect } from "react";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import { useRouter } from "next/navigation";

export default function PortfolioPage() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simulate loading secure data
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
            // Fallback redirect
            router.push("/login");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 font-mono">
                <div className="text-4xl mb-4 animate-bounce">...LOADING SECURE ASSETS...</div>
                <div className="w-64 h-2 bg-gray-900 rounded-full overflow-hidden border border-green-900">
                    <div className="h-full bg-green-500 animate-[width_2s_ease-out_forwards]" style={{ width: '1000%' }}></div>
                </div>
                <MatrixBackground />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-900 selection:text-white pb-20">
            <MatrixBackground />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-900/50 p-4 flex justify-between items-center">
                <div className="font-mono text-neon-green font-bold text-xl">&lt;Nithyananthan /&gt;</div>
                <div className="flex gap-6 text-sm font-mono hidden md:flex text-gray-400">
                    <a href="#about" className="hover:text-neon-green transition-colors">./About</a>
                    <a href="#skills" className="hover:text-neon-green transition-colors">./Skills</a>
                    <a href="#projects" className="hover:text-neon-green transition-colors">./Projects</a>
                    <a href="#contact" className="hover:text-neon-green transition-colors">./Contact</a>
                </div>
                <button
                    onClick={handleLogout}
                    className="border border-red-500 text-red-500 px-4 py-1 text-xs hover:bg-red-500 hover:text-black transition-all"
                >
                    LOGOUT
                </button>
            </nav>

            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center pt-16 relative">
                <div className="text-center z-10 p-4">
                    <h2 className="text-neon-green font-mono mb-2 typing-demo inline-block">Hello, World. I am</h2>
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                        Nithyananthan
                    </h1>
                    <div className="font-mono text-xl md:text-2xl text-blue-400 mb-8 p-2 border-y border-blue-900/50 bg-blue-900/10 inline-block">
                        Linux System Engineer | Cybersecurity | AIOps
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                        <a href="#projects" className="px-8 py-3 bg-neon-green text-black font-bold hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all">
                            VIEW OPERATIONS
                        </a>
                        <a href="https://drive.google.com/file/d/104j49qrPMU9ZuaV0-DQJJ-R7skdtASsx/view" target="_blank" className="px-8 py-3 border border-gray-500 hover:border-white hover:bg-white hover:text-black transition-all">
                            DOWNLOAD RESUME
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-10 animate-bounce text-gray-600">
                    Scroll Down
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-8 max-w-4xl mx-auto border-l-2 border-green-900 ml-4 md:ml-auto md:mr-auto pl-8 my-20">
                <h2 className="text-3xl font-mono text-neon-green mb-8">&gt; whoami</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Linux System Engineer with hands-on experience in Ubuntu, CentOS, and Red Hat systems.
                    Strong background in <span className="text-white font-bold">server hardening</span>, <span className="text-white font-bold">vulnerability assessment</span>, and <span className="text-white font-bold">monitoring & alerting</span>.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                    I am passionate about <span className="text-blue-400">Cybersecurity SOC operations</span> and automating complex infrastructure workflows using Python and Bash. Currently exploring AIOps to bring intelligence to system operations.
                </p>
            </section>

            <SkillsSection />

            <ProjectsSection />

            {/* Experience Timeline */}
            <section id="experience" className="py-20 px-4">
                <h2 className="text-3xl font-mono text-neon-green mb-12 text-center">&gt; SYSTEM_UPTIME (Experience)</h2>
                <div className="max-w-4xl mx-auto border-l border-gray-700 pl-8 space-y-12">
                    <div className="relative">
                        <div className="absolute -left-[38px] w-5 h-5 bg-green-500 rounded-full border-4 border-black"></div>
                        <div className="text-sm text-gray-500 mb-1">2025 - Present</div>
                        <h3 className="text-xl font-bold text-white">Subject Matter Expert - Application Support</h3>
                        <div className="text-blue-400 mb-2">DesiCrew Solutions Pvt Ltd</div>
                        <ul className="list-disc ml-5 text-gray-400 text-sm space-y-1">
                            <li>Leading AIOps-driven automation initiatives.</li>
                            <li>Managing Linux server operations.</li>
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[38px] w-5 h-5 bg-gray-500 rounded-full border-4 border-black"></div>
                        <div className="text-sm text-gray-500 mb-1">2024</div>
                        <h3 className="text-xl font-bold text-white">Technical Support Engineer</h3>
                        <div className="text-blue-400 mb-2">DesiCrew Solutions Pvt Ltd</div>
                        <ul className="list-disc ml-5 text-gray-400 text-sm space-y-1">
                            <li>Monitoring & alerting using Zabbix/ELK.</li>
                            <li>Security audits and compliance.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-4 text-center">
                <h2 className="text-3xl font-mono text-neon-green mb-8">&gt; INITIATE_COMMUNICATION</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                    Ready to secure your infrastructure or automate your operations? Open a secure channel.
                </p>

                <div className="flex justify-center gap-8 text-2xl mb-12 flex-wrap">
                    <a href="https://github.com/nithyananthantechy" target="_blank" className="hover:text-neon-green transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/nithyananthan0462/" target="_blank" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                    <a href="mailto:nithyananthannagarajan092@gmail.com" className="hover:text-red-500 transition-colors">Email</a>
                </div>

                <footer className="text-xs text-gray-600 font-mono border-t border-gray-900 pt-8 mt-20">
                    © {new Date().getFullYear()} NITHYANANTHAN NAGARAJAN. ALL RIGHTS RESERVED.<br />
                    SYSTEM: OPERATIONAL // SECURITY LEVEL: MAX
                </footer>
            </section>
        </div>
    );
}
