import "./globals.css";
import { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";

export const metadata: Metadata = {
  title: {
    default: "Abreonix | Learn. Build. Innovate.",
    template: "%s | Abreonix",
  },
  description:
    "Abreonix — India's emerging edtech platform empowering students with hands-on technology courses in AI, AR/VR, Web, and beyond.",
  icons: {
    icon: "/favicon.ico",
  },
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