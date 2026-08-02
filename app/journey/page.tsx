import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/primitives/Reveal";
import SplitHeading from "@/components/primitives/SplitHeading";
import { IDENTITY, JOURNEY } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: `Journey | ${IDENTITY.name}`,
  description:
    "Tony Zhao's path from Information Systems through UX, enterprise digital transformation and business analysis to AI product development and independent SaaS building — and the part-time work that funded it.",
  openGraph: {
    title: `Journey | ${IDENTITY.name}`,
    description: "Information Systems to independent AI SaaS builder — the full path, and how it was paid for.",
    type: "profile",
  },
};

export default function JourneyPage() {
  return (
    <PageShell>
      <header className="page-hero wrap">
        <Reveal as="p" className="eyebrow">{JOURNEY.eyebrow}</Reveal>
        <SplitHeading lines={JOURNEY.heading} />
        <Reveal as="p" className="lede page-hero-lede">{JOURNEY.lede}</Reveal>

        <Reveal className="arc" delay={0.1}>
          <ol className="arc-list mono">
            {JOURNEY.arc.map((phase, i) => (
              <li key={phase} className="arc-node">
                <span className="arc-n">{String(i + 1).padStart(2, "0")}</span>
                <span>{phase}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </header>

      <div className="wrap cs-body">
        <section className="cs-block" id="timeline">
          <Reveal as="h2" className="cs-h2">Primary timeline</Reveal>
          <Reveal as="p" className="lede cs-intro">
            In the order it happened. The capability arc above is the shape of it;
            this is the record.
          </Reveal>

          <ol className="cs-flow timeline journey-timeline">
            {JOURNEY.primary.map((stage, i) => (
              <Reveal as="li" key={`${stage.title}-${stage.period}`} delay={Math.min(i, 8) * 0.04} className="cs-step">
                <span className="cs-step-rail" aria-hidden><i className="cs-step-dot" /></span>
                <span className="cs-step-body">
                  <span className="journey-meta">
                    <span className="cs-step-n mono">{stage.period}</span>
                    <span className="journey-phase mono">{stage.phase}</span>
                  </span>
                  {stage.href ? (
                    <Link className="cs-step-name link" href={stage.href}>{stage.title} →</Link>
                  ) : (
                    <span className="cs-step-name">{stage.title}</span>
                  )}
                  <span className="mono cs-step-role">{stage.org}</span>
                  <span className="small">{stage.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* The support thread. Visually distinct and deliberately secondary —
            it complements the career timeline rather than competing with it. */}
        <section className="cs-block support" id="support">
          <Reveal as="h2" className="cs-h2">{JOURNEY.support.heading}</Reveal>
          <div className="support-grid">
            <div>
              <Reveal as="p" className="lede cs-intro">{JOURNEY.support.lede}</Reveal>
              <ol className="support-chain">
                {JOURNEY.support.steps.map((s, i) => (
                  <Reveal as="li" key={s.name} delay={i * 0.06} className="support-step">
                    <span className="support-n mono">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>{s.name}</strong>
                      <span className="small">{s.desc}</span>
                    </span>
                  </Reveal>
                ))}
              </ol>
              <Reveal delay={0.2}>
                <p className="support-note small">{JOURNEY.support.note}</p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <figure className="support-figure">
                <Image
                  src={withBasePath("/work/moo-forklift.webp")}
                  alt="Moo the astronaut cat driving an orange forklift, carrying a crate stencilled with a paw print."
                  width={900}
                  height={617}
                  loading="lazy"
                  sizes="(max-width: 900px) 90vw, 440px"
                />
                <figcaption className="small">
                  Shifts around study and full-time work. Not the start of the story —
                  the budget for it.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      </div>

      <nav className="cs-onward wrap" aria-label="Continue">
        <Link className="cs-back" href="/about">← Full profile</Link>
        <Link className="cta ghost" href="/lab"><i /><span>Independent Product Lab →</span></Link>
        <Link className="cta" href="/contact"><i /><span>Start a conversation →</span></Link>
      </nav>
    </PageShell>
  );
}
