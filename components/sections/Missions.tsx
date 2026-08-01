"use client";

import Reveal from "../primitives/Reveal";
import SplitHeading from "../primitives/SplitHeading";
import Counter from "../primitives/Counter";
import Meter from "../primitives/Meter";
import { MISSIONS, TELEMETRY } from "@/lib/content";

export default function Missions() {
  return (
    <section id="missions">
      <span className="sec-num" aria-hidden>01</span>
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">Mission Overview</Reveal>
          <SplitHeading lines={["Mission Control"]} />
          <Reveal as="p" className="lede">
            Two active flight programs. Each one starts as an ambiguous business
            problem and ends as a system people actually use.
          </Reveal>
        </div>

        <div className="missions">
          {MISSIONS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.08}>
              <a className="mission" href={m.href}>
                <span className="m-id">{m.id}</span>
                <span className="m-body">
                  <span className="m-title">{m.title}</span>
                  <span className="m-tags">
                    {m.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </span>
                </span>
                <span className="m-status">
                  <span className={`badge ${m.status === "active" ? "active" : "done"}`}>
                    <i className="dot" style={m.status === "completed"
                      ? { background: "var(--blue)", boxShadow: "0 0 8px var(--blue)" } : undefined} />
                    {m.statusLabel}
                  </span>
                  <Meter value={m.progress} />
                  <span style={{ color: "var(--ink-faint)" }}>{m.phase}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="telemetry">
          <>
            {TELEMETRY.map((t) => (
              <div className="tcell" key={t.label}>
                <Counter to={t.value} />
                <span>{t.label}</span>
              </div>
            ))}
          </>
        </Reveal>
      </div>
    </section>
  );
}
