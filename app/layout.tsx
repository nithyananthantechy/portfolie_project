import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://nithyananthan.nskgroups.website"),
    title: {
        default: "Nithyananthan Nagarajan | Founder, Chairman & Managing Director · NSK Groups",
        template: "%s | Nithyananthan Nagarajan · NSK Groups",
    },
    description:
        "Official executive portfolio of Nithyananthan Nagarajan — Founder & CMD of NSK Groups. Governing NiTechSpark (IT Infra & Cybersecurity), NiteHire (AI Recruitment ATS), and NiteOrbit (Deep Tech). Based in Erode, Tamil Nadu, India.",
    keywords: [
        "Nithyananthan Nagarajan",
        "Nithyananthan",
        "NSK Groups",
        "NiTechSpark",
        "NiteHire",
        "NiteOrbit",
        "Founder NSK Groups",
        "Cybersecurity Engineer Erode",
        "Linux SRE Tamil Nadu",
        "AI Recruitment Platform",
        "DPDP Act Compliance Audit",
        "PropoTrack",
        "NiteSentinel",
        "sparkAudit",
        "CyberScan",
        "Alone AI",
        "SustainHub",
        "SENTRIYA",
        "Udyam MSME Registered Tech Enterprise",
    ],
    authors: [{ name: "Nithyananthan Nagarajan", url: "https://nithyananthan.nskgroups.website/portfolio" }],
    creator: "Nithyananthan Nagarajan",
    publisher: "NSK Groups",
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
    alternates: {
        canonical: "https://nithyananthan.nskgroups.website/portfolio",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://nithyananthan.nskgroups.website/portfolio",
        siteName: "NSK Groups | Nithyananthan Nagarajan Executive Portfolio",
        title: "Nithyananthan Nagarajan | Founder & CMD · NSK Groups",
        description:
            "Founder, Chairman & Managing Director of NSK Groups. Governing NiTechSpark, NiteHire, and NiteOrbit. Enterprise IT Infrastructure, AI ATS, and Zero-Trust Cybersecurity.",
        images: [
            {
                url: "/nithyananthan_executive.png",
                width: 1200,
                height: 630,
                alt: "Nithyananthan Nagarajan — Founder & CMD NSK Groups",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nithyananthan Nagarajan | Founder & CMD · NSK Groups",
        description:
            "Founder & CMD of NSK Groups. Builder of NiTechSpark, NiteHire, and NiteOrbit. Linux DevOps, AI ATS & Space Tech.",
        images: ["/nithyananthan_executive.png"],
    },
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
    other: {
        "geo.region": "IN-TN",
        "geo.placename": "Erode, Tamil Nadu, India",
        "geo.position": "11.3410;77.7172",
        "ICBM": "11.3410, 77.7172",
        "theme-color": "#020612",
    },
};

const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["Organization", "Corporation"],
            "@id": "https://nskgroups.website/#organization",
            name: "NSK Groups",
            alternateName: "NSK Groups Holding",
            url: "https://nskgroups.website",
            logo: "https://nskgroups.website/assets/nsk_logo.svg",
            description:
                "NSK Groups is a premier technology holding conglomerate founded by Nithyananthan Nagarajan in Erode, Tamil Nadu, India. Governing NiTechSpark, NiteHire, and NiteOrbit.",
            founder: {
                "@type": "Person",
                "@id": "https://nithyananthan.nskgroups.website/#founder",
                name: "Nithyananthan Nagarajan",
                jobTitle: "Founder, Chairman & Managing Director",
                url: "https://nithyananthan.nskgroups.website/portfolio",
                image: "https://nithyananthan.nskgroups.website/nithyananthan_executive.png",
                sameAs: [
                    "https://www.instagram.com/nithyananthan.tech.founder/",
                    "https://www.linkedin.com/in/nithyananthan-nagarajan/",
                    "https://calendly.com/nithyananthan-nskgroups",
                    "https://wa.me/916385576354",
                    "https://nskgroups.website",
                    "https://nitechspark.site",
                    "https://nitehire.site",
                ],
            },
            address: {
                "@type": "PostalAddress",
                addressLocality: "Erode",
                addressRegion: "Tamil Nadu",
                postalCode: "638001",
                addressCountry: "IN",
            },
            geo: {
                "@type": "GeoCoordinates",
                latitude: "11.3410",
                longitude: "77.7172",
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-63855-76354",
                contactType: "executive customer service",
                email: "nithyananthan@nskgroups.website",
                availableLanguage: ["English", "Tamil"],
            },
            subOrganization: [
                {
                    "@type": "Organization",
                    name: "NiTechSpark",
                    url: "https://nitechspark.site",
                    description: "IT Infrastructure, Linux DevOps, Cybersecurity & SRE venture under NSK Groups.",
                },
                {
                    "@type": "Organization",
                    name: "NiteHire",
                    url: "https://nitehire.site",
                    description: "Autonomous AI Recruitment, 2-level screening, and HR ATS platform.",
                },
                {
                    "@type": "Organization",
                    name: "NiteOrbit",
                    url: "https://niteorbit.space",
                    description: "Space ground systems DevOps and satellite telemetry venture under NSK Groups.",
                },
            ],
        },
        {
            "@type": "Person",
            "@id": "https://nithyananthan.nskgroups.website/#founder",
            name: "Nithyananthan Nagarajan",
            jobTitle: "Founder, Chairman & Managing Director",
            worksFor: { "@id": "https://nskgroups.website/#organization" },
            url: "https://nithyananthan.nskgroups.website/portfolio",
            email: "nithyananthan@nskgroups.website",
            telephone: "+916385576354",
            image: "https://nithyananthan.nskgroups.website/nithyananthan_executive.png",
            sameAs: [
                "https://www.instagram.com/nithyananthan.tech.founder/",
                "https://www.linkedin.com/in/nithyananthan-nagarajan/",
                "https://calendly.com/nithyananthan-nskgroups",
                "https://wa.me/916385576354",
            ],
            knowsAbout: [
                "Linux System Administration",
                "Cloud DevOps & SRE",
                "Cybersecurity Auditing",
                "DPDP Act 2023 Compliance",
                "AI Recruitment ATS Engineering",
                "Fullstack Software Architecture",
                "Space Ground Systems Telemetry",
            ],
        },
        {
            "@type": "FAQPage",
            "@id": "https://nithyananthan.nskgroups.website/#faq",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "Who is Nithyananthan Nagarajan?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        "text": "Nithyananthan Nagarajan is the Founder, Chairman & Managing Director (CMD) of NSK Groups, a technology holding conglomerate based in Erode, Tamil Nadu, India. He governs NiTechSpark, NiteHire, and NiteOrbit.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What companies are governed under NSK Groups?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        "text": "NSK Groups governs three core ventures: NiTechSpark (IT Infrastructure, Linux DevOps, and Cybersecurity), NiteHire (Autonomous AI Recruitment ATS), and NiteOrbit (Space Ground Systems DevOps and Satellite Telemetry).",
                    },
                },
                {
                    "@type": "Question",
                    name: "What services does NiTechSpark offer?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        "text": "NiTechSpark specializes in Linux server administration, cloud DevOps, zero-trust cybersecurity audits, DPDP Act 2023 compliance automation, Prometheus/Grafana observability, and automated GRC tools like sparkAudit.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How can I contact Nithyananthan Nagarajan?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        "text": "You can connect directly via official email at nithyananthan@nskgroups.website, WhatsApp at +91-63855-76354, Instagram at @nithyananthan.tech.founder, or schedule a call at calendly.com/nithyananthan-nskgroups.",
                    },
                },
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
                {children}
            </body>
        </html>
    );
}
