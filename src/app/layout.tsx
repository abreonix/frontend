import "./globals.css";
import "@/styles/futuristic.css";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "@/components/Footer";
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";
// Removed unused ReactSnowfall import (it belongs in page.tsx)

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abreonix.in"),

  title: {
    default: "Abreonix — Learn. Build. Innovate.",
    template: "%s | Abreonix",
  },

  description:
    "Abreonix is an emerging cyber security and tech institute offering professional diploma programs and industry-grade training in Cybersecurity, AI, Web Development, and AR/VR.",

  keywords: [
    "Abreonix",
    "Cyber Security Institute",
    "Edtech India",
    "Diploma Courses",
    "Cybersecurity Training",
    "Ethical Hacking",
    "AI Courses",
    "NIELIT Authorized Institute",
  ],

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
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://www.abreonix.in",
    title: "Abreonix — Learn. Build. Innovate.",
    description:
      "India's top cyber security and technology training institute offering government-recognized diploma programs.",
    siteName: "Abreonix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abreonix Official Banner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abreonix — Learn. Build. Innovate.",
    description:
      "Join Abreonix for government-recognized diploma programs and real-world cybersecurity training.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "https://www.abreonix.in/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true} // ✅ Added here to fix the Body hydration error
        className={`${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground antialiased`}
      >
        {/* ✅ JSON-LD MUST BE INSIDE BODY */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Abreonix Cyber Security Institute",
              "legalName": "Abreonix",
              "url": "https://www.abreonix.in",
              "logo": "https://www.abreonix.in/logo.png",
              "foundingDate": "2025",
              "description":
                "Abreonix is a premier cybersecurity and technology institute offering diploma programs and industry-grade training.",
              "sameAs": [
                "https://www.instagram.com/abreonix",
                "https://www.linkedin.com/company/abreonix-cyber-sec-pvt-ltd",
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN",
                "addressRegion": "Uttar Pradesh",
                "addressLocality": "Prayagraj",
              },
              // "founder": {
              //   "@type": "Person",
              //   "name": "Ayush Kumar",
              // },
            }),
          }}
        />

        <ClientLoaderWrapper>
          <main className="min-h-[80vh]">{children}</main>
          {/* <Footer /> ✅ Added Footer back so it appears on the site */}
        </ClientLoaderWrapper>
      </body>
    </html>
  );
}
