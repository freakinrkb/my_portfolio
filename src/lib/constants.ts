/**
 * Site-wide constants. Edit content in `src/content/portfolio.ts` instead —
 * this file only holds navigation, routes, and structural config.
 */

export const SITE_ROUTES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/achievements", label: "Achievements" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const MAX_WIDTH = "max-w-5xl";
