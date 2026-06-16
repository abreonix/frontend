"use client";

import { motion } from "framer-motion";

export default function CompanyOverview() {
  return (
    <section className="relative bg-gray-950 py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Company Overview
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            About <span className="text-sky-400">Abreonix</span>
          </h2>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
            <p className="text-lg text-white/80 leading-relaxed">
              Abreonix Cyber Security Pvt. Ltd. is a trusted cybersecurity,
              technology, and professional training organization committed to
              strengthening digital security through innovation, education, and
              industry-leading expertise.
            </p>

            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              We empower students, professionals, educational institutions,
              businesses, and government organizations with advanced
              cybersecurity training, consulting, and technology solutions
              designed for the modern digital landscape.
            </p>

            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Recognized as a NIELIT Approved Training & Knowledge Partner,
              MSME Registered Enterprise, ISO Certified Organization, and
              aligned with globally recognized EC-Council cybersecurity
              standards, Abreonix is committed to delivering internationally
              aligned education, professional services, and cybersecurity best
              practices.
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-sky-500/20 bg-white/5 p-8"
          >
            <h3 className="text-2xl font-semibold text-sky-400 mb-5">
              Our Vision
            </h3>

            <p className="text-white/75 leading-relaxed">
              To be a globally respected leader in cybersecurity education,
              innovation, and professional security services, recognized for
              developing highly skilled cybersecurity professionals, advancing
              technological innovation, and helping organizations build secure,
              resilient, and future-ready digital infrastructures.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-amber-500/20 bg-white/5 p-8"
          >
            <h3 className="text-2xl font-semibold text-amber-400 mb-5">
              Our Mission
            </h3>

            <p className="text-white/75 leading-relaxed">
              To empower individuals and organizations with cutting-edge
              cybersecurity knowledge, practical skills, and innovative
              technology solutions while delivering trusted security services
              that protect digital assets, strengthen cyber resilience, and
              foster a safer digital future.
            </p>
          </motion.div>
        </div>

        {/* Motto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-block rounded-2xl border border-white/10 bg-white/5 px-8 py-6">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-400 mb-2">
              Our Motto
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Empowering Minds. Securing the Future.
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}