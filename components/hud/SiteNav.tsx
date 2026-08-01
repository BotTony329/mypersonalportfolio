"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IDENTITY, SITE_NAV } from "@/lib/content";

/**
 * Site-wide navigation. Active state comes from the route rather than from
 * scroll position, so it is correct on first paint and on a direct URL load —
 * which the old hash-based nav could not manage.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  /* Close the menu whenever the route changes. */
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="hud-top" aria-label="Primary">
      <Link className="logo" href="/" aria-label={`${IDENTITY.name} — home`}>
        <span className="mark" aria-hidden><i /></span>
        <span>{IDENTITY.name}</span>
      </Link>

      <button
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="primary-nav-links"
        onClick={() => setOpen((v) => !v)}
      >
        <i /><i /><i />
      </button>

      <div className="navlinks" id="primary-nav-links">
        {SITE_NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={isActive(n.href) ? "on" : undefined}
            aria-current={isActive(n.href) ? "page" : undefined}
          >
            <span>{n.n}</span>{n.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
