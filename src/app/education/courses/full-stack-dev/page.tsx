import { Metadata } from "next";
import Navbar from "@/components/NavbarEdu"; 
import FullStackPage from "@/app/education/courses/full-stack-dev/full"; // Importing the client component

export const metadata: Metadata = {
  title: "Full Stack Web Development Course | MERN Stack | Abreonix",
  description: "Master Full Stack Development with Abreonix. Learn MongoDB, Express, React.js, and Node.js. Build real-world projects and get job-ready.",
  keywords: [
    "Full Stack Development Course",
    "MERN Stack Training",
    "Web Development Diploma",
    "React JS Course",
    "Node JS Training",
    "Frontend and Backend",
  ],
  openGraph: {
    title: "Full Stack Web Development Course | Abreonix",
    description: "Become a Full Stack Developer. Master the MERN stack and build production-ready applications.",
    url: "https://abreonix.in/courses/full-stack-dev",
    siteName: "Abreonix Institute",
    images: [
      {
        url: "/images/fullstack.jpg", // Ensure this image exists!
        width: 1200,
        height: 630,
        alt: "Abreonix Full Stack Development Course",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Stack Web Development Course | MERN Stack",
    description: "Join Abreonix’s Full Stack Bootcamp. Build your career in web development.",
    images: ["/images/fullstack.jpg"],
  },
  alternates: {
    canonical: "https://abreonix.in/courses/full-stack-dev",
  },
};

export default function Page() {
  return (
    <div>
      <Navbar />
      <FullStackPage />
    </div>
  );
}