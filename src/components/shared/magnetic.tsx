"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Magnetic wrapper — gently pulls its child toward the cursor.
 * Desktop pointers only; inert for touch and reduced motion.
 */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.18,
      y: (e.clientY - rect.top - rect.height / 2) * 0.28,
    });
  }

  if (reduce) return <div className="inline-block">{children}</div>;

  return (
    <motion.div
      className="inline-block"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}
