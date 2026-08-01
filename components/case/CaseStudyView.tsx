import Link from "next/link";
import Reveal from "../primitives/Reveal";
import SplitHeading from "../primitives/SplitHeading";
import ProjectPreview from "../cards/ProjectPreview";
import BlockRenderer from "./Blocks";
import type { CaseStudy } from "@/content/types";

/**
 * The shared case-study page. Every project renders through this — hero,
 * snapshot, its own ordered blocks, then navigation onward. Nothing here is
 * project-specific, which is what keeps a new case study to one content file.
 */
export default function CaseStudyView({
  study,
  previous,
  next,
}: {
  study: CaseStudy;
  previous?: CaseStudy;
  next?: CaseStudy;
}) {
  const s = study.snapshot;
  const snapshotRows: [string, string][] = [
    ["Role", s.role],
    ["Project type", s.projectType],
    ["Timeline", s.timeline],
    ["Team", s.team],
    ["Status", s.status],
  ];

  return (
    <article className={`case accent-${study.accent}`}>
      {/* ---------------------------------------------------------- hero */}
      <header className="cs-hero">
        <div className="wrap">
          <Reveal as="p" className={`eyebrow${study.accent === "cyan" ? " b" : ""}`}>
            Mission {study.mission} · {study.statusLabel}
          </Reveal>
          <SplitHeading lines={study.titleLines} />
          <Reveal as="p" className="lede cs-hero-lede">{study.summary}</Reveal>
          <Reveal className="cs-hero-tags">
            <>
              {study.categories.map((c) => <span className="tag" key={c}>{c}</span>)}
            </>
          </Reveal>
        </div>
        <div className="cs-hero-visual" aria-hidden>
          <ProjectPreview kind={study.preview} accent={study.accent} />
        </div>
      </header>

      {/* ------------------------------------------------------ snapshot */}
      <section className="cs-block" id="snapshot">
        <Reveal as="h2" className="cs-h2">Project snapshot</Reveal>
        <div className="cs-snapshot">
          <dl className="cs-snap-list">
            {snapshotRows.map(([k, v]) => (
              <div className="cs-snap-row" key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="cs-snap-tools">
            <h3 className="mono cs-snap-tools-k">Tools & methods</h3>
            <ul className="cs-tools">
              {s.tools.map((t) => <li className="tag" key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- blocks */}
      <div className="wrap cs-body">
        {study.blocks.map((b) => <BlockRenderer key={b.id} block={b} />)}
      </div>

      {/* ---------------------------------------------------- onward nav */}
      <nav className="cs-onward wrap" aria-label="Case study navigation">
        <Link className="cs-back" href="/work">← All work</Link>

        <div className="cs-neighbours">
          {previous ? (
            <Link className="cs-neighbour prev" href={`/work/${previous.slug}`}>
              <span className="mono">Previous</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : null}
          {next ? (
            <Link className="cs-neighbour next" href={`/work/${next.slug}`}>
              <span className="mono">Next</span>
              <strong>{next.title}</strong>
            </Link>
          ) : null}
        </div>

        <Link className="cta" href="/contact">
          <i /><span>Start a conversation →</span>
        </Link>
      </nav>
    </article>
  );
}
