import { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import AboutusPage from "@/app/about-us/AboutusPage";
export const metadata: Metadata = {
  title: "About | Abreonix Cybersecurity Institute",
  description:
    "Abreonix is a NPTEL-verified, government-authorized cybersecurity and technology institute dedicated to empowering learners with real-world tech skills.",
  keywords: [
    "Abreonix Cybersecurity",
    "About Abreonix",
    "NPTEL verified institute",
    "Government authorized tech courses",
    "Cybersecurity training India"
  ],
  openGraph: {
    title: "About Abreonix Cybersecurity Institute",
    description:
      "Learn about Abreonix, an NPTEL-verified government-approved institute providing advanced cybersecurity, AI, and AR/VR training programs.",
    url: "https://abreonix.com/about-us",
    siteName: "Abreonix",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Abreonix Cybersecurity Institute"
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "https://abreonix.com/about-us"
  }
};

export default function Page() {
  return (
    <AboutusPage/>
  );
}
