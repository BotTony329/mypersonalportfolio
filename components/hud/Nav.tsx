"use client";

import { useEffect, useState } from "react";
import { IDENTITY, NAV } from "@/lib/content";

export default function Nav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <nav className="hud-top">
      <a className="logo" href="#hero" aria-label={`${IDENTITY.name} — home`}>
        <span className="mark" aria-hidden><i /></span>
        <span>{IDENTITY.name}</span>
      </a>

      <button
        className="burger"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <i /><i /><i />
      </button>

      <div className="navlinks">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={active === n.id ? "on" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{n.n}</span>{n.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
