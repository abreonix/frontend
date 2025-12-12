"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Clock, 
  Users, 
  Award,
  BookOpen,
  Calendar,
  Star,
  Shield,
  Zap,
  Lock,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  MessageCircle
} from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  // Courses data for reference (keeping for potential future use)
  const courses = [
    {
      title: "One Year Diploma in Cyber Security",
      slug: "one-year-diploma",
      duration: "12 Months",
      schedule: "Weekdays & Weekend Batches",
      level: "Advanced",
      students: "2,500+",
      rating: 4.9,
      icon: Shield,
      color: "orange",
      highlights: ["NIELIT Certified", "CEH & CompTIA Prep", "SOC Operations"]
    },
    {
      title: "6 Months Diploma in Cyber Security",
      slug: "six-months-diploma",
      duration: "6 Months",
      schedule: "Flexible Timing",
      level: "Intermediate",
      students: "1,800+",
      rating: 4.8,
      icon: Lock,
      color: "indigo",
      highlights: ["Fast-track", "Core Security Skills", "SOC Tools"]
    },
    {
      title: "3 Months Basic Cyber Security",
      slug: "three-months-basic",
      duration: "3 Months",
      schedule: "Weekend Classes",
      level: "Beginner",
      students: "3,200+",
      rating: 4.7,
      icon: Zap,
      color: "gray",
      highlights: ["Fundamentals", "Cyber Awareness", "Safe Practices"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Education", href: "/education" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "https://wa.me/918690650532" },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      orange: 'from-sky-400 to-sky-600',
      indigo: 'from-indigo-500 to-indigo-600',
      gray: 'from-gray-500 to-gray-600'
    };
    return colors[color] || colors.orange;
  };

  return (
    <>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.2s ease-out;
        }
        .nav-link {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #210CAE, #4DC9E6);
          transition: width 0.3s ease;
          border-radius: 0px;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 80%;
        }
        .menu-item-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .menu-item-hover:hover {
          transform: translateY(-1px);
        }
      `}</style>

      <header 
        className={`top-0 sticky z-50 left-0 right-0 w-full bg-white/95 backdrop-blur-md transition-all duration-500 ${
          scrolled 
            ? 'shadow-lg shadow-orange-100/30 border-b border-gray-300' 
            : 'shadow-sm border-b border-gray-300'
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group menu-item-hover shrink-0"
            aria-label="Abreonix Cyber Security Home"
            onClick={() => setActiveLink("/")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-sky-400 to-indigo-900 rounded-sm blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image
                src="/logo2.png"
                alt="Abreonix Logo"
                width={40}
                height={40}
                className="relative rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-linear-to-r from-indigo-900 to-sky-600 bg-clip-text text-transparent">
                Abreonix
              </span>
              <span className="text-xs text-gray-500 -mt-1">Cyber Security</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`nav-link px-4 py-3 text-gray-700 font-medium rounded-sm hover:text-sky-600 transition-all duration-300 ${
                    activeLink === link.href ? 'active text-sky-600' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="https://wa.me/918690650532"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm rounded-sm border-2 border-sky-600 text-sky-600 font-semibold hover:bg-sky-600 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Enquiry Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2.5 rounded-sm transition-all duration-300 menu-item-hover ${
              isOpen 
                ? 'bg-linear-to-br from-sky-400 to-indigo-500 text-white shadow-lg' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-sky-600'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X size={22} className="animate-fade-in" />
            ) : (
              <Menu size={22} className="animate-fade-in" />
            )}
          </button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-300 lg:hidden animate-slide-down max-h-[80vh] overflow-y-auto">
              <ul className="flex flex-col space-y-1 px-4 py-4">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.name}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className="animate-slide-down"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`block py-3 px-4 rounded-sm text-sm font-medium transition-all duration-300 border ${
                        activeLink === link.href
                          ? 'bg-linear-to-r from-sky-50 to-indigo-50 text-sky-600 border-orange-200 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-sky-600 hover:border-gray-300 border-transparent'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                
                {/* Mobile Contact Info */}
                <li className="pt-2 border-t border-gray-200 animate-slide-down" style={{ animationDelay: '0.2s' }}>
                  <div className="space-y-2 py-2">
                    <a 
                      href="tel:+918690650532"
                      className="flex items-center gap-3 py-2 px-4 text-gray-700 hover:text-green-600 transition-colors"
                    >
                      <Phone size={18} className="text-green-500" />
                      <span className="text-sm">+91 86906 50532</span>
                    </a>
                    <a 
                      href="mailto:info@Abreonix.in"
                      className="flex items-center gap-3 py-2 px-4 text-gray-700 hover:text-sky-600 transition-colors"
                    >
                      <Mail size={18} className="text-sky-500" />
                      <span className="text-sm">info@Abreonix.in</span>
                    </a>
                  </div>
                </li>
                
                {/* Mobile CTA */}
                <li className="pt-2 animate-slide-down" style={{ animationDelay: '0.25s' }}>
                  <a
                    href="https://wa.me/918690650532"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="block text-center py-3 px-4 text-sm rounded-sm border-2 border-sky-600 text-sky-600 font-semibold hover:bg-sky-600 hover:text-white transition-all duration-300"
                  >
                    Enquiry Now
                  </a>
                </li>

                {/* Mobile Social Links */}
                <li className="pt-4 border-t border-gray-200 animate-slide-down" style={{ animationDelay: '0.3s' }}>
                  <div className="flex justify-center gap-6 py-2">
                    <a 
                      href="https://www.instagram.com/abreonix_cybersecurity/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-pink-500 transition-colors transform hover:scale-110"
                      onClick={closeMenu}
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/abreonix-cyber-sec-pvt-ltd" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110"
                      onClick={closeMenu}
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href="https://wa.me/918690650532" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-green-500 transition-colors transform hover:scale-110"
                      onClick={closeMenu}
                    >
                      <MessageCircle size={20} />
                    </a>
                  </div>
                </li>
              </ul>
              
              {/* Mobile Menu Footer */}
              <div className="px-4 py-3 border-t border-gray-300 bg-linear-to-r from-sky-50/50 to-indigo-50/50">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>© 2025 Abreonix</span>
                  <span>Secure Your Future</span>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Decorative gradient line */}
        <div className="h-0.5 bg-linear-to-r from-transparent via-sky-400/30 to-transparent"></div>
      </header>
    </>
  );
};

export default Navbar;