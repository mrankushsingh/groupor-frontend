import { Link } from "@tanstack/react-router";

/** Compact Groupor mark — G / search / community — for header & footer. */
export function BrandMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="groupor-g" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3EF0B0" />
          <stop offset="0.55" stopColor="#17D292" />
          <stop offset="1" stopColor="#0A8F8A" />
        </linearGradient>
      </defs>
      {/* Speech-bubble G / magnifier body */}
      <path
        d="M46.5 18.5c-3.8-5.2-10-8.5-17-8.5C18.2 10 10 18.2 10 28.5S18.2 47 29.5 47c6.2 0 11.7-2.7 15.4-7"
        stroke="url(#groupor-g)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M44.5 40.5 54 52"
        stroke="url(#groupor-g)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M18 38.5c1.4 1.2 3.8 2.2 6.8 2.2"
        stroke="url(#groupor-g)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* People */}
      <circle cx="29.5" cy="24.5" r="3.2" fill="#17D292" />
      <path d="M23.5 34.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" fill="#17D292" />
      <circle cx="21.5" cy="25.8" r="2.4" fill="#1A3348" />
      <path d="M17.2 34c0-2.5 2-4.2 4.3-4.2 1.4 0 2.6.6 3.4 1.6" fill="#1A3348" />
      <circle cx="37.5" cy="25.8" r="2.4" fill="#1A3348" />
      <path d="M41.8 34c0-2.5-2-4.2-4.3-4.2-1.4 0-2.6.6-3.4 1.6" fill="#1A3348" />
    </svg>
  );
}

export function BrandLogo({
  size = "md",
  showTagline = false,
  onDark = false,
}: {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  onDark?: boolean;
}) {
  const mark = size === "sm" ? "size-8" : size === "lg" ? "size-12" : "size-10";
  const title =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link to="/" className="group flex min-w-0 items-center gap-2.5 no-underline">
      <span
        className={`flex shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-white shadow-[0_0_0_1px_rgba(23,210,146,0.12)] ${
          size === "sm" ? "size-9 p-1" : size === "lg" ? "size-14 p-1.5" : "size-11 p-1.5"
        }`}
      >
        <BrandMark className={mark} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block font-bold tracking-tight ${title}`}>
          <span className={onDark ? "text-white" : "text-foreground"}>Group</span>
          <span className="text-primary">or</span>
        </span>
        {showTagline ? (
          <span
            className={`mt-0.5 block truncate text-[9px] font-semibold uppercase tracking-[0.16em] ${
              onDark ? "text-white/70" : "text-muted-foreground"
            }`}
          >
            Find. <span className="text-primary">Connect.</span> Grow together.
          </span>
        ) : null}
      </span>
    </Link>
  );
}
