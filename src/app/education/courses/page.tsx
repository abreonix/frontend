import { Metadata } from "next";
import CoursePage from "@/app/education/courses/Course";
import Navbar from "@/components/NavbarEdu";

export const metadata: Metadata = {
  title:
    "Courses | Abreonix MCA Registered Government-Recognized Programs",
  description:
    "Explore government-recognized, NIELIT-authorized cybersecurity courses by Abreonix. Offering One-Year Advanced Diploma, 6-Month Cyber Security Diploma, and 3-Month Fundamental Cyber Security Certification. Industry-grade curriculum aligned with EC-Council and taught by IBM Corporate Trainers.",
  keywords: [
    "NIELIT authorized cybersecurity courses",
    "government recognized cyber security diploma",
    "One Year Advanced Cyber Security Diploma",
    "6 Months Cyber Security Certification",
    "3 Months Basic Cyber Security Course",
    "MCA registered institute cyber security",
    "EC-Council aligned cybersecurity program",
    "best government cyber security course India",
    "Abreonix cyber security training",
  ],

  // 🟦 Open Graph for LinkedIn/Facebook
  openGraph: {
    title:
      "Courses | Abreonix Official Government Programs",
    description:
      "Join Abreonix’s official NIELIT-authorized cyber security programs, including One-Year Diploma, 6-Month Diploma, and 3-Month Basic Cyber Security Course. Government-recognized and taught by IBM Corporate Trainers.",
    url: "https://abreonix.in/courses",
    siteName: "Abreonix Cyber Security Institute",
    images: [
      {
        url: "/courses-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Abreonix NIELIT Authorized Cyber Security Courses",
      },
    ],
    type: "website",
  },

  // 🐦 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title:
      "NIELIT Authorized Cyber Security Courses | Abreonix Government Certified",
    description:
      "Explore Abreonix’s official NIELIT-authorized cyber security diplomas and certification courses taught by IBM Corporate Trainers.",
    images: ["/courses-banner.jpg"],
  },

  // 🔗 Canonical URL
  alternates: {
    canonical: "https://abreonix.in/courses",
  },

};

export default function CoursesPage() {
  return (
    <div>
      <Navbar />
      <CoursePage />
    </div>
  );
}
