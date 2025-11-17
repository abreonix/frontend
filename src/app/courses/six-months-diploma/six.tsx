"use client";

import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
    useAnimate,
    useDragControls,
    useMotionValue,
    motion,
} from "framer-motion";
import { ShieldCheck, Clock, Award, Users, BookOpen, Target, Zap } from "lucide-react";

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
// 🔽 Main Page
// ───────────────────────────────
export default function SixMonthsPage() {
    const [open, setOpen] = useState(false);

    const features = [
        {
            icon: ShieldCheck,
            title: "NIELIT Certified",
            description: "Government-recognized certification with industry acceptance in just 6 months.",
            color: "blue"
        },
        {
            icon: Zap,
            title: "Fast-Track Learning",
            description: "Intensive program focused on core cybersecurity skills for quick career entry.",
            color: "orange"
        },
        {
            icon: BookOpen,
            title: "Hands-on Practice",
            description: "Practical sessions on system and network defense with real tools.",
            color: "purple"
        },
        {
            icon: Target,
            title: "Career Ready",
            description: "Perfect for career upskilling or entry-level cybersecurity roles.",
            color: "green"
        }
    ];

    const curriculum = [
        { module: "1", title: "Cybersecurity Fundamentals", topics: "Basics, Threats, Vulnerabilities, Ethics" },
        { module: "2", title: "Network Security Essentials", topics: "Firewalls, VPNs, Network Defense" },
        { module: "3", title: "Ethical Hacking Basics", topics: "Penetration Testing, Vulnerability Assessment" },
        { module: "4", title: "Security Operations", topics: "SOC Tools, Threat Detection, Monitoring" },
        { module: "5", title: "Incident Response", topics: "Security Incidents, Response Procedures" },
        { module: "6", title: "Cyber Tools & Techniques", topics: "Essential Security Tools, Practical Implementation" }
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
        background-image: url('/images/six.jpg');
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
    `}</style>
            <main className="font-sans bg-white">
                {/* HERO SECTION - Fixed to maintain landscape proportions */}
                <div className="hero-banner w-full flex flex-col items-center justify-center px-4">
                    <div className="relative z-10 text-center text-white max-w-4xl">
                        {/* Content can be added here if needed */}
                    </div>
                </div>

                {/* FEATURES SECTION */}
                <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                                Why Choose Our <span className="text-blue-600">6-Month Cyber Security</span> Program?
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                                Fast-track training designed to make you job-ready in the high-demand cybersecurity field
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
                                Focused <span className="text-blue-600">Curriculum</span>
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                                Intensive learning path covering essential cybersecurity domains in 6 months
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {curriculum.map((item, index) => (
                                <div key={index} className="group p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
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
                            Ready to Start Your Cybersecurity Journey?
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                            Fast-track your career with our intensive 6-month cybersecurity program
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <a
                                href="/Brochure/6months.pdf"
                                target="_main"
                                onClick={() => setOpen(true)}
                                className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-sm sm:text-base"
                            >
                                View Brochure
                            </a>
                            <button className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                                Contact Advisor
                            </button>
                        </div>
                    </div>
                </section>

                {/* DRAWER DETAILS */}
                <DragCloseDrawer open={open} setOpen={setOpen}>
                    <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
                        <div className="text-center mb-6 sm:mb-8">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                6 Months Diploma in Cyber Security
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="flex items-center gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
                                <Clock className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">Duration</p>
                                    <p className="text-gray-600 text-sm">6 Months</p>
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

                        <div className="prose prose-sm sm:prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                The <strong>6 Months Diploma in Cyber Security</strong>, certified by NIELIT, provides fast-track training
                                in core security skills. It covers ethical hacking fundamentals, network protection, threat detection,
                                and security operation center (SOC) tools. The program blends theoretical knowledge with practical exposure,
                                ideal for students and professionals who want to strengthen their technical foundation in less time.
                            </p>

                            <div className="mt-6 sm:mt-8">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
                                    <Award className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                                    Program Highlights
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {[
                                        "Government-recognized NIELIT Certification",
                                        "Practical sessions on system and network defense",
                                        "Learn key cybersecurity tools and techniques",
                                        "Perfect for career upskilling or entry-level professionals",
                                        "Fast-track 6-month intensive program",
                                        "Hands-on virtual lab environment access",
                                        "Industry-relevant curriculum",
                                        "Flexible learning with recorded sessions"
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
                                    This program is ideal for IT professionals, fresh graduates, career changers, and students
                                    looking for a fast-track entry into cybersecurity. Basic knowledge of computers and networking
                                    is recommended. Perfect for those who want to upskill quickly and enter the job market.
                                </p>
                            </div>
                        </div>
                    </div>
                </DragCloseDrawer>
            </main>
        </>
    );
}