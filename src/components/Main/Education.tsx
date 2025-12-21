"use client";

import { forwardRef } from "react";
import Link from "next/link";

const educationFeatures = [
  {
    title: "Courses & Programs",
    description:
      "Structured programs designed to build real-world, job-ready skills.",
    image: "/images/one.jpg",
    link: "/education",
  },
  {
    title: "Workshops & Bootcamps",
    description:
      "Hands-on sessions focused on practical industry challenges.",
    image: "/eklavya/2.jpg",
    link: "/education",
  },
  {
    title: "Certifications",
    description:
      "Industry-recognized certifications to strengthen credibility.",
    image: "/HomeCarousel/Image-4.jpg",
    link: "/education",
  },
  {
    title: "Mentorship Programs",
    description:
      "Guided mentorship from experienced professionals.",
    image: "/HomeCarousel/Image-3.jpg",
    link: "/education",
  },
];

const EducationSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="education-section relative bg-gray-950 text-white py-32"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="education-header font-serif text-center mb-24">
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Education at Abreonix
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Practical learning experiences built for long-term career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* LEFT – VISUAL BOX */}
          <div className="education-visual sticky top-32 h-[70vh] flex items-center justify-center">
            <div className="relative w-full max-w-xl aspect-[4/3] border border-gray-800 rounded-xl overflow-hidden bg-gray-900">
              {educationFeatures.map((item, i) => (
                <div
                  key={i}
                  className="education-image absolute inset-0 opacity-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – BOXED CONTENT */}
          <div className="education-content flex flex-col gap-20">
            {educationFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="education-card border border-gray-800 bg-gray-900 p-8 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center border border-gray-700 rounded-md font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-3xl font-semibold">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-lg mb-8">
                  {feature.description}
                </p>

                <Link
                  href={feature.link}
                  className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition"
                >
                  Explore Program →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = "EducationSection";
export default EducationSection;
