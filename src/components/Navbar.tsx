"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  X, 
  ChevronDown, 
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
  MapPin
} from "lucide-react";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Courses data for dropdown
  const courses = [
    {
      title: "One Year Diploma in Cyber Security",
      slug: "one-year-diploma",
      duration: "12 Months",
      schedule: "Weekdays & Weekend Batches",
      level: "Advanced",
      students: "2,500+",
      rating: 4.9,
      image: "/api/placeholder/400/250",
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
      image: "/api/placeholder/400/250",
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
      image: "/api/placeholder/400/250",
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCoursesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Courses", 
      href: "/courses",
      hasDropdown: true
    },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" }
  ];

  const getColorClasses = (color) => {
    const colors = {
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
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
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
        .dropdown-enter {
          opacity: 0;
          transform: translateY(-10px);
        }
        .dropdown-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.3s, transform 0.3s;
        }
      `}</style>

      <header 
        className={`top-0 sticky z-50 left-0 right-0 w-full bg-white/95 backdrop-blur-md transition-all duration-500 ${
          scrolled 
            ? 'shadow-lg shadow-orange-100/30 border-b border-gray-300' 
            : 'shadow-sm border-b border-gray-300'
        }`}
      >
        {/* Contact Info Bar */}
        <section className={` bg-gray-900 text-white border-t py-2 sectionNav border-gray-800 ${
          // scrolled ? 'h-0 py-0 opacity-0 ' : 'py-2 h-auto opacity-100'
          ""
        }`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="sm:flex flex-wrap justify-center gap-6 md:gap-8 text-sm hidden">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-indigo-900-400 transition-colors">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@abrenoix.com" className="flex items-center gap-2 hover:text-indigo-900-400 transition-colors">
                <Mail size={16} />
                <span>info@abrenoix.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Mon-Sat: 9AM-6PM</span>
              </div>
            </div>
          </div>
        </section>

        <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group menu-item-hover flex-shrink-0"
            aria-label="Abrenoix Cyber Security Home"
            onClick={() => setActiveLink("/")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-900 rounded-sm blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Image
                src="/logo2.png"
                alt="Abrenoix Logo"
                width={40}
                height={40}
                className="relative rounded-sm"
              >
              </Image>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-900 to-sky-600 bg-clip-text text-transparent">
                Abrenoix
              </span>
              <span className="text-xs text-gray-500 -mt-1">Cyber Security</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.hasDropdown ? (
                  <div
                    onMouseEnter={() => setCoursesDropdown(true)}
                    onMouseLeave={() => setCoursesDropdown(false)}
                    className="relative"
                  >
                    <button
                      className={`nav-link px-4 py-3 text-gray-700 font-medium rounded-sm hover:text-sky-600 transition-all duration-300 flex items-center gap-1 ${
                        activeLink === link.href ? 'active text-sky-600' : ''
                      }`}
                    >
                      {link.name}
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${
                          coursesDropdown ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Courses Dropdown */}
                    {coursesDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-sm shadow-2xl border border-gray-300 animate-scale-in">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Our Programs</h3>
                            <Link 
                              href="/courses"
                              className="text-sm text-sky-600 font-medium hover:text-sky-800"
                              onClick={() => setCoursesDropdown(false)}
                            >
                              View All →
                            </Link>
                          </div>
                          
                          <div className="space-y-3">
                            {courses.map((course, index) => (
                              <Link
                                key={course.slug}
                                href={`/courses/${course.slug}`}
                                className="block p-4 rounded-sm border border-gray-300 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
                                onClick={() => setCoursesDropdown(false)}
                              >
                                <div className="flex items-start gap-4">
                                  <div className={`w-12 h-12 rounded-sm bg-gradient-to-br ${getColorClasses(course.color)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                    <course.icon className="text-white" size={20} />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-sky-600 transition-colors mb-2">
                                      {course.title}
                                    </h4>
                                    
                                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                                      <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        <span>{course.duration}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        <span>{course.schedule}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-1">
                                        <Star className="text-yellow-400 fill-yellow-400" size={12} />
                                        <span className="text-xs font-medium">{course.rating}</span>
                                        <span className="text-xs text-gray-500">({course.students})</span>
                                      </div>
                                      <span className={`text-xs px-2 py-1 rounded-sm ${
                                        course.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                                        course.level === 'Intermediate' ? 'bg-orange-100 text-sky-800' :
                                        'bg-green-100 text-green-700'
                                      }`}>
                                        {course.level}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-300">
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="p-2 rounded-sm bg-sky-50">
                                <Award className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                                <span className="text-xs text-gray-700">NIELIT Certified</span>
                              </div>
                              <div className="p-2 rounded-sm bg-green-50">
                                <Users className="w-4 h-4 text-green-600 mx-auto mb-1" />
                                <span className="text-xs text-gray-700">10K+ Students</span>
                              </div>
                              <div className="p-2 rounded-sm bg-indigo-50">
                                <BookOpen className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                                <span className="text-xs text-gray-700">500+ Hours</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`nav-link px-4 py-3 text-gray-700 font-medium rounded-sm hover:text-sky-600 transition-all duration-300 ${
                      activeLink === link.href ? 'active text-sky-600' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 text-sm rounded-sm border-2 border-sky-600 text-sky-600 font-semibold hover:bg-sky-600 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Free Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2.5 rounded-sm transition-all duration-300 menu-item-hover ${
              isOpen 
                ? 'bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-lg' 
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
            <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-300 lg:hidden animate-slide-down">
              <ul className="flex flex-col space-y-1 px-4 py-4">
                {navLinks.map((link, index) => (
                  <li 
                    key={link.name}
                    style={{ animationDelay: `${index * 0.05}s` }}
                    className="animate-slide-down"
                  >
                    {link.hasDropdown ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => setCoursesDropdown(!coursesDropdown)}
                          className={`flex items-center justify-between w-full py-3 px-4 rounded-sm text-sm font-medium transition-all duration-300 border ${
                            activeLink === link.href
                              ? 'bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-600 border-orange-200'
                              : 'text-gray-700 hover:bg-gray-50 border-transparent'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ${
                              coursesDropdown ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        {coursesDropdown && (
                          <div className="ml-4 space-y-1 animate-scale-in">
                            {courses.map((course) => (
                              <Link
                                key={course.slug}
                                href={`/courses/${course.slug}`}
                                onClick={() => {
                                  setCoursesDropdown(false);
                                  closeMenu();
                                }}
                                className="block py-2 px-4 rounded-sm bg-gray-50 hover:bg-sky-50 hover:text-sky-600 transition-colors border border-gray-200"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-sm bg-gradient-to-br ${getColorClasses(course.color)} flex items-center justify-center`}>
                                    <course.icon className="text-white" size={14} />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">{course.title}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                      <Clock size={10} />
                                      {course.duration}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.href);
                          closeMenu();
                        }}
                        className={`block py-3 px-4 rounded-sm text-sm font-medium transition-all duration-300 border ${
                          activeLink === link.href
                            ? 'bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-600 border-orange-200 shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-sky-600 hover:border-gray-300 border-transparent'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
                
                {/* Mobile CTA */}
                <li className="pt-2 animate-slide-down" style={{ animationDelay: '0.25s' }}>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block text-center py-3 px-4 text-sm rounded-sm border-2 border-sky-600 text-sky-600 font-semibold hover:bg-sky-600 hover:text-white transition-all duration-300"
                  >
                    Book Free Demo
                  </Link>
                </li>
              </ul>
              
              {/* Mobile Menu Footer */}
              <div className="px-4 py-3 border-t border-gray-300 bg-gradient-to-r from-sky-50/50 to-indigo-50/50">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>© 2024 Abrenoix</span>
                  <span>Secure Your Future</span>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Decorative gradient line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
      </header>
    </>
  );
};

export default Navbar;
