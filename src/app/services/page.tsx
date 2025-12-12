import { Metadata } from "next";
import ServicesPage from "./services";
import Navbar from "@/components/NavbarMain";

export const metadata: Metadata = {
  title:
    "Services | Abreonix Cyber Security Institute | Professional Cybersecurity Services",
  description:
    "Explore Abreonix's cybersecurity services including penetration testing, vulnerability assessment, mobile app security, API security, cloud security reviews, and enterprise security consulting.",
  keywords: [
    "Abreonix services",
    "cybersecurity services",
    "penetration testing",
    "vulnerability assessment",
    "mobile app security",
    "web app security",
    "API security testing",
    "cloud security audit",
    "cyber consulting",
  ],

  openGraph: {
    title: "Cybersecurity Services | Abreonix Cyber Security Institute",
    description:
      "We offer professional cybersecurity services including VAPT, web & mobile security testing, API reviews, cloud audits, and enterprise security consulting.",
    url: "https://abreonix.in/services",
    siteName: "Abreonix Cyber Security Institute",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Abreonix Cyber Security Services",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Services | Abreonix Cyber Security Institute",
    description:
      "Discover Abreonix's cybersecurity services including VAPT, app security testing, API security, cloud audits, and consulting.",
    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://abreonix.in/services",
  },
};

export default function Page() {
  return(
<div>
<Navbar />
  <ServicesPage />
</div>
  ) 
  ;
}
