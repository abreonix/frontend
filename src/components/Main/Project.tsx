"use client";

import CardSwap, { Card } from "../CardSwap";
import Image from "next/image";

type ProjectItem = {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
};

export default function Project() {
  /* ================= PROJECT DATA ================= */
  const projects: ProjectItem[] = [
    {
      id: 1,
      name: "Alpha",
      title: "AI Automation",
      description: "AI-powered automation solution.",
      image: "/projects/alpha.jpg",
    },
    {
      id: 2,
      name: "Beta",
      title: "Fintech Platform",
      description: "Next-gen fintech platform.",
      image: "/projects/beta.jpg",
    },
    {
      id: 3,
      name: "Gamma",
      title: "IoT Systems",
      description: "IoT & smart devices integration.",
      image: "/projects/gamma.jpg",
    },
    {
      id: 4,
      name: "Delta",
      title: "Enterprise SaaS",
      description: "Enterprise-grade SaaS solution.",
      image: "/projects/delta.jpg",
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-gray-950 text-white overflow-hidden flex items-center">
      <div className="mx-auto max-w-7xl w-full px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div className="relative z-10">
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Projects{" "}
            <span className="text-sky-400">Projects</span>
          </h2>

          <p className="text-lg text-white/70 max-w-md mb-10">
            A glimpse into the products, platforms, and systems we’ve
            engineered with precision and security at the core.
          </p>

          {/* Optional Project List (Static Overview) */}
          <ul className="space-y-4">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex items-center gap-4 text-white/80"
              >
                <span className="text-sky-400 font-semibold">
                  0{project.id}
                </span>
                <span>{project.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT CARD STACK ================= */}
        <div className="h-[600px] ml-96 -mt-20">
          <CardSwap
            width={860}
            height={520}
            cardDistance={60}
            verticalDistance={55}
            delay={4200}
            skewAmount={6}
            pauseOnHover
          >
            {projects.map((project, i) => (
              <Card key={i} customClass="card-ui-dark">
                
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden rounded-xl mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Content */}
                <span className="text-xs uppercase tracking-wider text-white/60 mb-1">
                  {project.name}
                </span>

                <h3 className="text-4xl font-bold text-sky-400 mb-2">
                  0{i + 1}
                </h3>

                <p className="text-white/80 text-sm">
                  {project.description}
                </p>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
