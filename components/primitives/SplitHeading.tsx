"use client";

import { motion } from "framer-motion";

/**
 * Per-character mask reveal. Lines are authored as an array so the mask never
 * has to guess where a <br> was meant to be.
 */
export default function SplitHeading({
  lines, className = "h2", glow = false, delay = 0,
}: { lines: readonly string[]; className?: string; glow?: boolean; delay?: number }) {
  let index = 0;
  return (
    <h2 className={`${className}${glow ? " glow-o" : ""}`}>
      {lines.map((line) => (
        <span className="line-mask" key={line}>
          <span style={{ display: "inline-block" }}>
            {Array.from(line).map((ch, i) => {
              const d = delay + index++ * 0.022;
              return (
                <motion.span
                  className="char"
                  key={`${line}-${i}`}
                  initial={{ y: "115%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -14% 0px" }}
                  transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: d }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              );
            })}
          </span>
        </span>
      ))}
    </h2>
  );
}
