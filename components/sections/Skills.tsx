"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../primitives/Reveal";
import SplitHeading from "../primitives/SplitHeading";
import { SKILLS } from "@/lib/content";

const CX = 200, CY = 200, R = 152;

export default function Skills() {
  const [hot, setHot] = useState(-1);

  const geometry = useMemo(() =>
    SKILLS.map((s, i) => {
      const a = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2;
      const rr = R * (s.level / 100);
      return {
        ...s,
        x: CX + Math.cos(a) * rr,
        y: CY + Math.sin(a) * rr,
        lx: CX + Math.cos(a) * (R + 30),
        ly: CY + Math.sin(a) * (R + 30),
        anchor: (Math.cos(a) > 0.25 ? "start" : Math.cos(a) < -0.25 ? "end" : "middle") as "start" | "end" | "middle",
      };
    }), []);

  const polygon = geometry.map((g) => `${g.x.toFixed(1)},${g.y.toFixed(1)}`).join(" ");

  return (
    <section id="skills">
      <span className="sec-num" aria-hidden>04</span>
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">Systems Array</Reveal>
          <SplitHeading lines={["Capability Field"]} />
          <Reveal as="p" className="lede">
            Not a logo wall. The instruments actually flown — hover any node to isolate its signal.
          </Reveal>
        </div>

        <div className="skills-stage">
          <Reveal className="radar">
            <svg viewBox="-64 -44 528 488" role="img" aria-label="Skill radar visualisation">
              <defs>
                <radialGradient id="rg" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#ff7a1a" stopOpacity=".22" />
                  <stop offset="70%" stopColor="#4da3ff" stopOpacity=".05" />
                  <stop offset="100%" stopColor="#4da3ff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="sw" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff7a1a" stopOpacity=".55" />
                  <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0" />
                </linearGradient>
              </defs>

              <circle cx={CX} cy={CY} r="180" fill="url(#rg)" />
              <g stroke="rgba(120,160,220,.18)" fill="none">
                {[60, 105, 150].map((r) => <circle key={r} cx={CX} cy={CY} r={r} />)}
                <circle cx={CX} cy={CY} r="180" stroke="rgba(255,122,26,.25)" />
              </g>
              <g stroke="rgba(120,160,220,.12)">
                <line x1={CX} y1="20" x2={CX} y2="380" /><line x1="20" y1={CY} x2="380" y2={CY} />
                <line x1="73" y1="73" x2="327" y2="327" /><line x1="327" y1="73" x2="73" y2="327" />
              </g>

              <g className="sweep">
                <path d="M200 200 L200 20 A180 180 0 0 1 327 73 Z" fill="url(#sw)" />
              </g>

              <motion.polygon
                points={polygon} fill="rgba(255,122,26,.10)"
                stroke="rgba(255,122,26,.65)" strokeWidth="1"
                initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "200px 200px" }}
              />

              {geometry.map((g, i) => (
                <g className={`skill-node${hot === i ? " on" : ""}`} key={g.name}
                   onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(-1)}>
                  <line x1={CX} y1={CY} x2={g.x} y2={g.y} stroke="rgba(255,122,26,.22)" strokeWidth="1" />
                  <circle cx={g.x} cy={g.y} r="3.4" fill="#ff7a1a" />
                  <motion.circle
                    cx={g.x} cy={g.y} r="3.4" fill="none" stroke="#ff7a1a" strokeOpacity=".5"
                    animate={{ r: [3.4, 13], opacity: [0.55, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.26, ease: "easeOut" }}
                  />
                  <circle className="hit" cx={g.lx} cy={g.ly} r="30" />
                  <text x={g.lx} y={g.ly + 3} textAnchor={g.anchor}>{g.name}</text>
                </g>
              ))}
            </svg>
          </Reveal>

          <Reveal className="skill-list" delay={0.1}>
            <>
              {SKILLS.map((s, i) => (
                <div className={`srow${hot === i ? " on" : ""}`} key={s.name}
                     onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(-1)}>
                  <span className="k">{String(i + 1).padStart(2, "0")}</span>
                  <span className="n">
                    {s.name}
                    <span style={{
                      display: "block", fontFamily: "var(--mono)", fontSize: 10,
                      letterSpacing: ".14em", color: "var(--ink-faint)",
                      textTransform: "uppercase", marginTop: 6,
                    }}>{s.note}</span>
                  </span>
                  <span className="lv">
                    <span className="track">
                      <motion.i initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
                    </span>
                    <em>{s.level}</em>
                  </span>
                </div>
              ))}
            </>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
