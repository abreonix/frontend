"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactSnowfall from "react-snowfall";

import Hero from "@/components/Main/Hero";
import TrustedBy from "@/components/Main/About";
import ServicesPop from "@/components/Main/ServiceDetails";
import EducationSection from "./Education";
import OnixAISection from "./OnixAiSystem";
import TestimonialsSection from "./Testimonial";
import CompanyOverview from "./CompanyOverview"
import WhyAbreonix from "./WhyAbreonix";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const onixRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ================= 1. HERO ================= */
      gsap.to(".hero-section", {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          scrub: true,
        },
      });

      /* ================= 2. ABOUT (Text Reveal) ================= */
      if (aboutRef.current) {
        gsap.from(".about-letter", {
          opacity: 0.1,
          y: 20,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 75%",
            end: "center 50%",
            scrub: 1,
          },
        });
      }

      /* ================= 3. SERVICES ================= */
      gsap.from(".services-section", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 85%",
          end: "top 40%",
          scrub: 1,
        },
      });

      /* ================= 4. EDUCATION (Cards + Swap) ================= */
      if (educationRef.current) {
        const cards = educationRef.current.querySelectorAll(".education-card");
        const images =
          educationRef.current.querySelectorAll(".education-image");
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

        // Animate Cards (Fade In/Out)
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        // Image Swap Logic
        if (isDesktop && images.length && cards.length) {
          gsap.set(images, { opacity: 0 });
          gsap.set(images[0], { opacity: 1 });

          const swap = (index: number) => {
            gsap.to(images, { opacity: 0, duration: 0.25, overwrite: true });
            gsap.to(images[index], {
              opacity: 1,
              duration: 0.35,
              overwrite: true,
            });
          };

          cards.forEach((card, i) => {
            ScrollTrigger.create({
              trigger: card,
              start: "top 60%",
              end: "bottom 60%",
              onEnter: () => swap(i),
              onEnterBack: () => swap(i),
            });
          });
        }
      }

      /* ================= 5. ONIX AI ================= */
      if (onixRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: onixRef.current,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 1,
          },
        });
        tl.from(".onix-title", { y: 50, opacity: 0, duration: 1 })
          .from(".onix-text", { y: 30, opacity: 0, stagger: 0.1 }, "<")
          .from(".onix-chat", { x: 50, opacity: 0 }, "<0.2")
          .from(
            ".chat-line",
            { opacity: 0, y: 20, stagger: 0.1, ease: "power2.out" },
            "-=0.5",
          );
      }

      /* ================= 6. TESTIMONIALS ================= */
      if (testimonialRef.current) {
        gsap.from(testimonialRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col bg-gray-950 text-white min-h-screen overflow-x-hidden"
    >
      <section className="hero-section min-h-screen relative">
        <Hero />
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Uncomment if needed, now syntax error free 👇 */}
          {/* <ReactSnowfall
               style={{ position: "fixed", width: "100vw", height: "100vh" }}
           /> */}
        </div>
      </section>

      <section ref={aboutRef} className="min-h-screen relative z-10">
        {/* We pass direction="left" here 👇 */}
        <TrustedBy direction="left" />
      </section>

      <section ref={companyRef} className="relative z-10"><CompanyOverview/></section>

      <section className="relative z-10">
        <WhyAbreonix/>
        </section>

      <section className="services-section min-h-screen">
        <ServicesPop />
      </section>

      <EducationSection ref={educationRef} />
      <OnixAISection ref={onixRef} />
      <TestimonialsSection ref={testimonialRef} />
    </div>
  );
}
