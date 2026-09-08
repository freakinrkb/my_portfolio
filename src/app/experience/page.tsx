import type { Metadata } from "next";
import { experience, profile } from "@/content/portfolio";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Experience",
  description: `Work experience of ${profile.name}.`,
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Experience"
        title="Where I've worked"
        description="Functional validation, quality evaluation, and backend development."
      />

      <div className="mt-8 space-y-5">
        {experience.map((job) => (
          <Reveal key={`${job.company}-${job.role}`}>
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <CardTitle>{job.role}</CardTitle>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>
                <p className="text-sm font-medium text-brand">
                  {job.company} · {job.location}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
