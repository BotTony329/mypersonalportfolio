import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import MissionArchive from "@/components/work/MissionArchive";
import Reveal from "@/components/primitives/Reveal";
import SplitHeading from "@/components/primitives/SplitHeading";
import { PROJECTS, activeCategories } from "@/content/projects";
import { IDENTITY } from "@/lib/content";

export const metadata: Metadata = {
  title: `Work — Mission Archive | ${IDENTITY.name}`,
  description:
    "Selected work by Tony Zhao: AI product design, enterprise SaaS delivery, digital transformation and product design case studies.",
  openGraph: {
    title: `Mission Archive | ${IDENTITY.name}`,
    description: "AI products, enterprise SaaS delivery and product design case studies.",
    type: "website",
  },
};

export default function WorkPage() {
  return (
    <PageShell>
      <header className="page-hero wrap">
        <Reveal as="p" className="eyebrow">Mission Archive</Reveal>
        <SplitHeading lines={["All work"]} />
        <Reveal as="p" className="lede page-hero-lede">
          {PROJECTS.length} programmes across AI products, enterprise SaaS and product
          design. Every entry is a full case study — problem, process, contribution
          and outcome, with no invented numbers.
        </Reveal>
      </header>

      <MissionArchive projects={PROJECTS} categories={activeCategories()} />
    </PageShell>
  );
}
