"use client";

import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { useEffect, useState } from "react";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
            <MatrixBackground />

            <div className="z-10 text-center max-w-3xl border border-green-500/30 bg-black/80 p-12 backdrop-blur-md shadow-[0_0_50px_rgba(0,255,0,0.1)]">
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 border-2 border-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-tighter mb-4 font-mono">
                    CLASSIFIED PORTFOLIO
                </h1>

                <p className="text-xl md:text-2xl text-red-500 font-mono mb-8 animate-pulse">
                    [ ACCESS RESTRICTED: AUTHORIZATION REQUIRED ]
                </p>

                <p className="text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
                    You are attempting to access the secure portfolio of <span className="text-white font-bold">Nithyananthan Nagarajan</span>.
                    Please identify yourself to proceed to the classified data sections regarding Linux Systems, Cybersecurity Operations, and AIOps Intelligence.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                    <Link
                        href="/login"
                        className="group relative px-8 py-3 bg-transparent overflow-hidden border border-green-500 text-green-500 font-bold hover:text-black hover:bg-green-500 transition-all duration-300"
                    >
                        <span className="relative z-10">&gt; EXECUTE LOGIN_</span>
                    </Link>

                    <Link
                        href="/register"
                        className="group relative px-8 py-3 bg-transparent overflow-hidden border border-blue-500 text-blue-500 font-bold hover:text-black hover:bg-blue-500 transition-all duration-300"
                    >
                        <span className="relative z-10">&gt; NEW_VISITOR_REGISTRATION_</span>
                    </Link>
                </div>

                <div className="mt-16 text-xs text-gray-600 font-mono">
                    SECURE CONNECTION ESTABLISHED: {mounted ? "TRUE" : "..."} <br />
                    IP LOGGING ENABLED. ALL VISITS ARE TRACKED.
                </div>
            </div>
        </main>
    );
}
