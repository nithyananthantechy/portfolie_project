import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const path = body?.path || "/portfolio";

        await prisma.visitLog.create({
            data: {
                path,
                userAgent: req.headers.get("user-agent") || undefined,
            },
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: true });
    }
}
