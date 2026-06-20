"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, Globe, Brain, Search } from "lucide-react";

export default function FeaturedProjects() {
  return (
    <section className="bg-gray-950 py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Featured Project
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            ThreatLens
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-white/60">
            A cybersecurity intelligence platform built to simplify threat
            investigation, URL analysis, and security decision-making through
            modern threat intelligence and AI-assisted insights.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          {/* Screenshot */}
          <div className="relative w-full h-[250px] md:h-[450px]">
            <Image
              src="/projects/threatlens.png"
              alt="ThreatLens Platform"
              fill
              className="object-contain bg-gray-900"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left */}
              <div className="flex-1">
                <span className="inline-block px-4 py-2 rounded-full bg-sky-500/10 text-sky-400 text-sm">
                  Threat Intelligence Platform
                </span>

                <h3 className="mt-5 text-3xl font-bold text-white">
                  ThreatLens
                </h3>

                <p className="mt-6 text-white/70 leading-relaxed">
                  ThreatLens is a cybersecurity intelligence platform designed
                  to simplify threat investigation and security analysis.
                  Security professionals, researchers, and learners can analyze
                  URLs, domains, IP addresses, and threat indicators to identify
                  cyber risks and strengthen defensive strategies.
                </p>

                <a
                  href="https://threatlens-i74k.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all"
                >
                  Visit Platform
                  <ExternalLink size={18} />
                </a>
              </div>

              {/* Right */}
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-6">
                  Key Capabilities
                </h4>

                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                    <Search className="text-sky-400" />
                    <span className="text-white">
                      URL & Threat Investigation
                    </span>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                    <Globe className="text-sky-400" />
                    <span className="text-white">
                      Domain Intelligence Analysis
                    </span>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                    <ShieldCheck className="text-sky-400" />
                    <span className="text-white">
                      Security Risk Identification
                    </span>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                    <Brain className="text-sky-400" />
                    <span className="text-white">
                      AI-Assisted Threat Insights
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}