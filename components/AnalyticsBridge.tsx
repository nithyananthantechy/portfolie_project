"use client";

import { useEffect } from "react";
import { track, withUtm } from "@/lib/analytics";

/** Mounts once in the root layout: logs a page_view and freezes first-touch UTM into sessionStorage. */
export default function AnalyticsBridge() {
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
            const hasUtm = utmKeys.some((k) => params.get(k));
            if (hasUtm && !sessionStorage.getItem("ns_utm")) {
                const captured = utmKeys
                    .map((k) => (params.get(k) ? `${k}=${params.get(k)}` : null))
                    .filter(Boolean)
                    .join("&");
                sessionStorage.setItem("ns_utm", captured);
            }
        } catch {
            /* ignore */
        }
        track("page_view");

        // Generic converter: any element with data-track="<event>" fires once per click.
        const onClick = (e: MouseEvent) => {
            const el = (e.target as HTMLElement | null)?.closest?.("[data-track]") as HTMLElement | null;
            if (el?.dataset.track) track(el.dataset.track as never);
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

/** Anchor helper that fires a tracked outbound click (Calendly / WhatsApp / tel). */
export function useTracked() {
    useEffect(() => {});
}

export { withUtm };
