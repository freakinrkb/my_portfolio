import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";

/** Static sitemap — update `SITE_URL` in layout.tsx once deployed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  const routes = ["", "/about", "/projects", "/experience", "/skills", "/achievements", "/resume", "/contact"];
  return [
    ...routes.map((route) => ({ url: `${base}${route || "/"}`, lastModified: new Date() })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: new Date() })),
  ];
}
