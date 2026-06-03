import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Public paths
    if (pathname === "/" || pathname === "/login" || pathname === "/register" || pathname.startsWith("/api/auth")) {
        // If user is already logged in and tries to access login/register, redirect to portfolio
        if (token && (pathname === "/login" || pathname === "/register" || pathname === "/")) {
            try {
                const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
                await jose.jwtVerify(token, secret);
                // If valid, redirect to portfolio
                return NextResponse.redirect(new URL("/portfolio", request.url));
            } catch (e) {
                // Invalid token, allow access to login
            }
        }
        return NextResponse.next();
    }

    // Protected paths
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jose.jwtVerify(token, secret);

        // Admin Protection
        if (pathname.startsWith("/admin") && payload.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/portfolio", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // Token invalid or expired
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
    }
}

export const config = {
    matcher: ["/", "/login", "/register", "/portfolio/:path*", "/admin/:path*"],
};
