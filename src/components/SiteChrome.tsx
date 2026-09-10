import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { categories, countries, slugify } from "@/data/groups";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const routerSearch = useRouterState({
    select: (s) => s.location.search as { q?: string },
  });
  const [query, setQuery] = useState(
    typeof routerSearch.q === "string" ? routerSearch.q : "",
  );

  useEffect(() => {
    setQuery(typeof routerSearch.q === "string" ? routerSearch.q : "");
  }, [routerSearch.q]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand/95 text-brand-foreground shadow-[0_1px_0_rgba(23,210,146,0.18)_inset,0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:gap-4">
        <BrandLogo size="md" showTagline onDark />

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 text-brand-foreground transition-colors hover:bg-primary/20 sm:ml-0"
        >
          <Menu className="size-5" />
        </button>

        <form
          className="relative order-last w-full min-w-0 sm:order-none sm:w-auto sm:flex-1"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            void navigate({
              to: "/group/find",
              search: q ? { q } : {},
            });
            setOpen(false);
          }}
        >
          <input
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type Keywords to Search"
            aria-label="Search groups"
            className="h-11 w-full rounded-md border border-border bg-card pl-4 pr-11 text-sm text-foreground outline-hidden transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Search className="size-5" />
          </button>
        </form>
      </div>

      {open && (
        <nav id="box" className="border-t border-primary/20 bg-brand/98">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 text-sm font-bold uppercase tracking-wide">
            {[
              { to: "/", label: "Home" },
              { to: "/group/addgroup", label: "Add Group" },
              { to: "/guides", label: "Guides Hub" },
              { to: "/safety", label: "Safety" },
              { to: "/moderation-policy", label: "Moderation" },
              { to: "/editorial-policy", label: "Editorial" },
              { to: "/how-reporting-works", label: "Reporting" },
              { to: "/faq", label: "FAQ" },
              { to: "/terms", label: "Terms" },
              { to: "/privacy", label: "Privacy" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-primary/20 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="ml-auto flex size-8 items-center justify-center rounded-full border border-primary/35 bg-primary/15 text-brand-foreground transition-colors hover:bg-primary/30"
            >
              <X className="size-4" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const topCategories = categories.filter((c) => c.slug !== "all");
  const topCountries = countries.filter((c) => Boolean(c.code)).slice(0, 18);

  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 text-sm text-muted-foreground">
        <BrandLogo size="sm" showTagline />

        {/* Category Links for Crawler Discovery */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
            Browse WhatsApp Groups by Category
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {topCategories.map((cat) => (
              <Link
                key={cat.slug}
                to="/group/category/$slug"
                params={{ slug: cat.slug }}
                className="hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Country Links */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
            Browse WhatsApp Groups by Country
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {topCountries.map((c) => (
              <Link
                key={c.code}
                to="/group/country/$slug"
                params={{ slug: slugify(c.name) }}
                className="hover:text-primary transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* E-E-A-T Trust & Safety Links & Guides */}
        <div className="border-t border-border/60 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
            Topical Guides & E-E-A-T Standards
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-foreground">
            <Link to="/guides" className="text-primary hover:underline">
              Guides Hub
            </Link>
            <Link to="/guides/how-to-join-whatsapp-groups-safely" className="hover:text-primary transition-colors">
              Safety Guide
            </Link>
            <Link to="/guides/whatsapp-community-vs-group" className="hover:text-primary transition-colors">
              Community vs Group
            </Link>
            <Link to="/guides/how-to-avoid-whatsapp-scams" className="hover:text-primary transition-colors">
              Avoid Scams
            </Link>
            <Link to="/guides/whatsapp-group-admin-guidelines" className="hover:text-primary transition-colors">
              Admin Guidelines
            </Link>
            <Link to="/safety" className="hover:text-primary transition-colors">
              Safety Center
            </Link>
            <Link to="/moderation-policy" className="hover:text-primary transition-colors">
              Moderation Policy
            </Link>
            <Link to="/editorial-policy" className="hover:text-primary transition-colors">
              Editorial Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-border/60 pt-6 text-xs sm:gap-6">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/group/find" className="transition-colors hover:text-foreground">
            Find Groups
          </Link>
          <Link to="/group/addgroup" className="transition-colors hover:text-foreground">
            Submit Group
          </Link>
          <Link to="/guides" className="transition-colors hover:text-foreground">
            Guides
          </Link>
          <Link to="/faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/disclaimer" className="transition-colors hover:text-foreground">
            Disclaimer
          </Link>
          <Link to="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Groupor — Find. Connect. Grow together.</p>
      </div>
    </footer>
  );
}
