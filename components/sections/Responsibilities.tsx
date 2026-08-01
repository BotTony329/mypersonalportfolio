"use client";

import Reveal from "../primitives/Reveal";
import { CASE_ENTERPRISE } from "@/lib/content";

export default function Responsibilities() {
  return (
    <section id="resp" style={{ paddingTop: "clamp(50px,7vh,90px)" }}>
      <div className="wrap">
        <Reveal as="p" className="eyebrow">Responsibilities Owned</Reveal>
        <Reveal className="matrix">
          <>
            {CASE_ENTERPRISE.responsibilities.map((r, i) => (
              <div className="mcell" key={r}>
                <em>R{String(i + 1).padStart(2, "0")}</em><span>{r}</span>
              </div>
            ))}
          </>
        </Reveal>
      </div>
    </section>
  );
}
