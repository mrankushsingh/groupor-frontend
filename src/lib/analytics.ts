type EventName = "search" | "group_view" | "join_group_click" | "group_submission";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: EventName, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...parameters });
  window.gtag?.("event", event, parameters);
}
