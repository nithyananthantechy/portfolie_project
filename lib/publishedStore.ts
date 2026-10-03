import fs from "fs";
import path from "path";
import { blogPosts, BlogPost } from "./blogData";
import { researchPapers, ResearchPaper } from "./papersData";
import { dailyUpdates, DailyUpdate } from "./updatesData";
import { selectedEngineeringProjects, EngineeringProject } from "./siteData";

const dataDir = path.join(process.cwd(), "data");
const storageFile = path.join(dataDir, "published_content.json");

interface PublishedStorage {
    blogs: BlogPost[];
    papers: ResearchPaper[];
    updates: DailyUpdate[];
    projects?: EngineeringProject[];
}

function ensureStorage(): PublishedStorage {
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
            saveStorage(parsed);
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

function saveStorage(data: PublishedStorage) {
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(storageFile, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Failed to persist published storage to disk:", e);
    }
}

export function getAllBlogs(): BlogPost[] {
    return ensureStorage().blogs;
}

export function addBlog(blog: BlogPost): BlogPost[] {
    const current = ensureStorage();
    current.blogs = [blog, ...current.blogs];
    saveStorage(current);
    return current.blogs;
}

export function getAllPapers(): ResearchPaper[] {
    return ensureStorage().papers;
}

export function addPaper(paper: ResearchPaper): ResearchPaper[] {
    const current = ensureStorage();
    current.papers = [paper, ...current.papers];
    saveStorage(current);
    return current.papers;
}

export function getAllUpdates(): DailyUpdate[] {
    return ensureStorage().updates;
}

export function addUpdate(update: DailyUpdate): DailyUpdate[] {
    const current = ensureStorage();
    current.updates = [update, ...current.updates];
    saveStorage(current);
    return current.updates;
}

export function getAllProjects(): EngineeringProject[] {
    return ensureStorage().projects || selectedEngineeringProjects;
}

export function addProject(project: EngineeringProject): EngineeringProject[] {
    const current = ensureStorage();
    const existing = current.projects || selectedEngineeringProjects;
    current.projects = [project, ...existing.filter((p) => p.id !== project.id)];
    saveStorage(current);
    return current.projects;
}

export function deleteProject(id: string): EngineeringProject[] {
    const current = ensureStorage();
    const existing = current.projects || selectedEngineeringProjects;
    current.projects = existing.filter((p) => p.id !== id);
    saveStorage(current);
    return current.projects;
}

