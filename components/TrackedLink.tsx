"use client";

import { useEffect, useState, type ReactNode } from "react";
import { track, withUtm, type TrackEvent } from "@/lib/analytics";

interface Props {
    href: string;
    source?: string;
    event?: TrackEvent;
    className?: string;
    style?: React.CSSProperties;
    children: ReactNode;
    ariaLabel?: string;
}

/**
 * Server-renders a plain anchor with the base href (crawlers see a real link),
 * then upgrades the href with this page's UTM parameters after hydration and
 * fires a conversion event on click.
 */
export default function TrackedLink({
    href,
    source,
    event = "cta_click",
    className,
    style,
    children,
    ariaLabel,
}: Props) {
    const [resolved, setResolved] = useState(href);

    useEffect(() => {
        const withSource = source ? appendSource(href, source) : href;
        setResolved(withUtm(withSource));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [href, source]);

    return (
        <a
            href={resolved}
            className={className}
            style={style}
            aria-label={ariaLabel}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={() => track(event, source ? { source } : undefined)}
        >
            {children}
        </a>
    );
}

function appendSource(url: string, source: string): string {
    if (!url.includes("calendly.com")) return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}utm_content=${encodeURIComponent(source)}`;
}
