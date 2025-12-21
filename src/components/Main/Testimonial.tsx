"use client";

import { forwardRef, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Accenture",
    logo: "/companies/accenture.png",
    text:
      "Abreonix played a key role in strengthening our students’ understanding of real-world cybersecurity challenges. Their hands-on approach and industry relevance truly stand out.",
  },
  {
    name: "Capgemini",
    logo: "/companies/capgemini.png",
    text:
      "The training programs delivered by Abreonix bridge the gap between theory and industry practices. We’ve seen measurable improvement in skill readiness.",
  },
  {
    name: "HCL",
    logo: "/companies/hcl.png",
    text:
      "Abreonix Cyber Security consistently delivers structured, impactful learning experiences that align well with enterprise security expectations.",
  },
  {
    name: "Tech Mahindra",
    logo: "/companies/techmahindra.png",
    text:
      "Their cybersecurity workshops are practical, engaging, and tailored to modern threat landscapes. A valuable learning partner.",
  },
  {
    name: "IBM",
    logo: "/companies/ibm.png",
    text:
      "Abreonix brings clarity to complex security concepts. Their mentorship-driven approach helps learners think like security professionals.",
  },
  {
    name: "Infosys",
    logo: "/companies/infosys.png",
    text:
      "We appreciate Abreonix’s focus on real-world applications and disciplined security thinking. Their programs add genuine value.",
  },
];

const TestimonialsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!statsRef.current) return;

    const counters = statsRef.current.querySelectorAll<HTMLSpanElement>(
      "[data-counter]"
    );

    const animateCounter = (el: HTMLSpanElement) => {
      const target = Number(el.dataset.target);
      const duration = 1200;
      const startTime = performance.now();

      const update = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target).toString();
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          counters.forEach(animateCounter);
          hasAnimated.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= TESTIMONIALS ================= */}
      <section
        ref={ref}
        className="testimonial-section bg-gray-950 text-white py-24 px-4 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <h3 className="text-5xl font-serif italic font-semibold">
              What our partners say
            </h3>

            <p className="text-slate-400 my-4 max-w-md">
              Trusted by institutions and enterprises for cybersecurity
              education and mentorship.
            </p>

            <div className="flex gap-1 mt-8">
              {testimonials.map((_, i) => (
                <div key={i} className="h-1.5 w-full bg-gray-800 overflow-hidden">
                  <span className="block h-full w-0 bg-white progress-bar" />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[450px] mt-20 lg:h-[520px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`
                  testimonial-card absolute inset-0 p-8 lg:p-12
                  flex flex-col items-center justify-center text-center
                  rounded-2xl border border-white/10
                  bg-gray-900 shadow-xl
                  transition-opacity duration-500
                  ${i === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}
                `}
              >
               {/* LOGO WRAPPER */}
<div className="mb-8 flex h-14 w-full items-center justify-center">
  <img
    src={t.logo}
    alt={t.name}
    className="
      max-h-14
      max-w-[160px]
      object-contain
      opacity-95
      filter
      brightness-0
      invert
      drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]
    "
  />
</div>


                {/* TEXT */}
                <p className="text-lg lg:text-xl font-serif italic font-light text-slate-200 leading-relaxed max-w-md">
                  “{t.text}”
                </p>

                {/* NAME */}
                <span className="mt-8 text-sm uppercase tracking-widest text-slate-400">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section ref={statsRef} className="bg-gray-950 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-24">
          <h2 className="mb-16 text-center text-3xl font-serif font-medium text-slate-300">
            Building trust with
            <span className="text-indigo-400 italic">
              {" "}
              Abreonix Cyber Security
            </span>
          </h2>

          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex w-72 flex-col items-center">
              <p className="mb-2 text-6xl font-semibold text-white">
                <span data-counter data-target="1000">0</span>
                <span className="text-indigo-400">+</span>
              </p>
              <p className="text-center text-slate-400">
                Students Trained
              </p>
            </div>

            <div className="hidden sm:block h-12 w-px bg-white/10" />

            <div className="flex w-72 flex-col items-center">
              <p className="mb-2 text-6xl font-semibold text-white">
                <span data-counter data-target="25">0</span>
                <span className="text-indigo-400">+</span>
              </p>
              <p className="text-center text-slate-400">
                Organizations Collaborated
              </p>
            </div>

            <div className="hidden sm:block h-12 w-px bg-white/10" />

            <div className="flex w-72 flex-col items-center">
              <p className="mb-2 text-6xl font-semibold text-white">
                <span data-counter data-target="6">0</span>
                <span className="text-indigo-400">+</span>
              </p>
              <p className="text-center text-slate-400">
                Years of Experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default TestimonialsSection;
