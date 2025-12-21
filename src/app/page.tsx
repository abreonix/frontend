import { Metadata } from "next";
import { BrowserRouter } from "react-router-dom";
import WhatsappButton from "@/components/WhatsappButton";
import InstagramToast from "@/components/ig";
import Main from "@/components/Home";
import NavbarMain from "@/components/NavbarMain";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Abreonix Cyber Security Institute — MCA Registered, NIELIT Authorized",
  description:
    "Abreonix is a premier Cyber Security Institute established in 2025. MCA registered, NIELIT authorized, MSME recognized, and led by IBM Corporate Cybersecurity Trainers.",
  keywords: [
    "Cyber Security Institute",
    "Ethical Hacking Course",
    "NIELIT Cyber Security",
    "Cyber Security Training India",
    "IBM Cybersecurity Trainers",
    "Offline cyber security institute"
  ],

  openGraph: {
    title: "Abreonix Cyber Security Institute — Ethical Hacking & Cyber Defense",
    description:
      "Learn Ethical Hacking, SOC, Penetration Testing & more. MCA Registered, NIELIT Authorized, MSME Recognized.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Abreonix Cyber Security Institute"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Abreonix Cyber Security Institute — Established 2025",
    description:
      "Offline cyber security training taught by IBM Corporate Trainers. NIELIT authorized and EC-Council aligned.",
    images: ["/logo.png"]
  },

  alternates: {
    canonical: "https://www.abreonix.in/",
  }
};


export default function HomePage() {
  return (
    <div>
      <BrowserRouter>
      <NavbarMain />
  <Main />
     <Footer />
      </BrowserRouter>
    </div>
  );
}
