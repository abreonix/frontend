"use client";

import { ShieldCheck, Clock, Award, Users, BookOpen, Target } from "lucide-react";

// ───────────────────────────────
// 🔽 Feature Card Component (Fixed icon hover)
// ───────────────────────────────
const FeatureCard = ({ icon: Icon, title, description, color }: any) => {
  // Tailwind-compatible class mapping (use explicit classes so Tailwind sees them)
  const colorMap: Record<string, any> = {
    blue: {
      cardHover: "hover:bg-blue-500",
      iconBg: "bg-blue-500",
      iconHover: "group-hover:text-blue-500",
      textHover: "group-hover:text-white",
    },
    green: {
      cardHover: "hover:bg-green-500",
      iconBg: "bg-green-500",
      iconHover: "group-hover:text-green-500",
      textHover: "group-hover:text-white",
    },
    purple: {
      cardHover: "hover:bg-purple-500",
      iconBg: "bg-purple-500",
      iconHover: "group-hover:text-purple-500",
      textHover: "group-hover:text-white",
    },
    orange: {
      cardHover: "hover:bg-orange-500",
      iconBg: "bg-orange-500",
      iconHover: "group-hover:text-orange-500",
      textHover: "group-hover:text-white",
    },
  };

  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div
      className={`
        group p-6 bg-white rounded-2xl border border-gray-200
        shadow-sm transition-all duration-300 
        hover:-translate-y-1 hover:shadow-lg
        ${c.cardHover}
      `}
    >
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-4
          text-white transition-colors duration-300
          ${c.iconBg}
          group-hover:bg-white
        `}
      >
        {/* 
          - initial icon color: text-white (so it shows on colored bg)
          - on parent hover: use group-hover:text-<color>-500 so icon becomes colored on white bg
        */}
        <Icon
          className={`text-white transition-colors duration-300 ${c.iconHover}`}
          size={24}
        />
      </div>

      <h3
        className={`
          text-xl font-semibold text-gray-900 mb-2
          transition-colors duration-300 ${c.textHover}
        `}
      >
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-white/90">
        {description}
      </p>
    </div>
  );
};



// ───────────────────────────────
// 🔽 Main Page
// ───────────────────────────────
export default function CoursePage() {

  const features = [
    {
      icon: ShieldCheck,
      title: "Industry Certified",
      description: "NIELIT certified program with government recognition and industry acceptance.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from cybersecurity professionals with real-world experience and teaching expertise.",
      color: "green"
    },
    {
      icon: BookOpen,
      title: "Hands-on Labs",
      description: "Access to virtual labs with real-world scenarios and attack simulations.",
      color: "purple"
    },
    {
      icon: Target,
      title: "Career Focused",
      description: "Curriculum designed to prepare you for high-demand cybersecurity roles.",
      color: "orange"
    }
  ];

  const curriculum = [
    { module: "1", title: "Cybersecurity Fundamentals", topics: "Basics, Threats, Vulnerabilities" },
    { module: "2", title: "Network Security", topics: "Firewalls, VPNs, Intrusion Detection" },
    { module: "3", title: "Web Application Security", topics: "OWASP, Penetration Testing" },
    { module: "4", title: "Digital Forensics", topics: "Incident Response, Evidence Collection" },
    { module: "5", title: "Malware Analysis", topics: "Reverse Engineering, Threat Analysis" },
    { module: "6", title: "Cyber Laws & Ethics", topics: "Legal Framework, Compliance" }
  ];

  return (
    <>
    <style jsx global>{`
      .gradient-text {
    background: linear-gradient(135deg, #5743de 0%, #0b88a7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
    `}</style>
    <main className="font-sans bg-white">
      {/* HERO SECTION */}
      <div 
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{ backgroundImage: "url('/images/one.jpg')" }}
      >
        <div className="relative z-10 text-center text-white max-w-4xl">
    

        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="gradient-text">Cyber Security</span> Program?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive training designed to make you job-ready in the rapidly growing cybersecurity field
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
              Comprehensive <span className="gradient-text">Curriculum</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Structured learning path covering all essential cybersecurity domains
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
            Ready to Start Your Cybersecurity Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their careers with our comprehensive cybersecurity program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Brochure/1year.pdf"
              target="_main"
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
    </>
  );
}
