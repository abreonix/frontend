"use client";

import React, { useState } from "react";
import useMeasure from "react-use-measure";
import {
  useAnimate,
  useDragControls,
  useMotionValue,
  motion,
} from "framer-motion";
import { ShieldCheck, Clock, Award, Users, BookOpen, Target, Zap, Lock } from "lucide-react";
import { FeatureCard } from "../FeatureCard";


// ───────────────────────────────
// 🔽 Main Page
// ───────────────────────────────
export default function CoursePage() {
  const [open, setOpen] = useState(false);

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
    <main className="font-sans bg-white">
      {/* HERO SECTION */}
      <div 
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: "url('/images/three.jpg')" }}
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
              Why Choose Our <span className="text-blue-600">3-Month Cyber Security</span> Course?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Perfect beginner course to learn cyber safety and build essential digital protection skills
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
              Essential <span className="text-blue-600">Curriculum</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practical learning path covering fundamental cyber safety concepts in 3 months
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
            Ready to Learn Cyber Safety?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your cybersecurity journey with our beginner-friendly 3-month course
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Brochure/3months.pdf"
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
    </main>
  );
}
