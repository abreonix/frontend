"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "ThreatLens",
    category: "Threat Intelligence Platform",
    description:
      "A cybersecurity intelligence platform that enables analysis of URLs, domains, IP addresses, and threat indicators to support security investigations and proactive defense.",
    link: "https://threatlens-i74k.onrender.com/",
  },
  {
    title: "ThreatLens AI",
    category: "AI-Powered Security Assistant",
    description:
      "An intelligent cybersecurity assistant that helps users analyze threat intelligence reports, identify risks, and generate actionable security insights using AI.",
    link: "https://threat-lens-swart.vercel.app/",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="bg-gray-950 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Featured Projects
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Innovation in Action
          </h2>

          <p className="mt-6 text-white/60 max-w-3xl mx-auto">
            Real-world cybersecurity and AI projects developed through
            innovation, research, and practical implementation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <div className="h-52 bg-gradient-to-br from-sky-500/20 to-blue-900/20 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-sky-400">
                  {project.title}
                </h3>
              </div>

              <div className="p-8">
                <p className="text-sky-400 text-sm mb-3">
                  {project.category}
                </p>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  {project.title}
                </h3>

                <p className="text-white/70 leading-relaxed mb-6">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
                >
                  View Project
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}