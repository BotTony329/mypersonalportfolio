import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/layout/PageShell";
import CaseStudyView from "@/components/case/CaseStudyView";
import { PROJECTS, getNeighbours, getProject } from "@/content/projects";
import { IDENTITY } from "@/lib/content";

/** Every case study is prerendered, so direct URLs and refreshes just work. */
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getProject(params.slug);
  if (!study) return { title: `Case study not found | ${IDENTITY.name}` };

  const description = study.seoDescription ?? study.summary;
  return {
    title: `${study.title} | ${IDENTITY.name}`,
    description,
    openGraph: {
      title: `${study.title} | ${IDENTITY.name}`,
      description,
      type: "article",
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getProject(params.slug);
  if (!study) notFound();

  const { previous, next } = getNeighbours(study.slug);

  return (
    <PageShell footerNote={study.confidentiality ?? "Designed & built from first principles"}>
      <CaseStudyView study={study} previous={previous} next={next} />
    </PageShell>
  );
}
