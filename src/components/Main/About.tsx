"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";

interface TrustedByProps {
  showTitle?: boolean;
}

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

export default function TrustedBy({ showTitle = true }: TrustedByProps) {
  const letters = useMemo(() => aboutText.split(""), []);

  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive Items Per View (Approximate for logic)
  // We use CSS % for width, but need logic for the index loop
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 2; // Mobile
      if (window.innerWidth < 1024) return 3; // Tablet
      return 5; // Desktop
    }
    return 5;
  };

  const [itemsPerView, setItemsPerView] = useState(5);

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      // If we are at the end (total - visible), loop back to 0
      const maxIndex = companies.length - itemsPerView;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = companies.length - itemsPerView;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // Auto-Swipe Logic (2 seconds)
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setInterval(() => {
      nextSlide();
    }, 2000); // ⏱️ 2 Seconds Delay

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isPaused, itemsPerView]); // Re-run if paused state changes

  return (
    <section className="relative overflow-hidden bg-gray-950">
      {/* ================= HERO TEXT & BACKGROUND ================= */}
      {showTitle && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff08_1px,transparent_0)] bg-[size:28px_28px] opacity-[0.15]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/85 to-gray-950" />

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

          <div className="mx-auto max-w-7xl px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
          </div>
        </>
      )}

      {/* ================= CAROUSEL SECTION ================= */}
      <div
        className={`relative ${showTitle ? "pt-1 pb-24" : "py-10"}`}
        onMouseEnter={() => setIsPaused(true)} // ⏸️ Pause on hover
        onMouseLeave={() => setIsPaused(false)} // ▶️ Resume on leave
      >
        <div className="relative mx-auto max-w-7xl px-12">
          {" "}
          {/* Added px-12 for button space */}
          {showTitle && (
            <div className="mb-10 text-center">
              <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
                Trusted by industry leaders
              </p>
            </div>
          )}
          {/* === LEFT BUTTON === */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 text-white/30 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {/* === CAROUSEL TRACK === */}
          <div className="overflow-hidden relative">
            {/* Edge Gradients for smooth fade */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-gray-950 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-gray-950 to-transparent" />

            <motion.div
              className="flex"
              initial={false}
              animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {companies.map((c, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center px-4"
                  style={{ width: `${100 / itemsPerView}%` }} // Responsive width
                >
                  <div className="h-16 w-full flex items-center justify-center">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="h-9 w-auto object-contain opacity-40 grayscale invert transition-all duration-300 hover:opacity-90 hover:grayscale-0 cursor-pointer"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          {/* === RIGHT BUTTON === */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 text-white/30 hover:text-white transition-colors"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
