import type { Metadata } from "next";
import { profile, projects } from "@/content/portfolio";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects by ${profile.name} — payment backends and full-stack applications.`,
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        description="Payment infrastructure and full-stack apps — each with architecture, challenges, and learnings."
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
