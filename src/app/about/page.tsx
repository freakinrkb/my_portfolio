import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { education, profile } from "@/content/portfolio";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — ${profile.title}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader eyebrow="About" title={profile.name} description={profile.bio} />

      <Reveal className="mt-8">
        <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin size={14} aria-hidden /> {profile.location} · {profile.availability}
        </p>
      </Reveal>

      <section aria-label="Education" className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Education</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {education.map((e) => (
            <Reveal key={e.school}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-base">{e.school}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{e.degree}</p>
                  <p className="mt-1">
                    {e.period} · {e.detail}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
