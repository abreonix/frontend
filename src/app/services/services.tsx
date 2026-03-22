"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';

// --- Types & Interfaces ---

type ThemeColor = 'blue' | 'green' | 'gray' | 'indigo' | 'red';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  btnText: string;
  theme: ThemeColor;
  isReversed: boolean; // true = text left, image right
  overlay?: React.ReactNode; // Optional custom overlay for the image
}

// --- Data Configuration ---

const servicesData: ServiceData[] = [
  {
    id: 'web-mobile',
    title: 'Web & Mobile Application Security Testing',
    description: 'We conduct comprehensive security assessments on web and mobile applications to identify vulnerabilities such as data exposure, broken authentication, insecure APIs, weak encryption, and logical flaws. Using industry standards like OWASP Top 10, SANS 25, and PTES methodology, we ensure the application is safe against real-world cyber-attacks and delivers a secure user experience.',
    imageSrc: '/Services/img1.jpg',
    imageAlt: 'Mobile Security Audit',
    btnText: "Schedule an Audit",
    theme: 'blue',
    isReversed: true,
    overlay: (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-blue-500/20 backdrop-blur-sm p-4 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'phishing',
    title: 'Phishing Simulation & Social Engineering',
    description: 'We run realistic phishing attack simulations and social engineering campaigns to evaluate employee awareness and organizational response capability. This helps identify internal security gaps and strengthens cyber-resilience through targeted training, analytics reports, and continuous improvement plans.',
    imageSrc: '/Services/img2.jpg',
    imageAlt: 'Phishing Simulation Code',
    btnText: "Simulate an Attack",
    theme: 'green',
    isReversed: false,
    overlay: (
      <div className="absolute bottom-4 right-4 flex gap-2">
        <div className="p-2 bg-red-500/20 backdrop-blur rounded-lg border border-red-500/50">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'website-security',
    title: 'Website Security & Real-Time Monitoring',
    description: 'We protect websites and online platforms from threats like hacking attempts, malware injections, DDoS attacks, fake traffic, data tampering, and website defacement. Our service includes 24/7 advanced threat monitoring, automated alerts, incident response, backup protection, and security hardening to ensure uninterrupted and secure website operation.',
    imageSrc: '/Services/img3.jpg',
    imageAlt: 'Website Security Monitoring',
    btnText: "Get Real-Time Protection",
    theme: 'gray',
    isReversed: true,
    overlay: (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="h-2 w-3/4 bg-white/20 rounded mb-2"></div>
          <div className="h-2 w-1/2 bg-white/20 rounded"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'endpoint',
    title: 'Endpoint & Device Security',
    description: 'We secure laptops, desktops, servers, and mobile devices using next-generation EDR/XDR solutions that provide real-time threat detection, ransomware protection, behavioral monitoring, and automatic threat isolation. This prevents unauthorized access, data breaches, and device-level cyber attacks to safeguard business continuity.',
    imageSrc: '/Services/img4.jpg',
    imageAlt: 'Endpoint Security',
    btnText: "Protect Endpoints",
    theme: 'indigo',
    isReversed: false,
    overlay: <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>,
  },
  {
    id: 'training',
    title: 'Cyber Awareness & Employee Security Training',
    description: 'We deliver expert-led training programs that educate employees on identifying phishing attempts, online frauds, internal threats, password hygiene, safe internet usage, and secure handling of sensitive data. Our training reduces human errors—responsible for more than 80% of cyber breaches—and builds a security-first culture within the organization.',
    imageSrc: '/Services/img5.jpg',
    imageAlt: 'Employee Training',
    btnText: "Book a Workshop",
    theme: 'red',
    isReversed: true,
  },
];

// --- Reusable Sub-Components ---

const ServiceSection = ({ data }: { data: ServiceData }) => {
  // Theme configuration for dynamic styling
  const themeStyles: Record<ThemeColor, { primary: string; secondary: string; shadow: string }> = {
    blue: {
      primary: 'bg-blue-500 hover:bg-blue-600',
      secondary: 'text-blue-500 border-blue-500 hover:bg-blue-50',
      shadow: 'shadow-blue-500/30',
    },
    green: {
      primary: 'bg-green-600 hover:bg-green-700',
      secondary: 'text-green-600 border-green-600 hover:bg-green-50',
      shadow: 'shadow-green-500/30',
    },
    gray: {
      primary: 'bg-gray-900 hover:bg-black',
      secondary: 'text-gray-900 border-gray-900 hover:bg-gray-100',
      shadow: 'shadow-gray-500/30',
    },
    indigo: {
      primary: 'bg-indigo-600 hover:bg-indigo-700',
      secondary: 'text-indigo-600 border-indigo-600 hover:bg-indigo-50',
      shadow: 'shadow-indigo-500/30',
    },
    red: {
      primary: 'bg-red-500 hover:bg-red-600',
      secondary: 'text-red-500 border-red-500 hover:bg-red-50',
      shadow: 'shadow-red-500/30',
    },
  };

  const styles = themeStyles[data.theme];

  return (
    <div className={`flex flex-col ${data.isReversed ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:gap-20 gap-6`}>
      
      {/* MOBILE LAYOUT:
         1. Title (Centered)
         2. Row [Image (Left) | Text (Right)]
         3. Button (Centered/Full)
      */}

      {/* MOBILE TITLE: Visible only on mobile */}
      <h2 className="lg:hidden text-xl md:text-2xl font-bold text-slate-800 text-center w-full leading-tight px-2">
        {data.title}
      </h2>

      {/* MOBILE CONTENT CONTAINER: Row with Image + Text */}
      <div className="lg:hidden flex flex-row items-start gap-4 w-full px-2">
         {/* Small Image on Left */}
         <div className={`w-1/3 shrink-0 relative rounded-lg overflow-hidden shadow-md aspect-square ${data.theme === 'gray' || data.theme === 'red' ? 'bg-white' : 'bg-black'}`}>
            <img 
              src={data.imageSrc} 
              alt={data.imageAlt} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const fallbacks: Record<string, string> = {
                 'web-mobile': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
                 'phishing': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
                 'website-security': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
                 'endpoint': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
                 'training': 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
                };
                e.currentTarget.src = fallbacks[data.id] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
              }}
            />
         </div>
         {/* Text on Right */}
         <p className="text-xs md:text-sm text-slate-600 leading-snug w-2/3">
           {data.description}
         </p>
      </div>

      {/* DESKTOP IMAGE SIDE: Hidden on mobile */}
      <div className="hidden lg:block lg:w-1/2 w-full">
        <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${data.theme === 'gray' || data.theme === 'red' ? 'bg-white' : 'bg-black'} aspect-[4/3] group`}>
          <img 
            src={data.imageSrc} 
            alt={data.imageAlt} 
            className="w-full h-full object-cover transition-opacity duration-500"
            onError={(e) => {
               const fallbacks: Record<string, string> = {
                 'web-mobile': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
                 'phishing': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop',
                 'website-security': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
                 'endpoint': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
                 'training': 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop'
               };
               e.currentTarget.src = fallbacks[data.id] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b";
            }}
          />
          {data.overlay}
        </div>
      </div>

      {/* CONTENT SIDE: Mixed visibility */}
      <div className={`lg:w-1/2 flex flex-col items-center`}>
        {/* Desktop Title & Desc: Hidden on mobile */}
        <h2 className="hidden lg:block text-3xl lg:text-4xl font-semibold text-slate-800 mb-6 w-full text-center">
          {data.title}
        </h2>
        
        <p className={`hidden lg:block text-slate-600 leading-relaxed mb-8 max-w-xl text-center`}>
          {data.description}
        </p>

        {/* Action Buttons: Visible on both, styling tweaked for mobile */}
        <div className={`flex flex-col gap-4 w-full items-center`}>
          <a 
            href="https://wa.me/918690650532"
            target="_blank"
            className={`bg-transparent border ${styles.secondary} font-medium py-3 px-8 rounded-full transition-all duration-500 flex items-center justify-center gap-2 hover:${styles.primary} hover:text-white hover:-translate-y-1 w-full sm:w-auto text-sm lg:text-base cursor-pointer`}
          >
            {data.btnText} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

const ServicesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden font-sans text-slate-800">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-24 space-y-20 lg:space-y-32">

        {/* 1. HERO SECTION */}
        {/* MOBILE LAYOUT: Card style with background image (Matches uploaded screenshot)
           DESKTOP LAYOUT: Side-by-side (Matches original design)
        */}
        <div className="relative">
            {/* Desktop View */}
            <div className="hidden lg:flex flex-row items-center gap-20">
                <div className="w-1/2 relative z-10">
                    <svg className='absolute top-0 opacity-10 -z-10' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path className='absolute top-0' fill="#0F62FE" d="M31.3,-37.3C43.2,-34.5,57,-28.8,62.7,-18.6C68.4,-8.5,65.9,6,62.7,21.8C59.5,37.5,55.7,54.5,45.2,56C34.6,57.6,17.3,43.7,0,43.8C-17.4,43.8,-34.8,57.8,-40.4,54.7C-46,51.5,-39.7,31.2,-36,17.6C-32.3,4,-31.1,-2.8,-32.8,-14.7C-34.5,-26.5,-39,-43.2,-34,-48.2C-29.1,-53.2,-14.5,-46.4,-2.4,-43.1C9.8,-39.8,19.5,-40.1,31.3,-37.3Z" transform="translate(80 50)" />
                    </svg>

                    <h1 className="text-6xl font-bold leading-tight">
                    <span className="text-slate-700">Services Provided</span> <br />
                    <span className="text-slate-700">by </span>
                    <span className="text-blue-600">Abreonix</span>
                    </h1>
                    
                    <p className="mt-6 text-lg text-slate-600 max-w-lg">
                    "Empowering the next generation of digital defenders with industry-leading expertise. 🔐"
                    </p>
                </div>
                <div className="w-1/2">
                    <div className="relative rounded-lg overflow-hidden shadow-xl aspect-video">
                        <img 
                            src="/Services/web-top.png" 
                            alt="Cybersecurity Digital Interface" 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"; }}
                        />
                        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                    </div>
                </div>
            </div>

            {/* Mobile View: Card Style (Based on your screenshot) */}
            <div className="lg:hidden w-full relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-square flex flex-col items-center justify-center text-center p-6">
                {/* Background Image */}
                <img 
                    src="/Services/web-top.png" 
                    alt="Cybersecurity Digital Interface" 
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"; }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
                
                {/* Content */}
                <div className="relative z-20 text-white space-y-4">
                     <h1 className="text-4xl font-bold leading-tight">
                        Services Provided <br/> by <span className="text-blue-400">Abreonix</span>
                     </h1>
                     <p className="text-sm text-slate-200 font-medium max-w-xs mx-auto">
                        "Empowering the next generation of digital defenders with industry-leading expertise. 🔐"
                     </p>
                </div>
            </div>
        </div>

        {/* 2. DYNAMIC SERVICE SECTIONS */}
        <div className="space-y-12 lg:space-y-32">
            {servicesData.map((service) => (
            <ServiceSection key={service.id} data={service} />
            ))}
        </div>

      </div>

      {/* 3. FOOTER CTA */}
      <div className="bg-blue-700 w-full py-20 mt-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl text-blue-100 font-medium mb-4">
          Ready to Fortify Your Defenses?
        </h2>
        <h2 className="text-4xl md:text-5xl text-white font-bold mb-10">
          Learn CyberSecurity Today...!
        </h2>
        <button className="bg-white text-slate-900 hover:bg-blue-50 font-bold py-4 px-12 rounded-full shadow-xl transition-all transform hover:-translate-y-1 text-lg">
          Contact US
        </button>
      </div>

    </div>
  );
};

export default ServicesPage;