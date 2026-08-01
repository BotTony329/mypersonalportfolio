"use client";

import Reveal from "../primitives/Reveal";
import SplitHeading from "../primitives/SplitHeading";
import Pipeline from "./Pipeline";
import { CASE_AI } from "@/lib/content";

export default function CaseStudyAI() {
  return (
    <section id="case01" className="case-hero">
      <span className="sec-num" aria-hidden>02</span>
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">{CASE_AI.eyebrow}</Reveal>
          <SplitHeading lines={CASE_AI.title} />
          <Reveal className="case-kicker">
            <>{CASE_AI.kicker.map((k) => <span className="tag" key={k}>{k}</span>)}</>
          </Reveal>
        </div>

        <div className="blocks">
          {CASE_AI.blocks.map((b, i) => (
            <Reveal key={b.k} delay={i * 0.06} className={`block${b.tone === "blue" ? " b" : ""}`}>
              <><h4>{b.k}</h4><p>{b.body}</p></>
            </Reveal>
          ))}
        </div>

        <div className="sec-head" style={{ marginTop: "clamp(60px,9vw,140px)", marginBottom: 0 }}>
          <Reveal as="p" className="eyebrow b">Interactive Workflow · Scroll to Trace</Reveal>
          <Reveal as="h3" className="h3">The loop, end to end</Reveal>
        </div>

        <Pipeline steps={CASE_AI.workflow} />

        <div className="sec-head" style={{ marginTop: "clamp(60px,9vw,130px)", marginBottom: 0 }}>
          <Reveal as="p" className="eyebrow">System Architecture</Reveal>
        </div>

        <Reveal className="arch">
          <div className="arch-grid">
            {CASE_AI.architecture.map((l) => (
              <div className={`layer${l.tone === "blue" ? " b" : ""}`} key={l.k}>
                <h5>{l.k}</h5><p>{l.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="blocks" style={{ marginTop: "clamp(34px,5vw,64px)" }}>
          <Reveal className="block">
            <>
              <h4>My Role</h4>
              <p>
                End-to-end ownership from ambiguity to specification — sitting between
                what teachers actually need and what the model can reliably produce.
              </p>
              <div className="chips">
                {CASE_AI.role.map((r) => <span className="chip" key={r}>{r}</span>)}
              </div>
            </>
          </Reveal>
          <Reveal className="block b" delay={0.08}>
            <>
              <h4>Technology</h4>
              <ul>{CASE_AI.technology.map((t) => <li key={t}>{t}</li>)}</ul>
            </>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
