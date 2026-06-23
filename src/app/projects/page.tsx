import Image from "next/image";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Featured Project
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ThreatLens
          </h1>

          <p className="max-w-3xl mx-auto text-white/70 text-lg">
            A cybersecurity intelligence platform built to simplify threat
            investigation, URL analysis, and security decision-making through
            modern threat intelligence and AI-assisted insights.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 mb-16">
          <Image
            src="/projects/threatlens.png"
            alt="ThreatLens"
            width={1400}
            height={800}
            className="w-full h-auto"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              About ThreatLens
            </h2>

            <p className="text-white/70 leading-relaxed">
              ThreatLens is a cybersecurity intelligence platform developed by
              Abreonix students to simplify threat investigation and security
              analysis. The platform enables users to analyze URLs and threat
              indicators while providing actionable intelligence insights.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Key Features
            </h2>

            <ul className="space-y-4 text-white/70">
              <li>✓ URL Threat Analysis</li>
              <li>✓ Threat Intelligence Lookup</li>
              <li>✓ AI-Assisted Security Insights</li>
              <li>✓ Security Investigation Support</li>
              <li>✓ Real-Time Analysis Workflow</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="https://threatlens-i74k.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 transition font-semibold"
          >
            Visit Platform
          </a>
        </div>
      </section>
    </main>
  );
}