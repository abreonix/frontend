"use client"; 
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sparkles, ArrowRight, CheckCircle, Star, Users, Shield, Globe, Award, Code, Lock,
  BookOpen, Briefcase, TrendingUp, GraduationCap, ChevronRight, Target, Rocket,
  Zap, Quote, Calendar, Download, FileText, ExternalLink, Phone, Mail, MapPin,
  Clock, DollarSign, BadgeCheck, Laptop, Network, Database,
  Fullscreen
} from "lucide-react";
import Image from "next/image";
import { image } from "framer-motion/client";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isInView && !isVisible[section.id]) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

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
      text: "The hands-on training at Abrenoix prepared me perfectly for real-world challenges. I secured my dream job within 2 months of completing the diploma."
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
      text: "From a complete beginner to landing a SOC analyst role - Abrenoix made it possible. The NIELIT certification carries real weight."
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-in { animation: slideIn 0.6s ease-out forwards; }
        .shimmer {
          // background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
        .delay-600 { animation-delay: 0.6s; opacity: 0; }
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gradient-text {
          background: linear-gradient(135deg, #210CAE, #4DC9E6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; line-height: 1.2; }
          .section-title { font-size: 1.75rem; }
        }
        .parallax-slow {
          transform: translateY(${scrollY * 0.3}px);
        }
        .parallax-fast {
          transform: translateY(${scrollY * 0.5}px);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(76, 29, 149, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 bg-indigo-600 rounded-none blur-3xl opacity-20 parallax-slow" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-600 rounded-none blur-3xl opacity-20 parallax-fast" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm text-xs md:text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                NIELIT Certified Cyber Security Training
              </div>

              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 animate-fade-in-up delay-100">
                Building the Next Generation of <span className="gradient-text">Cyber Defenders</span>
              </h1>

              <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed animate-fade-in-up delay-200">
                The digital world changes every second, and so do the threats. At Abrenoix, we close the global cyber skills gap by transforming motivated individuals into job-ready security professionals.
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

              <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up delay-500">
                <Link
                  to="/"
                  className="group px-6 py-3 bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-sm font-semibold rounded-sm hover:shadow-xl hover:shadow-indigo-600/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link
                  to="/"
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

            <div className="relative lg:block">
              <div className="relative z-10 animate-scale-in delay-300">
                <div className="rounded-sm shadow-2xl overflow-hidden bg-linear-to-br from-sky-400 to-indigo-900 p-1">
                  <div className="w-full aspect-square rounded-sm bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-3 h-96">
                    <center>
                      

                      <div id="default-carousel" className="relative w-full" data-carousel="slide">
                          {/* <!-- Carousel wrapper --> */}
                          <div className="relative h-56 overflow-hidden rounded-base md:h-96 snap">
                              {Array(8).fill(0).map( (_ , i) => `/HomeCarousel/Image (${i+1}).jpg` )
                                .map( (image, index) => (
                                  <div key={index} className="hidden duration-700 ease-in-out" data-carousel-item>
                                      <img src={image} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
                                  </div>
                                ) )
                              }
                          </div>
                      </div>
                    </center>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 glass text-white rounded-sm shadow-xl p-3 animate-fade-in-up delay-400">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-green-500/20 rounded-sm flex items-center justify-center">
                      <Users className="text-green-400" size={20} />
                    </div>
                    <div>
                      <div className="text-xl font-bold">95%</div>
                      <div className="text-xs text-gray-300">Placement</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 glass text-white rounded-sm shadow-xl p-3 animate-fade-in-up delay-500">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-sm flex items-center justify-center">
                      <Award className="text-indigo-400" size={20} />
                    </div>
                    <div>
                      <div className="text-xl font-bold">NIELIT</div>
                      <div className="text-xs text-gray-300">Certified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
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

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden" data-animate id="why-choose">
        <div className="absolute top-20 left-0 w-96 h-96 bg-indigo-100 rounded-none blur-3xl opacity-20" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Why Choose Abrenoix?
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

      {/* Courses */}
      <section
        className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        data-animate
        id="courses"
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
                <GraduationCap className="w-4 h-4" />
                NIELIT Certified Programs
              </div>
              <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900">
                Choose Your <span className="gradient-text">Learning Path</span>
              </h2>
            </div>
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 text-orange-600 text-sm font-semibold hover:gap-3 transition-all"
            >
              View All Courses
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {courses.map((course, i) => {
              const colorClasses = {
                orange: {
                  bg: "from-indigo-600 to-orange-600",
                  text: "text-orange-600",
                  light: "bg-orange-50",
                  border: "border-orange-200",
                },
                indigo: {
                  bg: "from-indigo-500 to-indigo-900",
                  text: "text-indigo-600",
                  light: "bg-indigo-50",
                  border: "border-indigo-200",
                },
                gray: {
                  bg: "from-gray-500 to-gray-600",
                  text: "text-gray-600",
                  light: "bg-gray-50",
                  border: "border-gray-200",
                },
              };

              return (
                <div key={i} className="group h-full">
                  <div
                    className={`bg-white rounded-sm border-2 ${
                      course.featured
                        ? "border-indigo-600 shadow-lg"
                        : "border-gray-300"
                    } overflow-hidden card-hover h-full flex flex-col`}
                  >
                    {/* Header gradient with icon */}
                    <div
                      className={`h-32 md:h-36 bg-gradient-to-br ${colorClasses[course.color].bg} p-5 relative overflow-hidden`}
                    >
                      <course.icon
                        className="text-white opacity-20 absolute -bottom-4 -right-4"
                        size={80}
                      />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-sm text-xs font-semibold text-white">
                            {course.level}
                          </span>
                          {course.featured && (
                            <div className="bg-white text-gray-900 px-2 py-0.5 rounded-sm text-xs font-bold">
                              FEATURED
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/90">
                          <Calendar size={14} />
                          <span className="text-sm font-semibold">
                            {course.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Poster Image */}
                    <div className="w-full h-40 md:h-48 overflow-hidden">
                      <img
                        src={`/images/${course.image}`}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="p-5 flex-1 flex flex-col">
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {course.overview}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 text-xs mb-2">
                          Key Modules:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {course.modules.map((module, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 ${colorClasses[course.color].light} ${colorClasses[course.color].text} rounded-sm text-xs font-medium`}
                            >
                              {module}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 flex-1">
                        <h4 className="font-semibold text-gray-900 text-xs mb-2">
                          Program Highlights:
                        </h4>
                        <ul className="space-y-1.5">
                          {course.highlights.map((highlight, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs text-gray-600"
                            >
                              <CheckCircle
                                className={`${colorClasses[course.color].text} flex-shrink-0 mt-0.5`}
                                size={14}
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 mt-auto">
                        <div className="flex gap-2">
                          <a
                            href={course.brochure}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 ${colorClasses[course.color].light} ${colorClasses[course.color].text} text-xs font-semibold rounded-sm hover:shadow-md transition-all`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download size={14} />
                            Brochure
                          </a>
                        </div>

                        <Link
                          to="/"
                          className="block w-full py-2.5 text-center bg-gradient-to-r from-sky-400 to-indigo-900 text-white text-sm font-semibold rounded-sm hover:shadow-lg transition-all duration-300 transform group-hover:scale-105"
                        >
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white" data-animate id="testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
              <Star className="w-4 h-4" />
              Student Success Stories
            </div>
            <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Real experiences from professionals who transformed their careers with Abrenoix
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-sm border border-gray-300 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-sm flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="text-yellow-400 fill-yellow-400" size={14} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation */}
      <section className="py-16 md:py-24 bg-white" data-animate id="foundation">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                Our Foundation
              </div>
              <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Founded to <span className="gradient-text">Empower Minds</span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Abrenoix Cyber Security was established in 2025 by <strong>Mr. Ayush Kumar</strong> and <strong>Mr. Harshit</strong> with a vision: <em>"Innovating Learning, Empowering Minds."</em>
                </p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Our mission is transforming motivated individuals into elite security professionals through industry-leading, practical cyber education that directly translates to professional competency.
                </p>

                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-sm border border-gray-300">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 flex items-center gap-2">
                    <TrendingUp className="text-orange-600" size={18} />
                    Corporate Expertise
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Our founders serve as Cyber Security Corporate Trainers at IBM, ensuring every module is based on enterprise-grade protocols used by major corporations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-sky-400 to-indigo-900 p-6 rounded-sm text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4">Founders' Vision</h3>
                <div className="space-y-3">
                  {[
                    { icon: Rocket, text: "Transform individuals into elite security professionals" },
                    { icon: Target, text: "Close the global cyber skills gap" },
                    { icon: Shield, text: "Secure digital infrastructure worldwide" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <item.icon className="text-yellow-300 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-sm border border-gray-300 text-center card-hover">
                  <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center mx-auto mb-2">
                    <Users className="text-orange-600" size={20} />
                  </div>
                  <div className="text-xl font-bold text-gray-900">10,000+</div>
                  <div className="text-xs text-gray-600">Students Trained</div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-sm border border-gray-300 text-center card-hover">
                  <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center mx-auto mb-2">
                    <Award className="text-green-600" size={20} />
                  </div>
                  <div className="text-xl font-bold text-gray-900">95%</div>
                  <div className="text-xs text-gray-600">Placement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" data-animate id="accreditation">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-none blur-3xl opacity-20" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-sm text-xs md:text-sm font-semibold mb-4">
                <Award className="w-4 h-4" />
                Official Accreditation
              </div>
              <h2 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Recognized & Trusted Education
              </h2>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-sm border border-gray-300 shadow-lg">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                Students choose Abrenoix because our training holds official national and global validity. We are legally recognized, registered with the <strong>Ministry of Corporate Affairs (MCA), Government of India</strong>.
              </p>
              
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                This legal standing is validated by authorizations from key educational bodies, including being an <strong>Authorized NIELIT institution</strong> (National Institute of Electronics and Information Technology, MeitY), ensuring our training meets rigorous national IECT standards.
              </p>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                Our curriculum aligns with globally respected <strong>EC-Council</strong> methodologies and we're recognized by <strong>MSME</strong>, confirming our dedication to national skill development.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-gray-300">
                {[
                  { icon: Shield, title: "MCA Registered", desc: "Government recognized", color: "orange" },
                  { icon: Award, title: "NIELIT Authorized", desc: "National IECT standards", color: "green" },
                  { icon: Globe, title: "EC-Council Aligned", desc: "Global methodology", color: "indigo" }
                ].map((item, i) => {
                  const colors = {
                    orange: "bg-orange-100 text-orange-600",
                    green: "bg-green-100 text-green-600",
                    indigo: "bg-indigo-100 text-indigo-600"
                  };
                  return (
                    <div key={i} className="text-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-sm border border-gray-300 card-hover">
                      <div className={`w-12 h-12 ${colors[item.color]} rounded-sm flex items-center justify-center mx-auto mb-3`}>
                        <item.icon size={20} />
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(76, 29, 149, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-none blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-600 rounded-none blur-3xl opacity-20" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 glass text-white rounded-sm text-xs md:text-sm font-semibold mb-4 border border-white/20">
              <Sparkles className="w-4 h-4" />
              Start Your Cyber Security Career
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Ready to Become a Cyber Defender?
            </h2>

            <p className="text-base md:text-lg opacity-90 mb-8 leading-relaxed">
              Join thousands of successful professionals who transformed their careers with Abrenoix. Get NIELIT certified and launch your career in the booming cybersecurity industry.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link
                to="/"
                className="group px-8 py-3 bg-white text-gray-900 text-sm font-bold rounded-sm hover:shadow-xl hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Enroll in 12-Month Diploma
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <Link
                to="/"
                className="px-8 py-3 bg-transparent border-2 border-white text-white text-sm font-bold rounded-sm hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Talk to Career Advisor
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center pt-6 border-t border-white/20">
              {[
                "NIELIT Certified",
                "Hands-on Training",
                "Job Placement Support",
                "Expert Mentors"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={16} />
                  <span className="text-xs md:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
