"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FoundersMessage() {
  return (
    <section className="bg-gray-950 py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Leadership Message
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Message From The Founders
          </h2>
        </motion.div>

        {/* Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12"
        >
          <p className="text-lg text-white/80 leading-relaxed">
            At Abreonix Cyber Security, we founded this organization with a
            simple yet powerful vision —
            <span className="text-sky-400 font-semibold">
              {" "}
              "Innovating Learning, Empowering Minds."
            </span>
          </p>

          <p className="mt-6 text-white/70 leading-relaxed">
            In today's rapidly evolving digital landscape, the demand for
            skilled cybersecurity professionals has never been greater. Our
            mission is to bridge this gap by delivering practical,
            industry-focused education that transforms ambitious learners into
            highly capable security professionals.
          </p>

          <p className="mt-6 text-white/70 leading-relaxed">
            Through cybersecurity education, consulting, research, and
            innovation, we are committed to building the next generation of
            security leaders while helping organizations strengthen their
            digital resilience.
          </p>

          {/* Signature */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <h3 className="text-white font-semibold text-xl">
              Ayush Kumar & Harshit Singh
            </h3>

            <p className="text-sky-400 mt-2">
              Founders & Directors
            </p>

            <p className="text-white/50 text-sm mt-1">
              Abreonix Cyber Security Pvt. Ltd.
            </p>
          </div>

          {/* Button */}
          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all"
            >
              Read Full Story
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}