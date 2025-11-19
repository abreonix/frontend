import { Metadata } from "next";
import ThreePage from "./three";

export const metadata: Metadata = {
  title:
    "3-Month Fundamental Cyber Security Certification | NIELIT Authorized | Abreonix",
  description:
    "Start your cyber security journey with Abreonix’s 3-Month Fundamental Cyber Security Certification. A NIELIT-authorized, government-recognized program covering cyber basics, ethical hacking fundamentals, network essentials, and hands-on security labs.",
  keywords: [
    "3 Months Cyber Security Course",
    "Basic Cyber Security Certification",
    "NIELIT authorized cyber security course",
    "Abreonix cyber security course",
    "ethical hacking fundamentals",
    "network security basics",
    "cyber security for beginners",
    "government recognized cyber course",
    "best cyber security course for beginners",
  ],

  // 🟦 Open Graph (LinkedIn / Facebook)
  openGraph: {
    title:
      "3-Month Fundamental Cyber Security Certification | Abreonix | NIELIT Authorized",
    description:
      "Join Abreonix’s government-recognized, NIELIT-authorized 3-Month Cyber Security Certification — perfect for beginners starting their cyber career.",
    url: "https://abreonix.in/courses/three-months-certification",
    siteName: "Abreonix Cyber Security Institute",
    images: [
      {
        url: "images/three.jpg",
        width: 1200,
        height: 630,
        alt: "Abreonix 3-Month Fundamental Cyber Security Certification",
      },
    ],
    type: "website",
  },

  // 🐦 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title:
      "3-Month Cyber Security Certification | Abreonix (NIELIT Authorized)",
    description:
      "Kickstart your career with Abreonix’s 3-Month NIELIT-authorized Cyber Security Certification. Learn basics of ethical hacking, network security, and cyber defense.",
    images: ["images/three.jpg"],
  },

alternates: {
  canonical: "https://abreonix.in/courses/three-months-basic",
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
        url: "images/three.jpg",
      },
    ],
  },
};

export default function CoursesPage() {
  return (
    <div>
      <ThreePage />
    </div>
  );
}
