import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import AboutPageComponent from "@/app/about/About";
import Navbar from "@/components/NavbarEdu";
export const metadata: Metadata = {
  title:
    "About Abreonix Cyber Security Institute | MCA Registered, NIELIT Authorized, IBM Corporate Trainers",
  description:
    "Abreonix is a nationally recognized physical Cyber Security Institute established in 2025 by IBM Corporate Trainers. Registered under MCA, authorized by NIELIT (MeitY), aligned with EC-Council standards, and recognized by MSME. Learn ethical hacking, cyber defense, AI, AR/VR and more through real-world, industry-grade training.",
  keywords: [
    "About Abreonix",
    "Abreonix Cyber Security Institute",
    "MCA registered cyber institute",
    "NIELIT authorized training center",
    "IBM corporate trainer cybersecurity",
    "EC-Council aligned curriculum",
    "government recognized cyber security institute",
    "ethical hacking training institute",
    "best cyber security institute India",
    "Abreonix founders Ayush Kumar Harshit"
  ],

  // 🟦 Open Graph for LinkedIn / Facebook
  openGraph: {
    title:
      "About Abreonix | MCA Registered & NIELIT Authorized Cyber Security Institute",
    description:
      "Discover Abreonix — a physical, government-authorized cyber security institute established in 2025 by IBM Corporate Trainers. MCA Registered, NIELIT Authorized, MSME recognized, EC-Council aligned. Delivering real-world cybersecurity and emerging tech education.",
    url: "https://abreonix.in/about",
    siteName: "Abreonix Cyber Security Institute",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Abreonix Cyber Security Institute Official Logo",
      },
    ],
    type: "website",
  },

  // 📦 Twitter Card
  twitter: {
    card: "summary_large_image",
    title:
      "About Abreonix | Government Authorized Cyber Security Institute",
    description:
      "Learn about Abreonix — MCA Registered, NIELIT Authorized, MSME Recognized, founded by IBM Corporate Trainers. Delivering industry-level cybersecurity education since 2025.",
    images: ["/logo.png"],
  },

  // 🔗 Canonical URL
  alternates: {
    canonical: "https://abreonix.in/about",
  },

};

export default function AboutPage() {
  return(
  <div>
<Navbar />
  <AboutPageComponent />
  </div>
  );
}
