"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Script from "next/script";
import Image from "next/image";
const Footer = () => {
  const year = new Date().getFullYear();

  // JSON-LD Schema for SEO (helps Google understand your org)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Abreonix",
    url: "https://abreonix.in",
    logo: "https://abreonix.in/logo.png",
    sameAs: [
      "https://www.instagram.com/abreonix_cybersecurity/",
      "https://www.linkedin.com/company/abreonix-cyber-sec-pvt-ltd",
      "https://wa.me/918690650532"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-8690650532",
        contactType: "customer support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"]
      }
    ]
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
      {/* JSON-LD for structured SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo2.png"
                  alt="Abreonix Logo"
                  width={50}
                  height={50}
                  className="object-contain">
                </Image>

              <div>
                <h2 className="text-white text-xl font-bold bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">
                  Abreonix
                </h2>
                <p className="text-xs text-gray-400 -mt-1">Cyber Security</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-md">
              Abreonix is a premier cybersecurity education platform empowering students
              with real-world security skills. We offer comprehensive training programs
              in ethical hacking, network security, and cyber defense.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/abreonix_cybersecurity/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-sm hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} className="text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/company/abreonix-cyber-sec-pvt-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={18} className="text-gray-300" />
              </a>
              <a
                href="https://wa.me/918690650532"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-sm hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle size={18} className="text-gray-300" />
              </a>
              <a
                href="mailto:info@Abreonix.in"
                className="p-2 bg-gray-800 rounded-sm hover:bg-sky-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Send us an email"
              >
                <Mail size={18} className="text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 relative pb-2">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-600"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  About
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 relative pb-2">
              Contact Info
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-600"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+918690650532"
                  className="flex items-center gap-3 hover:text-green-400 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gray-800 rounded-sm group-hover:bg-green-600 transition-colors">
                    <Phone size={16} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Phone</div>
                    <div>+91 86906 50532</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@Abreonix.in"
                  className="flex items-center gap-3 hover:text-sky-400 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gray-800 rounded-sm group-hover:bg-sky-600 transition-colors">
                    <Mail size={16} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Email</div>
                    <div>info@Abreonix.in</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-gray-800 rounded-sm">
                    <MapPin size={16} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Location</div>
                    <div>Delhi, India</div>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="https://wa.me/918690650532"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-green-400 transition-all duration-300 group mt-4"
                >
                  <div className="p-2 bg-gray-800 rounded-sm group-hover:bg-green-600 transition-colors">
                    <MessageCircle size={16} className="text-gray-300" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Quick Connect</div>
                    <div>Chat on WhatsApp</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              © {year} Abreonix Cyber Security Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-sky-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-sky-400 transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center gap-1 text-sky-400">
                <span>Secure Your Future</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;