import type { Metadata } from "next";
import "./globals.css";
import AnalyticsBridge from "@/components/AnalyticsBridge";
import { SITE, LINKS, ventures, BOILERPLATE_100 } from "@/lib/siteData";

export const metadata: Metadata = {
    metadataBase: new URL(SITE.baseUrl),
    title: {
        default: `${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
        template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    keywords: [
        "Nithyananthan Nagarajan",
        "Cybersecurity Engineer",
        "IT Infrastructure Engineer",
        "AIOps Engineer",
        "Linux Engineer",
        "Linux System Administrator",
        "Cybersecurity Consultant",
        "IT Infrastructure Consultant",
        "Server Troubleshooting",
        "AIOps Monitoring",
        "Infrastructure Automation",
        "Cybersecurity Assessment",
        "Erode Tamil Nadu India",
        "NITECHSPARK",
        LINKS.linkedin,
        LINKS.github,
    ],
    authors: [{ name: SITE.name, url: SITE.baseUrl }],
    creator: SITE.name,
    publisher: SITE.company,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE.baseUrl,
        siteName: `${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
        title: `${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
        description: "Linux • AIOps • Cybersecurity • Infrastructure Automation",
        images: [
            {
                url: SITE.ogImage,
                width: 1200,
                height: 630,
                alt: `${SITE.name} — Cybersecurity & IT Infrastructure Engineer`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
        description: "Linux • AIOps • Cybersecurity • Infrastructure Automation",
        images: [SITE.ogImage],
    },
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
    other: {
        "geo.region": SITE.geo.region,
        "geo.placename": SITE.geo.placename,
        "geo.position": `${SITE.geo.lat};${SITE.geo.lon}`,
        ICBM: `${SITE.geo.lat}, ${SITE.geo.lon}`,
        "theme-color": SITE.themeColor,
    },
};

const SAME_AS = [
    LINKS.linkedin,
    LINKS.github,
    LINKS.instagram,
    LINKS.calendly,
    LINKS.whatsapp,
    LINKS.nitechspark,
    LINKS.nitehire,
];

const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${SITE.baseUrl}/#website`,
            url: `${SITE.baseUrl}/`,
            name: `${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
            description: SITE.description,
            inLanguage: "en",
            publisher: { "@id": `${SITE.baseUrl}/#organization` },
        },
        {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE.baseUrl}/blog?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
        {
            "@type": ["Organization", "Corporation"],
            "@id": `${SITE.baseUrl}/#organization`,
            name: SITE.company,
            alternateName: "NITECHSPARK",
            url: LINKS.nitechspark,
            logo: `${SITE.baseUrl}/favicon.svg`,
            description: BOILERPLATE_100,
            foundingDate: SITE.established,
            founder: {
                "@type": "Person",
                "@id": `${SITE.baseUrl}/#founder`,
                name: SITE.name,
                jobTitle: SITE.role,
                url: `${SITE.baseUrl}/`,
                image: `${SITE.baseUrl}${SITE.headshot}`,
                sameAs: SAME_AS,
            },
            address: {
                "@type": "PostalAddress",
                ...SITE.address,
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: SITE.geo.lat,
                longitude: SITE.geo.lon,
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-63855-76354",
                contactType: "customer service",
                email: LINKS.email,
                availableLanguage: ["English", "Tamil"],
            },
            subOrganization: ventures.map((v) => ({
                "@type": "Organization",
                name: v.name,
                url: v.url,
                description: v.description,
            })),
        },
        {
            "@type": "Person",
            "@id": `${SITE.baseUrl}/#founder`,
            name: SITE.name,
            jobTitle: SITE.role,
            worksFor: { "@id": `${SITE.baseUrl}/#organization` },
            url: `${SITE.baseUrl}/`,
            email: LINKS.email,
            telephone: LINKS.phoneRaw,
            image: `${SITE.baseUrl}${SITE.headshot}`,
            sameAs: SAME_AS,
            knowsAbout: [
                "Cybersecurity Auditing & Hardening",
                "Linux System Administration",
                "IT Infrastructure & Networking",
                "AIOps Telemetry & Log Management",
                "Infrastructure Automation (Python/Bash)",
                "Zabbix, Prometheus, Grafana, and ELK Stack",
            ],
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="alternate icon" href="/favicon.svg" />
                <link rel="apple-touch-icon" href="/favicon.svg" />
                <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Knowledge Base (Standard)" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
                />
            </head>
            <body className="antialiased bg-bg text-text-primary overflow-x-hidden font-rajdhani" suppressHydrationWarning>
                <AnalyticsBridge />
                {children}
            </body>
        </html>
    );
}
