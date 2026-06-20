"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-gray-950 py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Contact Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Let's Build Something Secure Together
          </h2>

          <p className="mt-6 text-white/60 max-w-3xl mx-auto">
            Whether you're looking for cybersecurity training, consulting,
            internships, or technology solutions, our team is ready to help.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Phone */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <Phone className="text-sky-400 mb-4" size={32} />
            <h3 className="text-white text-xl font-semibold mb-2">
              Phone
            </h3>
            <a
              href="tel:7982114429"
              className="text-white/70 hover:text-sky-400"
            >
              +91 7982114429
            </a>
          </div>

          {/* Email */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <Mail className="text-sky-400 mb-4" size={32} />
            <h3 className="text-white text-xl font-semibold mb-2">
              Email
            </h3>
            <a
              href="mailto:info@abreonix.in"
              className="text-white/70 hover:text-sky-400"
            >
              info@abreonix.in
            </a>
          </div>

          {/* WhatsApp */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <MessageCircle className="text-sky-400 mb-4" size={32} />
            <h3 className="text-white text-xl font-semibold mb-2">
              WhatsApp
            </h3>
            <a
              href="https://wa.me/917982114429"
              target="_blank"
              className="text-white/70 hover:text-sky-400"
            >
              Chat with us
            </a>
          </div>

          {/* Address */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <MapPin className="text-sky-400 mb-4" size={32} />
            <h3 className="text-white text-xl font-semibold mb-2">
              Location
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              288/16/84, New Basti,
              <br />
              Block-C, Sohbatia Bagh,
              <br />
              Allahpur, Prayagraj,
              <br />
              Uttar Pradesh - 211006
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="mailto:info@abreonix.in"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all"
          >
            Contact Abreonix
          </a>
        </div>

      </div>
    </section>
  );
}