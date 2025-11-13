import { Metadata } from "next";
import CoursePage from "@/app/courses/Course";
export const metadata: Metadata = {
  title: "NIELIT Certified Cybersecurity Courses | Abrenoix Government-Recognized Programs",
  description:
    "Explore NIELIT certified cybersecurity courses by Abrenoix. Choose from One Year Diploma, 6 Months Diploma, or 3 Months Basic Cyber Security Course with government recognition.",
  keywords: [
    "NIELIT certified cybersecurity",
    "One Year Cyber Security Diploma",
    "6 Months Cyber Security Course",
    "Basic Cyber Security Course",
    "government approved cyber security",
    "NIELIT cyber security diploma"
  ],
  openGraph: {
    title: "NIELIT Certified Cybersecurity Courses | Abrenoix",
    description:
      "Join Abrenoix's NIELIT certified cybersecurity programs - One Year Diploma, 6 Months Diploma, and 3 Months Basic Course with government recognition.",
    url: "https://abrenoix.com/courses",
    siteName: "Abrenoix",
    images: [
      {
        url: "/courses-banner.jpg",
        width: 800,
        height: 600,
        alt: "Abrenoix NIELIT Certified Cybersecurity Courses"
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "https://abrenoix.com/courses"
  }
};

export default function CoursesPage() {
  return (
    <div>
      <CoursePage />
    </div>
  );
}