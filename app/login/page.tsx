"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            // Read raw text first to handle non-JSON responses (like 500 HTML errors)
            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse JSON response:", text);
                throw new Error("Server communication error. (Received non-JSON response)");
            }

            if (data.success) {
                router.push("/portfolio");
                router.refresh();
            } else {
                setError(data.details || data.error || data.message || "Login failed");
            }
        } catch (err: any) {
            setError(err?.message || "System Malfunction. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-mono">
            {/* Background handled in RootLayout actually, but if we need specific override */}

            <div className="z-10 w-full max-w-md p-8 bg-black/80 border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.2)] backdrop-blur-sm">
                <h2 className="text-3xl text-neon-green mb-6 text-center animate-pulse">
                    &gt; AUTHENTICATE_USER
                </h2>

                {error && (
                    <div className="bg-red-900/20 border border-red-500 text-red-400 p-3 mb-4 text-sm">
                        [ERROR]: {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">$ username / email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all"
                            placeholder="user@system.local"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">$ password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all"
                            placeholder="********"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-900/20 border border-green-500 text-neon-green py-2 hover:bg-green-500 hover:text-black transition-all font-bold tracking-wider mt-4"
                    >
                        {loading ? "Decrypting..." : "ACCESS GRANTED [LOGIN]"}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <Link href="/register" className="hover:text-neon-green underline">
                        &gt; New User? Initialize Registration
                    </Link>
                </div>
            </div>
        </div>
    );
}
