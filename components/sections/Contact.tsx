"use client";

import Reveal from "../primitives/Reveal";
import SplitHeading from "../primitives/SplitHeading";
import { IDENTITY } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact">
      <span className="sec-num" aria-hidden>05</span>
      <div className="wrap">
        <Reveal as="p" className="eyebrow">Open Channel</Reveal>

        <div style={{ marginTop: "clamp(20px,3vw,40px)" }}>
          <SplitHeading
            lines={["Let's build the next", "intelligent system."]}
            className="contact-title" glow
          />
        </div>

        <Reveal as="p" className="lede">
          Available for business analysis, AI product design and digital transformation
          work. Send a signal — I answer everything.
        </Reveal>

        <Reveal className="contact-actions" delay={0.1}>
          <>
            <a className="cta" href={`mailto:${IDENTITY.email}`}><i /><span>{IDENTITY.email}</span></a>
            <a className="cta ghost" href={IDENTITY.linkedin}><i /><span>LinkedIn ↗</span></a>
            <a className="cta ghost" href="#hero"><i /><span>Return to Orbit ↑</span></a>
          </>
        </Reveal>

        <footer>
          <span>© {new Date().getFullYear()} {IDENTITY.name}</span>
          <span>Designed &amp; built from first principles</span>
          <span>{IDENTITY.location}</span>
        </footer>
      </div>
    </section>
  );
}
