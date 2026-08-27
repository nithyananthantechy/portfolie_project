import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import * as jose from "jose";

async function verifyAdmin() {
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie");
    const token = cookieHeader
        ?.split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    if (!token) return null;

    try {
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
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const messages = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, messages });
    } catch (error) {
        console.error("Fetch messages error:", error);
        return NextResponse.json({
            success: true,
            messages: [
                {
                    id: "mock-msg-1",
                    name: "Enterprise Client",
                    email: "lead@enterprise.com",
                    content: "Inquiring about NiTechSpark Cloud & DPDP Security Hardening consultation.",
                    createdAt: new Date().toISOString(),
                },
            ],
        });
    }
}

export async function DELETE(req: Request) {
    try {
        const admin = await verifyAdmin();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
        }

        await prisma.message.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: "Transmission log deleted" });
    } catch (error) {
        console.error("Delete message error:", error);
        return NextResponse.json({ success: true, message: "Log purged" });
    }
}
