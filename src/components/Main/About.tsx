"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const companies = [
  { name: "Accenture", logo: "/companies/accenture.png" },
  { name: "Capgemini", logo: "/companies/capgemini.png" },
  { name: "HCL", logo: "/companies/hcl.png" },
  { name: "Tech Mahindra", logo: "/companies/techmahindra.png" },
  { name: "IBM", logo: "/companies/ibm.png" },
  { name: "Infosys", logo: "/companies/infosys.png" },
  { name: "TCS", logo: "/companies/tcs.png" },
  { name: "Wipro", logo: "/companies/wipro.png" },
];

const aboutText =
  "We partner with organizations that take digital security seriously — building resilient systems, empowering teams, and shaping secure digital ecosystems for the future.";

export default function TrustedBy() {
  const letters = useMemo(() => aboutText.split(""), []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950">
      {/* ================= BACKGROUND GRID ================= */}
  <div className="pointer-events-none absolute inset-0 
  bg-[radial-gradient(circle_at_1px_1px,#ffffff08_1px,transparent_0)]
  bg-[size:28px_28px] opacity-[0.15]" />

<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/85 to-gray-950" />

      {/* ================= ABOUT TEXT ================= */}
  <div className="relative mx-auto max-w-5xl px-6 pt-40 pb-24">
  <p className="about-text font-serif text-[2.2rem] sm:text-[2.6rem] lg:text-[3.1rem] leading-[1.25] tracking-tight text-white">
    {letters.map((letter, i) => (
      <span
        key={i}
        className="about-letter inline-block"
        style={{
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ))}
  </p>
</div>


      {/* ================= DIVIDER ================= */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      {/* ================= TRUSTED BY ================= */}
      <div className="relative pt-1 pb-24">
        <div className="relative mx-auto max-w-7xl px-6">
          <center>  
          <p className="mb-10 text-[11px] uppercase tracking-[0.35em] text-neutral-500">
            Trusted by industry leaders
          </p>
          </center>

          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-gray-950 to-transparent z-10 -ml-32" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-950 to-transparent z-10 -mr-32" />

          <motion.div
            className="flex gap-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 60,
              ease: "linear",
            }}
            style={{ width: "max-content" }}
          >
            {[...companies, ...companies].map((c, i) => (
              <div
                key={i}
                className="flex h-16 w-44 items-center justify-center"
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-9 w-auto object-contain opacity-40 grayscale invert transition-all duration-300 hover:opacity-90 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
