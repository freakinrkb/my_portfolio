import { getCodingStats } from "@/lib/stats";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

/**
 * Coding activity — live GitHub/LeetCode figures fetched at build time
 * (repos daily, commits hourly), falling back to resume numbers on failure.
 * Commit counts cover public events only.
 */
export async function Activity() {
  const stats = await getCodingStats();
  const commitsLabel =
    stats.commits30d.scope === "all" ? "Commits · last 30 days" : "Public commits · last 30 days";
  const tiles = [
    { value: stats.githubRepos.value, live: stats.githubRepos.live, label: "Public GitHub repos" },
    { value: stats.commits30d.value, live: stats.commits30d.live, label: commitsLabel },
    { value: stats.leetcodeSolved.value, live: stats.leetcodeSolved.live, label: "LeetCode problems solved" },
  ];

  return (
    <section aria-label="Coding activity" className="mt-14">
      <Reveal>
        <SectionHeading
          eyebrow="Activity"
          title="Consistency, measured"
          description="Contribution signals, refreshed at build time; resume numbers stand in if a service is unreachable."
        />
      </Reveal>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiles.map((t) => (
          <Reveal key={t.label} className="h-full">
            <div className="neu h-full rounded-xl px-6 py-5">
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
