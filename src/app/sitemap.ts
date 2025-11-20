import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const mainBase = "https://abronyx.in";
  const subBase = "https://teameklavya.abronyx.in";

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

  const routes: MetadataRoute.Sitemap = [
    
    ...staticRoutes.map((route) => ({
      url: `${mainBase}/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    
    ...courseRoutes.map((route) => ({
      url: `${mainBase}/courses/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

   
    {
      url: subBase,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  return routes;
}
