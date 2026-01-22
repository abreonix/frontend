"use client";

import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useAnimate,
  useDragControls,
  useMotionValue,
  motion,
} from "framer-motion";
import { 
  Code2, 
  Server, 
  Database, 
  Layout, 
  CheckCircle, 
  Clock, 
  Users, 
  Award, 
  Rocket 
} from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";

// ───────────────────────────────
// 🔽 Feature Card Component
// ───────────────────────────────
const FeatureCard = ({ icon: Icon, title, description, color }: any) => {
  const colorMap: Record<string, any> = {
    blue: {
      cardHover: "hover:bg-blue-500",
      iconBg: "bg-blue-500",
      iconHover: "group-hover:text-blue-500",
      textHover: "group-hover:text-white",
    },
    green: {
      cardHover: "hover:bg-green-500",
      iconBg: "bg-green-500",
      iconHover: "group-hover:text-green-500",
      textHover: "group-hover:text-white",
    },
    purple: {
      cardHover: "hover:bg-purple-500",
      iconBg: "bg-purple-500",
      iconHover: "group-hover:text-purple-500",
      textHover: "group-hover:text-white",
    },
    orange: {
      cardHover: "hover:bg-orange-500",
      iconBg: "bg-orange-500",
      iconHover: "group-hover:text-orange-500",
      textHover: "group-hover:text-white",
    },
  };

  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className={`group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${c.cardHover}`}>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-white transition-colors duration-300 ${c.iconBg} group-hover:bg-white`}>
        <Icon size={20} className={`text-white transition-colors duration-300 ${c.iconHover} sm:w-6 sm:h-6`} />
      </div>
      <h3 className={`text-lg sm:text-xl text-left font-semibold text-gray-900 mb-2 transition-colors duration-300 ${c.textHover}`}>
        {title}
      </h3>
      <p className="text-sm sm:text-base text-left text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-white/90">
        {description}
      </p>
    </div>
  );
};

// ───────────────────────────────
// 🔽 Drag-Close Drawer Component
// ───────────────────────────────
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
            <div className="relative z-0 h-full overflow-y-auto p-4 sm:p-6 pt-12 text-gray-700">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

// ───────────────────────────────
// 🔽 Course Details Component (The Drawer Content)
// ───────────────────────────────
const CourseDetails = () => {
  const handleEnroll = (courseTitle: string) => {
    const message = `Hi, I am interested in enrolling in the course: ${courseTitle}. Please provide more details.`;
    const whatsappUrl = `https://wa.me/918690650532?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4 mt-12">
          <Code2 className="w-4 h-4" />
          Mastery Level
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Advanced Full Stack Development (MERN)
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
          <Clock className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">Duration</p>
            <p className="text-gray-600 text-sm">6 - 8 Months</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl">
          <Rocket className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">Projects</p>
            <p className="text-gray-600 text-sm">10+ Real World Apps</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl">
          <Award className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">Certification</p>
            <p className="text-gray-600 text-sm">Job-Ready Diploma</p>
          </div>
        </div>
      </div>

      {/* Course Image */}
      <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6">
        <Image
          src="/images/full.png"
          alt="Full Stack Development Course"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="prose prose-sm sm:prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
          Our **Advanced Full Stack Development Program** is designed to take you from zero to a job-ready developer. You will master the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), build responsive frontends with Tailwind CSS, and deploy scalable backends. 
          <br /><br />
          The curriculum focuses on **building by doing**—you will create e-commerce platforms, social media dashboards, and real-time chat applications.
        </p>

        <div className="mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
            <Award className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
            Why This Course?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              "Deep Dive into React.js (Hooks, Redux, Context API)",
              "Backend Mastery with Node.js & Express",
              "Database Architecture with MongoDB",
              "Authentication & Security (JWT, OAuth)",
              "Live Project Deployment (Vercel, AWS, Heroku)",
              "Code Reviews by Senior Developers",
            ].map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={() => handleEnroll("Advanced Full Stack Development Course")}
            className="flex-1 py-3 bg-gradient-to-br from-sky-500 to-indigo-800 text-white text-sm font-semibold rounded-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Enroll Now
          </button>
          <a
            href="/Brochure/fullstack.pdf"
            target="_blank"
            className="flex-1 py-3 border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-sm hover:bg-gray-900 hover:text-white transition-all duration-300 text-center flex items-center justify-center"
          >
            Download Syllabus
          </a>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────
// 🔽 Main Client Page
// ───────────────────────────────
export default function FullStackPage() {
  const [open, setOpen] = useState(false);

  const handleEnroll = (courseTitle: string) => {
    const message = `Hi, I am interested in enrolling in the course: ${courseTitle}. Please provide more details.`;
    const whatsappUrl = `https://wa.me/918690650532?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  
  const handleBookDemo = () => {
    const message = "Hi, I would like to book a free demo class for the Full Stack Development course.";
    const whatsappUrl = `https://wa.me/918690650532?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const features = [
    { icon: Layout, title: "Modern Frontend", description: "Master React.js, Next.js, and Tailwind CSS to build stunning UIs.", color: "blue" },
    { icon: Server, title: "Scalable Backend", description: "Build robust APIs and microservices using Node.js and Express.", color: "green" },
    { icon: Database, title: "Database Design", description: "Learn SQL and NoSQL (MongoDB) database architecture deeply.", color: "purple" },
    { icon: Rocket, title: "Live Deployment", description: "Deploy your apps to the cloud with CI/CD pipelines.", color: "orange" },
  ];

  const curriculum = [
    { module: "1", title: "Frontend Fundamentals", topics: "HTML5, CSS3, Tailwind CSS, Responsive Design" },
    { module: "2", title: "JavaScript Mastery", topics: "ES6+, Async/Await, DOM Manipulation, APIs" },
    { module: "3", title: "React.js Ecosystem", topics: "Hooks, Redux Toolkit, React Router, Performance" },
    { module: "4", title: "Backend Development", topics: "Node.js, Express Framework, RESTful APIs" },
    { module: "5", title: "Database Management", topics: "MongoDB Aggregations, Mongoose, Data Modeling" },
    { module: "6", title: "Full Stack Deployment", topics: "Authentication, Hosting, Git & GitHub, CI/CD" },
  ];

  return (
    <>
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #5743de 0%, #0b88a7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-banner {
          aspect-ratio: 16 / 9;
          background-image: url('/images/full.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-color: #000;
        }
        @media (max-width: 768px) {
          .hero-banner {
            background-size: cover;
          }
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
      <main className="font-sans bg-white">
        {/* HERO SECTION */}
        <div className="hero-banner w-full flex flex-col items-center justify-center px-4" />

        {/* QUICK ACTION BUTTONS */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 bg-gradient-to-br from-sky-500 to-indigo-800 text-white text-sm font-semibold rounded-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                View Course Details
              </button>
              <button
                onClick={() => handleEnroll("Full Stack Development Course")}
                className="px-6 py-3 border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-sm hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                Master the <span className="gradient-text">Full Stack</span> Universe
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM SECTION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                Industry-Ready <span className="gradient-text">Curriculum</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                A structured path from HTML basics to advanced Cloud Deployment
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {curriculum.map((item, index) => (
                <div key={index} className="group p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg card-hover">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg">
                      {item.module}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.topics}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Become a Top 1% Developer?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join the next cohort and start building your dream portfolio today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleBookDemo}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Book Free Demo Class
              </button>
              <button 
                onClick={() => handleEnroll("Talk to Career Advisor")}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
              >
                Talk to Career Advisor
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/20">
              {[
                "100% Placement Support",
                "Live Projects",
                "Code Reviews",
                "Expert Mentors"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-white">
                  <CheckCircle className="text-green-300" size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DRAWER DETAILS */}
        <DragCloseDrawer open={open} setOpen={setOpen}>
          <CourseDetails />
        </DragCloseDrawer>

        <Footer />
      </main>
    </>
  );
}