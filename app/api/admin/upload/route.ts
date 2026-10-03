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
        const files: File[] = [];

        // Collect all files from "files" and "file" fields
        const multiFiles = formData.getAll("files");
        for (const entry of multiFiles) {
            if (entry instanceof File && entry.size > 0) {
                files.push(entry);
            }
        }

        const singleFiles = formData.getAll("file");
        for (const entry of singleFiles) {
            if (entry instanceof File && entry.size > 0 && !files.includes(entry)) {
                files.push(entry);
            }
        }

        if (files.length === 0) {
            return NextResponse.json({ error: "No image file provided." }, { status: 400 });
        }

        // Validate MIME types
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
            "image/avif",
        ];

        const maxBytes = 15 * 1024 * 1024; // 15MB limit per file

        // Ensure public/uploads directory exists
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const uploadedUrls: string[] = [];
        const uploadedFiles: Array<{ url: string; filename: string; size: number }> = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json(
                    {
                        error: `File "${file.name}" has unsupported format (${file.type}). Allowed: JPG, PNG, WEBP, GIF, SVG, AVIF.`,
                    },
                    { status: 400 }
                );
            }

            if (file.size > maxBytes) {
                return NextResponse.json(
                    { error: `File "${file.name}" exceeds 15MB upload limit.` },
                    { status: 400 }
                );
            }

            const buffer = Buffer.from(await file.arrayBuffer());

            // Generate sanitized unique filename
            const safeOriginalName = file.name
                .toLowerCase()
                .replace(/[^a-z0-9.]/g, "-")
                .replace(/-+/g, "-");
            const uniqueFilename = `proj-${Date.now()}-${i}-${safeOriginalName}`;
            const filePath = path.join(uploadsDir, uniqueFilename);

            await fs.promises.writeFile(filePath, buffer);

            const publicUrl = `/uploads/${uniqueFilename}`;
            uploadedUrls.push(publicUrl);
            uploadedFiles.push({
                url: publicUrl,
                filename: uniqueFilename,
                size: file.size,
            });
        }

        return NextResponse.json({
            success: true,
            url: uploadedUrls[0],
            urls: uploadedUrls,
            files: uploadedFiles,
            count: uploadedFiles.length,
        });
    } catch (e: any) {
        console.error("Upload error:", e);
        return NextResponse.json(
            { error: e.message || "Failed to process image upload." },
            { status: 500 }
        );
    }
}
