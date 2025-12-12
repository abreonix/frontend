"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Shield, 
  Lock, 
  Zap, 
  Cpu, 
  Network, 
  Eye, 
  Code, 
  Key,
  Clock,
  Mail,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Rocket,
  Wrench,
  Package
} from "lucide-react";

const ProductsComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Launch date - 30 days from now
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

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

  const products = [
    {
      icon: Shield,
      title: "Threat Intelligence Platform",
      description: "Real-time threat detection and response system",
      status: "In Development",
      color: "sky"
    },
    {
      icon: Lock,
      title: "Enterprise Encryption Suite",
      description: "End-to-end encryption for business communications",
      status: "Beta Testing",
      color: "indigo"
    },
    {
      icon: Cpu,
      title: "AI Security Analyzer",
      description: "Artificial intelligence powered vulnerability scanner",
      status: "In Development",
      color: "orange"
    },
    {
      icon: Network,
      title: "Network Security Monitor",
      description: "24/7 network traffic analysis and threat detection",
      status: "Alpha Stage",
      color: "green"
    },
    {
      icon: Eye,
      title: "Dark Web Scanner",
      description: "Monitor dark web for leaked credentials and data",
      status: "Planning",
      color: "purple"
    },
    {
      icon: Code,
      title: "Secure Code Auditor",
      description: "Automated code vulnerability detection tool",
      status: "In Development",
      color: "red"
    }
  ];

  const features = [
    "Enterprise-grade security solutions",
    "Built by cybersecurity experts",
    "Real-time threat intelligence",
    "Easy integration with existing systems",
    "24/7 monitoring support",
    "Compliance-ready (GDPR, HIPAA, PCI DSS)"
  ];

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
                We're building the next generation of cybersecurity products to protect your digital assets.
                Launching in:
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

              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-12">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Development Progress</span>
                  <span>75%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Preview */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Upcoming <span className="text-sky-600">Security Products</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're developing comprehensive security solutions for enterprises and individuals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {products.map((product, index) => {
              const Icon = product.icon;
              const colorClasses = {
                sky: 'bg-sky-100 text-sky-600 border-sky-200',
                indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
                orange: 'bg-orange-100 text-orange-600 border-orange-200',
                green: 'bg-green-100 text-green-600 border-green-200',
                purple: 'bg-purple-100 text-purple-600 border-purple-200',
                red: 'bg-red-100 text-red-600 border-red-200'
              }[product.color];

              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses} border`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      product.status === 'In Development' ? 'bg-yellow-100 text-yellow-700' :
                      product.status === 'Beta Testing' ? 'bg-blue-100 text-blue-700' :
                      product.status === 'Alpha Stage' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="h-1 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full opacity-50"></div>
                </div>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl p-8 mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-sky-100 rounded-lg">
                <Sparkles className="text-sky-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center max-w-2xl mx-auto">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 text-sm">Get Early Access</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Be the First to Know
            </h3>
            <p className="text-gray-600 mb-8">
              Join our waiting list and get exclusive early access, special pricing, and product updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <a
                href="mailto:info@abreonix.in?subject=Early Access to Abreonix Products"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Mail size={20} />
                Request Early Access
              </a>
              <a
                href="https://wa.me/918690650532"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all duration-300"
              >
                <MessageCircle size={20} />
                Contact Sales
              </a>
            </div>
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

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Abreonix Cyber Security. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Building the future of cybersecurity, one product at a time.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-20 left-10 w-4 h-4 bg-sky-400 rounded-full animate-pulse-glow opacity-30"></div>
        <div className="fixed top-1/2 right-10 w-6 h-6 bg-indigo-400 rounded-full animate-float opacity-20"></div>
        <div className="fixed bottom-32 left-1/4 w-3 h-3 bg-sky-300 rounded-full animate-pulse-glow opacity-40"></div>
        <div className="fixed top-1/3 left-1/3 w-2 h-2 bg-indigo-300 rounded-full animate-pulse-glow opacity-30"></div>
      </div>
    </>
  );
};

export default ProductsComingSoon;