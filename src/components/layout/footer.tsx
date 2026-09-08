"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile, socials } from "@/content/portfolio";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

/** Footer — sitemap, socials, back-to-top, copyright. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{profile.name}</p>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {socials.map((s) => (
              <li key={s.label}>
                <Link href={s.href} target="_blank" rel="noreferrer" className="hover:text-brand">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6" />
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name} · Built with Next.js, Tailwind & shadcn/ui
          </p>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp aria-hidden />
          </Button>
        </div>
      </div>
    </footer>
  );
}
