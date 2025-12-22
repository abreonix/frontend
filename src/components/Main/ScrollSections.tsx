"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "@/components/Main/Hero";
import TrustedBy from "@/components/Main/About";
import ServicesPop from "@/components/Main/ServiceDetails";
import EducationSection from "./Education";
import OnixAISection from "./OnixAiSystem";
import TestimonialsSection from "./Testimonial";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const onixRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* HERO */
      gsap.to(".hero-section", {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      /* ABOUT */
      if (aboutRef.current) {
        gsap.from(".about-letter", {
          opacity: 0.2,
          stagger: 0.015,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        });
      }

      /* SERVICES */
      gsap.from(".services-section", {
        y: 120,
        opacity: 0,
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 85%",
          scrub: true,
        },
      });

      /* EDUCATION IMAGE SYNC */
      /* EDUCATION IMAGE SYNC (DESKTOP ONLY) */
/* ================= EDUCATION IMAGE SYNC (DESKTOP ONLY) ================= */
if (
  educationRef.current &&
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches
) {
  const images =
    educationRef.current.querySelectorAll(".education-image");
  const cards =
    educationRef.current.querySelectorAll(".education-card");

  if (!images.length || !cards.length) return;

  gsap.set(images, { opacity: 0 });
  gsap.set(images[0], { opacity: 1 });

  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 60%",
      end: "bottom 60%",
      onEnter: () => swap(i),
      onEnterBack: () => swap(i),
    });
  });

  function swap(i: number) {
    gsap.to(images, { opacity: 0, duration: 0.25 });
    gsap.to(images[i], { opacity: 1, duration: 0.35 });
  }
}



      /* ================= ONIX AI (PINNED STORY) ================= */
      if (onixRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: onixRef.current,
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: true,
          },
        });

        tl.from(".onix-title", { y: 80, opacity: 0 })
          .from(".onix-text", { y: 40, opacity: 0, stagger: 0.15 }, "-=0.3")
          .from(".onix-chat", { x: 120, opacity: 0 }, "-=0.5")
          .from(".chat-line", {
            opacity: 0,
            y: 20,
            stagger: 0.25,
            ease: "power2.out",
          });
      }

/* ================= TESTIMONIALS (ONE BY ONE) ================= */

if (testimonialRef.current) {
  const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
  const bars = gsap.utils.toArray<HTMLElement>(".progress-bar");

  // Initial state
  gsap.set(cards, { opacity: 0 });
  gsap.set(cards[0], { opacity: 1 });

  gsap.set(bars, { width: "0%" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".testimonial-section",
      start: "top top",
      end: `+=${cards.length * 100}%`,
      scrub: true,
      pin: true,
    },
  });

  cards.forEach((card, i) => {
    // show card
    tl.to(
      cards,
      { opacity: 0, duration: 0.01 },
      i
    );

    tl.to(
      card,
      { opacity: 1, duration: 0.3, ease: "power2.out" },
      i
    );

    // fill progress bar
    if (bars[i]) {
      tl.to(
        bars[i],
        { width: "100%", duration: 1, ease: "none" },
        i
      );
    }
  });
}


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-gray-950 text-white">
      <section className="hero-section min-h-screen">
        <Hero />
      </section>

      <section ref={aboutRef} className="min-h-screen">
        <TrustedBy />
      </section>

      <section className="services-section min-h-screen">
        <ServicesPop />
      </section>

      <EducationSection ref={educationRef} />

      <OnixAISection ref={onixRef} />


      <TestimonialsSection ref={testimonialRef}/>

    </div>
  );
}
