import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/content/portfolio";
import { Hero } from "@/components/home/hero";
import { Activity } from "@/components/home/activity";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

/**
 * Home — hero, featured projects, live coding activity.
 * Hero is client (motion); the rest streams from the server.
 */
export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <Hero />

      <section aria-label="Featured projects" className="mt-14">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Selected work" title="Featured projects" />
            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              All projects <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <hr className="hr-fade mt-14" aria-hidden />

      <Activity />
    </div>
  );
}
