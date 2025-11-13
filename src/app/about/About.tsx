"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import { Award, Shield, BookOpen, Users, Target, Zap, Check, ChevronRight, Briefcase, GraduationCap, Code, Globe } from "lucide-react";
import Link from "next/link";
export default function AboutPageComponent() {
  const [activeTab, setActiveTab] = useState("vision");
  const [Tab, setTab] = useState("vision");
  const router = useRouter();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Abreonix Cybersecurity Institute",
    url: "https://Abreonix.com",
    logo: "https://Abreonix.com/logo.png",
    sameAs: [
      "https://www.instagram.com/Abreonix",
      "https://www.linkedin.com/company/Abreonix"
    ],
    description:
      "Abreonix is a NIELIT-verified, government-authorized cybersecurity and technology institute offering professional diploma and certification courses.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sector 45",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      postalCode: "122001",
      addressCountry: "IN"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9999999999",
      contactType: "admissions",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"]
    }
  };

  const certifications = [
    {
      title: "Government Authorized Diploma",
      icon: Award,
      color: "orange",
      description: "Our diplomas are officially recognized by the Government of India, ensuring your certification holds national validity and is accepted by employers across the country.",
      features: [
        "Ministry of Education approved curriculum",
        "National Qualifications Framework (NQF) aligned",
        "Valid for government job applications",
        "Recognized by public and private sectors"
      ],
      duration: "6-12 months",
      validity: "Lifetime"
    },
    {
      title: "NIELIT Certification",
      icon: GraduationCap,
      color: "indigo",
      description: "NIELIT (National Institute of Electronics and Information Technology) is a premier institute under MeitY, providing quality education and certification that's respected globally.",
      features: [
        "MeitY backed course content",
        "Proctored examinations",
        "Industry-recognized credentials",
        "Government recognized standards"
      ],
      duration: "3-12 months",
      validity: "Lifetime"
    },
    {
      title: "Industry Certifications",
      icon: Shield,
      color: "gray",
      description: "Gain vendor-specific certifications from leading cybersecurity organizations, making you job-ready with skills that employers actively seek.",
      features: [
        "CEH (Certified Ethical Hacker) preparation",
        "CompTIA Security+ aligned",
        "SOC operations training",
        "Practical security skills"
      ],
      duration: "3-6 months",
      validity: "3 years (renewable)"
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: "Enroll & Onboard",
      description: "Complete registration and get access to learning portal with all resources",
      icon: BookOpen
    },
    {
      step: 2,
      title: "Foundation Training",
      description: "Master fundamentals through interactive modules and hands-on labs",
      icon: Code
    },
    {
      step: 3,
      title: "Advanced Projects",
      description: "Work on real-world scenarios with industry-grade tools and mentorship",
      icon: Target
    },
    {
      step: 4,
      title: "Certification Exams",
      description: "Appear for proctored examinations and earn your credentials",
      icon: Award
    },
    {
      step: 5,
      title: "Job Placement",
      description: "Get connected with hiring partners and receive career support",
      icon: Briefcase
    }
  ];

  const faculty = [
    {
      name: "Ayush Kumar",
      role: "Lead Cybersecurity Instructor",
      experience: "8+ Years",
      image: "/faculty/ayush.jpg",
      background: "Ex-Microsoft | Former IBM Corporate Trainer",
      expertise: ["Ethical Hacking", "Network Security", "Penetration Testing"],
      achievements: [
        "Trained 5000+ professionals globally",
        "CEH & OSCP certified instructor",
        "Published researcher in cybersecurity"
      ],
      linkedin: "#"
    },
    {
      name: "Harshit Singh",
      role: "Senior Technical Mentor",
      experience: "10+ Years",
      image: "/faculty/harshit.jpg",
      background: "Ex-TCS | Cybersecurity Consultant",
      expertise: ["Cloud Security", "Malware Analysis", "Digital Forensics"],
      achievements: [
        "Led security audits for Fortune 500 companies",
        "CISSP & CISM certified",
        "Speaker at international security conferences"
      ],
      linkedin: "#"
    },
    {
      name: "Priya Sharma",
      role: "AI & ML Security Specialist",
      experience: "6+ Years",
      image: "/faculty/priya.jpg",
      background: "Ex-Amazon | Security Researcher",
      expertise: ["AI Security", "Threat Intelligence", "Security Automation"],
      achievements: [
        "Contributed to open-source security tools",
        "Published 15+ research papers",
        "Bug bounty hunter with $50K+ earnings"
      ],
      linkedin: "#"
    }
  ];

  const stats = [
    { label: "Students Trained", value: "10,000+", icon: Users },
    { label: "Course Completion Rate", value: "92%", icon: Target },
    { label: "Average Salary Hike", value: "150%", icon: Zap },
    { label: "Placement Rate", value: "95%", icon: Award }
  ];
  return (
    
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-up { animation: slideUp 0.8s ease-out; }
        .animate-slide-right { animation: slideRight 0.8s ease-out; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .gradient-text {
          background: linear-gradient(135deg, #210CAE 0%, #4DC9E6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        /* --- learning path toggle rules (moved here to avoid nested styled-jsx) --- */
        .learning-path-toggle.left-2 {
          left: 0.5rem;
          right: auto;
        }
        .learning-path-toggle.rotate-90 :global(svg) {
          transform: rotate(90deg);
          transition: transform 0.25s;
        }
        /* ensure svg rotates when class applied to button */
        .learning-path-toggle.rotate-90 > :global(svg) {
          transform: rotate(90deg);
          transition: transform 0.25s;
        }
        .learning-path-toggle > :global(svg) {
          transition: transform 0.25s;
        }
      `}</style>

      <Script
        id="about-org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <section className="bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-100 rounded-none blur-3xl opacity-30"></div>
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-100 rounded-none blur-3xl opacity-30"></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-orange-100 text-indigo-900 rounded-sm text-sm font-semibold mb-6 animate-scale-in">
              NIELIT Verified • Government Authorized
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              About <span className="gradient-text">Abreonix</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
              <br/>Abreonix Cyber Security was established in 2025 by Mr. Ayush Kumar and Mr. Harshit
              with the singular vision: "Innovating Learning, Empowering Minds." Our mission 
              is to transform motivated individuals into elite, job-ready security 
              professionals by delivering industry-leading, practical cyber 
              education that directly translates into professional competency. <br/>
              <br/>India's premier cybersecurity institute, building the next generation of 
              ethical hackers, security specialists, and digital innovators through 
              government-authorized and industry-recognized programs.
            </p>
            <div className="max-w-5xl mx-auto mb-20">
              <div className="flex justify-center gap-4 mb-8"></div>
              <Link href="/about-us">
                <button
                    onClick={() =>{
                      setTab("vision")
                    }}
                    className={`px-6 py-3 rounded-sm font-semibold transition-all duration-300 ${
                      Tab === "vision"
                        ? "bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Read More 
                  </button>
              
              </Link>
              </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group text-center p-6 bg-white rounded-sm border-2 border-gray-300 hover:border-sky-400 hover:shadow-xl transition-all duration-300 animate-scale-in card-hover"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <stat.icon className="mx-auto mb-3 text-orange-200 group-hover:scale-110 transition-transform" size={32} />
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Vision & Mission Tabs */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab("vision")}
                className={`px-6 py-3 rounded-sm font-semibold transition-all duration-300 ${
                  activeTab === "vision"
                    ? "bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Our Vision
              </button>
              <button
                onClick={() => setActiveTab("mission")}
                className={`px-6 py-3 rounded-sm font-semibold transition-all duration-300 ${
                  activeTab === "mission"
                    ? "bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Our Mission
              </button>
            </div>

            <div className="bg-gradient-to-br founderClass from-orange-50 to-indigo-50 p-8 rounded-sm shadow-lg animate-fade-in border border-gray-300">
              {activeTab === "vision" ? (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Target className="text-sky-400" size={28} />
                    Founder's Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Founded by cybersecurity professionals and educators with decades of combined experience, 
                    Abreonix was established to bridge the critical gap between academic theory and real-world 
                    digital defense. Our vision is to create a secure digital India by empowering individuals 
                    with cutting-edge cybersecurity skills.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We envision a future where every organization has access to skilled cybersecurity professionals 
                    who can protect against evolving threats. Through our government-authorized and NIELIT-verified 
                    programs, we're making world-class cybersecurity education accessible to everyone.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Zap className="text-indigo-600" size={28} />
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Our mission is to democratize cybersecurity education by providing affordable, high-quality, 
                    and industry-relevant training that transforms learners into job-ready professionals. We are 
                    committed to maintaining the highest standards of education through our government partnerships 
                    and NIELIT collaboration.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700">
                      <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <span>Deliver practical, hands-on training with real-world scenarios</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <span>Provide government-recognized certifications that open career doors</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <span>Build a community of ethical hackers and security professionals</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our <span className="gradient-text">Certifications</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Triple-verified credentials that give you a competitive edge in the job market
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, idx) => {
                const Icon = cert.icon;
                const colorClasses = {
                  orange: 'from-sky-500 to-sky-400 border-sky-400 text-sky-400',
                  indigo: 'from-indigo-900 to-indigo-600 border-indigo-900 text-indigo-600',
                  gray: 'from-gray-500 to-gray-600 border-gray-400 text-gray-600'
                };
                
                return (
                  <div
                    key={idx}
                    className={`group bg-white rounded-sm border-2 border-gray-300 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up card-hover ${
                      cert.color === 'orange' ? 'hover:border-sky-400' :
                      cert.color === 'indigo' ? 'hover:border-indigo-900' :
                      'hover:border-gray-400'
                    }`}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[cert.color].split(' ')[0]} ${colorClasses[cert.color].split(' ')[1]} rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{cert.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{cert.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {cert.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className={`${colorClasses[cert.color].split(' ')[2]} flex-shrink-0 mt-0.5`} size={16} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="text-sm font-semibold text-gray-900">{cert.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Validity</div>
                        <div className="text-sm font-semibold text-gray-900">{cert.validity}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Path */}
          <div className="mb-20 bg-gradient-to-br from-gray-50 to-orange-50/30 rounded-sm p-10 border border-gray-300">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Learning <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-lg text-gray-600">
                A structured 5-step pathway from enrollment to employment
              </p>
            </div>

            {/* Horizontal Scrolling Timeline */}
            <div className="relative">
                <div className="relative">
                <div
                  id="learningPathScroll"
                  className="flex gap-6 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory learningPathDiv"
                >
                  {learningPath.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex-shrink-0 w-72 snap-center">
                    <div className="group bg-white rounded-sm p-6 border-2 border-gray-300 hover:border-sky-400 hover:shadow-xl transition-all duration-300 h-full card-hover">
                      <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-sm bg-sky-500 flex items-center justify-center text-white">
                        <Icon size={18} />
                      </div>
                      <div className="text-sm text-gray-500">Step {step.step}</div>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    </div>
                  );
                  })}
                </div>

                {/* Toggle Arrow - click to jump start/end and the arrow switches side */}
                <button
                  type="button"
                  aria-label="Toggle learning path view"
                  className="learning-path-toggle absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-white p-2 rounded-sm border border-gray-200 shadow-md transition-all duration-300"
                  onClick={(e) => {
                  const el = document.getElementById("learningPathScroll");
                  if (!el) return;
                  const max = el.scrollWidth - el.clientWidth;
                  const btn = e.currentTarget as HTMLButtonElement;

                  // If not at end -> scroll to end and move button to left (show previous/first with next click)
                  if (el.scrollLeft < max - 10) {
                    el.scrollTo({ left: max, behavior: "smooth" });
                    // move button to left and rotate icon to point left
                    btn.classList.add("left-2");
                    btn.classList.remove("right-2");
                    btn.classList.add("rotate-90");
                    // ensure we don't keep both left/right classes (cleanup)
                    btn.classList.remove("right-2");
                  } else {
                    // already at end -> scroll back to start and move button to right
                    el.scrollTo({ left: 0, behavior: "smooth" });
                    btn.classList.remove("left-2");
                    btn.classList.add("right-2");
                    btn.classList.remove("rotate-90");
                  }
                  }}
                >
                  <ChevronRight size={20} className="text-sky-500" />
                </button>

                </div>
              
            </div>
          </div>

          {/* Faculty Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Our <span className="gradient-text">Expert Faculty</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn from industry veterans with real-world experience at top tech companies
              </p>
            </div>

            {/* Horizontal Scrolling Faculty Cards */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-8 overflow-x-auto scrollbar-hide py-6 snap-x snap-mandatory">
                {faculty.map((member, idx) => (
                  <div
                    key={idx}
                    className="w-100 snap-center m-auto"
                  >
                    <div className="group bg-white rounded-sm border-2 border-gray-300 overflow-hidden hover:border-sky-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 card-hover">
                      {/* Image Section */}
                      <div className="relative h-48 bg-gradient-to-br from-orange-100 to-indigo-100 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-sm bg-gradient-to-br from-sky-500 to-indigo-900 flex items-center justify-center text-white text-4xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-sm text-xs font-semibold text-sky-400 border border-gray-300">
                          {member.experience}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-sm text-sky-400 font-semibold mb-2">{member.role}</p>
                        <p className="text-sm text-gray-600 mb-4 font-medium">{member.background}</p>

                        {/* Expertise Tags */}
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-gray-500 mb-2">EXPERTISE</div>
                          <div className="flex flex-wrap gap-2">
                            {member.expertise.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-orange-50 text-sky-400 rounded-sm text-xs font-medium border cursor-pointer border-orange-200 hover:border-orange-300 hover:text-sky-600 transition-all duration-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <div className="text-xs font-semibold text-gray-500 mb-2">KEY ACHIEVEMENTS</div>
                          <ul className="space-y-2">
                            {member.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <Check className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Scroll indicator */}
              <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
                <Users size={16} />
                Scroll to view all faculty members
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-sky-400 via-indigo-600 to-orange-700 rounded-sm p-12 relative overflow-hidden border border-gray-300">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-none blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-none blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with our 
                government-authorized cybersecurity programs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/courses"
                  className="px-8 py-4 bg-white text-sky-400 font-semibold rounded-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 card-hover"
                >
                  Explore Courses
                </a>
                <a
                  href="/#contact"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-sm hover:bg-white hover:text-sky-400 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Talk to Advisor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
