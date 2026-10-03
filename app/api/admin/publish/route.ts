import { NextResponse } from "next/server";
import * as jose from "jose";
import {
    getAllBlogs,
    addBlog,
    getAllPapers,
    addPaper,
    getAllUpdates,
    addUpdate,
    getAllProjects,
    addProject,
    deleteProject,
} from "@/lib/publishedStore";
import { EngineeringProject } from "@/lib/siteData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    try {
        const [blogs, papers, updates, projects] = await Promise.all([
            getAllBlogs(),
            getAllPapers(),
            getAllUpdates(),
            getAllProjects(),
        ]);

        return NextResponse.json(
            {
                success: true,
                blogs,
                papers,
                updates,
                projects,
            },
            {
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0",
                },
            }
        );
    } catch (e: any) {
        return NextResponse.json(
            { error: e.message || "Failed to load published content" },
            { status: 500 }
        );
    }
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

        if (type === "project") {
            const safeId = data.id || `proj-${Date.now()}-${(data.name || "item").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10)}`;
            const techList = Array.isArray(data.techStack)
                ? data.techStack
                : typeof data.techStack === "string"
                ? data.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
                : [];

            const rawImages: string[] = Array.isArray(data.images)
                ? data.images.map((s: any) => String(s).trim()).filter(Boolean)
                : typeof data.images === "string"
                ? data.images.split(",").map((s: string) => s.trim()).filter(Boolean)
                : [];

            if (data.image && typeof data.image === "string" && data.image.trim() && !rawImages.includes(data.image.trim())) {
                rawImages.unshift(data.image.trim());
            }

            const primaryImage = rawImages[0] || (data.image ? String(data.image).trim() : undefined);

            const newProject: EngineeringProject = {
                id: safeId,
                name: data.name,
                problem: data.problem || "",
                whatIBuilt: data.whatIBuilt || "",
                techStack: techList.length > 0 ? techList : ["Full Stack", "TypeScript"],
                engineeringFocus: data.engineeringFocus || "Full Stack",
                status: data.status || "Completed",
                githubUrl: data.githubUrl ? data.githubUrl.trim() : undefined,
                demoUrl: data.demoUrl ? data.demoUrl.trim() : undefined,
                isPrivate: Boolean(data.isPrivate),
                privateNote: data.privateNote ? data.privateNote.trim() : undefined,
                image: primaryImage,
                images: rawImages.length > 0 ? rawImages : undefined,
            };

            const updatedProjects = await addProject(newProject);
            return NextResponse.json(
                {
                    success: true,
                    item: newProject,
                    total: updatedProjects.length,
                    projects: updatedProjects,
                },
                {
                    headers: {
                        "Cache-Control": "no-store, no-cache, must-revalidate",
                    },
                }
            );
        }

        if (type === "blog") {
            const newBlog = {
                id: `blog-${Date.now()}`,
                slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                title: data.title,
                excerpt: data.excerpt || data.content.slice(0, 160) + "...",
                content: data.content,
                date: data.date || "JUST NOW",
                readTime: data.readTime || `${Math.max(1, Math.ceil(data.content.split(" ").length / 200))} min read`,
                category: data.category || "FOUNDER & LEADERSHIP",
                tags: Array.isArray(data.tags) ? data.tags : data.tags.split(",").map((t: string) => t.trim()),
                author: {
                    name: "Nithyananthan Nagarajan",
                    role: "Founder & CEO · NITECHSPARK",
                    avatar: "/favicon.svg",
                },
                featured: Boolean(data.featured),
            };
            const updated = await addBlog(newBlog);
            return NextResponse.json({ success: true, item: newBlog, total: updated.length, blogs: updated });
        }

        if (type === "paper") {
            const newPaper = {
                id: `paper-${Date.now()}`,
                refId: data.refId || `NS-TR-2026-0${Date.now().toString().slice(-2)}`,
                title: data.title,
                subtitle: data.subtitle || "Technical Architecture Specification",
                date: data.date || "SEPTEMBER 2026",
                category: data.category || "CYBERSECURITY & ZERO-TRUST",
                abstract: data.abstract,
                authors: data.authors || ["Nithyananthan Nagarajan (Founder & CEO, NITECHSPARK)"],
                organization: data.organization || "NITECHSPARK · Research Directorate",
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
  journal={NITECHSPARK Technical Proceedings},
  year={2026}
}`,
            };
            const updated = await addPaper(newPaper);
            return NextResponse.json({ success: true, item: newPaper, total: updated.length, papers: updated });
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
            const updated = await addUpdate(newUpdate);
            return NextResponse.json({ success: true, item: newUpdate, total: updated.length, updates: updated });
        }

        return NextResponse.json({ error: "Unknown publication type" }, { status: 400 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Failed to publish item." }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
        return NextResponse.json(
            { error: "Unauthorized. Admin session token required." },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");
        const id = searchParams.get("id");

        if (!type || !id) {
            return NextResponse.json({ error: "Missing type or id query param." }, { status: 400 });
        }

        if (type === "project") {
            const updated = await deleteProject(id);
            return NextResponse.json({ success: true, projects: updated });
        }

        return NextResponse.json({ error: "Unsupported deletion type." }, { status: 400 });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Failed to delete item." }, { status: 500 });
    }
}
