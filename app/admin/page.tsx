"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/dashboard");
    }, [router]);

    return (
        <div
            className="min-h-screen flex items-center justify-center font-orbitron text-neon/50 text-sm tracking-wider"
            style={{ background: "var(--bg)" }}
        >
            REDIRECTING...
        </div>
    );
}
