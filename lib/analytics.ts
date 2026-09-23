"use client";

/**
 * Privacy-friendly conversion events.
 * Sends keepalive beacons to /api/track (server logs only — no PII, no cookies set here).
 * If @vercel/analytics is enabled in the layout, `event()` also mirrors to Vercel Analytics.
 */

export type TrackEvent =
    | "page_view"
    | "cta_click"
    | "calendly_open"
    | "whatsapp_click"
    | "call_click"
    | "checklist_download"
    | "checklist_email_submit"
    | "contact_form_submit"
    | "qualify_select"
    | "locale_toggle"
    | "nitechspark_click";

export function track(name: TrackEvent, props?: Record<string, string | number | boolean>) {
    if (typeof window === "undefined") return;
    try {
        const payload = JSON.stringify({
            name,
            props: props ?? {},
            path: window.location.pathname + window.location.search,
            ts: Date.now(),
        });
        if (navigator.sendBeacon) {
            navigator.sendBeacon("/api/track", payload);
        } else {
            fetch("/api/track", { method: "POST", body: payload, keepalive: true }).catch(() => {});
        }
    } catch {
        /* analytics must never break UX */
    }
}

/** Appends the current page's UTM parameters (if any) to any outbound URL — e.g. Calendly. */
export function withUtm(url: string): string {
    if (typeof window === "undefined") return url;
    try {
        const current = new URL(window.location.href);
        const utmKeys = [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_term",
            "utm_content",
        ];
        const target = new URL(url, window.location.origin);
        let added = false;
        for (const key of utmKeys) {
            const value = current.searchParams.get(key);
            if (value && !target.searchParams.has(key)) {
                target.searchParams.set(key, value);
                added = true;
            }
        }
        if (!added) return url;
        return target.toString();
    } catch {
        return url;
    }
}
