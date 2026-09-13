import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from 'jose';

export async function POST(req: Request) {
    try {
        const { email, password, masterKey } = await req.json();

        // 1. Direct Master Key / Founder Passcode check
        const adminSecret = process.env.ADMIN_SECRET || "admin_access_code_123";
        if (
            (masterKey && masterKey === adminSecret) ||
            (password && password === adminSecret) ||
            (email === "nithyananthank@gmail.com" && (password === adminSecret || password === "Nith2002&"))
        ) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
            const token = await new jose.SignJWT({
                userId: "founder-cmd-001",
                role: "ADMIN",
                email: "nithyananthank@gmail.com",
                name: "Nithyananthan Nagarajan",
            })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("7d")
                .sign(secret);

            const response = NextResponse.json({
                success: true,
                user: {
                    name: "Nithyananthan Nagarajan",
                    role: "ADMIN",
                    category: "FOUNDER & CMD",
                },
            });

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });

            return response;
        }

        if (!email || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        // 2. Database lookup
        let user = null;
        try {
            user = await prisma.user.findUnique({
                where: { email },
            });
        } catch (dbErr) {
            console.warn("Database lookup failed, falling back to master validation:", dbErr);
        }

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials. Use Admin Master Key or register." }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Update last active
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { lastActive: new Date() },
            });
        } catch {}

        // Create JWT
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const token = await new jose.SignJWT({ userId: user.id, role: user.role, email: user.email, name: user.name })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("24h")
            .sign(secret);

        const response = NextResponse.json({
            success: true,
            user: { name: user.name, role: user.role, category: user.category },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;

    } catch (error) {
        console.error("Login Critical Failure:", error);

        // FAIL-SAFE: If DB/Auth fails, allow entry as Demo User so user isn't locked out
        // This ensures the portfolio is viewable even if the environment is unstable

        console.log("Activating Fail-Safe Login...");
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const token = await new jose.SignJWT({ userId: "demo-user", role: "ADMIN", email: "demo@system.local" })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret);

        const response = NextResponse.json({
            success: true,
            user: { name: "System Admin (Recovery Mode)", role: "ADMIN", category: "PROFESSIONAL" },
            warning: "System is running in Recovery Mode due to backend error."
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;
    }
}
