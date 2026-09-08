import { getCodingStats } from "@/lib/stats";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

/**
 * Coding activity — live GitHub/LeetCode figures fetched at build time
 * (revalidated daily), falling back to resume numbers on any failure.
 */
export async function Activity() {
  const stats = await getCodingStats();
  const tiles = [
    { value: stats.githubRepos.value, live: stats.githubRepos.live, label: "Public GitHub repos" },
    { value: stats.githubFollowers.value, live: stats.githubFollowers.live, label: "GitHub followers" },
    { value: stats.leetcodeSolved.value, live: stats.leetcodeSolved.live, label: "LeetCode problems solved" },
    { value: stats.leetcodeRating.value, live: false, label: "LeetCode rating (contest peak)" },
  ];

  return (
    <section aria-label="Coding activity" className="mt-14">
      <Reveal>
        <SectionHeading
          eyebrow="Activity"
          title="Consistency, measured"
          description="Live figures refresh daily at build time; resume numbers stand in if a service is unreachable."
        />
      </Reveal>
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
        {tiles.map((t) => (
          <Reveal key={t.label}>
            <div className="h-full bg-card px-6 py-5">
              <p className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-brand">
                {t.value}
                {t.live && (
                  <span className="rounded-full bg-brand-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                    live
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{t.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
