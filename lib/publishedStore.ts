import fs from "fs";
import path from "path";
import { prisma } from "./prisma";
import { blogPosts, BlogPost } from "./blogData";
import { researchPapers, ResearchPaper } from "./papersData";
import { dailyUpdates, DailyUpdate } from "./updatesData";
import { selectedEngineeringProjects, EngineeringProject } from "./siteData";

// Safe data directory (serverless uses /tmp to avoid EROFS, local uses data/)
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NOW_REGION);
const dataDir = isServerless ? path.join("/tmp", "portfolio_data") : path.join(process.cwd(), "data");
const storageFile = path.join(dataDir, "published_content.json");

interface PublishedStorage {
    blogs: BlogPost[];
    papers: ResearchPaper[];
    updates: DailyUpdate[];
    projects?: EngineeringProject[];
}

function ensureFileStorage(): PublishedStorage {
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        if (!fs.existsSync(storageFile)) {
            const initial: PublishedStorage = {
                blogs: blogPosts,
                papers: researchPapers,
                updates: dailyUpdates,
                projects: selectedEngineeringProjects,
            };
            fs.writeFileSync(storageFile, JSON.stringify(initial, null, 2));
            return initial;
        }
        const data = fs.readFileSync(storageFile, "utf-8");
        const parsed: PublishedStorage = JSON.parse(data);
        if (!parsed.projects || !Array.isArray(parsed.projects)) {
            parsed.projects = selectedEngineeringProjects;
            saveFileStorage(parsed);
        }
        return parsed;
    } catch {
        return {
            blogs: blogPosts,
            papers: researchPapers,
            updates: dailyUpdates,
            projects: selectedEngineeringProjects,
        };
    }
}

function saveFileStorage(data: PublishedStorage) {
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(storageFile, JSON.stringify(data, null, 2));
    } catch (e) {
        console.warn("Notice: file storage write bypassed:", e);
    }
}

// -------------------------------------------------------------
// PROJECTS (Prisma DB Primary + Fallback + Permanent Deletion)
// -------------------------------------------------------------
export async function getAllProjects(): Promise<EngineeringProject[]> {
    try {
        // Fetch deleted tombstone IDs
        const deletedRecord = await prisma.publishedItem.findUnique({
            where: { id: "__deleted_projects__" },
        }).catch(() => null);
        const deletedIds = new Set<string>(deletedRecord ? (deletedRecord.data as any).ids || [] : []);

        const rows = await prisma.publishedItem.findMany({
            where: { type: "project" },
            orderBy: { createdAt: "desc" },
        });

        if (rows.length > 0) {
            return rows
                .filter((r) => !deletedIds.has(r.id))
                .map((r) => r.data as unknown as EngineeringProject);
        }

        // First run: Check if initial projects were seeded
        const seedMarker = await prisma.publishedItem.findUnique({
            where: { id: "__projects_seeded__" },
        }).catch(() => null);

        if (!seedMarker) {
            try {
                for (let i = 0; i < selectedEngineeringProjects.length; i++) {
                    const p = selectedEngineeringProjects[i];
                    await prisma.publishedItem.upsert({
                        where: { id: p.id },
                        create: {
                            id: p.id,
                            type: "project",
                            data: p as any,
                            createdAt: new Date(Date.now() - (i + 1) * 60000),
                        },
                        update: {},
                    });
                }
                await prisma.publishedItem.create({
                    data: {
                        id: "__projects_seeded__",
                        type: "system",
                        data: { seededAt: new Date().toISOString() },
                    },
                });
            } catch (seedErr) {
                console.warn("Could not seed initial projects to DB:", seedErr);
            }
        }

        const recheckRows = await prisma.publishedItem.findMany({
            where: { type: "project" },
            orderBy: { createdAt: "desc" },
        }).catch(() => []);

        if (recheckRows.length > 0) {
            return recheckRows
                .filter((r) => !deletedIds.has(r.id))
                .map((r) => r.data as unknown as EngineeringProject);
        }

        return selectedEngineeringProjects.filter((p) => !deletedIds.has(p.id));
    } catch (err) {
        console.warn("Database lookup failed for projects, using file fallback:", err);
        return ensureFileStorage().projects || selectedEngineeringProjects;
    }
}

export async function addProject(project: EngineeringProject): Promise<EngineeringProject[]> {
    try {
        // If it was previously in tombstone, remove it from tombstone
        const deletedRecord = await prisma.publishedItem.findUnique({
            where: { id: "__deleted_projects__" },
        }).catch(() => null);
        if (deletedRecord) {
            const currentDeleted: string[] = (deletedRecord.data as any).ids || [];
            if (currentDeleted.includes(project.id)) {
                const nextDeleted = currentDeleted.filter((id) => id !== project.id);
                await prisma.publishedItem.update({
                    where: { id: "__deleted_projects__" },
                    data: { data: { ids: nextDeleted } },
                });
            }
        }

        await prisma.publishedItem.upsert({
            where: { id: project.id },
            create: {
                id: project.id,
                type: "project",
                data: project as any,
                createdAt: new Date(),
            },
            update: {
                data: project as any,
                updatedAt: new Date(),
            },
        });
    } catch (err) {
        console.warn("Database upsert failed for project, persisting to fallback:", err);
    }

    // Mirror to file storage
    const fileStore = ensureFileStorage();
    const existing = fileStore.projects || selectedEngineeringProjects;
    fileStore.projects = [project, ...existing.filter((p) => p.id !== project.id)];
    saveFileStorage(fileStore);

    return getAllProjects();
}

export async function deleteProject(id: string): Promise<EngineeringProject[]> {
    try {
        // Delete from database rows
        await prisma.publishedItem.deleteMany({
            where: { id, type: "project" },
        });

        // Record in permanent tombstone so it won't be resurrected
        const deletedRecord = await prisma.publishedItem.findUnique({
            where: { id: "__deleted_projects__" },
        }).catch(() => null);
        const currentDeleted: string[] = deletedRecord ? (deletedRecord.data as any).ids || [] : [];
        if (!currentDeleted.includes(id)) {
            currentDeleted.push(id);
            await prisma.publishedItem.upsert({
                where: { id: "__deleted_projects__" },
                create: {
                    id: "__deleted_projects__",
                    type: "system",
                    data: { ids: currentDeleted },
                },
                update: {
                    data: { ids: currentDeleted },
                },
            });
        }
    } catch (err) {
        console.warn("Database delete failed for project:", err);
    }

    const fileStore = ensureFileStorage();
    const existing = fileStore.projects || selectedEngineeringProjects;
    fileStore.projects = existing.filter((p) => p.id !== id);
    saveFileStorage(fileStore);

    return getAllProjects();
}

// -------------------------------------------------------------
// BLOGS (Prisma DB Primary + Fallback)
// -------------------------------------------------------------
export async function getAllBlogs(): Promise<BlogPost[]> {
    try {
        const rows = await prisma.publishedItem.findMany({
            where: { type: "blog" },
            orderBy: { createdAt: "desc" },
        });

        if (rows.length > 0) {
            return rows.map((r) => r.data as unknown as BlogPost);
        }

        // Seed initial blogs
        try {
            for (let i = 0; i < blogPosts.length; i++) {
                const b = blogPosts[i];
                await prisma.publishedItem.upsert({
                    where: { id: b.id },
                    create: {
                        id: b.id,
                        type: "blog",
                        data: b as any,
                        createdAt: new Date(Date.now() - (i + 1) * 60000),
                    },
                    update: {},
                });
            }
        } catch {}
        return blogPosts;
    } catch {
        return ensureFileStorage().blogs;
    }
}

export async function addBlog(blog: BlogPost): Promise<BlogPost[]> {
    try {
        await prisma.publishedItem.upsert({
            where: { id: blog.id },
            create: {
                id: blog.id,
                type: "blog",
                data: blog as any,
                createdAt: new Date(),
            },
            update: {
                data: blog as any,
                updatedAt: new Date(),
            },
        });
    } catch {}

    const fileStore = ensureFileStorage();
    fileStore.blogs = [blog, ...fileStore.blogs.filter((b) => b.id !== blog.id)];
    saveFileStorage(fileStore);

    return getAllBlogs();
}

// -------------------------------------------------------------
// PAPERS (Prisma DB Primary + Fallback)
// -------------------------------------------------------------
export async function getAllPapers(): Promise<ResearchPaper[]> {
    try {
        const rows = await prisma.publishedItem.findMany({
            where: { type: "paper" },
            orderBy: { createdAt: "desc" },
        });

        if (rows.length > 0) {
            return rows.map((r) => r.data as unknown as ResearchPaper);
        }

        try {
            for (let i = 0; i < researchPapers.length; i++) {
                const p = researchPapers[i];
                await prisma.publishedItem.upsert({
                    where: { id: p.id },
                    create: {
                        id: p.id,
                        type: "paper",
                        data: p as any,
                        createdAt: new Date(Date.now() - (i + 1) * 60000),
                    },
                    update: {},
                });
            }
        } catch {}
        return researchPapers;
    } catch {
        return ensureFileStorage().papers;
    }
}

export async function addPaper(paper: ResearchPaper): Promise<ResearchPaper[]> {
    try {
        await prisma.publishedItem.upsert({
            where: { id: paper.id },
            create: {
                id: paper.id,
                type: "paper",
                data: paper as any,
                createdAt: new Date(),
            },
            update: {
                data: paper as any,
                updatedAt: new Date(),
            },
        });
    } catch {}

    const fileStore = ensureFileStorage();
    fileStore.papers = [paper, ...fileStore.papers.filter((p) => p.id !== paper.id)];
    saveFileStorage(fileStore);

    return getAllPapers();
}

// -------------------------------------------------------------
// DAILY UPDATES (Prisma DB Primary + Fallback)
// -------------------------------------------------------------
export async function getAllUpdates(): Promise<DailyUpdate[]> {
    try {
        const rows = await prisma.publishedItem.findMany({
            where: { type: "update" },
            orderBy: { createdAt: "desc" },
        });

        if (rows.length > 0) {
            return rows.map((r) => r.data as unknown as DailyUpdate);
        }

        try {
            for (let i = 0; i < dailyUpdates.length; i++) {
                const u = dailyUpdates[i];
                await prisma.publishedItem.upsert({
                    where: { id: u.id },
                    create: {
                        id: u.id,
                        type: "update",
                        data: u as any,
                        createdAt: new Date(Date.now() - (i + 1) * 60000),
                    },
                    update: {},
                });
            }
        } catch {}
        return dailyUpdates;
    } catch {
        return ensureFileStorage().updates;
    }
}

export async function addUpdate(update: DailyUpdate): Promise<DailyUpdate[]> {
    try {
        await prisma.publishedItem.upsert({
            where: { id: update.id },
            create: {
                id: update.id,
                type: "update",
                data: update as any,
                createdAt: new Date(),
            },
            update: {
                data: update as any,
                updatedAt: new Date(),
            },
        });
    } catch {}

    const fileStore = ensureFileStorage();
    fileStore.updates = [update, ...fileStore.updates.filter((u) => u.id !== update.id)];
    saveFileStorage(fileStore);

    return getAllUpdates();
}
