import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/primitives/Reveal";
import SplitHeading from "@/components/primitives/SplitHeading";
import { CONTACT, IDENTITY } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact | ${IDENTITY.name}`,
  description:
    "Get in touch with Tony Zhao about business analysis, AI product design and digital transformation work.",
  openGraph: {
    title: `Contact | ${IDENTITY.name}`,
    description: "Available for business analysis, AI product design and digital transformation work.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <header className="page-hero wrap contact-hero">
        <Reveal as="p" className="eyebrow">{CONTACT.eyebrow}</Reveal>
        <SplitHeading lines={CONTACT.heading} glow />
        <Reveal as="p" className="lede page-hero-lede">{CONTACT.lede}</Reveal>

        <Reveal className="contact-actions" delay={0.1}>
          <>
            <a className="cta" href={`mailto:${IDENTITY.email}`}>
              <i /><span>{IDENTITY.email}</span>
            </a>
            <a
              className="cta ghost"
              href={IDENTITY.linkedin}
              data-social="linkedin"
              rel="noopener noreferrer"
            >
              <i /><span>LinkedIn ↗</span>
            </a>
          </>
        </Reveal>
      </header>

      <div className="wrap cs-body">
        <section className="cs-block" id="working-together">
          <Reveal as="h2" className="cs-h2">What I&apos;m good for</Reveal>
          <div className="cs-pillars">
            <Reveal>
              <article className="cs-pillar tone-orange">
                <h3 className="cs-pillar-k">Business analysis</h3>
                <p className="small">
                  Requirement discovery, stakeholder facilitation, process modelling,
                  PRDs and data dictionaries — the work of turning an ambiguous
                  business problem into something a team can build.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="cs-pillar tone-cyan">
                <h3 className="cs-pillar-k">AI product design</h3>
                <p className="small">
                  AI workflow design, prompt and agent behaviour, structured output,
                  guardrails and evaluation — making model capability into a product
                  people can rely on.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.12}>
              <article className="cs-pillar tone-cyan">
                <h3 className="cs-pillar-k">Digital transformation</h3>
                <p className="small">
                  End-to-end delivery support from discovery and prototyping through
                  testing, documentation and handover.
                </p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="cs-block" id="details">
          <Reveal as="h2" className="cs-h2">Details</Reveal>
          <dl className="cs-snap-list">
            <div className="cs-snap-row">
              <dt className="mono">Email</dt>
              <dd><a className="link" href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a></dd>
            </div>
            <div className="cs-snap-row">
              <dt className="mono">Location</dt>
              <dd>{IDENTITY.location}</dd>
            </div>
            <div className="cs-snap-row">
              <dt className="mono">Availability</dt>
              <dd>Open to business analysis, AI product and digital transformation work</dd>
            </div>
            <div className="cs-snap-row">
              <dt className="mono">Response</dt>
              <dd>I answer everything</dd>
            </div>
          </dl>
        </section>
      </div>

      <nav className="cs-onward wrap" aria-label="Continue">
        <Link className="cs-back" href="/work">← All work</Link>
        <Link className="cta ghost" href="/"><i /><span>Return to orbit ↑</span></Link>
      </nav>
    </PageShell>
  );
}
