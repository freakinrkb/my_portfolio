import { cn } from "@/lib/utils";

/**
 * Monogram avatar — stylized initials in an emerald gradient tile.
 * Used in place of a photo until one is provided.
 */
export function Monogram({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold tracking-tight text-white",
        "bg-gradient-to-br from-emerald-400 to-emerald-700 dark:from-emerald-300 dark:to-emerald-600",
        "shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] ring-1 ring-emerald-500/30",
        className
      )}
    >
      {initials}
    </span>
  );
}
