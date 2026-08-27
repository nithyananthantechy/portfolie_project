import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://nithyananthan.nskgroups.website";
    const now = new Date();

    return [
        {
            url: `${baseUrl}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.95,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/register`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];
}
