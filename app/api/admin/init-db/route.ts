import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET(req: Request) {
    try {
        // Create tables using raw PostgreSQL if they do not exist
        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "User" (
                "id" TEXT PRIMARY KEY,
                "name" TEXT NOT NULL,
                "email" TEXT UNIQUE NOT NULL,
                "password" TEXT NOT NULL,
                "role" TEXT NOT NULL DEFAULT 'VISITOR',
                "category" TEXT NOT NULL,
                "jobRole" TEXT,
                "degree" TEXT,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "VisitLog" (
                "id" TEXT PRIMARY KEY,
                "ipHash" TEXT,
                "userAgent" TEXT,
                "path" TEXT NOT NULL,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "Message" (
                "id" TEXT PRIMARY KEY,
                "name" TEXT NOT NULL,
                "email" TEXT NOT NULL,
                "content" TEXT NOT NULL,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Check if admin user exists, create if not
        const adminEmail = "nithyananthan@nskgroups.website";
        const hashedPassword = await bcrypt.hash("nsk12345", 10);

        await prisma.$executeRawUnsafe(`
            INSERT INTO "User" ("id", "name", "email", "password", "role", "category", "jobRole", "createdAt", "lastActive")
            VALUES (
                gen_random_uuid()::text,
                'Nithyananthan Nagarajan',
                '${adminEmail}',
                '${hashedPassword}',
                'ADMIN',
                'PROFESSIONAL',
                'Founder & CMD',
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP
            )
            ON CONFLICT ("email") DO UPDATE 
            SET "role" = 'ADMIN', "password" = '${hashedPassword}';
        `);

        return NextResponse.json({
            success: true,
            message: "Database tables created and Admin user verified successfully!",
        });
    } catch (error: any) {
        console.error("Init DB Error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error?.message || "Failed to initialize database",
            },
            { status: 500 }
        );
    }
}
