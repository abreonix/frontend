"use client";

import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
    useAnimate,
    useDragControls,
    useMotionValue,
    motion,
} from "framer-motion";
import { ShieldCheck, Clock, Award, Users, BookOpen, Target, Zap, Lock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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
        <div
            className={`
        group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-200
        shadow-sm transition-all duration-300 
        hover:-translate-y-1 hover:shadow-lg
        ${c.cardHover}
      `}
        >
            <div
                className={`
          w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4
          text-white transition-colors duration-300
          ${c.iconBg}
          group-hover:bg-white
        `}
            >
                <Icon
                    size={20}
                    className={`text-white transition-colors duration-300 ${c.iconHover} sm:w-6 sm:h-6`}
                />

            </div>

            <h3
                className={`
          text-lg sm:text-xl font-semibold text-gray-900 mb-2
          transition-colors duration-300 ${c.textHover}
        `}
            >
                {title}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-white/90">
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
// 🔽 Course Details Component
// ───────────────────────────────
const CourseDetails = () => {
    // Function to handle enrollment
    const handleEnroll = (courseTitle: string) => {
        const message = `Hi, I am interested in enrolling in the course: ${courseTitle}. Please provide more details.`;
        const whatsappUrl = `https://wa.me/918690650532?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4 mt-12">
                    <Zap className="w-4 h-4" />
                    Beginner Level
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    3 Months Basic Cyber Security Course (NIELIT Certified)
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
                    <Clock className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">Duration</p>
                        <p className="text-gray-600 text-sm">3 Months</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl">
                    <Users className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">Mode</p>
                        <p className="text-gray-600 text-sm">Online + Live Sessions</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl">
                    <Award className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
                    <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">Certificate</p>
                        <p className="text-gray-600 text-sm">NIELIT Certified</p>
                    </div>
                </div>
            </div>

            {/* Course Image */}
            <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6">
                <Image
                    src="/images/three.jpg"
                    alt="3 Months Basic Cyber Security Course"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                            3 Months Basic Cyber Security Course
                        </h3>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="prose prose-sm sm:prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
                    The <strong>3 Months Certificate in Cyber Security</strong>, certified by NIELIT, provides essential training 
                    in cyber safety and digital protection. This beginner-friendly course covers fundamental security concepts, 
                    online threat awareness, and practical safety measures for everyday internet use. Perfect for students, 
                    professionals, and anyone looking to enhance their digital security knowledge.
                </p>

                <div className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                        <Award className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                        Course Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {[
                            "Government-recognized NIELIT Certification",
                            "Beginner-friendly with no prior experience required",
                            "Focus on practical cyber safety and digital hygiene",
                            "Learn to protect against phishing and online scams",
                            "Essential password and data protection techniques",
                            "Safe internet browsing and social media practices",
                            "Basic network security fundamentals",
                            "Perfect for students and working professionals"
                        ].map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 text-sm sm:text-base">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl border border-blue-100">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Who Should Enroll?</h4>
                    <p className="text-gray-700 text-sm sm:text-base">
                        This course is perfect for complete beginners, students, working professionals, parents, 
                        and anyone who wants to learn essential cyber safety skills. No technical background required. 
                        Ideal for those looking to protect themselves and their families from online threats.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button 
                        onClick={() => handleEnroll("3 Months Basic Cyber Security Course (NIELIT Certified)")}
                        className="flex-1 py-3 bg-gradient-to-br from-sky-500 to-indigo-800 text-white text-sm font-semibold rounded-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Enroll Now
                    </button>
                    <a
                        href="/Brochure/3months.pdf"
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
// 🔽 Main Page
// ───────────────────────────────
export default function ThreePage() {
    const [open, setOpen] = useState(false);

    // Function to handle enrollment
    const handleEnroll = (courseTitle: string) => {
        const message = `Hi, I am interested in enrolling in the course: ${courseTitle}. Please provide more details.`;
        const whatsappUrl = `https://wa.me/918690650532?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Function to handle demo class booking
    const handleBookDemo = () => {
        const message = "Hi, I would like to book a free demo class for the 3 Months Basic Cyber Security Course. Please provide more details.";
        const whatsappUrl = `https://wa.me/918690650532?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Function to handle career advisor contact
    const handleContactAdvisor = () => {
        const message = "Hi, I would like to talk to a career advisor about the 3 Months Basic Cyber Security Course.";
        const whatsappUrl = `https://wa.me/918690650532?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const features = [
        {
            icon: ShieldCheck,
            title: "NIELIT Certified",
            description: "Government-recognized certification in just 3 months. Perfect for beginners.",
            color: "blue"
        },
        {
            icon: Lock,
            title: "Cyber Safety Focus",
            description: "Learn essential digital hygiene and safe internet practices for daily protection.",
            color: "green"
        },
        {
            icon: BookOpen,
            title: "Beginner Friendly",
            description: "No prior experience needed. Designed for students and working professionals.",
            color: "purple"
        },
        {
            icon: Target,
            title: "Practical Awareness",
            description: "Hands-on learning against phishing, password attacks, and online threats.",
            color: "orange"
        }
    ];

    const curriculum = [
        { module: "1", title: "Cyber Safety Fundamentals", topics: "Online Threats, Digital Hygiene, Basic Security" },
        { module: "2", title: "Password & Data Protection", topics: "Password Management, Data Security, Privacy" },
        { module: "3", title: "Phishing & Social Engineering", topics: "Attack Recognition, Prevention Techniques" },
        { module: "4", title: "Safe Internet Practices", topics: "Secure Browsing, Email Safety, Social Media" },
        { module: "5", title: "Basic Network Security", topics: "Wi-Fi Security, VPN Basics, Network Protection" },
        { module: "6", title: "Cyber Awareness & Ethics", topics: "Digital Citizenship, Legal Aspects, Best Practices" }
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
      
      /* Ensure banner maintains aspect ratio */
      .hero-banner {
        aspect-ratio: 16 / 9;
        background-image: url('/images/three.jpg');
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
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }
    `}</style>
            <main className="font-sans bg-white">
                {/* HERO SECTION - Fixed to maintain landscape proportions */}
                <div className="hero-banner w-full flex flex-col items-center justify-center px-4">
                    <div className="relative z-10 text-center text-white max-w-4xl">
                        {/* Content can be added here if needed */}
                    </div>
                </div>

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
                                onClick={() => handleEnroll("3 Months Basic Cyber Security Course (NIELIT Certified)")}
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
                                Why Choose Our <span className="text-blue-600">3-Month Cyber Security</span> Course?
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                                Perfect beginner course to learn cyber safety and build essential digital protection skills
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* CURRICULUM OVERVIEW */}
                <section className="py-12 sm:py-16 lg:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                                Essential <span className="text-blue-600">Curriculum</span>
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                                Practical learning path covering fundamental cyber safety concepts in 3 months
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
                            Ready to Learn Cyber Safety?
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Start your cybersecurity journey with our beginner-friendly 3-month course
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                onClick={handleBookDemo}
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                Book Free Demo Class
                            </button>
                            <button 
                                onClick={handleContactAdvisor}
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                            >
                                Talk to Career Advisor
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/20">
                            {[
                                "NIELIT Certified",
                                "Beginner Friendly",
                                "Practical Learning",
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
            </main>
        </>
    );
}