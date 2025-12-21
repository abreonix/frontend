"use client";

import Link from "next/link";
import { forwardRef } from "react";

const OnixAISection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="onix-section relative overflow-hidden bg-gray-950 text-white min-h-screen flex items-center"
    >
      {/* Ambient Glow */}

      <div className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* LEFT */}
          <div className="onix-left space-y-10">
            <h2 className="onix-title font-serif italic text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Meet <span className="text-blue-400">Onix</span> — <br />
              Your Personal AI Educator
            </h2>

            <p className="onix-text text-gray-300 text-lg max-w-xl">
              Onix explains concepts like a human, adapts to your pace,
              and helps you <em>think</em> — not memorize.
            </p>

            <ul className="onix-text space-y-4 text-gray-300 text-lg">
              <li>• 24×7 conversational doubt solving</li>
              <li>• Step-by-step explanations</li>
              <li>• Academic, tech & career guidance</li>
              <li>• Learns how <em>you</em> learn</li>
            </ul>

     
          </div>

          {/* RIGHT CHAT */}
          <div className="onix-chat relative">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm text-gray-400">Onix AI • Online</p>
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
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
                    } rounded-lg px-4 py-3 max-w-[85%]`}
                  >
                    {text}
                  </div>
                  
                ))}
                <Link href="/students/dashboard">
                       <button className="onix-cta inline-flex items-center gap-2 opacity-100 px-36 py-3 rounded-xl border border-blue-500/40 text-blue-400 font-semibold hover:bg-blue-500/10 transition">
              Start Chatting with Onix →
            </button>
                </Link>
              </div>
            </div>

            <div className="absolute -z-10 inset-0 blur-3xl bg-blue-500/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default OnixAISection;
