import { Metadata } from "next";
import TeamEklavyaPageComponent from "./TeamEklavya";
import Nav from "./Nav";
export const metadata: Metadata = {
  title: "Abreonix × Team Eklavya — Student Industry Exposure & Cybersecurity",
  description: "Discover the strategic collaboration between Abreonix and Team Eklavya. Gain hands-on cybersecurity skills, industry exposure, networking opportunities, and career development through workshops, events, and real-world experiences.",
  keywords: [
    "Abreonix",
    "Team Eklavya",
    "Cybersecurity Education",
    "Student Career Growth",
    "Industry Exposure",
    "Networking Opportunities",
    "Hackathons",
    "Workshops",
    "Technical Events",
    "Career Development",
  ],
  authors: [{ name: "Abreonix", url: "https://abreonix.in" }],
  creator: "Abreonix",
  publisher: "Abreonix",
  openGraph: {
    title: "Abreonix × Team Eklavya — Student Industry Exposure & Cybersecurity",
    description: "Join the strategic collaboration between Abreonix and Team Eklavya for hands-on cybersecurity training, industry exposure, and career development.",
    url: "https://teameklavya.abreonix.in/",
    siteName: "Abreonix",
    images: [
      {
        url: "https://abreonix.in/eklavya/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abreonix × Team Eklavya Collaboration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abreonix × Team Eklavya — Student Industry Exposure & Cybersecurity",
    description: "Hands-on cybersecurity skills, industry exposure, networking opportunities, and career development through Abreonix × Team Eklavya collaboration.",
    images: ["https://abreonix.in/eklavya/og-image.jpg"],
    creator: "@AbreonixOfficial",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TeamEklavyaPage() {
  return (
    <div>
      <Nav />
        <TeamEklavyaPageComponent />
    </div>
  );
}