import Link from "next/link";
import { profile, socials } from "@/content/portfolio";
import { Separator } from "@/components/ui/separator";

/** Minimal footer — sitemap + socials + copyright. */
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
          <ul className="flex gap-4 text-sm text-muted-foreground">
            {socials.map((s) => (
              <li key={s.label}>
                <Link href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6" />
        <p className="text-xs text-muted-foreground">
          © {year} {profile.name} · Built with Next.js · Phase 1 scaffold
        </p>
      </div>
    </footer>
  );
}
