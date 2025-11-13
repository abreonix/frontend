"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

function AboutusPage() {
  const controls = useAnimation();

  // useEffect(() => {
  //   controls.start({
  //     background: [
  //       "linear-gradient(to bottom, #dee4ffff, #eef2ff)",
  //       "linear-gradient(to bottom, #efefef, #c7d2fe)",
  //     ],
  //     transition: { duration: 3, ease: "easeInOut" },
  //   });
  // }, [controls]);

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
        "Published researcher in cybersecurity",
      ],
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
        "Speaker at international security conferences",
      ],
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
        "Bug bounty hunter with $50K+ earnings",
      ],
    },
  ];

  return (
    <>
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #615997 0%, #73acba 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-text2 {
          background: linear-gradient(135deg, #615997 0%, #73acba 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Background Animation Wrapper */}
      <motion.div
        // animate={controls}
        className="min-h-screen bg-white text-gray-700 flex flex-col items-center px-6 py-12 transition-all duration-1000"
      >
        {/* --- Intro Section --- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mb-20"
        >
          {/* Text Content */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 ">
              Innovating Learning, Empowering Minds.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              At <span className="font-semibold">Abreonix</span>, we believe in
              transforming ideas into impactful digital experiences. Our mission
              is to bridge creativity and technology, building tools that
              empower users and businesses to thrive in the digital world.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/logo.png"
              alt="Innovation at Abreonix"
              width={500}
              height={350}
              className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.section>

        {/* --- About Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-lg">
            About <span className="gradient-text">Abreonix</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-6">
            Welcome to <span className="font-semibold">Abreonix</span> — where
            innovation meets technology. We are passionate creators focused on
            delivering seamless digital solutions that empower individuals and
            businesses to reach new heights.
          </p>

          <p className="text-base sm:text-lg leading-relaxed mb-6">
            Our team is dedicated to designing experiences that combine
            creativity, usability, and performance. At Abreonix, we believe that
            every line of code, every design element, and every decision
            contributes to a larger mission — building a smarter, more connected
            world.
          </p>

          <p className="text-base sm:text-lg leading-relaxed mb-10">
            From web applications to cutting-edge software, our goal is to push
            boundaries, embrace challenges, and craft solutions that inspire
            growth and trust. Together, we're shaping the future of technology —
            one idea at a time.
          </p>
        </motion.div>

        {/* --- Detailed Description Section --- */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-5xl bg-white/10 backdrop-blur-lg text-gray-700 p-15 pb-20 rounded-3xl shadow-lg"
        >
          <h2 className="text-4xl drop-shadow-lg gradient-text2 sm:text-5xl font-bold mb-6 text-center ">
            Abreonix
          </h2>

          <p className="text-base sm:text-lg leading-relaxed mb-6">
            <span className="font-semibold">Abreonix Cyber Security</span> was
            established in 2025 by
            <span className="font-semibold"> Mr. Ayush Kumar</span> and
            <span className="font-semibold"> Mr. Harshit Singh</span> with the
            singular vision:
            <span className="italic">
              {" "}
              "Innovating Learning, Empowering Minds."
            </span>{" "}
            Our mission is to transform motivated individuals into elite,
            job-ready security professionals by delivering industry-leading,
            practical cyber education that directly translates into professional
            competency. We aim to close the global cyber skills gap by training
            experts ready to secure the digital infrastructure of organizations
            worldwide.
          </p>

          <p className="text-base sm:text-lg leading-relaxed mb-6">
            Our founders' commitment to this mission is rooted in their
            extensive corporate background. They serve as active{" "}
            <span className="font-semibold">
              Cyber Security Corporate Trainers at IBM
            </span>
            , ensuring that every module taught at Abreonix is based on
            enterprise-grade security protocols used by major corporations. This
            means our curriculum is not just academic; it is the blueprint for
            real-world defense.
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-4">
            Leadership, Achievements, & Expertise
          </h3>

          <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed mb-6 space-y-2">
            <li>
              <span className="font-semibold">Enterprise-Grade Training:</span>{" "}
              Our founders have trained corporate teams on the latest defensive
              and offensive strategies, aligning all courses with Fortune 500
              security standards.
            </li>
            <li>
              <span className="font-semibold">Specialized Project Leadership:</span>{" "}
              Their work includes{" "}
              <span className="italic">
                advanced tools for TOR Traffic Analysis
              </span>{" "}
              and{" "}
              <span className="italic">
                machine learning solutions for detecting illicit social media
                activity.
              </span>
            </li>
            <li>
              <span className="font-semibold">Core Competencies:</span> With
              deep expertise in Network Security, Penetration Testing
              (CEH-aligned), and Cyber Forensics, our training reflects the
              highest professional standards.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mt-10 mb-4">
            Industry Footprint: Workshops & Collaborations
          </h3>

          <ul className="list-disc list-inside text-base sm:text-lg leading-relaxed space-y-2">
            <li>
              <span className="font-semibold">High-Impact Workshops:</span> We
              conduct hands-on workshops focused on Cloud Security, AI in Cyber
              Defense, and Incident Response.
            </li>
            <li>
              <span className="font-semibold">Industry Collaboration:</span> Our
              methodologies evolve through collaboration with large tech
              organizations, integrating real-world threat intelligence.
            </li>
            <li>
              <span className="font-semibold">Skill Validation:</span> We help
              learners earn globally recognized certifications that validate
              their expertise for any corporate environment.
            </li>
          </ul>
        </motion.section>

        {/* --- Faculty Section --- */}
        <section className="w-full mt-20 mb-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="gradient-text">Expert Faculty</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from industry veterans with real-world experience at top
              tech companies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {faculty.map((member, idx) => (
              <div
                key={idx}
                className="relative group bg-gradient-to-br from-white to-[#e9ecff]/30 rounded-xl border-2 border-gray-300 overflow-hidden hover:border-[#615997]/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* header */}
                <div className="relative   h-48 bg-gradient-to-br from-[#615997] to-[#73acba] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-start px-6">
                    <div className="w-28 h-28 text-white rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center text-3xl font-bold shadow-md">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-[#615997] px-3 py-1 rounded-full text-xs font-semibold border border-gray-300 shadow-md">
                    {member.experience}
                  </div>
                </div>
                {/* card content */}
                <div className="p-6 text-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#615997] font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    {member.background}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 tracking-wide mb-2">
                      EXPERTISE
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-[#615997]/20 to-[#73acba]/20 text-[#615997] rounded-full text-xs font-medium border border-[#615997]/40 hover:border-[#615997]/80 hover:from-[#615997]/40 hover:to-[#73acba]/40 hover:text-[#3b2f70] cursor-pointer transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-2">
                      KEY ACHIEVEMENTS
                    </div>
                    <ul className="space-y-2">
                      {member.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <Check
                            className="text-green-500 flex-shrink-0 mt-0.5"
                            size={16}
                          />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Back Button --- */}
        <div className="mt-16">
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-50 transition"
            >
              ← Back
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}

export default AboutusPage;
