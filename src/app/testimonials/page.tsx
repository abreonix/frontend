import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Student Testimonials | Abreonix Cybersecurity Institute",
  description:
    "Discover how Abreonix has empowered students to become cybersecurity experts. Read authentic reviews and watch testimonials from certified learners.",
  keywords: [
    "Abreonix student reviews",
    "Abreonix testimonials",
    "cybersecurity success stories",
    "ethical hacking students",
    "Abreonix alumni feedback"
  ],
  openGraph: {
    title: "Student Testimonials | Abreonix Cybersecurity Institute",
    description:
      "Hear directly from Abreonix learners about their hands-on cybersecurity training, NPTEL-certified programs, and success stories.",
    url: "https://abreonix.com/testimonials",
    siteName: "Abreonix",
    images: [
      {
        url: "/testimonials-banner.jpg",
        width: 800,
        height: 600,
        alt: "Abreonix Student Testimonials"
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "https://abreonix.com/testimonials"
  }
};

export default function TestimonialsPage() {
  // Sample student testimonials (you can replace with dynamic data later)
  const testimonials = [
    {
      name: "Aditi Sharma",
      image: "/students/aditi.jpg",
      course: "Advanced Cybersecurity Diploma",
      feedback:
        "Abreonix provided me with real-world hacking exposure and mentorship that went far beyond theory. I’m now working in a cybersecurity startup!",
      rating: 5
    },
    {
      name: "Rahul Mehta",
      image: "/students/rahul.jpg",
      course: "Certified Ethical Hacking Program",
      feedback:
        "The faculty was amazing and the labs were practical. I cleared my CEH exam on my first attempt thanks to Abreonix guidance.",
      rating: 5
    },
    {
      name: "Sneha Kapoor",
      image: "/students/sneha.jpg",
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
    <section className="bg-white py-20">
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="container mx-auto px-6 max-w-6xl text-center">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Our <span className="text-blue-600">Students Say</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          Our graduates are leading cybersecurity initiatives, working in global
          companies, and building safer digital systems — here’s what they have
          to say.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {t.name}
              </h3>
              <p className="text-sm text-blue-600 mb-2">{t.course}</p>
              <p className="text-gray-600 mb-4">{t.feedback}</p>
              <p className="text-yellow-500 font-medium">
                {"⭐".repeat(Math.round(t.rating))} ({t.rating})
              </p>
            </div>
          ))}
        </div>

        {/* Optional Video Testimonials */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Watch Our Students’ Stories
          </h2>
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
  );
}
