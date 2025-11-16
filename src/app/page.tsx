import { Metadata } from "next";
import Home from "@/components/Home";
import { BrowserRouter } from "react-router-dom";
import WhatsappButton from "@/components/WhatsappButton";

export const metadata: Metadata = {
  title:
    "Abreonix Cyber Security Institute | MCA Registered, NIELIT Authorized | Ethical Hacking & Cybersecurity Training",
  description:
    "Abreonix is a premier Cyber Security Institute offering offline training. Established in 2025, our mission is to empower learners through real-world, enterprise-grade cybersecurity education. Officially registered under MCA, authorized by NIELIT, aligned with EC-Council standards, and recognized by MSME.",
  keywords: [
    "Abreonix cyber security institute",
    "cyber security training India",
    "ethical hacking institute",
    "NIELIT authorized institute",
    "cyber security course Delhi",
    "IBM corporate trainers cybersecurity",
    "penetration testing course",
    "network security training",
    "offline cyber security institute",
    "best cyber security course India",
  ],

  openGraph: {
    title:
      "Abreonix Cyber Security Institute | Learn Ethical Hacking & Cyber Defense",
    description:
      "Learn ethical hacking, penetration testing, SOC training & more. MCA Registered, NIELIT Authorized, MSME recognized.",
    url: "https://abreonix.com/",
    siteName: "Abreonix Cyber Security Institute",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Abreonix Cyber Security Institute - Official Logo",
      },
    ],
    type: "website",
  },

  // 🐦 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title:
      "Abreonix Cyber Security Institute | MCA Registered | Ethical Hacking Training",
    description:
      "Established in 2025 by IBM Corporate Trainers. Hands-on cybersecurity learning with NIELIT authorization and EC-Council aligned modules.",
    images: ["/logo.png"],
  },

  alternates: {
    canonical: "https://abreonix.com/",
  },

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
        url: "/logo.png",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div>
      <BrowserRouter>
        <WhatsappButton />
        <Home />
      </BrowserRouter>
    </div>
  );
}
