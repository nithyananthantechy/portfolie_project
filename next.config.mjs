/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: import.meta.dirname,
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
            {
                source: "/msme-cyber-risk-self-check.pdf",
                headers: [
                    { key: "Content-Disposition", value: 'attachment; filename="msme-cyber-risk-self-check.pdf"' },
                    { key: "Cache-Control", value: "public, max-age=86400" },
                ],
            },
        ];
    },
    images: {
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;
