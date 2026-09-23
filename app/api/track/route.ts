import { NextResponse } from "next/server";

/**
 * Privacy-friendly conversion event log.
 * Stores nothing identifying — event name + small props + path.
 * Dashboard: Vercel Analytics (project → Analytics) and `vercel logs`.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const name = String(body?.name || "unknown").slice(0, 64);
        const path = String(body?.path || "").slice(0, 256);
        const props = body?.props && typeof body.props === "object" ? body.props : {};

        // Structured line for log-based dashboards / weekly digest greps.
        console.log(
            JSON.stringify({
                kind: "ns_event",
                name,
                path,
                props,
                d: new Date().toISOString().slice(0, 10),
            })
        );

        return new NextResponse(null, { status: 204 });
    } catch {
        return new NextResponse(null, { status: 204 });
    }
}
