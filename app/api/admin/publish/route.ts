import { NextResponse } from "next/server";
import * as jose from "jose";
import { getAllBlogs, addBlog, getAllPapers, addPaper, getAllUpdates, addUpdate } from "@/lib/publishedStore";

async function verifyAdmin(request: Request): Promise<boolean> {
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) return false;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
        const { payload } = await jose.jwtVerify(token, secret);
        return payload.role === "ADMIN";
    } catch {
        return false;
    }
}

export async function GET(request: Request) {
    return NextResponse.json({
        success: true,
        blogs: getAllBlogs(),
        papers: getAllPapers(),
        updates: getAllUpdates(),
    });
}

export async function POST(request: Request) {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
        return NextResponse.json(
            { error: "Unauthorized. Admin session token required." },
            { status: 401 }
        );
    }

    try {
        const { type, data } = await request.json();

        if (type === "blog") {
            const newBlog = {
                id: `blog-${Date.now()}`,
                slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                title: data.title,
                excerpt: data.excerpt || data.content.slice(0, 160) + "...",
                content: data.content,
                date: data.date || "JUST NOW",
                readTime: data.readTime || `${Math.max(1, Math.ceil(data.content.split(" ").length / 200))} min read`,
                category: data.category || "EMPIRE & LEADERSHIP",
                tags: Array.isArray(data.tags) ? data.tags : data.tags.split(",").map((t: string) => t.trim()),
                author: {
                    name: "Nithyananthan Nagarajan",
                    role: "Founder, Chairman & MD · NSK Groups",
                    avatar: "/favicon.svg",
                },
                featured: Boolean(data.featured),
            };
            const updated = addBlog(newBlog);
            return NextResponse.json({ success: true, item: newBlog, total: updated.length });
        }

        if (type === "paper") {
            const newPaper = {
                id: `paper-${Date.now()}`,
                refId: data.refId || `NSK-TR-2026-0${Date.now().toString().slice(-2)}`,
                title: data.title,
                subtitle: data.subtitle || "Technical Architecture Specification",
                date: data.date || "SEPTEMBER 2026",
                category: data.category || "CYBERSECURITY & ZERO-TRUST",
                abstract: data.abstract,
                authors: data.authors || ["Nithyananthan Nagarajan (CMD, NSK Groups)"],
                organization: data.organization || "NSK Groups · Research Directorate",
                tags: Array.isArray(data.tags) ? data.tags : data.tags.split(",").map((t: string) => t.trim()),
                readTime: data.readTime || "15 min read",
                downloadsCount: 0,
                citationsCount: 0,
                keyFindings: Array.isArray(data.keyFindings)
                    ? data.keyFindings
                    : data.keyFindings.split("\n").map((s: string) => s.trim()).filter(Boolean),
                downloadUrl: data.downloadUrl || "#",
                bibtex: `@article{nagarajan${Date.now()},
  title={${data.title}},
  author={Nagarajan, Nithyananthan},
  journal={NSK Groups Technical Proceedings},
  year={2026}
}`,
            };
            const updated = addPaper(newPaper);
            return NextResponse.json({ success: true, item: newPaper, total: updated.length });
        }

        if (type === "update") {
            const newUpdate = {
                id: `update-${Date.now()}`,
                date: "TODAY // LIVE",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " IST",
                channel: data.channel || "CYBER & TECH DISPATCH",
                severity: data.severity || "OPERATIONAL",
                title: data.title,
                summary: data.summary,
                tags: Array.isArray(data.tags) ? data.tags : data.tags.split(",").map((t: string) => t.trim()),
                actionTakeaway: data.actionTakeaway,
            };
            const updated = addUpdate(newUpdate);
            return NextResponse.json({ success: true, item: newUpdate, total: updated.length });
        }

        return NextResponse.json({ error: "Unknown publication type" }, { status: 400 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Failed to publish item." }, { status: 500 });
    }
}
