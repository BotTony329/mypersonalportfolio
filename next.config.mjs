/**
 * The site is static by default — no server rendering, no image optimisation,
 * no database — so it exports to plain files and hosts anywhere.
 *
 * There is one exception: `app/api/chat/route.ts`, which gives Moo a
 * server-side model call. A static export cannot contain a route handler, so
 * the build has two modes:
 *
 *   static (default, and what GitHub Pages runs)
 *       → `output: "export"`, API route excluded, Moo answers from the local
 *         knowledge index in the browser.
 *
 *   server (Vercel, or NEXT_STATIC_EXPORT=false)
 *       → normal Next build, API route included, Moo can call a model.
 *
 * GitHub Pages also serves a project repo from a subpath, so the export build
 * needs a basePath there and none locally.
 */
const repo = "mypersonalportfolio";

const onGitHubPages = process.env.GITHUB_PAGES === "true";
const staticExport =
  process.env.NEXT_STATIC_EXPORT !== "false" && !process.env.VERCEL;

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (onGitHubPages ? `/${repo}` : "");

/* Pages here are all .tsx; the chat route handler is the only .ts file under
   app/. Dropping "ts" therefore excludes exactly that one file from the
   static build without moving it out of the repository. The js/jsx entries
   are not optional — Next resolves some of its own internal pages through
   this list, and omitting them fails the build. */
const pageExtensions = staticExport
  ? ["tsx", "jsx", "js"]
  : ["ts", "tsx", "jsx", "js"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(staticExport ? { output: "export" } : {}),
  pageExtensions,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  /* Pages has no server to resolve extensionless URLs, so emit real
     directories: /about/ -> /about/index.html */
  trailingSlash: true,
  images: { unoptimized: true },
  /* Inlined so client code can prefix `public/` asset paths — see
     lib/basePath.ts for why next/image cannot do this for us. */
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
