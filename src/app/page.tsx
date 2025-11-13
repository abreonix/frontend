import { Metadata } from "next";
import Home from "@/components/Home";
import { BrowserRouter } from "react-router-dom";
// ✅ Homepage-specific SEO
export const metadata: Metadata = {
  title: "Abreonix | Cyber Security Institute - Learn, Build & Secure the Future",
  description:
    "Abreonix is a leading Cyber Security Institute offering both online and offline training. Master ethical hacking, network defense, and modern tech with hands-on guidance.",
  keywords: [
    "Abreonix cyber security",
    "cyber security training",
    "ethical hacking course",
    "penetration testing",
    "network security",
    "online cyber courses",
    "cyber security institute India",
  ],
  openGraph: {
    title: "Abreonix | Cyber Security Institute - Learn, Build & Secure the Future",
    description:
      "Join Abreonix to master Cyber Security online or offline with real-world projects, expert mentorship, and certification.",
    url: "https://abreonix.com/",
    siteName: "Abreonix",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Abreonix Cyber Security Institute",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abreonix | Cyber Security Institute",
    description:
      "Learn, build, and protect the digital world with Abreonix — your path to becoming a cyber expert.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://abreonix.com/",
  },
};

export default function HomePage() {
  return (
    <div>
      <BrowserRouter>
      <Home />
      </BrowserRouter>
    </div>
  );
}