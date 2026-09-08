import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/shared/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.tagline };
}

function CaseSection({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hasRepo = project.githubUrl !== "#";
  const hasLive = project.liveUrl !== "#";

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects">
            <ArrowLeft aria-hidden /> All projects
          </Link>
        </Button>
      </Reveal>

      <Reveal>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand">Case study</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-muted-foreground">{project.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-sm font-medium">
          {hasRepo ? (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-brand hover:underline"
            >
              GitHub <ArrowUpRight size={14} aria-hidden />
            </Link>
          ) : (
            <span className="text-muted-foreground">GitHub link coming soon</span>
          )}
          {hasLive && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-brand hover:underline"
            >
              Live demo <ArrowUpRight size={14} aria-hidden />
            </Link>
          )}
        </div>
      </Reveal>

      <Reveal>
        <ProjectVisual slug={project.slug} className="mt-6" />
      </Reveal>

      <Separator className="my-8" />

      <Reveal>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <CaseSection title="Architecture" body={project.architecture} />
            <CaseSection title="Challenges" body={project.challenges} />
            <CaseSection title="Learnings" body={project.learnings} />
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
