import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { IDENTITY } from "@/lib/content";
import Atmosphere from "@/components/background/Atmosphere";
import SiteNav from "@/components/hud/SiteNav";
import Moo from "@/components/assistant/Moo";

/* Self-hosted (via @fontsource files committed to assets/fonts) so the build
   never depends on a network fetch and the page ships zero third-party requests. */
const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../assets/fonts/space-grotesk-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/space-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/space-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/space-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/space-grotesk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});
const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    { path: "../assets/fonts/ibm-plex-mono-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: `${IDENTITY.name} — Business Analyst · AI Product Designer · Digital Transformation`,
  description:
    "Tony Zhao builds intelligent systems that bridge business strategy and AI. Business analysis, AI product design and enterprise digital transformation — presented as a mission control experience.",
  authors: [{ name: IDENTITY.name }],
  openGraph: {
    title: `${IDENTITY.name} — Building intelligent systems`,
    description: "Business Analyst · AI Product Designer · Digital Transformation",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#04060f" };

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: IDENTITY.name,
  jobTitle: "Business Analyst / AI Product Designer",
  email: `mailto:${IDENTITY.email}`,
  knowsAbout: [
    "Business Analysis", "Digital Transformation", "AI Product Design",
    "UX", "SQL", "Power BI", "System Design", "Prompt Engineering",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a className="skip-link" href="#main">Skip to content</a>
        <Atmosphere />
        <SiteNav />
        {children}
        <Moo />
      </body>
    </html>
  );
}
