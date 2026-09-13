import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}${siteConfig.links.tools}`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}${siteConfig.links.categories}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.links.collections}`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}${siteConfig.links.compare}`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}${siteConfig.links.search}`,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}${siteConfig.links.submit}`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
