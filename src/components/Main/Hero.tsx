"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LightRays from "../LightRays";
import Link from "next/link";
const letters = "Abreonix";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  /* Scroll limited to hero section */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Subtle parallax (unchanged visually) */
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <header
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gray-900"
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
          px-5 sm:px-6
          text-center
        "
      >
        {/* BRAND NAME */}
       {/* BRAND NAME */}
<div className="relative inline-block">
  {/* Santa Hat */}
  <img
    src="/santa.png"
    alt="Santa Hat"
    className="
      pointer-events-none
      absolute
      -top-6
      -left-6
      w-20
      sm:w-24
      md:w-28
      rotate-[-18deg]
      drop-shadow-lg
    "
  />

  {/* Logo Text */}
  <h1
    className="
      font-serif italic
      text-[2.75rem]
      sm:text-6xl
      md:text-7xl
      lg:text-8xl
      text-white
      tracking-wide
      leading-tight
    "
    style={{
      textShadow:
        "0 2px 8px rgba(0,0,0,0.8), 0 6px 20px rgba(0,0,0,0.6)",
    }}
  >
    {letters}
  </h1>
</div>


        {/* TAGLINE */}
        <p
          className="
            mt-6 max-w-xl sm:max-w-2xl
            text-sm sm:text-base md:text-lg
            text-white/85
            leading-relaxed
          "
          style={{
            textShadow:
              "0 2px 8px rgba(0,0,0,0.8), 0 6px 20px rgba(0,0,0,0.6)",
          }}
        >
          Securing the digital future through{" "}
          <span className="font-medium text-white">
            cybersecurity, education, and decentralized products
          </span>
        </p>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/services">
          <button
            aria-label="Explore Services"
            className="
            rounded-xl
            bg-white
              px-7 py-3
              text-black font-medium
              transition
              hover:bg-white/90
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
              border border-white/50
              px-7 py-3
              text-white
              transition
              hover:bg-white/10
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
