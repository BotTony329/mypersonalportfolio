"use client";

import Reveal from "../primitives/Reveal";
import SplitHeading from "../primitives/SplitHeading";
import { CASE_ENTERPRISE } from "@/lib/content";

export default function CaseStudyEnterprise() {
  return (
    <section id="case02" className="case-hero">
      <span className="sec-num" aria-hidden>03</span>
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">{CASE_ENTERPRISE.eyebrow}</Reveal>
          <SplitHeading lines={CASE_ENTERPRISE.title} />
          <Reveal className="case-kicker">
            <>{CASE_ENTERPRISE.kicker.map((k) => <span className="tag" key={k}>{k}</span>)}</>
          </Reveal>
        </div>

        <div className="blocks">
          {CASE_ENTERPRISE.blocks.map((b, i) => (
            <Reveal key={b.k} delay={i * 0.06} className={`block${b.tone === "blue" ? " b" : ""}`}>
              <><h4>{b.k}</h4><p>{b.body}</p></>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
