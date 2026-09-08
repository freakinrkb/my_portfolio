import type { Metadata } from "next";
import { Award } from "lucide-react";
import { achievements, profile } from "@/content/portfolio";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Achievements",
  description: `Achievements and certifications of ${profile.name}.`,
};

export default function AchievementsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Achievements"
        title="Proof of work"
        description="Certifications, competitive programming, and academic milestones."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {achievements.map((a) => (
          <Reveal key={a.title}>
            <Card className="h-full">
              <CardHeader className="flex-row items-start gap-3 space-y-0">
                <span className="rounded-md bg-brand-soft p-2 text-brand" aria-hidden>
                  <Award size={18} />
                </span>
                <CardTitle className="text-base leading-snug">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">{a.detail}</CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
