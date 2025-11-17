"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles, ArrowRight, CheckCircle, Star, Users, Shield, Globe, Award, Code, Lock,
  BookOpen, Briefcase, TrendingUp, GraduationCap, ChevronRight, Target, Rocket,
  Zap, Calendar, Download, BadgeCheck, Laptop, Menu, X
} from "lucide-react";
import Image from "next/image";

interface FeatureItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface WhyChooseItem {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  points: string[];
}

interface Course {
  title: string;
  slug: string;
  duration: string;
  schedule: string;
  level: string;
  students: string;
  rating: number;
  overview: string;
  highlights: string[];
  modules: string[];
  icon: React.ComponentType<{ className?: string; size?: number }>;
  image: string;
  color: string;
  featured: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const autoplayRef = useRef<(() => void) | null>(null);

  const carouselImages = new Array(6).fill(null).map((_, i) => `/HomeCarousel/Image-${i + 1}.jpg`);

  // Autoplay + cleanup
  useEffect(() => {
    autoplayRef.current = () => {
      setCurrent(prev => (prev + 1) % carouselImages.length);
    };
  }, [carouselImages.length]);

  useEffect(() => {
    const play = () => {
      if (autoplayRef.current) {
        autoplayRef.current();
      }
    };
    const id = setInterval(play, 4000);
    return () => clearInterval(id);
  }, []);

  // keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // scroll visibility detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || 0);

      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach((section) => {
        if (!section.id) return;
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (inView && !isVisible[section.id]) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const prevSlide = () => setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () => setCurrent((c) => (c + 1) % carouselImages.length);
  const goTo = (i: number) => setCurrent(i);

  // Updated course data with slugs and brochure files
  const courses: Course[] = [
    {
      title: "One Year Diploma in Cyber Security",
      slug: "one-year-diploma",
      duration: "12 Months",
      schedule: "Weekdays & Weekend Batches",
      level: "Advanced",
      students: "2,500+",
      rating: 4.9,
      overview: "Comprehensive program building professional-level expertise in cyber defense and ethical hacking. Master network security, web application security, digital forensics, malware analysis, and cyber laws.",
      highlights: [
        "NIELIT Certified Government-Recognized Diploma",
        "Real-time attack detection & incident response training",
        "CEH, CompTIA Security+, SOC operations concepts",
        "Career-ready for Security Analyst & Pen Tester roles"
      ],
      modules: ["Network Security", "Ethical Hacking", "Digital Forensics", "Malware Analysis", "Cyber Laws"],
      icon: Shield,
      image: "/api/placeholder/400/250",
      color: "orange",
      featured: true,
    },
    {
      title: "6 Months Diploma in Cyber Security",
      slug: "six-months-diploma",
      duration: "6 Months",
      schedule: "Flexible Timing",
      level: "Intermediate",
      students: "1,800+",
      rating: 4.8,
      overview: "Fast-track training in core security skills covering ethical hacking fundamentals, network protection, threat detection, and SOC tools for immediate career upskilling.",
      highlights: [
        "Government-recognized NIELIT Certification",
        "Practical system & network defense sessions",
        "Industry-standard cybersecurity tools & techniques",
        "Perfect for career transition & upskilling"
      ],
      modules: ["Security Fundamentals", "Network Defense", "Threat Detection", "SOC Tools"],
      icon: Lock,
      image: "/api/placeholder/400/250",
      color: "indigo",
      featured: false,
    },
    {
      title: "3 Months Basic Cyber Security",
      slug: "three-months-basic",
      duration: "3 Months",
      schedule: "Weekend Classes",
      level: "Beginner",
      students: "3,200+",
      rating: 4.7,
      overview: "Foundational course introducing cyber safety fundamentals, covering online threats, phishing, password management, and basic network security for awareness and prevention.",
      highlights: [
        "NIELIT Certified Short-Term Course",
        "Beginner-friendly hands-on learning",
        "Safe internet & data protection practices",
        "Ideal for students, teachers & professionals"
      ],
      modules: ["Cyber Awareness", "Online Safety", "Data Protection", "Basic Security"],
      icon: Globe,
      image: "/api/placeholder/400/250",
      color: "gray",
      featured: false,
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      role: "Security Analyst at TCS",
      image: "PS",
      text: "The hands-on training at Abreonix prepared me perfectly for real-world challenges. I secured my dream job within 2 months of completing the diploma."
    },
    {
      name: "Rahul Verma",
      role: "Penetration Tester at Infosys",
      image: "RV",
      text: "Best decision of my career. The instructors are industry experts and the curriculum is exactly what companies are looking for."
    },
    {
      name: "Sneha Patel",
      role: "SOC Analyst at Wipro",
      image: "SP",
      text: "From a complete beginner to landing a SOC analyst role - Abreonix made it possible. The NIELIT certification carries real weight."
    }
  ];

  const stats: StatItem[] = [
    { label: "Training Hours", value: "500+", icon: BookOpen },
    { label: "Industry Projects", value: "50+", icon: Briefcase },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Certifications", value: "12+", icon: Award }
  ];

  const features: FeatureItem[] = [
    {
      icon: Code,
      title: "Hands-On Training",
      description: "Intensive lab sessions with real-world simulations. Build and break firewalls in controlled environments."
    },
    {
      icon: Target,
      title: "Career-Focused",
      description: "Industry-aligned curriculum covering in-demand skills from basic hygiene to specialized security areas."
    },
    {
      icon: Rocket,
      title: "Clear Career Path",
      description: "Structured progression from 3-month basics to 1-year professional diploma leading to analyst roles."
    },
    {
      icon: Zap,
      title: "Future-Proof Skills",
      description: "Updated content including AI in cyber defense and blockchain security for cutting-edge relevance."
    }
  ];

  const whyChoose: WhyChooseItem[] = [
    {
      icon: BadgeCheck,
      title: "Industry Recognition",
      points: ["NIELIT Authorized Institution", "MCA Registered", "MSME Recognized", "EC-Council Aligned"]
    },
    {
      icon: Users,
      title: "Expert Instructors",
      points: ["IBM Corporate Trainers", "10+ Years Experience", "Real-world Practitioners", "Dedicated Mentorship"]
    },
    {
      icon: Laptop,
      title: "Modern Infrastructure",
      points: ["State-of-art Labs", "Latest Security Tools", "Cloud Environments", "Virtual Machines"]
    },
    {
      icon: TrendingUp,
      title: "Career Support",
      points: ["Resume Building", "Interview Prep", "Job Placement", "Industry Connections"]
    }
  ];

  // Function to get brochure path
  const getBrochurePath = (slug: string) => {
    switch (slug) {
      case "one-year-diploma":
        return "/Brochure/1year.pdf";
      case "six-months-diploma":
        return "/Brochure/6months.pdf";
      case "three-months-basic":
        return "/Brochure/3months.pdf";
      default:
        return "/Brochure/1year.pdf";
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
        .gradient-text { background: linear-gradient(135deg, #210CAE, #4DC9E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
        .parallax-slow { transform: translateY(${scrollY * 0.3}px); }
        .parallax-fast { transform: translateY(${scrollY * 0.5}px); }
        
        /* Mobile Navigation */
        .mobile-nav {
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }
        .mobile-nav.open {
          transform: translateX(0);
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-content { order: 1; }
          .carousel-container { order: 2; margin-top: 2rem; }
          .feature-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .button-group { flex-direction: column; width: 100%; }
          .button-group a { width: 100%; text-align: center; }
          .mobile-hidden { display: none; }
          .hero-title { font-size: 2rem !important; line-height: 1.2; }
          .carousel-wrapper { width: 100% !important; margin-left: 0 !important; }
          .carousel-image { height: 200px !important; }
          .badge-mobile { transform: scale(0.7); }
        }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .section-title { font-size: 1.75rem; }
          .carousel-buttons { display: none; }
          .carousel-dots { bottom: 10px; }
          .hero-content { margin-left: 0 !important; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 1.75rem; }
          .stats-grid { gap: 0.5rem; }
          .feature-points { grid-template-columns: 1fr; gap: 1rem; }
          .course-card { margin-bottom: 1.5rem; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-title { font-size: 2.5rem; }
          .feature-grid { grid-template-columns: repeat(2, 1fr); }
          .carousel-wrapper { width: 100% !important; margin-left: 0 !important; }
        }

        /* Touch improvements */
        @media (hover: none) {
          .card-hover:hover { transform: none; }
        }
      `}</style>

      {/* Mobile Navigation */}
      <div className={`fixed inset-0 bg-black/50 z-50 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} 
           onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`mobile-nav w-3/4 h-full bg-white p-6 ${isMobileMenuOpen ? 'open' : ''}`}
             onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8">
            <div className="text-xl font-bold gradient-text">Abreonix</div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-4">
            <Link href="/" className="block py-2 font-semibold">Home</Link>
            <Link href="/courses" className="block py-2 font-semibold">Courses</Link>
            <Link href="#why-choose" className="block py-2 font-semibold">Why Choose Us</Link>
            <Link href="#testimonials" className="block py-2 font-semibold">Testimonials</Link>
            <div className="pt-4">
              <Link 
                href="/courses" 
                className="block w-full bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-center py-3 rounded-sm font-semibold mb-3"
              >
                Start Learning
              </Link>
              <Link 
                href="https://wa.me/918690650532" 
                className="block w-full border border-gray-300 text-center py-3 rounded-sm font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black pt-16 pb-20 md:pt-28 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center hero-grid">
            {/* Hero Content */}
            <div className="text-white hero-content -ml-20 p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm text-xs md:text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                NIELIT Certified Cyber Security Training
              </div>

              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-fade-in-up">
                Building the Next Generation of <span className="gradient-text">Cyber Defenders</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 leading-relaxed animate-fade-in-up">
                The digital world changes every second, and so do the threats. At Abreonix, we close the global cyber skills gap by transforming motivated individuals into job-ready security professionals.
              </p>

              <div className="grid grid-cols-2 xs:grid-cols-2 gap-3 mb-6 animate-fade-in-up delay-400 feature-points">
                {[
                  { icon: CheckCircle, title: "Real-World Training", desc: "Intensive lab sessions" },
                  { icon: Target, title: "Career-Focused", desc: "Industry-aligned" },
                  { icon: Users, title: "Clear Path", desc: "3-12 month programs" },
                  { icon: Sparkles, title: "Future-Proof", desc: "AI & Blockchain" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-600/20 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="text-orange-400" size={14} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs sm:text-sm text-white">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up button-group">
                <Link 
                  href="/courses" 
                  className="group px-6 py-3 bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-sm font-semibold rounded-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link 
                  href="https://wa.me/918690650532" 
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                >
                  Book Free Demo
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10 animate-fade-in-up delay-600">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                  ))}
                  <span className="text-xs text-gray-300 font-medium ml-1">4.9/5.0</span>
                </div>
              </div>
            </div>

            {/* Carousel */}
            <div className="relative carousel-container">
              <div className="relative z-10 animate-scale-in">
                <div className="rounded-sm shadow-2xl overflow-hidden p-1 bg-gradient-to-br from-sky-400 to-indigo-900 w-full md:w-[44rem] -ml-16 carousel-wrapper" >
                  <div className="w-full h-64 sm:h-80 md:h-96 rounded-sm bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2">
                    <div id="default-carousel" className="h-full relative w-full" data-carousel="slide">
                      <div className="relative w-full h-full overflow-hidden rounded-sm bg-gray-800">
                        {carouselImages.map((src, idx) => (
                          <div
                            key={idx}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                            aria-hidden={idx === current ? "false" : "true"}
                          >
                            <Image
                              unoptimized
                              width={600}
                              height={600}
                              src={src}
                              alt={`Slide ${idx + 1}`}
                              className="block w-full h-full object-cover object-center carousel-image"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Dots */}
                      <div className="absolute z-30 flex -translate-x-1/2 bottom-3 sm:bottom-5 left-1/2 space-x-3 rtl:space-x-reverse carousel-dots">
                        {carouselImages.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${i === current ? "bg-white" : "bg-white/40"}`}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => goTo(i)}
                          />
                        ))}
                      </div>

                      {/* Navigation Buttons - Hidden on mobile */}
                      <button
                        type="button"
                        className="absolute top-0 left-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none carousel-buttons"
                        onClick={prevSlide}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                          </svg>
                          <span className="sr-only">Previous</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        className="absolute top-0 right-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none carousel-buttons"
                        onClick={nextSlide}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                          <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                          </svg>
                          <span className="sr-only">Next</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute z-50 -bottom-4 -left-2 sm:-left-4 glass text-white rounded-sm shadow-xl p-1.5 animate-fade-in-up bg-gradient-to-r from-green-900/80 to-emerald-600/60 backdrop-blur-md border border-green-400/30 badge-mobile">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-400/20 rounded-sm flex items-center justify-center">
                      <Users className="text-green-300" size={16} />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold">95%</div>
                      <div className="text-xs text-gray-200">Placement</div>
                    </div>
                  </div>
                </div>

                <div className="absolute z-50 -top-4 -right-2 sm:-right-4 glass text-white rounded-sm shadow-xl p-1.5 animate-fade-in-up bg-gradient-to-r from-indigo-900/80 to-blue-600/60 backdrop-blur-md border border-indigo-400/30 badge-mobile">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500/20 rounded-sm flex items-center justify-center">
                      <Award className="text-indigo-400" size={16} />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-bold">NIELIT</div>
                      <div className="text-xs text-gray-300">Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-sky-400 to-indigo-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="text-center transform hover:scale-105 transition-transform duration-300">
                <stat.icon className="mx-auto mb-2" size={24} />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden" data-animate id="why-choose">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Why Choose Abreonix?
            </div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Path to Cybersecurity Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 feature-grid">
            {features.map((feature, i) => (
              <div key={i} className="group p-4 sm:p-5 bg-white rounded-sm border border-gray-300 card-hover">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-300 to-indigo-500 rounded-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-white rounded-sm border border-gray-300 card-hover">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-sm flex items-center justify-center mb-3 sm:mb-4">
                  <item.icon className="text-orange-600" size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <CheckCircle className="text-green-500 shrink-0" size={12} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="py-12 md:py-24 bg-gray-50" data-animate id="courses">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              Our Programs
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Cybersecurity Training
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              From foundational awareness to professional expertise - choose the path that matches your career goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-sm border-2 ${
                  course.featured ? 'border-orange-500 shadow-xl' : 'border-gray-300'
                } card-hover overflow-hidden course-card`}
              >
                {course.featured && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-sm text-xs font-semibold z-10">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${
                    course.color === 'orange' ? 'bg-orange-100' : 
                    course.color === 'indigo' ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    <course.icon className={
                      course.color === 'orange' ? 'text-orange-600' : 
                      course.color === 'indigo' ? 'text-indigo-600' : 'text-gray-600'
                    } size={24} />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                      <Calendar size={14} />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                      <TrendingUp size={14} />
                      {course.level}
                    </div>
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                      <Users size={14} />
                      {course.students}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`${
                            star <= Math.floor(course.rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`} 
                          size={14} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{course.rating}/5.0</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{course.overview}</p>
                  
                  <div className="space-y-2 mb-6">
                    {course.highlights.slice(0, 2).map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="text-green-500 shrink-0" size={14} />
                        <span className="text-xs sm:text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex-1 bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-sm font-semibold py-2.5 px-4 rounded-sm text-center hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      More Details
                      <ArrowRight size={16} />
                    </Link>
                    <a
                      href={getBrochurePath(course.slug)}
                      download
                      className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-sm text-center hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Brochure
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-indigo-600 text-white font-semibold py-3 px-8 rounded-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View All Courses
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-12 md:py-24 bg-white" data-animate id="testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <Users className="w-4 h-4" />
              Student Success Stories
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-sm p-6 card-hover">
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                
                <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-sm flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-sky-400 to-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Cybersecurity Career?
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of successful graduates who transformed their careers with Abreonix. Take the first step towards becoming a cyber defender today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-sky-600 font-semibold py-3 px-8 rounded-sm hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/courses"
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-sm hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View All Courses
              </Link> 
            </div>
          </div>
        </div>
      </section>
    </>
  );
}