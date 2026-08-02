import Link from "next/link";
import Reveal from "../primitives/Reveal";
import SplitHeading from "../primitives/SplitHeading";
import ProjectCard from "../cards/ProjectCard";
import { FEATURED } from "@/content/projects";
import { ABOUT, JOURNEY, POSITIONING } from "@/lib/content";

/**
 * Homepage sections below the hero.
 *
 * These are deliberately short. The homepage's job is to establish who Tony
 * is and route the visitor to the right case study — every section here ends
 * in a link rather than continuing to explain.
 */

export function Positioning() {
  return (
    <section id="positioning">
      <span className="sec-num" aria-hidden>01</span>
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">{POSITIONING.eyebrow}</Reveal>
          <SplitHeading lines={POSITIONING.heading} />
          <Reveal as="p" className="lede">{POSITIONING.lede}</Reveal>
        </div>

        <div className="cs-pillars">
          {POSITIONING.pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.07}>
              <article className={`cs-pillar tone-${p.tone}`}>
                <h3 className="cs-pillar-k">{p.k}</h3>
                <p className="small">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SelectedMissions() {
  return (
    <section id="missions">
      <span className="sec-num" aria-hidden>02</span>
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">Selected Missions</Reveal>
          <SplitHeading lines={["Mission Control"]} />
          <Reveal as="p" className="lede">
            Six programmes across AI products, enterprise SaaS and product design.
            Each one starts as an ambiguous problem and ends as a system people use.
          </Reveal>
        </div>

        <div className="pcards">
          {FEATURED.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 4) * 0.07}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="section-cta" delay={0.1}>
          <Link className="cta ghost" href="/work"><i /><span>Open the mission archive →</span></Link>
        </Reveal>
      </div>
    </section>
  );
}

export function CopilotIntro() {
  return (
    <section id="copilot">
      <span className="sec-num" aria-hidden>04</span>
      <div className="wrap">
        <div className="copilot-grid">
          <div>
            <Reveal as="p" className="eyebrow b">Onboard Systems</Reveal>
            <div style={{ marginTop: "clamp(16px,2vw,28px)" }}>
              <SplitHeading lines={["Meet Moo,", "the co-pilot"]} />
            </div>
            <Reveal as="p" className="lede">
              Moo is a tuxedo-cat astronaut who has read the whole portfolio and
              nothing else. Ask her about a project, a method, or what Tony
              actually did on a delivery — she answers from the published case
              studies and says so plainly when something is not verified.
            </Reveal>
            <Reveal as="p" className="small copilot-note" delay={0.1}>
              She is bottom-right, permanently. Pet her enough times and she purrs.
              Ask her something manipulative and she hisses.
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="copilot-card">
              <span className="mono copilot-card-head">
                <i className="moo-signal live" aria-hidden />Co-pilot online
              </span>
              <p className="copilot-quote">
                &ldquo;Hi, I&apos;m Moo — Tony&apos;s AI co-pilot. Ask me about his
                projects, experience, or product approach.&rdquo;
              </p>
              <ul className="copilot-chips">
                <li>What kind of Business Analyst is Tony?</li>
                <li>How does the AI Teacher Growth Platform work?</li>
                <li>Which project shows end-to-end delivery?</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section id="about-preview">
      <span className="sec-num" aria-hidden>05</span>
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">The Journey</Reveal>
          <SplitHeading lines={ABOUT.heading} />
          <Reveal as="p" className="lede">{ABOUT.lede}</Reveal>
        </div>

        <Reveal className="arc" delay={0.06}>
          <ol className="arc-list mono">
            {JOURNEY.arc.map((phase, i) => (
              <li key={phase} className="arc-node">
                <span className="arc-n">{String(i + 1).padStart(2, "0")}</span>
                <span>{phase}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="about-preview-grid">
          {ABOUT.approach.slice(0, 3).map((a, i) => (
            <Reveal key={a.k} delay={i * 0.07}>
              <article className="approach-card">
                <h3 className="approach-k">{a.k}</h3>
                <p className="small">{a.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="section-cta" delay={0.1}>
          <>
            <Link className="cta ghost" href="/journey"><i /><span>The full journey →</span></Link>
            <Link className="cta ghost" href="/lab"><i /><span>Independent Product Lab →</span></Link>
          </>
        </Reveal>
      </div>
    </section>
  );
}
