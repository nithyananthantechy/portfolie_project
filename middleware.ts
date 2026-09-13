import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin-only protected studio & dashboard routes
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
            const { payload } = await jose.jwtVerify(token, secret);
            if (payload.role !== "ADMIN") {
                return NextResponse.redirect(new URL("/admin/login", request.url));
            }
        } catch {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // ALL OTHER ROUTES ARE COMPLETELY PUBLIC:
    // Anyone entering the URL directly opens the portfolio, blogs, papers, etc.
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
