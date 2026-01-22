"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Script from "next/script";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

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
      Hello Footer
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* LOGO + ABOUT */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo2.png"
                alt="Abreonix Logo"
                width={50}
                height={50}
                className="object-contain"
              />

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

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/abreonix_cybersecurity/"
                target="_blank"
                className="p-2 bg-gray-800 rounded-sm hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/company/abreonix-cyber-sec-pvt-ltd"
                target="_blank"
                className="p-2 bg-gray-800 rounded-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://wa.me/918690650532"
                target="_blank"
                className="p-2 bg-gray-800 rounded-sm hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
              >
                <MessageCircle size={18} />
              </a>

              <a
                href="mailto:info@Abreonix.in"
                className="p-2 bg-gray-800 rounded-sm hover:bg-sky-600 transition-all duration-300 transform hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-600"></span>
            </h3>

            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/education", label: "Education" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-sky-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100"></div>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 relative pb-2">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-600"></span>
            </h3>

            <ul className="space-y-4 text-sm">

              {/* PHONE */}
              <li>
                <a
                  href="tel:+918690650532"
                  className="flex items-center gap-3 hover:text-green-400 transition-all group"
                >
                  <div className="p-2 bg-gray-800 rounded-sm group-hover:bg-green-600">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Phone</div>
                    <div>+91 86906 50532</div>
                  </div>
                </a>
              </li>

              {/* EMAIL */}
              <li>
                <a
                  href="mailto:info@Abreonix.in"
                  className="flex items-center gap-3 hover:text-sky-400 transition-all group"
                >
                  <div className="p-2 bg-gray-800 rounded-sm group-hover:bg-sky-600">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Email</div>
                    <div>info@Abreonix.in</div>
                  </div>
                </a>
              </li>

              {/* LOCATION */}
              <li>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-sm">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Location</div>
                    <div>
                      Prayagraj <br />
                      Uttar Pradesh, India
                    </div>
                  </div>
                </div>
              </li>

              {/* WHATSAPP */}
              <li>
                <a
                  href="https://wa.me/918690650532"
                  target="_blank"
                  className="flex items-center gap-3 hover:text-green-400 transition-all group"
                >
                  <div className="p-2 bg-gray-800 rounded-sm group-hover:bg-green-600">
                    <MessageCircle size={16} />
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

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <div className="text-center md:text-left">
              © {year} Abreonix Cyber Security Pvt. Ltd. All rights reserved.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link href="/privacy" className="hover:text-sky-400">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-400">Terms of Service</Link>
              <span className="text-sky-400">Secure Your Future</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
