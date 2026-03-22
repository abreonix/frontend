"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Calendar,
  Target,
  Briefcase,
  GraduationCap,
  Shield,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function TeamEklavyaPageComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Team Eklavya images - using absolute paths from public folder
  const teamEklavyaImages = [
    "/eklavya/1.jpg",
    "/eklavya/2.jpg",
    "/eklavya/3.jpg",
    "/eklavya/4.jpg",
    "/eklavya/5.jpg",
  ].filter((_, index) => {
    // This will help debug which images exist
    console.log(`Checking image: /eklavya/${index + 1}.jpg`);
    return true; // Remove this filter if you have all images
  });

  // Custom Code icon component
  const CodeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  // Collaboration benefits with improved colors
  const collaborationBenefits = [
    {
      icon: Target,
      title: "Industry Exposure",
      description: "Get real-world experience through organized events and industry partnerships",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Networking Opportunities", 
      description: "Connect with professionals and like-minded students across different branches",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      title: "Career Development",
      description: "Access to workshops, seminars, and events that enhance your employability",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: GraduationCap,
      title: "Practical Learning",
      description: "Apply theoretical knowledge in real-world scenarios through organized events",
      gradient: "from-orange-500 to-red-500",
    }
  ];

  // Combined offerings with better styling
  const combinedOfferings = [
    {
      category: "Technical Events",
      icon: CodeIcon,
      items: [
        "Hackathons & Coding Competitions",
        "Cybersecurity Workshops", 
        "Tech Talks by Industry Experts",
        "Hands-on Training Sessions"
      ],
      color: "blue"
    },
    {
      category: "Networking Events",
      icon: Users,
      items: [
        "Industry Meetups",
        "Alumni Interactions", 
        "Corporate Visits",
        "Professional Networking Sessions"
      ],
      color: "purple"
    },
    {
      category: "Career Support",
      icon: Briefcase,
      items: [
        "Resume Building Workshops",
        "Interview Preparation",
        "Internship Opportunities", 
        "Placement Assistance"
      ],
      color: "green"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Aarav Sharma",
      branch: "Computer Science",
      text: "The collaboration between Abreonix and Team Eklavya gave me the perfect blend of technical skills and industry exposure.",
      rating: 5
    },
    {
      name: "Priya Patel",
      branch: "Information Technology",
      text: "Networking opportunities through Team Eklavya events helped me secure an internship at a leading tech company.",
      rating: 5
    },
    {
      name: "Rohan Mehta", 
      branch: "Electronics & Communication",
      text: "The combined events provided me with both technical skills and industry connections that were invaluable for my career.",
      rating: 4
    }
  ];

  // Autoplay for carousel
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % teamEklavyaImages.length);
    }, 4500);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [teamEklavyaImages.length]);

  // Scroll visibility detection
  useEffect(() => {
    const handleScroll = () => {
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

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % teamEklavyaImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + teamEklavyaImages.length) % teamEklavyaImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Get color classes based on color name
  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; gradient: string } } = {
      blue: { bg: "bg-blue-50", text: "text-blue-700", gradient: "from-blue-500 to-cyan-500" },
      purple: { bg: "bg-purple-50", text: "text-purple-700", gradient: "from-purple-500 to-pink-500" },
      green: { bg: "bg-green-50", text: "text-green-700", gradient: "from-green-500 to-emerald-500" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes scaleIn { 
          from { opacity: 0; transform: scale(0.95); } 
          to { opacity: 1; transform: scale(1); } 
        }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.7s ease-out forwards; }
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

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem !important; }
          .section-title { font-size: 1.75rem; }
          .carousel-container { height: 300px !important; }
          .carousel-image { object-position: center !important; }
        }
      `}</style>

 

      {/* Hero Carousel Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] carousel-container">
          {teamEklavyaImages.length > 0 ? (
            teamEklavyaImages.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <div className="relative w-full h-full">
                  {/* Fallback to img tag if Image component doesn't work */}
                  <img
                    src={src}
                    alt={`Team Eklavya Event ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // If image fails to load, show a placeholder
                      console.log(`Failed to load image: ${src}`);
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239CA3AF'%3ETeam Eklavya Event ${index + 1}%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            // Fallback when no images are available
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Abreonix × Team Eklavya</h1>
                <p className="text-xl">Strategic Collaboration</p>
              </div>
            </div>
          )}
          
          {/* Overlay Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-4 md:px-6 animate-fade-in-up">
            </div>
          </div>

         
        </div>
      </section>

      {/* Collaboration Overview */}
      <section className="py-12 md:py-20 bg-white" data-animate id="overview">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-sm text-sm font-semibold mb-4">
              <Users className="w-4 h-4" />
              Strategic Collaboration
            </div>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powering Student Success Together
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Abreonix and Team Eklavya have joined forces to create an ecosystem where theoretical knowledge meets practical application, 
              and classroom learning transforms into career-ready skills through industrial exposure and real-world experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Abreonix Contribution */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 p-6 md:p-8 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Abreonix Expertise</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Bringing industry-leading cybersecurity education with NIELIT certified programs, 
                hands-on training, and career-focused curriculum developed by experienced professionals.
              </p>
              <ul className="space-y-2">
                {[
                  "NIELIT Certified Cybersecurity Programs",
                  "Industry Expert Instructors",
                  "Hands-on Lab Training",
                  "Career Placement Support",
                  "Government Recognized Certifications"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="text-green-500 shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Team Eklavya Contribution */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 p-6 md:p-8 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Team Eklavya Network</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Creating platforms for industrial exposure, networking events, and real-world experiences 
                that bridge the gap between academic learning and industry requirements.
              </p>
              <ul className="space-y-2">
                {[
                  "Industry Events & Workshops",
                  "Professional Networking Platforms",
                  "Real-world Project Exposure",
                  "Cross-branch Collaborations",
                  "Career Development Events"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="text-green-500 shrink-0" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 bg-gray-50" data-animate id="benefits">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Students Gain
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              The combined strength of Abreonix and Team Eklavya provides comprehensive development opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {collaborationBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center card-hover">
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <benefit.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Offerings */}
      <section className="py-12 md:py-20 bg-white" data-animate id="offerings">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Offerings
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Together, we provide a complete ecosystem for student development and career growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {combinedOfferings.map((offering, index) => {
              const colorClasses = getColorClasses(offering.color);
              return (
                <div key={index} className={`${colorClasses.bg} rounded-lg border border-gray-200 p-6 md:p-8 card-hover`}>
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses.gradient} rounded-lg flex items-center justify-center mx-auto mb-6`}>
                    <offering.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-6 text-gray-900">{offering.category}</h3>
                  <ul className="space-y-4">
                    {offering.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-sky-400 to-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of students who are leveraging the combined power of Abreonix education and Team Eklavya exposure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-sky-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Explore Abreonix Courses
                <ExternalLink size={18} />
              </Link>
              <Link
                href="https://teameklavya.xyz/"
                className="bg-white text-sky-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Explore Team Eklavya <ExternalLink size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}