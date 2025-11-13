"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from 'react'
import Link from "next/link";
function AboutusPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-indigo-400 text-white flex flex-col items-center px-6 py-12">
      
      {/* --- Intro Section (Text Left, Image Right) --- */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mb-20"
      >
        {/* Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Empowering Digital Innovation
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            At <span className="font-semibold">Abreonix</span>, we believe in 
            transforming ideas into impactful digital experiences. Our mission 
            is to bridge creativity and technology, building tools that empower 
            users and businesses to thrive in the digital world.
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

      {/* --- Main About Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 drop-shadow-lg">
          About <span className="text-indigo-200">Abreonix</span>
        </h1>

        <p className="text-base sm:text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Abreonix</span> — where
          innovation meets technology. We are passionate creators focused on
          delivering seamless digital solutions that empower individuals and
          businesses to reach new heights.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-6">
          Our team is dedicated to designing experiences that combine creativity,
          usability, and performance. At Abreonix, we believe that every line of
          code, every design element, and every decision contributes to a larger
          mission — building a smarter, more connected world.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-10">
          From web applications to cutting-edge software, our goal is to push
          boundaries, embrace challenges, and craft solutions that inspire
          growth and trust. Together, we're shaping the future of technology —
          one idea at a time.
        </p>

         <Link href="/abreonix">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-50 transition"
          >
            ← Back to About Us
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default AboutusPage
