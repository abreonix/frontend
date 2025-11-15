"use client";
import Script from "next/script";
import CourseCard from "@/components/CourseCard";
import { Shield, Lock, Zap, CheckCircle, Calendar, Users, Award, Clock } from "lucide-react";
import Image from "next/image";
import { useAnimate, useDragControls, useMotionValue , motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useState } from "react";

const DragCloseDrawer = ({ open, setOpen, children }: any) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, { opacity: [1, 0] });
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    await animate("#drawer", { y: [yStart, height] });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ ease: "easeInOut" }}
            className="absolute bottom-0 h-[85vh] w-full overflow-hidden rounded-t-3xl bg-white shadow-2xl"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-white p-4 rounded-t-3xl border-b border-gray-100">
              <button
                onPointerDown={(e) => controls.start(e)}
                className="h-2 w-14 cursor-grab touch-none rounded-full bg-gray-300 active:cursor-grabbing"
              ></button>
            </div>
            <div className="relative z-0 h-full overflow-y-auto p-6 pt-12 text-gray-700">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default function CoursePage() {

  const [open, setOpen] = useState(false);

  const courses = [
    {
      id: "one-year-cyber-security-diploma",
      title: "One Year Diploma in Cyber Security (NIELIT Certified)",
      description:
        "Comprehensive program building professional-level expertise in cyber defense and ethical hacking. Covers network security, web application security, digital forensics, malware analysis, and cyber laws with real-time lab practice.",
      image: "/images/one.jpg",
      duration: "12 Months",
      level: "Advanced",
      highlights: [
        "NIELIT Certified Government-Recognized Diploma",
        "Training on real-time attack detection and incident response",
        "Covers CEH, CompTIA Security+, and SOC operations concepts",
        "Suitable for students and professionals aspiring to build a cybersecurity career"
      ],
      icon: Shield,
      color: "orange",
      featured: true
    },
    {
      id: "six-months-cyber-security-diploma",
      title: "6 Months Diploma in Cyber Security (NIELIT Certified)",
      description:
        "Fast-track training in core security skills covering ethical hacking fundamentals, network protection, threat detection, and security operation center (SOC) tools. Blends theoretical knowledge with practical exposure.",
      image: "/images/six.jpg",
      duration: "6 Months",
      level: "Intermediate",
      highlights: [
        "Government-recognized NIELIT Certification",
        "Practical sessions on system and network defense",
        "Learn key cybersecurity tools and techniques",
        "Perfect for career upskilling or entry-level professionals"
      ],
      icon: Lock,
      color: "indigo",
      featured: false,
      link : ""
    },
    {
      id: "three-months-basic-cyber-security",
      title: "3 Months Basic Cyber Security Course (NIELIT Certified)",
      description:
        "Introduction to fundamentals of cyber safety and awareness. Covers online threats, phishing attacks, password management, digital hygiene, and basic network security concepts. Designed for beginners.",
      image: "/images/three.jpg",
      duration: "3 Months",
      level: "Beginner",
      highlights: [
        "NIELIT Certified Short-Term Course",
        "Beginner-friendly modules with hands-on learning",
        "Learn safe internet and data protection practices",
        "Ideal for students, teachers, and working professionals"
      ],
      icon: Zap,
      color: "gray",
      featured: false,
      link : ""
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Students Trained" },
    { icon: Award, value: "95%", label: "Placement Rate" },
    { icon: Calendar, value: "500+", label: "Training Hours" },
    { icon: CheckCircle, value: "NIELIT", label: "Certified" }
  ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((c, i) => ({
      "@type": "Course",
      position: i + 1,
      name: c.title,
      description: c.description,
      courseCode: c.id,
      educationalCredentialAwarded: "NIELIT Certification",
      timeToComplete: c.duration,
      provider: {
        "@type": "EducationalOrganization",
        name: "Abrenoix Cybersecurity Institute",
        url: "https://abrenoix.com"
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://abrenoix.com/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: "https://abrenoix.com/courses"
      }
    ]
  };

  return (
    <>
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #2196F3, #4C1D95);
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        /* Gradient border for buttons: shows gradient border only on hover */
        .gradient-border {
          border: 2px solid transparent;
          background-image: linear-gradient(white, white), linear-gradient(white, white);
          background-origin: padding-box, border-box;
          background-clip: padding-box, border-box;
          transition: all 0.3s ease;
        }
        .gradient-border:hover {
          background-image: linear-gradient(white, white), linear-gradient(135deg, #2196F3, #4C1D95);
          background-origin: padding-box, border-box;
          background-clip: padding-box, border-box;
          transform: translateY(-2px);
        }
      `}</style>

      {/* Schema scripts for SEO */}
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-indigo-900 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm text-xs md:text-sm font-semibold mb-4 animate-fade-in">
            <Award className="w-4 h-4" />
            NIELIT Certified Programs
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Cybersecurity <span className="gradient-text">Courses</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Transform your career with government-recognized NIELIT certified cybersecurity programs. 
            From beginner to professional level, we have the right path for your journey.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-800 rounded-sm flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your <span className="gradient-text">Learning Path</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select from our comprehensive range of NIELIT certified cybersecurity programs, 
              designed to take you from beginner to job-ready professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course, index) => (
              <div key={course.id} className="group h-full animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`bg-white rounded-sm border-2 overflow-hidden card-hover h-full flex flex-col ${course.featured ? 'shadow-lg' : ''} ${
                  course.color === 'orange' ? 'hover:border-orange-600' : course.color === 'indigo' ? 'hover:border-indigo-600' : 'hover:border-gray-300'
                }`}>
                  
                  {/* Header */}
                  <div className={`h-32 bg-gradient-to-br ${
                    course.color === 'orange' ? 'from-orange-500 to-orange-600' :
                    course.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                    'from-gray-500 to-gray-600'
                  } p-5 relative overflow-hidden`}>
                    <course.icon className="text-white opacity-20 absolute -bottom-4 -right-4" size={80} />
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
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Course Image */}
                  <div className="w-full h-48 overflow-hidden relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Course Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <Calendar size={16} />
                      <span className="font-semibold">{course.duration}</span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed flex-1">
                      {course.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 text-sm mb-3">Key Highlights:</h4>
                      <ul className="space-y-2">
                        {course.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className={`${
                              course.color === 'orange' ? 'text-orange-600' :
                              course.color === 'indigo' ? 'text-indigo-600' :
                              'text-gray-600'
                            } flex-shrink-0 mt-0.5`} size={16} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 mt-auto">
                      <button className="w-full py-3 bg-gradient-to-br from-sky-500 to-indigo-800 text-white text-sm font-semibold rounded-sm hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                        Enroll Now
                      </button>
                      <button
                       onClick={() => setOpen(true)}
                      className="w-full py-2 text-gray-700 text-sm font-semibold rounded-sm transition-all duration-300 gradient-border">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* DRAWER DETAILS */}
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              One Year Diploma in Cyber Security
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <Clock className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">Duration</p>
                <p className="text-gray-600">12 Months</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <Users className="text-green-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">Mode</p>
                <p className="text-gray-600">Online + Live Sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
              <Award className="text-purple-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">Certificate</p>
                <p className="text-gray-600">NIELIT Certified</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              The <strong>NIELIT Certified One Year Diploma in Cyber Security</strong> provides comprehensive training 
              in network security, web application security, digital forensics, malware analysis, and cyber laws. 
              Students gain hands-on exposure through simulated cyber defense exercises and real-world case studies 
              conducted in our state-of-the-art virtual labs.
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="text-blue-600" /> 
                Program Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "NIELIT Certified Government-Recognized Diploma",
                  "Real-time attack detection and incident response training",
                  "Covers CEH, CompTIA Security+, and SOC operations",
                  "Hands-on virtual lab environment access",
                  "Industry expert mentorship and career guidance",
                  "Placement assistance and interview preparation",
                  "Lifetime access to updated course materials",
                  "Flexible learning with recorded sessions"
                ].map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Who Should Enroll?</h4>
              <p className="text-gray-700">
                This program is ideal for IT professionals, engineering graduates, fresh graduates, 
                and career changers looking to build a successful career in cybersecurity. 
                Basic knowledge of computers and networking is recommended.
              </p>
            </div>
          </div>
        </div>
      </DragCloseDrawer>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white border-t border-gray-300">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Cybersecurity Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful professionals who transformed their careers with Abrenoix. 
            Get NIELIT certified and launch your career in the booming cybersecurity industry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-br from-sky-500 to-indigo-800 text-white text-sm font-semibold rounded-sm hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
              Book Free Demo Class
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-sm hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5">
              Talk to Career Advisor
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-gray-300">
            {[
              "NIELIT Certified",
              "Hands-on Training",
              "Job Placement Support",
              "Expert Mentors"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="text-green-500" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
