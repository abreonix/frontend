"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Bug,
  MailWarning,
  Laptop,
  Users,
  GlobeLock,
} from "lucide-react";

import SpotlightCard from "../SpotlightCard";
import Link from "next/link";

const SERVICES = [
  {
    title: "Application Security Testing",
    description:
      "Comprehensive web and mobile application security assessments aligned with OWASP, SANS, and PTES standards.",
    icon: Bug,
  },
  {
    title: "Phishing Simulation & Social Engineering",
    description:
      "Realistic phishing simulations to measure employee awareness and response.",
    icon: MailWarning,
  },
  {
    title: "Website Security & Monitoring",
    description:
      "24/7 monitoring, malware detection, and rapid incident response.",
    icon: GlobeLock,
  },
  {
    title: "Endpoint & Device Security",
    description:
      "EDR/XDR protection for laptops, servers, and mobile devices.",
    icon: Laptop,
  },
  {
    title: "Cyber Awareness Training",
    description:
      "Hands-on training programs to reduce human risk.",
    icon: Users,
  },
  {
    title: "Digital Security Architecture",
    description:
      "Secure system design aligned with modern threat landscapes.",
    icon: ShieldCheck,
  },
];

/* ================= SECTION ================= */

export default function AbreonixServices() {
  return (
    <section className="relative bg-gray-950 py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">

        {/* ================= HEADING ================= */}
        <div className="text-center mb-28">
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Services by{" "}
            <span className="text-sky-400">Abreonix</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-white/70">
            Empowering the next generation of digital defenders with
            industry-leading cybersecurity expertise.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} index={i} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CARD ================= */

function ServiceCard({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: any;
  index: number;
}) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.08,
      }}
    >
      <Link href="/services">
      <SpotlightCard
        className="
        h-full
        rounded-2xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        p-8
        transition
        hover:border-sky-400/40
        "
        spotlightColor="rgba(56, 189, 248, 0.25)"
        >
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10">
          <Icon className="h-7 w-7 text-sky-400" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed">
          {description}
        </p>
      </SpotlightCard>
        </Link>
    </motion.div>
  );
}
