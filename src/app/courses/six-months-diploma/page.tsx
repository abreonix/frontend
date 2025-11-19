import { Metadata } from "next";
import SixMonthsPage from "./six";

export const metadata: Metadata = {
  title:
    "6-Month Cyber Security Diploma | NIELIT Authorized | Abreonix Government Recognized",
  description:
    "Enroll in Abreonix’s 6-Month Cyber Security Diploma — a NIELIT-authorized, government-recognized program covering ethical hacking, network security, SOC fundamentals, cloud security, and digital forensics. Build industry-ready cyber skills with Abreonix.",
  keywords: [
    "6 Months Cyber Security Diploma",
    "NIELIT authorized cyber security course",
    "government recognized cyber security certification",
    "Abreonix cyber security diploma",
    "ethical hacking course 6 months",
    "network security diploma",
    "cyber security institute India",
    "best cyber security diploma",
    "digital forensics training",
  ],

  // 🟦 Open Graph (LinkedIn / Facebook)
  openGraph: {
    title:
      "6-Month Cyber Security Diploma | Abreonix | NIELIT Authorized Program",
    description:
      "Join Abreonix’s government-recognized, NIELIT-authorized 6-Month Cyber Security Diploma designed for students and professionals aiming for a career in cyber defense.",
    url: "https://abreonix.in/courses/six-months-diploma",
    siteName: "Abreonix Cyber Security Institute",
    images: [
      {
        url: "images/six.jpg",
        width: 1200,
        height: 630,
        alt: "Abreonix 6-Month Cyber Security Diploma",
      },
    ],
    type: "website",
  },

  // 🐦 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title:
      "6-Month Cyber Security Diploma | Abreonix (NIELIT Authorized & Government Certified)",
    description:
      "Build your cyber security career with Abreonix’s NIELIT-authorized 6-Month Cyber Security Diploma. Government-recognized training with hands-on labs.",
    images: ["images/six.jpg"],
  },

  // 🔗 Canonical URL
  alternates: {
    canonical: "https://abreonix.in/courses/six-months-diploma",
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
        url: "images/six.jpg",
      },
    ],
  },
};

export default function CoursesPage() {
  return (
    <div>
      <SixMonthsPage />
    </div>
  );
}
