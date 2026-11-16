import type { MetadataRoute } from "next";
import resume from "@/data/resume.json";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: resume.lastUpdated, changeFrequency: "monthly", priority: 1 },
  ];
}
