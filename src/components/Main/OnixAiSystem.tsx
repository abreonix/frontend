"use client";

import Link from "next/link";
import { forwardRef } from "react";

const OnixAISection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="onix-section relative overflow-hidden bg-gray-950 text-white py-24 lg:min-h-screen flex items-center"
    >
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <div className="onix-left space-y-8 text-center lg:text-left">
            <h2 className="onix-title font-serif italic text-3xl sm:text-4xl lg:text-6xl leading-tight">
              Meet <span className="text-blue-400">Onix</span> — <br className="hidden sm:block" />
              Your Personal AI Educator
            </h2>

            <p className="onix-text text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Onix explains concepts like a human, adapts to your pace,
              and helps you <em>think</em> — not memorize.
            </p>

            <ul className="onix-text space-y-3 text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              <li>• 24×7 conversational doubt solving</li>
              <li>• Step-by-step explanations</li>
              <li>• Academic, tech & career guidance</li>
              <li>• Learns how <em>you</em> learn</li>
            </ul>
          </div>

          {/* ================= RIGHT CHAT ================= */}
          <div className="onix-chat relative">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-2xl w-full max-w-md sm:max-w-lg mx-auto">

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs sm:text-sm text-gray-400">
                  Onix AI • Online
                </p>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm leading-relaxed">
                {[
                  "Explain supervised vs unsupervised learning.",
                  "Supervised uses labeled data, unsupervised finds hidden patterns.",
                  "Can you give a real-world example?",
                  "Spam detection is supervised, customer segmentation is unsupervised.",
                  "Which one should I learn first?",
                  "Start with supervised learning for strong ML fundamentals.",
                ].map((text, i) => (
                  <div
                    key={i}
                    className={`chat-line ${
                      i % 2 === 0
                        ? "bg-gray-800 text-gray-300"
                        : "ml-auto bg-blue-600/20 border border-blue-500/30 text-blue-200"
                    } rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 max-w-[90%]`}
                  >
                    {text}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/students/dashboard" className="block mt-6">
                <button className="onix-cta w-full px-6 py-3 rounded-xl border border-blue-500/40 text-blue-400 font-semibold hover:bg-blue-500/10 transition">
                  Start Chatting with Onix →
                </button>
              </Link>
            </div>

            {/* Glow */}
            <div className="absolute -z-10 inset-0 blur-3xl bg-blue-500/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
});

OnixAISection.displayName = "OnixAISection";
export default OnixAISection;
