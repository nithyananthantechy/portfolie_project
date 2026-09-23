import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://nitechspark.site";
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
        { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/work/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/press`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${baseUrl}/publications`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${baseUrl}/updates`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
        { url: `${baseUrl}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
        { url: `${baseUrl}/register`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ];

    const blogs: MetadataRoute.Sitemap = blogPosts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...staticPages, ...blogs];
}
