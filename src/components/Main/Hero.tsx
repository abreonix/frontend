"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic"; // 👈 Import dynamic

// ⚡ LAZY LOAD THE HEAVY BACKGROUND
// This prevents the background from blocking the text loading
const LightRays = dynamic(() => import("../LightRays"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gray-900" />,
});

const letters = "Abreonix";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* Scroll limited to hero section */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Subtle parallax */
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <header
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* ================= LIGHT RAYS BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.2}
          lightSpread={0.75}
          rayLength={1.3}
          fadeDistance={1.2}
          saturation={1.0}
          followMouse
          mouseInfluence={0.06}
          noiseAmount={0.06}
          distortion={0.04}
        />

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
      </div>

      {/* ================= CONTENT ================= */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
  relative z-10
  flex min-h-screen flex-col
  items-center justify-center
  px-6
  text-center
  max-w-[1200px] mx-auto
"
      >
        {/* BRAND NAME */}
        <div className="relative inline-block">
          <h1
            className="
  font-bold
  text-[2.75rem]
  sm:text-6xl
  md:text-7xl
  lg:text-8xl
  text-white
  tracking-tight
  leading-tight
"
            style={{
              textShadow:
  "0 0 10px rgba(0,245,212,0.6), 0 0 25px rgba(0,245,212,0.3)"
            }}
          >
            {letters}
          </h1>
        </div>

        {/* TAGLINE */}
        <p
          className="
  mt-6 max-w-xl sm:max-w-2xl
  text-base sm:text-lg
  text-gray-400
  leading-relaxed
"
          style={{
            textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 6px 20px rgba(0,0,0,0.6)",
          }}
        >
          Securing the digital future through{" "}
          <span className="font-semibold bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">
            cybersecurity, education, and decentralized products
          </span>
        </p>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/services">
            <button
              aria-label="Explore Services"
              className="
              rounded-lg
              bg-gradient-to-r from-amber-500 to-yellow-400
              px-7 py-3
              text-slate-900 font-semibold
              transition
              hover:from-amber-400 hover:to-yellow-300 shadow-lg shadow-amber-500/40
              focus:outline-none focus:ring-2 focus:ring-white/50
              "
              style={{
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.8), 0 6px 20px rgba(0,0,0,0.6)",
              }}
            >
              Explore Services
            </button>
          </Link>
          <Link href="/education">
            <button
              aria-label="View Courses"
              className="
                rounded-xl
                border border-amber-400
                px-7 py-3
                text-white
                transition
                hover:bg-amber-400/10 hover:border-amber-300
                focus:outline-none focus:ring-2 focus:ring-white/40
                "
              style={{
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.8), 0 6px 20px rgba(0,0,0,0.6)",
              }}
            >
              View Courses
            </button>
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
