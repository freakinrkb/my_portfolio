"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero backdrop — monochrome grid + single-hue emerald mesh glow + grain.
 * Glows drift slowly (GPU transforms only). Static when the user prefers
 * reduced motion.
 */
export function AnimatedBackground() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] overflow-hidden">
        <div className="bg-grid mask-fade-y absolute inset-0" />
        <div className="bg-glow-brand absolute inset-0" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] overflow-hidden">
      <div className="bg-grid mask-fade-y absolute inset-0" />
      <motion.div
        className="bg-glow-brand absolute -top-24 right-[6%] h-80 w-80 rounded-full blur-3xl"
        animate={{ x: [0, -32, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-glow-brand absolute -top-8 left-[2%] h-64 w-64 rounded-full blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, 16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="bg-glow-brand absolute top-40 left-[38%] h-52 w-52 rounded-full blur-3xl opacity-70"
        animate={{ x: [0, -18, 0], y: [0, -14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <div className="bg-noise absolute inset-0" />
    </div>
  );
}
