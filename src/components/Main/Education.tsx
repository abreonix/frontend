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
      className="education-section bg-gray-950 text-white py-24"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="italic text-4xl sm:text-5xl text-white mb-4">
            Education at Abreonix
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Practical learning experiences built for long-term career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT – DESKTOP IMAGE ONLY */}
          <div className="hidden lg:flex sticky top-32 h-[70vh] items-center justify-center">
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

          {/* RIGHT – CONTENT */}
          <div className="flex flex-col gap-12">
            {educationFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="education-card border border-gray-800 bg-gray-900 p-6 sm:p-8 rounded-xl"
              >
                {/* MOBILE IMAGE */}
                <div className="lg:hidden mb-6 rounded-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-gray-700 rounded-md font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-base sm:text-lg mb-6">
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
