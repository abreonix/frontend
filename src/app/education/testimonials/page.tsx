"use client";
import Navbar from "@/components/NavbarEdu";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  course: string;
  feedback: string;
  rating: number;
}

const TestimonialCard = ({ data }: { data: Testimonial }) => (
  <div
    className="flex-shrink-0 w-80 md:w-96 p-6 rounded-2xl bg-white 
               border border-gray-200 shadow-sm 
               hover:shadow-md hover:border-blue-300/70
               transition-all duration-300 hover:-translate-y-1
               whitespace-normal text-left flex flex-col h-full"
  >
    {/* Header with Avatar and Info */}
    <div className="flex items-start mb-4">
      <div className=" flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{data.name}</p>
        <p className="text-sm text-blue-600 font-medium mt-1">{data.course}</p>
      </div>
    </div>

    {/* Feedback Text */}
    <div className="flex-1 mb-4">
      <p className="text-gray-700 leading-relaxed line-clamp-4">
        "{data.feedback}"
      </p>
    </div>

    {/* Rating */}
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < Math.floor(data.rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">
          {data.rating}
        </span>
      </div>
    </div>
  </div>
);

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Aditi Sharma",
      image: "/profile.png",
      course: "Advanced Cybersecurity Diploma",
      feedback:
        "Abreonix provided me with real-world hacking exposure and mentorship that went far beyond theory. I'm now working in a cybersecurity startup!",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahul Mehta",
      image: "/profile.png",
      course: "Certified Ethical Hacking Program",
      feedback:
        "The faculty was amazing and the labs were practical. I cleared my CEH exam on my first attempt thanks to Abreonix guidance.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sneha Kapoor",
      image: "/profile.png",
      course: "Diploma in Ethical Hacking",
      feedback:
        "Great community and strong mentorship. I loved the AR/VR-based virtual labs that made learning so much more immersive!",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Vikram Singh",
      image: "/profile.png",
      course: "Cybersecurity Analyst Program",
      feedback:
        "The hands-on simulations and attack-defense challenges really boosted my confidence. I landed an internship within 2 months!",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Priya Nair",
      image: "/profile.png",
      course: "Advanced SOC Training",
      feedback:
        "SOC training was so practical! I learned SIEM, log analysis, and incident response with real industry tools.",
      rating: 5,
    },
    {
      id: 6,
      name: "Harshit Verma",
      image: "/profile.png",
      course: "Red Team Specialist Program",
      feedback:
        "Their red-team labs are next-level. I practiced real attack vectors and reporting formats used in top companies.",
      rating: 4.9,
    },
    {
      id: 7,
      name: "Megha Chaturvedi",
      image: "/profile.png",
      course: "Network Penetration Testing Bootcamp",
      feedback:
        "Loved the structured approach! From basics to advanced pentesting, everything was taught with practical case studies.",
      rating: 5,
    },
    {
      id: 8,
      name: "Farhan Ahmed",
      image: "/profile.png",
      course: "Bug Bounty Hunting Mastery",
      feedback:
        "Found my first real-world bug during the course! Their methodology and mentorship were incredibly helpful.",
      rating: 4.8,
    },
    {
      id: 9,
      name: "Kritika Malhotra",
      image: "/profile.png",
      course: "Full Stack Cybersecurity Program",
      feedback:
        "The perfect balance of development and security. I can now build secure apps and test vulnerabilities confidently.",
      rating: 5,
    },
    {
      id: 10,
      name: "Abhinav Desai",
      image: "/profile.png",
      course: "Cloud Security Specialist",
      feedback:
        "Great exposure to AWS, Azure, and GCP security practices. The labs felt enterprise-grade!",
      rating: 4.9,
    },
  ];

  // ----------------------------------------------------
  // GOOGLE SCHEMA
  // ----------------------------------------------------
  const reviewSchema = {
    "@context": "https://schema.org",
    "@graph": testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.feedback,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: {
        "@type": "Course",
        name: t.course,
        provider: {
          "@type": "Organization",
          name: "Abreonix Cybersecurity Institute",
        },
      },
    })),
  };

  const [expanded, setExpanded] = useState(false);

  const shortText =
    "Manya talks about practical labs and real-world simulations that helped her build confidence and understand cybersecurity concepts with hands-on practice.";

  const fullText =
    "Manya talks about practical labs and real-world simulations where she worked on network attacks, secure configurations, and incident response exercises. She explains how these hands-on tasks helped her understand not just the “what” but the “why” behind every cybersecurity concept. The real-life scenarios, combined with guided mentorship, helped her build confidence, develop practical skills, and prepare for real industry projects. The immersive learning approach at Abreonix made all the difference in her journey to becoming a skilled cybersecurity professional."; 
  
  return (
    <>
    <Navbar />
      {/* SCHEMA */}
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* -------------------------------------------------
                HERO SECTION
          -------------------------------------------------- */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Watch Our{" "}
              <span className="bg-gradient-to-br from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Student's Stories
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Hear directly from our graduates who are now leading cybersecurity initiatives, 
              working in global companies, and building safer digital systems.
            </p>
          </div>

{/* -------------------------------------------------
      VIDEO TESTIMONIALS GRID (IMPROVED)
-------------------------------------------------- */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
  
  {/* CARD 1 */}
  <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
                  overflow-hidden border border-gray-200 
                  transition-all duration-300">
      
    <div className="relative w-full aspect-[9/16] sm:aspect-video bg-black">
      <iframe
        src="https://www.youtube.com/embed/D6GyGOwFRqk"
        title="Abreonix Testimonial 1"
        className="absolute inset-0 w-full h-full rounded-none"
        allowFullScreen
      />
    </div>

    <div className="p-6">
      <h3 className="font-semibold text-gray-900 text-xl mb-2">
        From Beginner to Cybersecurity Professional
      </h3>
      <p className="text-gray-600">
        Insha shares her journey from learning basics to securing her dream job.
      </p>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
                  overflow-hidden border border-gray-200 
                  transition-all duration-300">
      
    <div className="relative w-full aspect-[9/16] sm:aspect-video bg-black">
      <iframe
        src="https://www.youtube.com/embed/fA_EBdJNcWo"
        title="Abreonix Testimonial 2"
        className="absolute inset-0 w-full h-full rounded-none"
        allowFullScreen
      />
    </div>

    <div className="p-6">
      <h3 className="font-semibold text-gray-900 text-xl mb-2">
        Career Transformation Story
      </h3>
      <p className="text-gray-600">
        Bhaskars's experience clearing CEH exam and landing multiple offers.
      </p>
    </div>
  </div>
  <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
                 overflow-hidden border border-gray-200 
                 transition-all duration-300
                 lg:col-span-2 lg:flex lg:items-center lg:justify-center
                 p-4 sm:p-6"
    >
{/* VIDEO SECTION */}
      <div className="relative w-full lg:w-1/2 aspect-[9/16] sm:aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/xmJdvRnEUF8"
          title="Abreonix Testimonial 3"
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      </div>

      {/* CONTENT SECTION */}
      <div className="mt-6 lg:mt-0 lg:ml-8 w-full lg:w-1/2">
        <h3 className="font-semibold text-gray-900 text-xl mb-3">
          Hands-on Learning Experience
        </h3>

        <p className="text-gray-600 leading-relaxed">
          {expanded ? fullText : shortText}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 mt-2 font-medium hover:underline"
        >
          {expanded ? "Read less" : "Read more..."}
        </button>

        {/* BUTTONS */}
        <div className="mt-5 flex flex-col sm:flex-row gap-4">
          <a href="https://wa.me/918690650532">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto"
            >
              Join Abreonix Now
            </button>
          </a>

          <a href="/courses">
            <button
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg 
                         hover:bg-gray-300 transition duration-300 w-full sm:w-auto"
            >
              Explore Courses
            </button>
          </a>
        </div>
      </div>
    </div>




</div>


          {/* -------------------------------------------------
                TESTIMONIALS SECTION HEADER
          -------------------------------------------------- */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Students Say{" "}
              <span className="text-yellow-500">😊</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our students have to say about their learning experience.
            </p>
          </div>

          {/* -------------------------------------------------
                SCROLLING TESTIMONIALS - RESPONSIVE
          -------------------------------------------------- */}
          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-blue-50/30 to-white">
              {/* Row 1 */}
              <div className="overflow-hidden py-6">
                <div className="flex gap-6 animate-scroll-left whitespace-nowrap hover:animate-pause">
                  {[...testimonials, ...testimonials].map((t, index) => (
                    <TestimonialCard key={`row1-${t.id}-${index}`} data={t} />
                  ))}
                </div>
              </div>

              {/* Row 2 - Reverse */}
              <div className="overflow-hidden py-6">
                <div className="flex gap-6 animate-scroll-right whitespace-nowrap hover:animate-pause">
                  {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, index) => (
                    <TestimonialCard key={`row2-${t.id}-${index}`} data={t} />
                  ))}
                </div>
              </div>

              {/* Row 3 */}
              <div className="overflow-hidden py-6">
                <div className="flex gap-6 animate-scroll-left whitespace-nowrap hover:animate-pause">
                  {[...testimonials, ...testimonials].map((t, index) => (
                    <TestimonialCard key={`row3-${t.id}-${index}`} data={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------
                STATS SECTION
          -------------------------------------------------- */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Hiring Partners</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
