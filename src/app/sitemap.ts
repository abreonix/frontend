import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abronyx.in";

  // Public pages only
  const staticRoutes = [
    "",             // Home
    "about",
    "about-us",
    "courses",
    "testimonials",
  ];

  // Course pages
  const courseRoutes = [
    "one-year-diploma",
    "six-months-diploma",
    "three-months-basic",
  ];

  return [
    // Static pages
    ...staticRoutes.map((route) => ({
      url: `${base}/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // Courses
    ...courseRoutes.map((route) => ({
      url: `${base}/courses/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
