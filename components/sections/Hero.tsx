"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/lib/content";

const CHAR = {
  hidden: { y: "118%", opacity: 0 },
  shown: (i: number) => ({
    y: "0%", opacity: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.028 },
  }),
};

export default function Hero() {
  const name = Array.from(IDENTITY.name);
  return (
    <section id="hero">
      <div className="reticle r1">TZ-100 · Neural Accelerator<br />8192 Cores · 96GB HBM</div>
      <div className="reticle r2">Core Clock 2.41 GHz<br />Thermals Nominal</div>

      <div className="wrap hero-grid">
        <div className="hero-title">
          <motion.p className="eyebrow"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}>
            Portfolio Transmission · MMXXVI
          </motion.p>

          <h1 className="display glow-o" style={{ marginTop: ".22em" }}>
            <span className="line-mask">
              <span style={{ display: "inline-block" }}>
                {name.map((c, i) => (
                  <motion.span className="char" key={i} custom={i}
                    variants={CHAR} initial="hidden" animate="shown">
                    {c === " " ? " " : c}
                  </motion.span>
                ))}
              </span>
            </span>
          </h1>

          <motion.div className="roles" style={{ marginTop: "clamp(16px,2vw,28px)" }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1.1 }}>
            {IDENTITY.roles.map((r, i) => (
              <span key={r} style={{ display: "contents" }}>
                <span>{r}</span>{i < IDENTITY.roles.length - 1 && <i />}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div className="hero-bottom"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.2 }}>
          <p className="hero-head">
            {IDENTITY.headline[0]}<br />{IDENTITY.headline[1]}
          </p>
          <div className="hero-meta">
            <div className="metarow"><span>Discipline</span><b>BA / AI Product</b></div>
            <div className="metarow"><span>Active Missions</span><b>02</b></div>
            <div className="metarow"><span>Status</span><b className="o">Open to Work</b></div>
          </div>
        </motion.div>
      </div>

      <a className="scrollcue" href="#missions" aria-label="Scroll to missions">
        <span>Scroll</span><span className="tube"><i /></span>
      </a>
    </section>
  );
}
