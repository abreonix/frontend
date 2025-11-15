"use client";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef } from "react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  course: string;
  feedback: string;
  rating: number;
}

const Card = ({ data }: { data: Testimonial }) => (
  <div className="flex-shrink-0 w-80 bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
    <div className="flex items-center mb-4">
      <Image
        src={data.image}
        alt={data.name}
        width={48}
        height={48}
        className="rounded-full mr-4"
      />
      <div className="text-left">
        <p className="font-semibold text-white">{data.name}</p>
        <p className="text-sm text-gray-400">{data.course}</p>
      </div>
    </div>
    <p className="text-gray-300 mb-4 italic">{`"${data.feedback}"`}</p>
    <div className="flex items-center">
      {[...Array(Math.floor(data.rating))].map((_, i) => (
        <span key={i} className="text-yellow-400">★</span>
      ))}
    </div>
  </div>
);

export default function TestimonialsPage() {
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  const row3 = useRef<HTMLDivElement>(null);

  // Duplicate items for seamless loop
  useEffect(() => {
    [row1, row2, row3].forEach((row) => {
      if (row.current) {
        row.current.innerHTML += row.current.innerHTML;
      }
    });
  }, []);
  // Sample student testimonials (you can replace with dynamic data later)
  const testimonials = [
    {
      id: 1,
      name: "Aditi Sharma",
      image: "/profile.png",
      course: "Advanced Cybersecurity Diploma",
      feedback:
        "Abreonix provided me with real-world hacking exposure and mentorship that went far beyond theory. I’m now working in a cybersecurity startup!",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Mehta",
      image: "/profile.png",
      course: "Certified Ethical Hacking Program",
      feedback:
        "The faculty was amazing and the labs were practical. I cleared my CEH exam on my first attempt thanks to Abreonix guidance.",
      rating: 5
    },
    {
      id: 3,
      name: "Sneha Kapoor",
      image: "/profile.png",
      course: "Diploma in Ethical Hacking",
      feedback:
        "Great community and strong mentorship. I loved the AR/VR-based virtual labs that made learning so much more immersive!",
      rating: 4.8
    }
  ];

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: testimonials.map((t, index) => ({
      "@type": "Review",
      position: index + 1,
      author: {
        "@type": "Person",
        name: t.name
      },
      reviewBody: t.feedback,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: "5",
        worstRating: "1"
      },
      itemReviewed: {
        "@type": "EducationalOccupationalProgram",
        name: t.course,
        provider: {
          "@type": "EducationalOrganization",
          name: "Abreonix Cybersecurity Institute"
        }
      }
    }))
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
            What Our <span className="bg-gradient-to-br from-[#2196F3] to-[#4C1D95] bg-clip-text text-transparent">Students Say</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Our graduates are leading cybersecurity initiatives, working in global
            companies, and building safer digital systems — here’s what they have
            to say.
          </p>

          {/* Testimonials Grid */}
          <section className="py-5 bg-[#060b22] text-white overflow-hidden rounded-3xl shadow-xl border border-white/10">

            {/* Row 1 – Right → Left */}
            <div className="overflow-hidden">
              <div
                ref={row1}
                className="flex gap-8 p-6 animate-scroll-left whitespace-nowrap"
              >
                {testimonials.map((t) => (
                  <div
                  key={t.id}
                  className="flex-shrink-0 w-100 bg-[#0b1128] p-6 rounded-2xl 
                  border border-blue-500/20 
                  hover:border-blue-500/40 
                  shadow-lg hover:shadow-blue-500/30
                  transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Profile */}
                    <div className="flex items-center mb-4">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={52}
                        height={52}
                        className="rounded-full mr-4 border border-blue-400/40"
                        />
                      <div className="text-left">
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-gray-400">{t.course}</p>
                      </div>
                    </div>

                    {/* Feedback */}
                    <p className="text-gray-300 mb-4 italic leading-relaxed break-words whitespace-normal">
                      "{t.feedback}"
                    </p>

                    {/* Rating */}
                    <div className="flex items-center">
                      {[...Array(Math.floor(t.rating))].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 – Left → Right */}
            <div className="overflow-hidden ">
              <div
                ref={row2}
                className="flex gap-8 p-6 animate-scroll-right whitespace-nowrap"
              >
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="flex-shrink-0 w-100 bg-[#0b1128] p-6 rounded-2xl 
                              border border-blue-500/20 
                              hover:border-blue-500/40 
                              shadow-lg hover:shadow-blue-500/30
                              transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Profile */}
                    <div className="flex items-center mb-4">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={52}
                        height={52}
                        className="rounded-full mr-4 border border-blue-400/40"
                      />
                      <div className="text-left">
                        <p className="font-semibold] text-white">{t.name}</p>
                        <p className="text-sm] text-gray-400">{t.course}</p>
                      </div>
                    </div>

                    {/* Feedback */}
                    <p className="text-gray-300 mb-4 italic leading-relaxed break-words whitespace-normal">
                      "{t.feedback}"
                    </p>

                    {/* Rating */}
                    <div className="flex items-center">
                      {[...Array(Math.floor(t.rating))].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3 – Right → Left */}
            <div className="overflow-hidden ">
              <div
                ref={row3}
                className="flex gap-8 p-6 animate-scroll-left whitespace-nowrap"
              >
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="flex-shrink-0 w-100 bg-[#0b1128] p-6 rounded-2xl 
                              border border-blue-500/20 
                              hover:border-blue-500/40 
                              shadow-lg hover:shadow-blue-500/30
                              transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Profile */}
                    <div className="flex items-center mb-4">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={52}
                        height={52}
                        className="rounded-full mr-4 border border-blue-400/40"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-white">{t.name}</p>
                        <p className="text-sm text-gray-400">{t.course}</p>
                      </div>
                    </div>

                    {/* Feedback */}
                    <p className="text-gray-300 mb-4 italic leading-relaxed break-words whitespace-normal">
                      "{t.feedback}"
                    </p>

                    {/* Rating */}
                    <div className="flex items-center">
                      {[...Array(Math.floor(t.rating))].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* Optional Video Testimonials */}
          <div className="mt-20">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Watch Our <span className="bg-gradient-to-br from-[#2196F3] to-[#4C1D95] bg-clip-text text-transparent">Students' Stories</span>
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
