"use client";
import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react"; // Kept for potential future use, but not strictly needed for the loop

interface Testimonial {
  id: number;
  name: string;
  image: string;
  course: string;
  feedback: string;
  rating: number;
}

// --- Reusable Card Component ---
const TestimonialCard = ({ data }: { data: Testimonial }) => (
  <div
    className="flex-shrink-0 w-100 p-6 rounded-2xl
               bg-gradient-to-br from-indigo-900 via-black to-sky-400
               border border-transparent
               hover:border-blue-500/40
               shadow-lg hover:shadow-blue-500/30
               transition-all duration-300 hover:-translate-y-2 group"
  >
    {/* Profile */}
    <div className="flex items-center mb-4">
      <Image
        src={data.image}
        alt={data.name}
        width={52}
        height={52}
        className="rounded-full mr-4 border border-blue-400/40"
      />
      <div className="text-left">
        <p className="font-semibold text-white">{data.name}</p>
        <p className="text-sm text-gray-300">{data.course}</p>
      </div>
    </div>

    {/* Feedback */}
    <p className="text-gray-200 mb-4 italic leading-relaxed break-words whitespace-normal">
      "{data.feedback}"
    </p>

    {/* Rating */}
    <div className="flex items-center m-auto">
      <div className="m-auto">
        {[...Array(Math.floor(data.rating))]
          .map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              ★
            </span>
          ))
        }
      </div>
    </div>
  </div>
);

export default function TestimonialsPage() {
  // Sample student testimonials (you can replace with dynamic data later)
  const testimonials = [
    {
      id: 1,
      name: "Aditi Sharma",
      image: "/profile.png",
      course: "Advanced Cybersecurity Diploma",
      feedback:
        "Abreonix provided me with real-world hacking exposure and mentorship that went far beyond theory. I’m now working in a cybersecurity startup!",
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
    {
      id: 11,
      name: "Tanisha Garg",
      image: "/profile.png",
      course: "Digital Forensics & Investigation",
      feedback:
        "I learned forensic imaging, evidence handling, and real investigation workflows. Super helpful for my career!",
      rating: 4.7,
    },
    {
      id: 12,
      name: "Rudra Pratap",
      image: "/profile.png",
      course: "Malware Analysis & Reverse Engineering",
      feedback:
        "Reverse engineering was tough, but Abreonix made it enjoyable with step-by-step labs and real malware samples.",
      rating: 5,
    },
    {
      id: 13,
      name: "Neha Joshi",
      image: "/profile.png",
      course: "Web App Penetration Testing",
      feedback:
        "OWASP Top 10, API testing, automation, everything was covered with crystal clarity. Highly recommended!",
      rating: 4.8,
    },
  ];

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: testimonials.map((t, index) => ({
      "@type": "Review",
      position: index + 1,
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewBody: t.feedback,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: {
        "@type": "EducationalOccupationalProgram",
        name: t.course,
        provider: {
          "@type": "EducationalOrganization",
          name: "Abreonix Cybersecurity Institute",
        },
      },
    })),
  };

  return (
    <>
      <section className="bg-white py-20">
        <Script
          id="review-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />

        <div className="container mx-auto px-6 max-w-6xl text-center">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Students Say 😊
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Our graduates are leading cybersecurity initiatives, working in global
            companies, and building safer digital systems — here’s what they have
            to say.
          </p>

          {/* Testimonials Grid */}
          <section className="py-5 text-white overflow-hidden rounded-3xl shadow-xl border border-white/10 relative left-1/2 -translate-x-1/2 w-screen max-w-none">
            {/* Row 1 – Right → Left */}
            <div className="overflow-hidden">
              <div className="flex gap-8 p-6 animate-scroll-left whitespace-nowrap hover:animate-pause">
                {/* Render the list */}
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} data={t} />
                ))}
                {/* Render the list *again* for the seamless loop */}
                {testimonials.map((t) => (
                  <TestimonialCard key={`${t.id}-clone`} data={t} />
                ))}
              </div>
            </div>

            {/* Row 2 – Left → Right */}
            <div className="overflow-hidden ">
              <div className="flex gap-8 p-6 animate-scroll-right whitespace-nowrap hover:animate-pause">
                {/* Render the list */}
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} data={t} />
                ))}
                {/* Render the list *again* for the seamless loop */}
                {testimonials.map((t) => (
                  <TestimonialCard key={`${t.id}-clone`} data={t} />
                ))}
              </div>
            </div>

            {/* Row 3 – Right → Left */}
            <div className="overflow-hidden ">
              <div className="flex gap-8 p-6 animate-scroll-left whitespace-nowrap hover:animate-pause">
                {/* Render the list */}
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} data={t} />
                ))}
                {/* Render the list *again* for the seamless loop */}
                {testimonials.map((t) => (
                  <TestimonialCard key={`${t.id}-clone`} data={t} />
                ))}
              </div>
            </div>
          </section>

          {/* Optional Video Testimonials */}
          <div className="mt-20">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Watch Our{" "}
              <span className="bg-gradient-to-br from-[#2196F3] to-[#4C1D95] bg-clip-text text-transparent">
                Students' Stories
              </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <iframe
                src="https://www.youtube.com/embed/example1"
                title="Abreonix Student Review 1"
                className="w-full h-64 rounded-xl shadow-md"
                allowFullScreen
              ></iframe>
              <iframe
                src="https://www.youtube.com/embed/example2"
                title="Abreonix Student Review 2"
                className="w-full h-64 rounded-xl shadow-md"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
