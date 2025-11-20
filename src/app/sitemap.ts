import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abronyx.in";

  const staticRoutes = [
    "",
    "about",
    "about-us",
    "admin",
    "courses",
    "testimonials",
  ];

  const courseRoutes = [
    "one-year-diploma",
    "six-months-diploma",
    "three-months-basic",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...courseRoutes.map((route) => ({
      url: `${base}/courses/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
