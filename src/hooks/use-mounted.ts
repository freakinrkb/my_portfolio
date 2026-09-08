"use client";

import { useEffect, useState } from "react";

/**
 * True only after client mount — prevents theme/hydration mismatch.
 * Initial render is `false` on both server and hydration pass, flipping
 * to `true` in a post-hydration effect (rAF callback keeps the
 * `react-hooks/set-state-in-effect` lint rule happy).
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}
