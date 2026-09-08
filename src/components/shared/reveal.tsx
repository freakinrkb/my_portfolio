"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

/**
 * Subtle once-only reveal. Respects prefers-reduced-motion.
 * Keep animations restrained — Linear/Vercel style.
 */
export function Reveal({ children, delay = 0, className, y = 12 }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.65, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
