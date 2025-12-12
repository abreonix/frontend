import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import AboutusPage from "@/app/about-us/AboutusPage";
import Navbar from "@/components/NavbarMain";
export const metadata: Metadata = {
  title:
    "About Us | Abreonix Cyber Security Institute | MCA Registered, NIELIT Authorized, IBM Corporate Trainers",
  description:
    "Abreonix is a physical Cyber Security Institute established in 2025 by IBM Corporate Trainers. MCA Registered, NIELIT Authorized (MeitY), MSME recognized, and aligned with EC-Council standards. We provide hands-on cyber security, ethical hacking, AI, and emerging tech training based on real-world enterprise security practices.",
  keywords: [
    "About Abreonix",
    "Abreonix Cyber Security Institute",
    "MCA registered cyber institute",
    "NIELIT authorized center",
    "IBM corporate cyber trainers",
    "EC-Council aligned cyber curriculum",
    "Government recognized cyber institute",
    "ethical hacking institute India",
    "cybersecurity course with certification",
    "Abreonix founders Ayush Kumar Harshit"
  ],

  // 🟦 Open Graph (Facebook, LinkedIn)
  openGraph: {
    title:
      "About Abreonix | Government Authorized & MCA Registered Cyber Security Institute",
    description:
      "Discover Abreonix — Established in 2025 by IBM Corporate Trainers, MCA Registered, NIELIT Authorized (MeitY), and MSME Recognized. Delivering enterprise-grade cybersecurity and emerging technology education.",
    url: "https://abreonix.in/about-us",
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

  // 🐦 Twitter SEO
  twitter: {
    card: "summary_large_image",
    title:
      "About Us | Abreonix Cyber Security Institute | NIELIT Authorized & MCA Registered",
    description:
      "Learn about Abreonix — A government-authorized cyber security institute founded by IBM Corporate Trainers, delivering real-world cyber defense & ethical hacking training.",
    images: ["/logo.png"],
  },

  // 🔗 Canonical URL
  alternates: {
    canonical: "https://abreonix.in/about-us",
  },

  
};

export default function Page() {
  return(
  <div>
  <Navbar />
  <AboutusPage />
  </div>
);
}
