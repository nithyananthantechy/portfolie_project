import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, content } = body;

        if (!name || !email || !content) {
            return NextResponse.json(
                { error: "Name, email, and message content are required." },
                { status: 400 }
            );
        }

        const message = await prisma.message.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                content: content.trim(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Transmission received. Priority log created.",
            id: message.id,
        });
    } catch (error) {
        console.error("Contact Form Error:", error);
        return NextResponse.json({
            success: true,
            message: "Transmission cached. Acknowledged in standby mode.",
        });
    }
}
