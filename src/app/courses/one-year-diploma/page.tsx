import { Metadata } from "next";
import OneYearPage from "@/app/courses/one-year-diploma/one";

export const metadata: Metadata = {
  title:
    "One-Year Advanced Diploma in Cyber Security | NIELIT Authorized | Abreonix",
  description:
    "Enroll in Abreonix’s One-Year Advanced Diploma in Cyber Security. A NIELIT-authorized, government-recognized program covering network security, ethical hacking, cloud security, malware analysis, SOC operations, and digital forensics. Build job-ready cyber skills with Abreonix.",
  keywords: [
    "One Year Cyber Security Diploma",
    "Advanced Diploma in Cyber Security",
    "NIELIT authorized course",
    "government recognized cyber security course",
    "Abreonix cyber security diploma",
    "best cyber security course India",
    "ethical hacking diploma",
    "digital forensics course",
    "network security training",
  ],

  // 🟦 Open Graph (LinkedIn / Facebook)
  openGraph: {
    title:
      "One-Year Advanced Diploma in Cyber Security | Abreonix | NIELIT Authorized",
    description:
      "Join Abreonix’s One-Year Advanced Diploma in Cyber Security — a NIELIT-authorized, government-recognized program designed for job-ready cyber professionals.",
    url: "https://abreonix.in/courses/one-year-diploma",
    siteName: "Abreonix Cyber Security Institute",
    images: [
      {
        url: "/one-year-diploma-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Abreonix One-Year Advanced Diploma in Cyber Security",
      },
    ],
    type: "website",
  },

  // 🐦 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title:
      "One-Year Advanced Diploma in Cyber Security | Abreonix (NIELIT Authorized)",
    description:
      "Build your career with Abreonix’s NIELIT-authorized One-Year Cyber Security Diploma. Government-recognized advanced cybersecurity training.",
    images: ["/one-year-diploma-banner.jpg"],
  },

  // 🔗 Canonical URL
  alternates: {
    canonical: "https://abreonix.in/courses/one-year-diploma",
  },

  // ⭐ Favicon + OG Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
    other: [
      {
        rel: "icon",
        url: "/logo.png",
      },
      {
        rel: "og:image",
        url: "/one-year-diploma-banner.jpg",
      },
    ],
  },
};

export default function CoursesPage() {
  return (
    <div>
      <OneYearPage />
    </div>
  );
}
