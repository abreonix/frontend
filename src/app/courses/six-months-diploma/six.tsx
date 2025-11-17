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
import { FeatureCard } from "../FeatureCard";



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
            <div className="relative z-0 h-full overflow-y-auto p-6 pt-12 text-gray-700">
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
    <main className="font-sans bg-white">
      {/* HERO SECTION */}
      <div 
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: "url('/images/six.jpg')" }}
      >
        <div className="relative z-10 text-center text-white max-w-4xl">
          {/* Content can be added here if needed */}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-blue-600">6-Month Cyber Security</span> Program?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fast-track training designed to make you job-ready in the high-demand cybersecurity field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM OVERVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Focused <span className="text-blue-600">Curriculum</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Intensive learning path covering essential cybersecurity domains in 6 months
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((item, index) => (
              <div key={index} className="group p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {item.module}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Cybersecurity Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Fast-track your career with our intensive 6-month cybersecurity program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Brochure/6months.pdf"
              target="_main"
              onClick={() => setOpen(true)}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              View Brochure
            </a>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
              Contact Advisor
            </button>
          </div>
        </div>
      </section>

      {/* DRAWER DETAILS */}
      <DragCloseDrawer open={open} setOpen={setOpen}>
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              6 Months Diploma in Cyber Security
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <Clock className="text-blue-600" size={24} />
              <div>
                <p className="font-semibold text-gray-900">Duration</p>
                <p className="text-gray-600">6 Months</p>
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
              The <strong>6 Months Diploma in Cyber Security</strong>, certified by NIELIT, provides fast-track training 
              in core security skills. It covers ethical hacking fundamentals, network protection, threat detection, 
              and security operation center (SOC) tools. The program blends theoretical knowledge with practical exposure, 
              ideal for students and professionals who want to strengthen their technical foundation in less time.
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="text-blue-600" /> 
                Program Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Who Should Enroll?</h4>
              <p className="text-gray-700">
                This program is ideal for IT professionals, fresh graduates, career changers, and students 
                looking for a fast-track entry into cybersecurity. Basic knowledge of computers and networking 
                is recommended. Perfect for those who want to upskill quickly and enter the job market.
              </p>
            </div>
          </div>
        </div>
      </DragCloseDrawer>
    </main>
  );
}
