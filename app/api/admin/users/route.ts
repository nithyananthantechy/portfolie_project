import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ success: false, error: "Unauthorized: No active session" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jose.jwtVerify(token, secret);

        if (payload.role !== "ADMIN") {
            return NextResponse.json({ success: false, error: "Forbidden: Admin clearance required" }, { status: 403 });
        }

        // Fetch real registered users from database
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
            orderBy: { createdAt: "desc" },
        });

        // Fetch real visit count
        const visitCount = await prisma.visitLog.count();

        return NextResponse.json({
            success: true,
            users: users || [],
            stats: { visitCount: visitCount || users.length },
        });
    } catch (error: any) {
        console.error("Admin Users API Error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || "Failed to retrieve database records",
                users: [],
                stats: { visitCount: 0 },
            },
            { status: 500 }
        );
    }
}
