"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Script from "next/script";

const Footer = () => {
  const year = new Date().getFullYear();

  // JSON-LD Schema for SEO (helps Google understand your org)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Abreonix",
    url: "https://abreonix.com",
    logo: "https://abreonix.com/logo.png",
    sameAs: [
      "https://www.instagram.com/abreonix",
      "https://www.linkedin.com/company/abreonix"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9999999999",
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"]
      }
    ]
  };

  return (
    <footer className="bg-gray-950 text-gray-300 py-10  border-t border-gray-800">
      {/* JSON-LD for structured SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">Abreonix</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Abreonix is an emerging EdTech platform empowering students to
            learn, build, and innovate with real-world tech skills in AI, AR/VR,
            and Web Development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-white transition">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-white transition">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-white transition">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-white text-lg font-medium mb-3">Connect With Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91-9999999999
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> contact@abreonix.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Gurgaon, India
            </li>
          </ul>

          <div className="flex items-center gap-4 mt-4">
            <Link
              href="https://www.instagram.com/abreonix"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram
                size={20}
                className="hover:text-white transition-transform hover:scale-110"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/abreonix"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin
                size={20}
                className="hover:text-white transition-transform hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © {year} Abreonix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
