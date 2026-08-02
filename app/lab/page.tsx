import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/primitives/Reveal";
import SplitHeading from "@/components/primitives/SplitHeading";
import { IDENTITY, LAB } from "@/lib/content";

export const metadata: Metadata = {
  title: `Independent Product Lab | ${IDENTITY.name}`,
  description:
    "Real products built independently and funded by part-time work rather than salary or investment — AI SaaS, an Etsy storefront, e-commerce experiments and prototypes. Earn, invest, build, launch, learn, improve.",
  openGraph: {
    title: `Independent Product Lab | ${IDENTITY.name}`,
    description: "Self-funded products, shipped after work. No investment, no backing.",
    type: "website",
  },
};

export default function LabPage() {
  return (
    <PageShell>
      <header className="page-hero wrap">
        <Reveal as="p" className="eyebrow">{LAB.eyebrow}</Reveal>
        <SplitHeading lines={LAB.heading} />
        <Reveal as="p" className="lede page-hero-lede">{LAB.lede}</Reveal>
      </header>

      <div className="wrap cs-body">
        <section className="cs-block" id="cycle">
          <Reveal as="h2" className="cs-h2">The cycle</Reveal>
          <Reveal as="p" className="lede cs-intro">
            Six steps that keep repeating. The first one is the reason the other five
            are possible.
          </Reveal>
          <ol className="cycle">
            {LAB.cycle.map((c, i) => (
              <Reveal as="li" key={c.k} delay={i * 0.05} className="cycle-step">
                <span className="cycle-n mono">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="cycle-k">{c.k}</h3>
                <p className="small">{c.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="cs-block" id="products">
          <Reveal as="h2" className="cs-h2">What came out of it</Reveal>
          <div className="cs-features">
            {LAB.products.map((p, i) => {
              const body = (
                <>
                  <span className="lab-status mono">{p.status}</span>
                  <h3 className="cs-feature-k">{p.k}</h3>
                  <p className="small">{p.body}</p>
                  {p.href ? <span className="lab-go mono">Open →</span> : null}
                </>
              );
              return (
                <Reveal key={p.k} delay={Math.min(i, 6) * 0.05}>
                  {p.href ? (
                    "external" in p && p.external ? (
                      <a className="cs-feature lab-card" href={p.href} target="_blank" rel="noopener noreferrer">
                        {body}
                      </a>
                    ) : (
                      <Link className="cs-feature lab-card" href={p.href}>{body}</Link>
                    )
                  ) : (
                    <article className="cs-feature lab-card">{body}</article>
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="cs-block" id="principles">
          <Reveal as="h2" className="cs-h2">What building alone teaches</Reveal>
          <div className="cs-pillars">
            {LAB.principles.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.06}>
                <article className={`cs-pillar tone-${i % 2 ? "cyan" : "orange"}`}>
                  <h3 className="cs-pillar-k">{p.k}</h3>
                  <p className="small">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="cs-block" id="funding">
          <Reveal>
            <aside className="cs-note tone-orange">
              <h2 className="cs-note-k mono">How this was funded</h2>
              <p className="small">
                Every product on this page was paid for with income from part-time
                warehouse and forklift work, taken on alongside study and full-time
                roles. No venture funding, no investment, and no commercial backing
                was involved at any point.
              </p>
            </aside>
          </Reveal>
        </section>
      </div>

      <nav className="cs-onward wrap" aria-label="Continue">
        <Link className="cs-back" href="/journey">← The journey</Link>
        <Link className="cta ghost" href="/work"><i /><span>All work →</span></Link>
        <Link className="cta" href="/contact"><i /><span>Start a conversation →</span></Link>
      </nav>
    </PageShell>
  );
}
