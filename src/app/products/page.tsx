"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  ArrowRight,
  Wrench,
  Package,
  CheckCircle2,
  LoaderCircle,
  Rocket,
  ShieldCheck,
  Link2,
  Smartphone,
  BrainCircuit,
  Bot,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/NavbarEdu";

const ProductsComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Official Setu V Launch Date - 14 September 2026
  useEffect(() => {
    const launchDate = new Date("2026-09-14T00:00:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Link2,
      emoji: "🔗",
      title: "URL Scanning",
      description:
        "Every link is checked against VirusTotal and Google Safe Browsing before a user taps it, with verdicts shown as Safe, Suspicious, or Dangerous.",
    },
    {
      icon: Smartphone,
      emoji: "📱",
      title: "APK Detection",
      description:
        "APK files can be checked using SHA-256 hashing to help flag potentially fake banking, loan, and other malicious applications before installation.",
    },
    {
      icon: BrainCircuit,
      emoji: "🧠",
      title: "Phishing AI",
      description:
        "A two-stage approach uses on-device heuristics for obvious patterns and AI analysis for suspicious content, sending only the suspicious text instead of full context.",
    },
    {
      icon: Bot,
      emoji: "🤖",
      title: "@SetuAI Assistant",
      description:
        "Forward suspicious messages to @SetuAI for a security verdict, confidence score, and recommended action in seconds.",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.65;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #210cae 0%,
            #4dc9e6 25%,
            #210cae 50%,
            #4dc9e6 75%,
            #210cae 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow:
            0 20px 60px rgba(30, 64, 175, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
      `}</style>

      <Navbar />

      <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(33,12,174,0.14),transparent_35%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(77,201,230,0.18),transparent_35%)]" />

          <div className="absolute left-10 top-20 h-40 w-40 rounded-full bg-indigo-300/20 blur-3xl animate-glow" />
          <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-sky-300/20 blur-3xl animate-glow" />

          <div className="container relative mx-auto px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-5xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
                <Package size={16} />
                <span>Abreonix Products & Solutions</span>
              </div>

              {/* Setu V Logo */}
              <div className="relative mb-10 flex justify-center">
  {/* Soft glow */}
  <div className="absolute h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

  {/* Logo */}
  <img
    src="/setuv-logo.png.png"
    alt="Setu V"
    className="relative h-32 w-auto object-contain drop-shadow-[0_10px_25px_rgba(59,130,246,0.18)]"
  />
</div>

              <h1 className="mb-4 text-5xl font-black tracking-tight text-slate-950 sm:text-6xl md:text-7xl">
                Setu <span className="shimmer-text">V</span>
              </h1>

              <h2 className="mb-6 text-2xl font-bold text-slate-700 sm:text-3xl">
                Your Intelligent Digital Safety Layer
              </h2>

              <p className="mx-auto mb-5 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Setu V is an AI-powered security platform designed to help
                protect users from phishing messages, malicious links,
                fraudulent APKs, and suspicious digital threats before they
                cause harm.
              </p>

              <div className="mb-10 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
                  <Rocket size={17} />
                  Coming Soon — 14 September 2026
                </div>
              </div>

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                Time Until Launch
              </p>

              {/* Countdown */}
              <div className="mb-10 flex flex-wrap justify-center gap-3 sm:gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    className="glass-card min-w-[76px] rounded-2xl px-3 py-4 text-center sm:min-w-[90px]"
                  >
                    <div className="text-2xl font-black text-indigo-700 sm:text-3xl">
                      {value.toString().padStart(2, "0")}
                    </div>

                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2.5 font-medium text-amber-700">
                <LoaderCircle size={18} className="animate-spin" />
                Setu V is currently under development
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHAT IS SETU V ================= */}
        <section className="container mx-auto px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-sky-600">
                <Sparkles size={17} />
                The Product
              </div>

              <h2 className="mb-5 text-3xl font-black text-slate-900 md:text-5xl">
                What is Setu V?
              </h2>

              <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
                Setu V is a privacy-focused digital safety platform that
                combines real-time threat intelligence and AI to help users
                identify suspicious links, phishing attempts, potentially
                malicious applications, and fraudulent messages.
              </p>
            </div>

            {/* Glass Product Card */}
            <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-10">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

              <div className="relative grid gap-6 md:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-white/80 bg-white/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg">
                          <Icon size={22} />
                        </div>

                        <div>
                          <div className="text-xl">{feature.emoji}</div>
                        </div>
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-slate-900">
                        {feature.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRIVACY ================= */}
        <section className="container mx-auto px-4 py-6 sm:px-6 md:py-12 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-8 text-white shadow-2xl md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                <LockKeyhole size={36} className="text-sky-300" />
              </div>

              <div>
                <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
                  Privacy First
                </div>

                <h2 className="mb-3 text-3xl font-black">
                  Security Without Unnecessary Exposure
                </h2>

                <p className="max-w-3xl leading-relaxed text-slate-300">
                  Setu V is designed around a privacy-first approach. Its
                  phishing analysis focuses on suspicious text rather than
                  sending unnecessary full conversation context for analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ROAD TO LAUNCH ================= */}
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                Road to Launch
              </span>

              <h2 className="mt-3 mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Building Setu V
              </h2>

              <p className="mx-auto max-w-2xl text-gray-600">
                From research and security architecture to AI-powered threat
                detection, we are preparing Setu V for its official launch.
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-green-400 via-sky-400 to-indigo-500 md:left-1/2 md:-translate-x-1/2" />

              {/* Step 1 */}
              <div className="relative mb-12 flex md:justify-start">
                <div className="ml-14 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:ml-0 md:w-[46%]">
                  <div className="mb-2 flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={22} />
                    <span className="text-sm font-semibold text-green-600">
                      COMPLETED
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Idea & Vision
                  </h3>

                  <p className="mt-2 text-gray-600">
                    The product direction and core digital safety vision were
                    established.
                  </p>
                </div>

                <div className="absolute left-5 top-6 h-4 w-4 rounded-full border-4 border-white bg-green-500 shadow md:left-1/2 md:-translate-x-1/2" />
              </div>

              {/* Step 2 */}
              <div className="relative mb-12 flex md:justify-end">
                <div className="ml-14 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:ml-0 md:w-[46%]">
                  <div className="mb-2 flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={22} />
                    <span className="text-sm font-semibold text-green-600">
                      COMPLETED
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Research & Planning
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Product research, security architecture, and technical
                    planning were completed.
                  </p>
                </div>

                <div className="absolute left-5 top-6 h-4 w-4 rounded-full border-4 border-white bg-green-500 shadow md:left-1/2 md:-translate-x-1/2" />
              </div>

              {/* Step 3 */}
              <div className="relative mb-12 flex md:justify-start">
                <div className="ml-14 rounded-2xl border border-sky-200 bg-white p-6 shadow-sm md:ml-0 md:w-[46%]">
                  <div className="mb-2 flex items-center gap-3">
                    <LoaderCircle
                      className="animate-spin text-sky-500"
                      size={22}
                    />

                    <span className="text-sm font-semibold text-sky-600">
                      IN PROGRESS
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    Product Development
                  </h3>

                  <p className="mt-2 text-gray-600">
                    The Setu V platform and its security capabilities are
                    actively being built and refined.
                  </p>
                </div>

                <div className="absolute left-5 top-6 h-4 w-4 rounded-full border-4 border-white bg-sky-500 shadow md:left-1/2 md:-translate-x-1/2" />
              </div>

              {/* Step 4 */}
              <div className="relative mb-12 flex md:justify-end">
                <div className="ml-14 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:ml-0 md:w-[46%]">
                  <span className="text-sm font-semibold text-gray-500">
                    UPCOMING
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    Testing & Final Preparation
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Final validation, testing, and launch preparation before
                    the official release.
                  </p>
                </div>

                <div className="absolute left-5 top-6 h-4 w-4 rounded-full border-4 border-white bg-gray-300 shadow md:left-1/2 md:-translate-x-1/2" />
              </div>

              {/* Launch */}
              <div className="relative flex justify-center">
                <div className="ml-14 w-full rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-700 p-8 text-center text-white shadow-xl md:ml-0 md:w-[60%]">
                  <Rocket size={34} className="mx-auto mb-4" />

                  <span className="text-sm uppercase tracking-[0.2em] text-white/80">
                    Official Launch
                  </span>

                  <h3 className="mt-2 text-3xl font-bold">
                    14 September 2026
                  </h3>

                  <p className="mt-3 text-white/80">
                    Setu V begins its next chapter.
                  </p>
                </div>

                <div className="absolute left-5 top-6 h-5 w-5 rounded-full border-4 border-white bg-indigo-600 shadow md:left-1/2 md:-translate-x-1/2" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">
                  Stay Updated
                </span>
              </div>
            </div>

            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Don&apos;t Miss the Launch
            </h3>

            <p className="mb-8 text-gray-600">
              Follow the Setu V journey and get in touch with the Abreonix team
              for updates ahead of the official launch.
            </p>

            <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <a
                href="mailto:info@abreonix.in?subject=Early Access to Setu V"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Mail size={20} />
                Notify Me
              </a>

              <a
                href="https://wa.me/918690650532"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-sky-600 px-6 py-3 font-semibold text-sky-600 transition-all duration-300 hover:bg-sky-50"
              >
                <MessageCircle size={20} />
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM NAVIGATION ================= */}
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-sky-400 to-indigo-900 opacity-40 blur-md" />

                <div className="relative rounded-sm bg-white p-2">
                  <Wrench className="text-sky-600" size={24} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  Under Development
                </h4>

                <p className="text-sm text-gray-600">
                  Setu V is being crafted with security and privacy in mind
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-medium text-sky-600 hover:text-sky-700"
              >
                <ArrowRight className="rotate-180" size={16} />
                Back to Home
              </Link>

              <Link
                href="/education"
                className="rounded-lg bg-sky-100 px-4 py-2 font-medium text-sky-700 transition-colors hover:bg-sky-200"
              >
                Explore Education
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsComingSoon;