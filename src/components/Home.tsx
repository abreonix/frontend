"use client";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles, ArrowRight, CheckCircle, Star, Users, Shield, Globe, Award, Code, Lock,
  BookOpen, Briefcase, TrendingUp, GraduationCap, ChevronRight, Target, Rocket,
  Zap, Calendar, Download, BadgeCheck, Laptop
} from "lucide-react";

/**
 * Full Home component with working carousel.
 * Put images in public/HomeCarousel/image-1.jpg ... image-8.jpg
 */
export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);

  // safe carousel images (no spaces/parens)
  const carouselImages = new Array(8).fill(null).map((_, i) =>`/HomeCarousel/Image (${i+1}).jpg`);

  // Autoplay + cleanup
  useEffect(() => {
    autoplayRef.current = () => {
      setCurrent(prev => (prev + 1) % carouselImages.length);
    };
  }, [carouselImages.length]);

  useEffect(() => {
    const play = () => autoplayRef.current();
    const id = setInterval(play, 4000); // 4s autoplay
    return () => clearInterval(id);
  }, []);

  // keyboard support
  useEffect(() => {
    const onKey = (e) => {
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
  const goTo = (i) => setCurrent(i);

  // other static data (kept from your original)
  const courses = [
    {
      title: "One Year Diploma in Cyber Security",
      duration: "12 Months",
      level: "Professional",
      overview: "Comprehensive program building professional-level expertise in cyber defense and ethical hacking. Master network security, web application security, digital forensics, malware analysis, and cyber laws.",
      highlights: [
        "NIELIT Certified Government-Recognized Diploma",
        "Real-time attack detection & incident response training",
        "CEH, CompTIA Security+, SOC operations concepts",
        "Career-ready for Security Analyst & Pen Tester roles"
      ],
      modules: ["Network Security", "Ethical Hacking", "Digital Forensics", "Malware Analysis", "Cyber Laws"],
      icon: Shield,
      image: "one.jpg",
      color: "orange",
      featured: true,
      brochure: "https://drive.google.com/file/d/YOUR_BROCHURE_ID/view",
    },
    {
      title: "6 Months Diploma in Cyber Security",
      duration: "6 Months",
      level: "Intermediate",
      overview: "Fast-track training in core security skills covering ethical hacking fundamentals, network protection, threat detection, and SOC tools for immediate career upskilling.",
      highlights: [
        "Government-recognized NIELIT Certification",
        "Practical system & network defense sessions",
        "Industry-standard cybersecurity tools & techniques",
        "Perfect for career transition & upskilling"
      ],
      modules: ["Security Fundamentals", "Network Defense", "Threat Detection", "SOC Tools"],
      icon: Lock,
      image: "six.jpg",
      color: "indigo",
      featured: false,
      brochure: "https://drive.google.com/file/d/YOUR_BROCHURE_ID/view",
    },
    {
      title: "3 Months Basic Cyber Security",
      duration: "3 Months",
      level: "Foundation",
      overview: "Foundational course introducing cyber safety fundamentals, covering online threats, phishing, password management, and basic network security for awareness and prevention.",
      highlights: [
        "NIELIT Certified Short-Term Course",
        "Beginner-friendly hands-on learning",
        "Safe internet & data protection practices",
        "Ideal for students, teachers & professionals"
      ],
      modules: ["Cyber Awareness", "Online Safety", "Data Protection", "Basic Security"],
      icon: Globe,
      image: "three.jpg",
      color: "gray",
      featured: false,
      brochure: "https://drive.google.com/file/d/YOUR_BROCHURE_ID/view",
    }
  ];

  const testimonials = [
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

  const stats = [
    { label: "Training Hours", value: "500+", icon: BookOpen },
    { label: "Industry Projects", value: "50+", icon: Briefcase },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Certifications", value: "12+", icon: Award }
  ];

  const features = [
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

  const whyChoose = [
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

  return (
    <>
      <style>{`
        /* animation + helpers (kept from original) */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
        .gradient-text { background: linear-gradient(135deg, #210CAE, #4DC9E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
        @media (max-width: 768px) { .hero-title { font-size: 2rem; line-height: 1.2; } .section-title { font-size: 1.75rem; } }
        .parallax-slow { transform: translateY(${scrollY * 0.3}px); }
        .parallax-fast { transform: translateY(${scrollY * 0.5}px); }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm text-xs md:text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                NIELIT Certified Cyber Security Training
              </div>

              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-fade-in-up">
                Building the Next Generation of <span className="gradient-text">Cyber Defenders</span>
              </h1>

              <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed animate-fade-in-up">
                The digital world changes every second, and so do the threats. At Abreonix, we close the global cyber skills gap by transforming motivated individuals into job-ready security professionals.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in-up delay-400">
                {[
                  { icon: CheckCircle, title: "Real-World Training", desc: "Intensive lab sessions" },
                  { icon: Target, title: "Career-Focused", desc: "Industry-aligned" },
                  { icon: Users, title: "Clear Path", desc: "3-12 month programs" },
                  { icon: Sparkles, title: "Future-Proof", desc: "AI & Blockchain" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-orange-600/20 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="text-orange-400" size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up">
                <Link to="/" className="group px-6 py-3 bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-sm font-semibold rounded-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  Start Your Journey
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link to="/" className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-0.5 text-center">
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

            {/* Carousel area */}
            <div className="relative lg:block">
              <div className="relative z-10 animate-scale-in">
                <div className="rounded-sm shadow-2xl overflow-hidden p-1 bg-gradient-to-br from-sky-400 to-indigo-900">
                  <div className="w-full aspect-square rounded-sm bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-3 h-96">
                    {/* REPLACE your current carousel inner block with this */}
                  <div id="default-carousel" className="h-full relative w-full" data-carousel="slide" aria-roledescription="carousel">
                    {/* Slide viewport: fixed height, overflow-hidden, no inner padding */}
                    <div className="relative w-full h-full overflow-hidden rounded-sm bg-gray-800">
                      {carouselImages.map((src, idx) => (
                        <div
                          key={idx}
                          className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
                          aria-hidden={idx === current ? "false" : "true"}
                        >
                          {/* img fills the entire slide and is cropped to cover */}
                          <img
                            src={src}
                            alt={`Slide ${idx + 1}`}
                            className="block w-full h-full object-cover object-center"
                            loading={idx === 0 ? "eager" : "lazy"}
                            style={{ display: "block" }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Dots (keep your existing) */}
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                      {carouselImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`w-3 h-3 rounded-full ${i === current ? "bg-white" : "bg-white/40"}`}
                          aria-label={`Go to slide ${i+1}`}
                          onClick={() => goTo(i)}
                        />
                      ))}
                    </div>

                    {/* Prev / Next (keep what you already have) */}
                  </div>

                  </div>
                </div>

                {/* small badges */}
                <div className="absolute z-50 -bottom-4 -left-4 glass text-white rounded-sm shadow-xl p-1.5 animate-fade-in-up bg-gradient-to-r from-green-900/80 to-emerald-600/60 backdrop-blur-md border border-green-400/30">
                  <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-400/20 rounded-sm flex items-center justify-center">
                    <Users className="text-green-300" size={20} />
                  </div>
                  <div>
                    <div className="text-lg font-bold">95%</div>
                    <div className="text-xs text-gray-200">Placement</div>
                  </div>
                  </div>
                </div>

                <div className="z-50 absolute -top-4 -right-4 glass text-white rounded-sm shadow-xl p-1.5 animate-fade-in-up bg-gradient-to-r from-indigo-900/80 to-blue-600/60 backdrop-blur-md border border-indigo-400/30">
                  <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-sm flex items-center justify-center">
                    <Award className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <div className="text-lg font-bold">NIELIT</div>
                    <div className="text-xs text-gray-300">Certified</div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end carousel */}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-sky-400 to-indigo-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center transform hover:scale-105 transition-transform duration-300">
                <stat.icon className="mx-auto mb-2" size={28} />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (rest kept minimal for brevity, you already had these sections) */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden" data-animate id="why-choose">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Why Choose Abreonix?
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Path to Cybersecurity Excellence
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {features.map((feature, i) => (
              <div key={i} className="group p-5 bg-white rounded-sm border border-gray-300 card-hover">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-300 to-indigo-500 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {whyChoose.map((item, i) => (
              <div key={i} className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-sm border border-gray-300 card-hover">
                <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center mb-4">
                  <item.icon className="text-orange-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* (You can keep the rest of your sections as-is) */}
    </>
  );
}
