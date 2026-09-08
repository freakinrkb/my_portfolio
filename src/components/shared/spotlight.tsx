"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight wrapper — a cursor-tracking radial highlight (Linear-style).
 * Pure CSS var driven; no re-renders on mousemove. Wrap any Card with it.
 */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "group/spot relative h-full overflow-hidden rounded-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        "before:bg-[radial-gradient(320px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_srgb,var(--brand)_12%,transparent),transparent_70%)]",
        className
      )}
    >
      {children}
    </div>
  );
}
