import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import * as jose from "jose";

export async function GET(req: Request) {
    try {
        // Verify Admin Access again (double check)
        // In real app, middleware handles it, but good to be safe
        const headersList = await headers();
        const tokens = headersList.get("cookie")?.split("; ");
        const token = tokens?.find((row: string) => row.startsWith("token="))?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);

        if (payload.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                category: true,
                jobRole: true,
                degree: true,
                createdAt: true,
                lastActive: true,
            },
            orderBy: { createdAt: 'desc' }
        });
        const visitCount = await prisma.visitLog.count();

        return NextResponse.json({ success: true, users, stats: { visitCount } });

    } catch (error) {
        console.error("Admin API Error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: String(error)
        }, { status: 500 });
    }
}
