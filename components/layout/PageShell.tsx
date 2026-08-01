import type { ReactNode } from "react";
import Link from "next/link";
import { IDENTITY } from "@/lib/content";

/**
 * Frame for every page except the home page.
 *
 * The home page owns the Three.js scene; these pages deliberately do not
 * mount it. They get the same CSS backdrop — grid, veil, grain — which costs
 * no WebGL context and keeps the language consistent while a case study is
 * being read.
 */
export default function PageShell({
  eyebrow,
  children,
  footerNote,
}: {
  eyebrow?: string;
  children: ReactNode;
  footerNote?: string;
}) {
  return (
    <>
      <div className="page-bg" aria-hidden>
        <span className="page-bg-glow" />
      </div>

      <main id="main" className="page-main">
        {eyebrow ? <span className="sr-only">{eyebrow}</span> : null}
        {children}
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner mono">
          <span>© {new Date().getFullYear()} {IDENTITY.name}</span>
          <span className="footer-mid">{footerNote ?? "Designed & built from first principles"}</span>
          <span className="footer-links">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
