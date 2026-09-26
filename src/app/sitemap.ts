import type { MetadataRoute } from "next";
import { getSiteUrl, projects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return [{ url: siteUrl, priority: 1 }, ...projects.map(project => ({ url: `${siteUrl}/work/${project.slug}`, priority: 0.8 }))];
}
