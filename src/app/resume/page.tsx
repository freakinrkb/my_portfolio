import type { Metadata } from "next";
import { Download, Mail, MapPin } from "lucide-react";
import { education, experience, profile, skills } from "@/content/portfolio";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.title}.`,
};

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Resume"
        title={profile.name}
        description={`${profile.title} · ${profile.location}`}
      />

      <Reveal className="mt-6 flex flex-wrap items-center gap-3">
        <Button disabled aria-describedby="resume-note">
          <Download aria-hidden /> Download PDF
        </Button>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Mail size={14} aria-hidden /> {profile.email}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} aria-hidden /> {profile.location}
        </span>
      </Reveal>
      <p id="resume-note" className="mt-2 text-xs text-muted-foreground">
        PDF coming soon — drop your resume file in <code>public/</code> and this button will link to it.
      </p>

      <Separator className="my-8" />

      <Reveal>
        <section aria-label="Summary">
          <h2 className="text-lg font-semibold tracking-tight">Summary</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
        </section>
      </Reveal>

      <Reveal>
        <section aria-label="Resume experience" className="mt-8">
          <h2 className="text-lg font-semibold tracking-tight">Experience</h2>
          {experience.map((job) => (
            <Card key={job.company} className="mt-3">
              <CardHeader>
                <CardTitle className="text-base">
                  {job.role} — {job.company}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {job.period} · {job.location}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section aria-label="Resume education" className="mt-8">
          <h2 className="text-lg font-semibold tracking-tight">Education</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {education.map((e) => (
              <li key={e.school}>
                <span className="font-medium text-foreground">{e.school}</span> — {e.degree} ({e.period},{" "}
                {e.detail})
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section aria-label="Resume skills" className="mt-8">
          <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
          <div className="mt-3 space-y-3">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <p className="text-sm font-medium">{group}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {items.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
