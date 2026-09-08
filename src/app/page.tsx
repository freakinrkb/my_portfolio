"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CodeXml,
  FolderGit,
  Mail,
  MapPin,
  Terminal,
  Trophy,
} from "lucide-react";
import { profile, socials, techStack } from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/home/animated-background";
import { Reveal } from "@/components/shared/reveal";

const SOCIAL_ICONS: Record<string, typeof FolderGit> = {
  GitHub: FolderGit,
  LinkedIn: Briefcase,
  LeetCode: CodeXml,
  Codeforces: Trophy,
  CodeChef: Terminal,
  GeeksforGeeks: BookOpen,
};

const STATS = [
  { value: "2 yrs", label: "Software validation & backend experience" },
  { value: "500+", label: "Algorithmic problems solved" },
  { value: "1900+", label: "LeetCode rating" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.65, 0.35, 1] as const } },
};

/**
 * Home — staggered hero over an animated emerald-glow backdrop,
 * stats from the resume, tech-stack preview. Full project/timeline
 * sections land with the remaining routes.
 */
export default function Home() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-16 sm:px-6 sm:py-24">
      <AnimatedBackground />

      <motion.section
        aria-labelledby="intro-heading"
        className="relative max-w-2xl"
        variants={reduce ? undefined : container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
      >
        <motion.div variants={reduce ? undefined : item}>
          <Badge variant="secondary" className="gap-2 border-brand/30">
            <span aria-hidden className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            {profile.availability}
          </Badge>
        </motion.div>

        <motion.h1
          id="intro-heading"
          variants={reduce ? undefined : item}
          className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p variants={reduce ? undefined : item} className="mt-3 text-lg font-medium text-brand">
          {profile.title}
        </motion.p>

        <motion.p variants={reduce ? undefined : item} className="mt-4 leading-relaxed text-muted-foreground">
          {profile.bio}
        </motion.p>

        <motion.p
          variants={reduce ? undefined : item}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <MapPin size={14} aria-hidden /> {profile.location}
          <span aria-hidden className="mx-1">
            ·
          </span>
          <Mail size={14} aria-hidden /> {profile.email}
        </motion.p>

        <motion.div variants={reduce ? undefined : item} className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/projects">
              View projects <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/resume">Resume</Link>
          </Button>
        </motion.div>

        <motion.ul
          variants={reduce ? undefined : item}
          className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground"
          aria-label="Profiles"
        >
          {socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.label] ?? CodeXml;
            return (
              <li key={s.label}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
                >
                  <Icon size={15} aria-hidden />
                  <span className="font-medium text-foreground">{s.label}</span> {s.username}
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </motion.section>

      <Reveal className="mt-14">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-5">
              <dt className="order-2 mt-1 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight text-brand">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-8">
        <section aria-label="Tech stack preview">
          <Card>
            <CardContent className="flex flex-wrap gap-2 p-6">
              {techStack.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </section>
      </Reveal>
    </div>
  );
}
