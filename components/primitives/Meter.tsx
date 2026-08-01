"use client";

import { motion } from "framer-motion";

export default function Meter({ value, className = "meter" }: { value: number; className?: string }) {
  return (
    <span className={className}>
      <motion.i
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
