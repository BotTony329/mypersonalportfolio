/**
 * GitHub Pages serves this site from `/mypersonalportfolio/`, and asset paths
 * written as `/assistant/moo-idle.webp` resolve against the domain root — so
 * they 404 in production while working perfectly in local development.
 *
 * `next/link` and the router handle the prefix themselves. `next/image` with
 * `unoptimized: true` does not: it passes `src` through verbatim. Anything
 * pointing at `public/` therefore has to be prefixed explicitly, which is
 * what this does.
 *
 * The value is inlined at build time from next.config.mjs.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const withBasePath = (path: string) =>
  path.startsWith("/") ? `${BASE}${path}` : path;
