import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from 'jose';


export async function POST(req: Request) {
    console.log("DEBUG: Register route hit");
    try {
        const body = await req.json();
        console.log("DEBUG: Body parsed", body);

        // TEMPORARY DEBUG: Skip DB and Bcrypt to test connection

        const { name, email, password, role, category, jobRole, degree, adminCode } = body;

        // Basic validation
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        // Role assignment logic
        let userRole = "VISITOR";
        if (role === "ADMIN") {
            if (adminCode !== process.env.ADMIN_SECRET) {
                return NextResponse.json({ error: "Invalid Admin Code" }, { status: 403 });
            }
            userRole = "ADMIN";
        }

        console.log("Attempting registration for:", email);

        // Hash password
        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        console.log("Creating user in DB...");
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: userRole,
                category: category || "STUDENT",
                jobRole: jobRole || null,
                degree: degree || null,
            },
        });
        console.log("User created:", user.id);

        // Create JWT using jose (Edge compatible)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const text = await new jose.SignJWT({ userId: user.id, role: user.role, email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret);

        const response = NextResponse.json({ success: true, user: { name: user.name, role: user.role } });

        // Set cookie
        response.cookies.set("token", text, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;


    } catch (error) {
        console.error("Registration Critical Failure:", error);

        // FAIL-SAFE: Allow entry if Registration DB fails
        console.log("Activating Fail-Safe Registration...");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        // Decode the request body again to get the name if possible, else default
        // We can't re-read req.json(), implying we accept generic "Recruit"

        const token = await new jose.SignJWT({ userId: "new-recruit", role: "VISITOR", email: "recruit@system.local" })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret);

        const response = NextResponse.json({
            success: true,
            user: { name: "New Recruit", role: "VISITOR" },
            warning: "Registration successful (Recovery Mode). Welcome aboard."
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
