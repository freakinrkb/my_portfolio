import type { Metadata } from "next";
import { profile, skills } from "@/content/portfolio";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/shared/spotlight";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technical skills of ${profile.name} — Java, Spring Boot, Node.js, SQL and more.`,
};

export default function SkillsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Skills"
        title="What I work with"
        description="Payments and backend development, databases, and quality-driven engineering practices."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {Object.entries(skills).map(([group, items]) => (
          <Reveal key={group} className="h-full">
            <Spotlight>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base">
                  {group}{" "}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">({items.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
