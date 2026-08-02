import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/primitives/Reveal";
import SplitHeading from "@/components/primitives/SplitHeading";
import { ABOUT, IDENTITY, SKILLS } from "@/lib/content";

export const metadata: Metadata = {
  title: `About | ${IDENTITY.name}`,
  description:
    "Tony Zhao is a Business Analyst and AI Product Designer working across enterprise SaaS delivery, AI product design and digital transformation. Profile, capabilities, experience and approach.",
  openGraph: {
    title: `About | ${IDENTITY.name}`,
    description: "Business analyst and AI product designer — profile, capabilities and approach.",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <header className="page-hero wrap">
        <Reveal as="p" className="eyebrow">{ABOUT.eyebrow}</Reveal>
        <SplitHeading lines={ABOUT.heading} />
        <Reveal as="p" className="lede page-hero-lede">{ABOUT.lede}</Reveal>
      </header>

      <div className="wrap cs-body">
        <section className="cs-block" id="profile">
          <Reveal as="h2" className="cs-h2">Profile</Reveal>
          <div className="cs-prose">
            {ABOUT.intro.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.06} className="cs-p">{p}</Reveal>
            ))}
          </div>
        </section>

        <section className="cs-block" id="approach">
          <Reveal as="h2" className="cs-h2">Approach</Reveal>
          <div className="cs-features">
            {ABOUT.approach.map((a, i) => (
              <Reveal key={a.k} delay={i * 0.05}>
                <article className="cs-feature">
                  <h3 className="cs-feature-k">{a.k}</h3>
                  <p className="small">{a.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="cs-block" id="capabilities">
          <Reveal as="h2" className="cs-h2">Capabilities</Reveal>
          <div className="cap-grid">
            {ABOUT.capabilities.map((c, i) => (
              <Reveal key={c.k} delay={Math.min(i, 6) * 0.05}>
                <article className="cap-card">
                  <h3 className="mono cap-k">{c.k}</h3>
                  <ul>
                    {c.items.map((it) => <li className="small" key={it}>{it}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="cs-block" id="strengths">
          <Reveal as="h2" className="cs-h2">Core strengths</Reveal>
          <ul className="cs-list dense">
            {SKILLS.map((s, i) => (
              <Reveal as="li" key={s.name} delay={Math.min(i, 8) * 0.04} className="cs-li">
                <span className="cs-li-n mono" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <span><strong>{s.name}</strong> — {s.note}</span>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="cs-block" id="experience">
          <Reveal as="h2" className="cs-h2">Experience</Reveal>
          <ol className="cs-flow timeline">
            {ABOUT.experience.map((e, i) => (
              <Reveal as="li" key={e.title} delay={Math.min(i, 6) * 0.05} className="cs-step">
                <span className="cs-step-rail" aria-hidden><i className="cs-step-dot" /></span>
                <span className="cs-step-body">
                  <span className="cs-step-n mono">{e.period}</span>
                  {e.href
                    ? <Link className="cs-step-name link" href={e.href}>{e.title} →</Link>
                    : <span className="cs-step-name">{e.title}</span>}
                  <span className="mono cs-step-role">{e.role}</span>
                  <span className="small">{e.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="cs-block" id="education">
          <Reveal as="h2" className="cs-h2">Education</Reveal>
          <ol className="cs-flow timeline">
            {ABOUT.education.map((e, i) => (
              <Reveal as="li" key={e.title} delay={Math.min(i, 5) * 0.05} className="cs-step">
                <span className="cs-step-rail" aria-hidden><i className="cs-step-dot" /></span>
                <span className="cs-step-body">
                  <span className="cs-step-n mono">{e.period}</span>
                  <span className="cs-step-name">{e.title}</span>
                  <span className="mono cs-step-role">{e.org}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </section>
      </div>

      <nav className="cs-onward wrap" aria-label="Continue">
        <Link className="cs-back" href="/journey">← The journey</Link>
        <Link className="cta ghost" href="/lab"><i /><span>Product Lab →</span></Link>
        <Link className="cta" href="/contact"><i /><span>Start a conversation →</span></Link>
      </nav>
    </PageShell>
  );
}
