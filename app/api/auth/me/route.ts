import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jose.jwtVerify(token, secret);

        return NextResponse.json({
            success: true,
            user: {
                userId: payload.userId,
                role: payload.role,
                email: payload.email,
            },
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }
}
