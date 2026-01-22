"use client";
import Link from "next/link";
import { useState, useEffect, useRef, ReactNode } from "react";
import {
  Sparkles, ArrowRight, CheckCircle, Star, Users, Shield, Globe, Award, Code, Lock,
  BookOpen, Briefcase, TrendingUp, GraduationCap, Target, Rocket,
  Zap, Calendar, Download, BadgeCheck, Laptop, Menu, X, ChevronLeft, ChevronRight,
  Code2
} from "lucide-react";
import Image from "next/image";
// Assuming these components exist in your project structure
import TypingWords from "./TypingWords";
// import Navbar from "./NavbarEdu"; 
import ReactSnow from "react-snowfall";

// --- PERFORMANCE COMPONENT: RevealOnScroll ---
// Reduces lag by removing scroll listeners and using the browser's native observer
const RevealOnScroll = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- INTERFACES ---
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

interface BannerOffer {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  bgColor: string;
  image: string;
}

interface PlacementCompany {
  name: string;
  logo: string;
}

export default function Home() {
  // --- STATE ---
  // Carousel States
  const [current, setCurrent] = useState(0);
  const [currentCourse, setCurrentCourse] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentCompany, setCurrentCompany] = useState(0);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- REFS (Autoplay) ---
  const autoplayRef = useRef<(() => void) | null>(null);
  const courseAutoplayRef = useRef<(() => void) | null>(null);
  const bannerAutoplayRef = useRef<(() => void) | null>(null);
  const companyAutoplayRef = useRef<(() => void) | null>(null);

  const carouselImages = new Array(4).fill(null).map((_, i) => `/HomeCarousel/Image-${i + 1}.jpg`);

  // --- DATA ---
  const bannerOffers: BannerOffer[] = [
    {
      id: 1,
      title: "Winter Special",
      description: "Enroll now and get 30% off on all courses",
      discount: "30% OFF",
      validUntil: "31st August 2026",
      bgColor: "from-blue-500 to-purple-600",
      image: "/banner/1.png"
    }
  ];

  const placementCompanies: PlacementCompany[] = [
    { name: "TCS", logo: "/tcs.png" },
    { name: "Infosys", logo: "/infosys.png" },
    { name: "Wipro", logo: "/wipro.png" },
    { name: "HCL", logo: "/hcl.png" },
    { name: "Tech Mahindra", logo: "/techmahindra.png" },
    { name: "Accenture", logo: "/accenture.png" },
    { name: "IBM", logo: "/ibm.png" },
    { name: "Capgemini", logo: "/capgemini.png" }
  ];

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
    },
    {
      title: "3 Months Diploma in FULL STACK WEB DEVELOPMENT",
      slug: "full-stack-web-development",
      duration: "3 Months",
      schedule: "Flexible Batches",
      level: "Beginner",
      students: "1,500+",
      rating: 4.8,
      overview: "Master the MERN stack (MongoDB, Express, React, Node.js) with our intensive Full Stack Web Development Diploma. Build real-world applications and master backend API development.",
      highlights: [
        "Master MERN Stack (MongoDB, Express, React, Node)",
        "Build 10+ Real-world Projects",
        "Hands-on with React.js and Tailwind CSS",
        "Placement Assistance and Portfolio Building"
      ],
      modules: ["Frontend (React)", "Backend (Node)", "Database (MongoDB)", "API Integration"],
      icon: Code2,
      image: "/images/fullstack.jpg",
      color: "green",
      featured: true
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

  // --- EFFECTS (Logic) ---

  // Main Carousel Logic
  useEffect(() => {
    autoplayRef.current = () => setCurrent(prev => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  useEffect(() => {
    const id = setInterval(() => autoplayRef.current?.(), 4000);
    return () => clearInterval(id);
  }, []);

  // Generic Autoplay Hook
  const useAutoplay = (ref: any, callback: () => void, delay: number, condition: boolean = true) => {
    useEffect(() => { ref.current = callback; }, [callback]);
    useEffect(() => {
      const play = () => { if (condition && ref.current) ref.current(); };
      const id = setInterval(play, delay);
      return () => clearInterval(id);
    }, [condition, delay]);
  };

  // Setup autoplays
  useAutoplay(courseAutoplayRef, () => setCurrentCourse(p => (p + 1) % courses.length), 5000, typeof window !== 'undefined' && window.innerWidth < 768);
  useAutoplay(bannerAutoplayRef, () => setCurrentBanner(p => (p + 1) % bannerOffers.length), 4500);
  useAutoplay(companyAutoplayRef, () => setCurrentCompany(p => (p + 1) % Math.ceil(placementCompanies.length / 2)), 4000, typeof window !== 'undefined' && window.innerWidth < 768);

  // Keyboard Navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // --- HELPERS ---
  const prevSlide = () => setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () => setCurrent((c) => (c + 1) % carouselImages.length);
  const goTo = (i: number) => setCurrent(i);

  const getBrochurePath = (slug: string) => {
    switch (slug) {
      case "one-year-diploma": return "/Brochure/1year.pdf";
      case "six-months-diploma": return "/Brochure/6months.pdf";
      case "three-months-basic": return "/Brochure/3months.pdf";
      case "full-stack-web-development": return "/Brochure/fullstack.pdf";
      default: return "/Brochure/1year.pdf";
    }
  };

  return (
    <> 
      {/* Include Navbar if it exists */}
      {/* <Navbar /> */}

      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
        .gradient-text { background: linear-gradient(135deg, #210CAE, #4DC9E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
        .mobile-nav { transform: translateX(-100%); transition: transform 0.3s ease-in-out; }
        .mobile-nav.open { transform: translateX(0); }
        .hero-section { overflow-x: hidden; }
        html, body { overflow-x: hidden; max-width: 100%; }
      `}</style>

      {/* Mobile Navigation Menu Overlay */}
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
            <Link href="/education" className="block py-2 font-semibold">Home</Link>
            <Link href="/education/courses" className="block py-2 font-semibold">Courses</Link>
            <Link href="#why-choose" className="block py-2 font-semibold">Why Choose Us</Link>
            <Link href="#testimonials" className="block py-2 font-semibold">Testimonials</Link>
            <div className="pt-4">
              <Link 
                href="/education/courses" 
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
      <section className="hero-section relative overflow-hidden bg-gradient-to-br from-gray-900 to-black pt-16 pb-20 md:pt-28 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* HERO TEXT - Forced to Left (Order 1) */}
            <div className="text-white order-1 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm text-xs md:text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                NIELIT Certified Cyber Security Training
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-fade-in-up">
                Building the Next Generation of <br/> 
                <span className="gradient-text">
                  <TypingWords words={["Cyber Defender", "Innovator", "Problem Solver", "Visionary", "Tech Enthusiast"]} />
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed animate-fade-in-up">
                The digital world changes every second, and so do the threats. At Abreonix, we close the global cyber skills gap by transforming motivated individuals into job-ready security professionals.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8 animate-fade-in-up delay-100">
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

              <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up delay-200">
                <Link 
                  href="/education/courses" 
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
              
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10 animate-fade-in-up delay-300">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                  ))}
                  <span className="text-xs text-gray-300 font-medium ml-1">4.9/5.0</span>
                </div>
              </div>
            </div>

            {/* CAROUSEL - Forced to Right (Order 2) */}
            <div className="relative carousel-container flex justify-center lg:justify-end w-full order-2">
              <div className="relative z-10 animate-scale-in w-full max-w-lg lg:max-w-xl">
                <div className="rounded-sm shadow-2xl overflow-hidden p-1 bg-gradient-to-br from-sky-400 to-indigo-900 w-full carousel-wrapper">
                  <div className="w-full h-64 sm:h-80 md:h-96 rounded-sm bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 relative">
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
                              src={src}
                              alt={`Slide ${idx + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={idx === 0}
                              className="object-cover object-center"
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

                      {/* Navigation Buttons */}
                      <button
                        type="button"
                        className="absolute top-0 left-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none carousel-buttons"
                        onClick={prevSlide}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                          <ChevronLeft className="w-5 h-5 text-white" />
                          <span className="sr-only">Previous</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        className="absolute top-0 right-0 z-30 hidden md:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none carousel-buttons"
                        onClick={nextSlide}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
                          <ChevronRight className="w-5 h-5 text-white" />
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
          {/* Carousel */}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-8 bg-gradient-to-r from-sky-400 to-indigo-900 text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center transform hover:scale-105 transition-transform duration-300">
                <stat.icon className="mx-auto mb-2 text-sky-200" size={28} />
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES SECTION (Lazy Loaded) */}
      <RevealOnScroll className="py-16 md:py-24 bg-gray-50" id="courses">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              Our Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path to Cybersecurity Excellence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From foundational awareness to professional expertise - choose the path that matches your career goals
            </p>
          </div>

          {/* Promo Banner Carousel */}
          <div className="mb-12 relative h-40 sm:h-48 md:h-56 rounded-sm overflow-hidden shadow-md">
            {bannerOffers.map((offer, idx) => (
              <div
                key={offer.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Courses: Desktop Grid (md+) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className={`group relative bg-white rounded-sm border-2 ${course.featured ? 'border-orange-500 shadow-xl' : 'border-gray-300'} card-hover overflow-hidden flex flex-col h-full`}>
                {course.featured && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-sm text-xs font-semibold z-10">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${course.color === 'orange' ? 'bg-orange-100' : course.color === 'indigo' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                    <course.icon className={course.color === 'orange' ? 'text-orange-600' : course.color === 'indigo' ? 'text-indigo-600' : 'text-gray-600'} size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1"><Calendar size={14} /> {course.duration}</div>
                    <div className="flex items-center gap-1"><TrendingUp size={14} /> {course.level}</div>
                    <div className="flex items-center gap-1"><Users size={14} /> {course.students}</div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="text-yellow-400 fill-yellow-400" size={14} />)}
                    <span className="text-xs text-gray-600 font-medium ml-1">{course.rating}/5.0</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3 flex-grow">{course.overview}</p>
                  
                  <div className="space-y-2 mb-6">
                    {course.highlights.slice(0, 2).map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <Link href={`/education/courses/${course.slug}`} className="flex-1 bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-sm font-semibold py-2.5 rounded-sm text-center hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      Details <ArrowRight size={16} />
                    </Link>
                    <a href={getBrochurePath(course.slug)} download className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-sm text-center hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                      <Download size={16} /> Brochure
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Courses: Mobile Carousel (md-) */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentCourse * 100}%)` }}>
              {courses.map((course, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1">
                  <div className={`group relative bg-white rounded-sm border-2 ${course.featured ? 'border-orange-500 shadow-xl' : 'border-gray-300'} overflow-hidden`}>
                    {course.featured && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-sm text-xs font-semibold z-10">Most Popular</div>
                    )}
                    <div className="p-6">
                      <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${course.color === 'orange' ? 'bg-orange-100' : course.color === 'indigo' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                        <course.icon className={course.color === 'orange' ? 'text-orange-600' : course.color === 'indigo' ? 'text-indigo-600' : 'text-gray-600'} size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {course.duration}</span>
                        <span className="flex items-center gap-1"><Users size={12} /> {course.students}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.overview}</p>
                      <div className="flex gap-2">
                        <Link href={`/education/courses/${course.slug}`} className="flex-1 bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-sm font-semibold py-2 rounded-sm text-center">Details</Link>
                        <a href={getBrochurePath(course.slug)} download className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-sm text-center flex items-center justify-center gap-1"><Download size={14}/> PDF</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {courses.map((_, i) => (
                <button key={i} className={`w-2 h-2 rounded-full ${i === currentCourse ? "bg-indigo-600" : "bg-gray-300"}`} onClick={() => setCurrentCourse(i)} />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/education/courses" className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-indigo-600 text-white font-semibold py-3 px-8 rounded-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              View All Courses <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </RevealOnScroll>

      {/* WHY CHOOSE US SECTION */}
      <RevealOnScroll className="py-16 md:py-24 bg-white" id="why-choose">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" /> Why Choose Abreonix?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Path to Cybersecurity Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-sm border border-gray-200 card-hover">
                <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center mb-4">
                  <item.icon className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* PLACEMENT COMPANIES SECTION */}
      <RevealOnScroll className="py-16 bg-gray-50" id="placements">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <Briefcase className="w-4 h-4" /> Our Placement Partners
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Leading Companies</h2>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-4 gap-8 items-center justify-items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {placementCompanies.map((company, index) => (
              <div key={index} className="w-32 h-16 relative flex items-center justify-center">
                <Image unoptimized src={`/companies/${company.logo}`} alt={company.name} width={120} height={50} className="object-contain" />
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentCompany * 100}%)` }}>
              {Array.from({ length: Math.ceil(placementCompanies.length / 2) }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-2 gap-4 place-items-center px-4">
                  {placementCompanies.slice(pageIndex * 2, pageIndex * 2 + 2).map((company, idx) => (
                    <div key={idx} className="h-16 flex items-center justify-center">
                      <Image unoptimized src={`/companies/${company.logo}`} alt={company.name} width={120} height={50} className="object-contain max-h-10" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: Math.ceil(placementCompanies.length / 2) }).map((_, i) => (
                <button key={i} className={`w-2 h-2 rounded-full ${i === currentCompany ? "bg-green-600" : "bg-gray-300"}`} onClick={() => setCurrentCompany(i)} />
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* TEAM EKLAVYA SECTION */}
      <RevealOnScroll className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="p-8 bg-gray-50 rounded-sm flex items-center justify-center">
              <Image unoptimized width={300} height={200} src="https://www.teameklavya.xyz/logo1.png" alt="Team Eklavya Logo" className="max-w-full h-auto" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Partner: Team Eklavya</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are proud to collaborate with <strong>Team Eklavya</strong>, a community that provides industrial level exposure and networking opportunities to our students.
              </p>
              <div className="space-y-3 mb-8">
                {["Industrial level exposure", "Networking with professionals", "Real-life event experience", "Cross-branch learning"].map((pt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 shrink-0" size={18} />
                    <span className="text-sm text-gray-700">{pt}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="https://teameklavya.abreonix.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 to-indigo-600 text-white font-semibold py-3 px-6 rounded-sm hover:shadow-lg transition-all">
                  Read More <ArrowRight size={18} />
                </a>
                <a href="https://teameklavya.xyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-indigo-600 text-indigo-600 font-semibold py-3 px-6 rounded-sm hover:bg-indigo-50 transition-all">
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* TESTIMONIALS */}
      <RevealOnScroll className="py-16 bg-gray-50" id="testimonials">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map(s=><Star key={s} size={16} className="text-yellow-400 fill-yellow-400"/>)}</div>
                <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">{t.image}</div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            <iframe src="https://www.youtube.com/embed/D6GyGOwFRqk" title="Student Review 1" className="w-full aspect-video rounded-xl shadow-md" allowFullScreen></iframe>
            <iframe src="https://www.youtube.com/embed/xmJdvRnEUF8" title="Student Review 2" className="w-full aspect-video rounded-xl shadow-md" allowFullScreen></iframe>
          </div>
        </div>
      </RevealOnScroll>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-r from-sky-400 to-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Cybersecurity Career?</h2>
          <p className="text-lg mb-8 opacity-90">Join hundreds of successful graduates who transformed their careers with Abreonix.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/education/courses" className="bg-white text-sky-600 font-semibold py-3 px-8 rounded-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link href="/education/courses" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-sm hover:bg-white/10 transition-all">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Reduced Snowflake Count for Performance (40 is optimal) */}
      <ReactSnow snowflakeCount={40} />
    </>
  );
}