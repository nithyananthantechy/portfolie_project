import { NextResponse } from "next/server";
import * as jose from "jose";
import path from "path";
import fs from "fs";

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

export async function POST(request: Request) {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
        return NextResponse.json(
            { error: "Unauthorized. Admin session token required." },
            { status: 401 }
        );
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No image file provided." }, { status: 400 });
        }

        // Validate MIME type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
            "image/avif",
        ];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: `Unsupported image format (${file.type}). Allowed: JPG, PNG, WEBP, GIF, SVG, AVIF.` },
                { status: 400 }
            );
        }

        // Limit size to 10MB
        const maxBytes = 10 * 1024 * 1024;
        if (file.size > maxBytes) {
            return NextResponse.json(
                { error: "File exceeds 10MB upload limit." },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Ensure public/uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Generate sanitized unique filename
        const safeOriginalName = file.name
            .toLowerCase()
            .replace(/[^a-z0-9.]/g, "-")
            .replace(/-+/g, "-");
        const uniqueFilename = `proj-${Date.now()}-${safeOriginalName}`;
        const filePath = path.join(uploadsDir, uniqueFilename);

        await fs.promises.writeFile(filePath, buffer);

        const publicUrl = `/uploads/${uniqueFilename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename: uniqueFilename,
            size: file.size,
        });
    } catch (e: any) {
        console.error("Upload error:", e);
        return NextResponse.json(
            { error: e.message || "Failed to process image upload." },
            { status: 500 }
        );
    }
}
