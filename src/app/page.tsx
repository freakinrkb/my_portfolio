import Link from "next/link";
import { ArrowRight, AtSign, Briefcase, FolderGit } from "lucide-react";
import { profile, socials, techStack } from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Phase 1 home — structural placeholder proving layout + theme + tokens.
 * Full hero, featured projects, timeline etc. land in Phase 3.
 */
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6">
      <div className="bg-grid mask-fade-y pointer-events-none absolute inset-x-0 top-0 h-72" aria-hidden />

      <section aria-labelledby="intro-heading" className="relative max-w-2xl">
        <Badge>Phase 1 · Design system ready</Badge>
        <h1 id="intro-heading" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{profile.title}</p>
        <p className="mt-4 text-muted-foreground">{profile.bio}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/projects">
              View projects <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground" aria-label="Social links">
          {socials.map((s) => (
            <li key={s.label}>
              <Link href={s.href} className="inline-flex items-center gap-1.5 hover:text-foreground">
                {s.label === "GitHub" && <FolderGit size={16} aria-hidden />}
                {s.label === "LinkedIn" && <Briefcase size={16} aria-hidden />}
                {s.label === "X" && <AtSign size={16} aria-hidden />}
                {s.username}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Tech stack preview" className="mt-12">
        <Card>
          <CardContent className="flex flex-wrap gap-2 p-6">
            {techStack.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <p className="mt-4 text-sm text-muted-foreground">
          Next: Phase 2 builds the remaining routes (about, projects, experience, skills, achievements, resume,
          contact). Replace all bracketed text in <code>src/content/portfolio.ts</code>.
        </p>
      </section>
    </div>
  );
}
