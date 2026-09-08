"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero backdrop — monochrome grid + single emerald radial glow.
 * The glow drifts slowly (once-only friendly, GPU transform only).
 * Static render when the user prefers reduced motion.
 */
export function AnimatedBackground() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden">
        <div className="bg-grid mask-fade-y absolute inset-0" />
        <div className="bg-glow-brand absolute inset-0" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden">
      <div className="bg-grid mask-fade-y absolute inset-0" />
      <motion.div
        className="bg-glow-brand absolute -top-24 right-[8%] h-72 w-72 rounded-full blur-3xl"
        animate={{ x: [0, -28, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-glow-brand absolute -top-10 left-[4%] h-56 w-56 rounded-full blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
