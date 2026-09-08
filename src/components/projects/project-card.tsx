import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { Spotlight } from "@/components/shared/spotlight";
import { Reveal } from "@/components/shared/reveal";

/**
 * Reusable project card — visual thumbnail, spotlight hover, case-study link.
 * Links with `href === "#"` render as plain text (no guessed URLs).
 */
export function ProjectCard({ project }: { project: Project }) {
  const hasRepo = project.githubUrl !== "#";
  const hasLive = project.liveUrl !== "#";

  return (
    <Reveal className="h-full">
      <Spotlight>
        <Card className="neu flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="px-4 pt-4">
            <ProjectVisual slug={project.slug} />
          </div>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.tagline}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="gap-4 text-sm font-medium">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-brand hover:underline"
            >
              Case study <ArrowRight size={14} aria-hidden />
            </Link>
            {hasRepo ? (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-brand"
              >
                GitHub <ArrowUpRight size={14} aria-hidden />
              </Link>
            ) : (
              <span className="text-muted-foreground">GitHub soon</span>
            )}
            {hasLive && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-brand"
              >
                Live demo <ArrowUpRight size={14} aria-hidden />
              </Link>
            )}
          </CardFooter>
        </Card>
      </Spotlight>
    </Reveal>
  );
}
