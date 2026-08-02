"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

import Navbar from "@/components/NavbarEdu";

const ProductsComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Official product Launch date - 14 September 2026
  useEffect(() => {
    const launchDate = new Date("2026-09-14T00:00:00");
    

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  
  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #210CAE 0%, #4DC9E6 25%, #210CAE 50%, #4DC9E6 75%, #210CAE 100%);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.2),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(77,201,230,0.15),transparent_50%)]"></div>
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-6">
                <Package size={16} />
                <span>Products & Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="shimmer-text">Coming Soon</span>
              </h1>
              
             <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
  Something powerful is taking shape at Abreonix. Our upcoming
  cybersecurity product is currently under development and will
  officially launch on{" "}
  <span className="font-semibold text-indigo-700">
    14 September 2026
  </span>.
</p>

<p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 mb-6">
  Time until launch
</p>

              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 mb-12">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex flex-col items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
                      <span className="text-xs uppercase opacity-90">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Launch Status */}
<div className="max-w-md mx-auto mb-12">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-medium">
    <LoaderCircle size={18} className="animate-spin" />
    Product Development in Progress
  </div>
</div>

            </div>
          </div>
        </div>
          {/* ================= PRODUCT LAUNCH TIMELINE ================= */}
<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div className="max-w-4xl mx-auto">

    <div className="text-center mb-14">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
        Road to Launch
      </span>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
        Building Something Powerful
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto">
        From concept to launch, our team is carefully building and
        preparing the next Abreonix product for its official release.
      </p>
    </div>

    <div className="relative">

      {/* Vertical timeline line */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-400 via-sky-400 to-indigo-500 md:-translate-x-1/2" />

      {/* STEP 1 */}
      <div className="relative flex md:justify-start mb-12">
        <div className="ml-14 md:ml-0 md:w-[46%] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="text-green-500" size={22} />
            <span className="text-sm font-semibold text-green-600">
              COMPLETED
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            Idea & Vision
          </h3>

          <p className="text-gray-600 mt-2">
            Product direction and the core vision were established.
          </p>
        </div>

        <div className="absolute left-5 md:left-1/2 top-6 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow md:-translate-x-1/2" />
      </div>

      {/* STEP 2 */}
      <div className="relative flex md:justify-end mb-12">
        <div className="ml-14 md:ml-0 md:w-[46%] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="text-green-500" size={22} />
            <span className="text-sm font-semibold text-green-600">
              COMPLETED
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            Research & Planning
          </h3>

          <p className="text-gray-600 mt-2">
            Technical planning and product research were completed.
          </p>
        </div>

        <div className="absolute left-5 md:left-1/2 top-6 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow md:-translate-x-1/2" />
      </div>

      {/* STEP 3 */}
      <div className="relative flex md:justify-start mb-12">
        <div className="ml-14 md:ml-0 md:w-[46%] bg-white border border-sky-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <LoaderCircle
              className="text-sky-500 animate-spin"
              size={22}
            />

            <span className="text-sm font-semibold text-sky-600">
              IN PROGRESS
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            Product Development
          </h3>

          <p className="text-gray-600 mt-2">
            Our team is actively building and refining the product.
          </p>
        </div>

        <div className="absolute left-5 md:left-1/2 top-6 w-4 h-4 rounded-full bg-sky-500 border-4 border-white shadow md:-translate-x-1/2" />
      </div>

      {/* STEP 4 */}
      <div className="relative flex md:justify-end mb-12">
        <div className="ml-14 md:ml-0 md:w-[46%] bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <span className="text-sm font-semibold text-gray-500">
            UPCOMING
          </span>

          <h3 className="text-xl font-bold text-gray-900 mt-2">
            Testing & Final Preparation
          </h3>

          <p className="text-gray-600 mt-2">
            Final validation and launch preparation before release.
          </p>
        </div>

        <div className="absolute left-5 md:left-1/2 top-6 w-4 h-4 rounded-full bg-gray-300 border-4 border-white shadow md:-translate-x-1/2" />
      </div>

      {/* LAUNCH */}
      <div className="relative flex justify-center">
        <div className="ml-14 md:ml-0 w-full md:w-[60%] bg-gradient-to-br from-sky-500 to-indigo-700 text-white rounded-2xl p-8 text-center shadow-xl">
          <Rocket size={34} className="mx-auto mb-4" />

          <span className="text-sm uppercase tracking-[0.2em] text-white/80">
            Official Launch
          </span>

          <h3 className="text-3xl font-bold mt-2">
            14 September 2026
          </h3>

          <p className="text-white/80 mt-3">
            The next chapter of Abreonix begins.
          </p>
        </div>

        <div className="absolute left-5 md:left-1/2 top-6 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white shadow md:-translate-x-1/2" />
      </div>

    </div>
  </div>
</section>

       

          

          {/* CTA Section */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 text-sm">Stay Updated</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Don't Miss the Launch
            </h3>
            <p className="text-gray-600 mb-8">
              Follow the Journey and get in touch with our team for updates about the upcoming Abreonix product.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <a
                href="mailto:info@abreonix.in?subject=Early Access to Abreonix Products"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Mail size={20} />
                Notify Me on Launch
              </a>
              <a
                href="https://wa.me/918690650532"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all duration-300"
              >
                <MessageCircle size={20} />
                Contact Our Team
              </a>
            </div>
          </div>
        

        {/* Bottom Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-900 rounded-sm blur-md opacity-40"></div>
                <div className="relative bg-white p-2 rounded-sm">
                  <Wrench className="text-sky-600" size={24} />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Under Development</h4>
                <p className="text-sm text-gray-600">Our products are being crafted with care</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
              >
                <ArrowRight className="rotate-180" size={16} />
                Back to Home
              </Link>
              <Link
                href="/education"
                className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg font-medium hover:bg-sky-200 transition-colors"
              >
                Explore Education
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductsComingSoon;