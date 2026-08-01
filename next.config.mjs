/**
 * The site is fully static — no server rendering, no image optimisation, no
 * API routes — so it exports to plain files and can be hosted anywhere.
 *
 * GitHub Pages serves a project repo from a subpath
 * (https://<user>.github.io/<repo>/), so the build needs a basePath there and
 * none locally. `npm run dev` and a local `npm run build` stay at `/`; only
 * the Actions build picks up the subpath.
 *
 * Moving to a custom domain later: set NEXT_PUBLIC_BASE_PATH="" in the
 * workflow (or delete the basePath lines) and add a CNAME file to public/.
 */
const repo = "mypersonalportfolio";
const onGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (onGitHubPages ? `/${repo}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  /* Pages has no server to resolve extensionless URLs, so emit real
     directories: /about/ -> /about/index.html */
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
