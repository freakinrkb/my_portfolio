import { Badge } from "@/components/ui/badge";

/**
 * Infinite tech marquee — content duplicated 2x for a seamless loop.
 * Pauses on hover/focus; static wrap when reduced motion is preferred
 * (handled by disabling the animation in CSS).
 */
export function TechMarquee({ items }: { items: string[] }) {
  return (
    <div className="marquee-paused marquee-mask overflow-hidden" role="list" aria-label="Tech stack">
      <div className="animate-marquee flex w-max gap-2 pr-2">
        {[...items, ...items].map((t, i) => (
          <Badge key={`${t}-${i}`} variant="secondary" role="listitem" aria-hidden={i >= items.length}>
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
}
