import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import * as jose from "jose";

async function verifyAdmin() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return null;

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jose.jwtVerify(token, secret);
        if (payload.role === "ADMIN") {
            return payload;
        }
    } catch {
        return null;
    }
    return null;
}

export async function GET() {
    try {
        const admin = await verifyAdmin();
        if (!admin) {
            return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
        }

        const messages = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, messages: messages || [] });
    } catch (error: any) {
        console.error("Fetch messages error:", error);
        return NextResponse.json(
            { success: false, error: error?.message || "Database connection error", messages: [] },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const admin = await verifyAdmin();
        if (!admin) {
            return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "Message ID is required" }, { status: 400 });
        }

        await prisma.message.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Transmission log purged" });
    } catch (error: any) {
        console.error("Delete message error:", error);
        return NextResponse.json({ success: false, error: error?.message || "Failed to purge record" }, { status: 500 });
    }
}
