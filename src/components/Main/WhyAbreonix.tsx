"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Building2,
  GraduationCap,
  Briefcase,
  Lightbulb,
  BadgeCheck,
  Users,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "NIELIT Approved Partner",
  },
  {
    icon: Award,
    title: "ISO Certified Organization",
  },
  {
    icon: Building2,
    title: "MSME Registered Enterprise",
  },
  {
    icon: BadgeCheck,
    title: "EC-Council Alignment",
  },
  {
    icon: GraduationCap,
    title: "Industry-Focused Training",
  },
  {
    icon: Lightbulb,
    title: "Research & Innovation Driven",
  },
  {
    icon: Users,
    title: "Internship & Career Development",
  },
  {
    icon: Briefcase,
    title: "Professional Consulting Services",
  },
];

export default function WhyAbreonix() {
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
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Why <span className="text-sky-400">Abreonix</span>?
          </h2>

          <p className="mt-6 text-white/60 max-w-3xl mx-auto">
            Excellence backed by recognized standards, innovation,
            practical learning, and industry expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-sky-500/30 transition-all"
              >
                <Icon className="w-8 h-8 text-sky-400 mb-4" />

                <h3 className="text-white font-semibold">
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}