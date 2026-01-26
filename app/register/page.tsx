"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        category: "STUDENT",
        jobRole: "",
        degree: "",
        adminCode: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Determine Role
        // If adminCode is provided, try to register as ADMIN
        const payload = { ...form, role: form.adminCode ? "ADMIN" : "VISITOR" };


        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/portfolio");
                router.refresh();
            } else {
                // Show detailed error if available, else standard error
                setError(data.details || data.error || "Registration failed");
            }
        } catch (err: any) {
            // Try to show more info if possible
            setError(err?.message || "System Malfunction. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-mono p-4">
            <div className="z-10 w-full max-w-lg p-8 bg-black/80 border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.2)] backdrop-blur-sm">
                <h2 className="text-3xl text-neon-green mb-6 text-center animate-pulse">
                    &gt; NEW_USER_REGISTRATION
                </h2>

                {error && (
                    <div className="bg-red-900/20 border border-red-500 text-red-400 p-3 mb-4 text-sm">
                        [ERROR]: {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Identity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">$ fullname</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">$ email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Classification */}
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">$ user_category</label>
                        <select
                            className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                            <option value="STUDENT">Student / Learner</option>
                            <option value="PROFESSIONAL">Working Professional</option>
                        </select>
                    </div>

                    {/* Conditional Logic */}
                    {form.category === "PROFESSIONAL" && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-gray-400 text-sm mb-1">$ job_role</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none"
                                placeholder="e.g. System Admin"
                                value={form.jobRole}
                                onChange={(e) => setForm({ ...form, jobRole: e.target.value })}
                            />
                        </div>
                    )}

                    {form.category === "STUDENT" && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-gray-400 text-sm mb-1">$ degree / course</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none"
                                placeholder="e.g. B.Tech CS"
                                value={form.degree}
                                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                            />
                        </div>
                    )}

                    {/* Security */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">$ password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">$ confirm</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-black border border-gray-700 p-2 text-green-400 focus:border-neon-green focus:outline-none"
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Admin Code - Optional hidden feature or explicit */}
                    {/* Making it explicit but optional for "Admin Registration" */}
                    <div>
                        <label className="block text-gray-500 text-xs mb-1">$ admin_override_code (optional)</label>
                        <input
                            type="password"
                            className="w-full bg-black/50 border border-gray-800 p-1 text-gray-500 text-sm focus:border-red-500 focus:outline-none"
                            placeholder="Authorization Code"
                            value={form.adminCode}
                            onChange={(e) => setForm({ ...form, adminCode: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neon-green/10 border border-neon-green text-neon-green py-2 hover:bg-neon-green hover:text-black transition-all font-bold tracking-wider mt-4"
                    >
                        {loading ? "Registering..." : "INITIATE_PROTOCOL [REGISTER]"}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <Link href="/login" className="hover:text-neon-green underline">
                        &gt; Already Authorized? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
