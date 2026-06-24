import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nithyananthan Nagarajan | Founder & Chairman & Managing Director · NSK Groups",
    description:
        "Portfolio of Nithyananthan Nagarajan — Founder & Chairman & Managing Director of NSK Groups. Builder of NITECHSPARK, NiteHire, and NiteOrbit. IT Infrastructure, AI Platforms, and Space Technology.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body className="antialiased bg-bg text-text-primary overflow-x-hidden font-rajdhani">
                {children}
            </body>
        </html>
    );
}
