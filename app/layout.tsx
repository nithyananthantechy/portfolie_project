import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nithyananthan | Cybersecurity & Linux",
    description: "Portfolio of Nithyananthan Nagarajan - Linux Key & Cybersecurity Professional",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-black text-green-500 overflow-x-hidden">
                {children}
            </body>
        </html>
    );
}
