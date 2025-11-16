import "./globals.css";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";

export const metadata: Metadata = {
  title: {
    default: "Abreonix — Learn. Build. Innovate.",
    template: "%s | Abreonix"
  },

  description:
    "Abreonix is an emerging edtech institute offering professional diploma programs and industry-focused tech courses in Cybersecurity, AI, Web Development, and AR/VR.",

  keywords: [
    "Abreonix",
    "Edtech Institute India",
    "Cybersecurity courses",
    "AI training",
    "Diploma programs",
    "Skill development",
    "Abreonix Institute"
  ],

  metadataBase: new URL("https://www.abreonix.in"),

  alternates: {
    canonical: "https://www.abreonix.in",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },


  openGraph: {
    type: "website",
    url: "https://www.abreonix.in",
    title: "Abreonix — Learn. Build. Innovate.",
    description:
      "India's emerging edtech institute offering government-recognized diploma programs and hands-on technology training.",
    siteName: "Abreonix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abreonix – Official Website"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Abreonix — Learn. Build. Innovate.",
    description:
      "Join Abreonix for top-quality diploma programs and industry-ready tech courses.",
    images: ["/og-image.png"]
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground antialiased`}
      >
        <ClientLoaderWrapper>
          <Navbar />
          <main className="min-h-[80vh]">{children}</main>
          <Footer />
        </ClientLoaderWrapper>
      </body>
    </html>
  );
}
