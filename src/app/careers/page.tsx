export default function CareersPage() {
  const opportunities = [
    "Cybersecurity Trainers",
    "Security Researchers",
    "Penetration Testers",
    "SOC Analysts",
    "Interns & Trainees",
    "Technology Enthusiasts",
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Careers
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Build The Future Of Cybersecurity
          </h1>

          <p className="max-w-3xl mx-auto text-white/70 text-lg">
            At Abreonix, we are always looking for passionate individuals who
            want to contribute to cybersecurity education, innovation, research,
            and digital security excellence.
          </p>
        </div>

        {/* Opportunities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {opportunities.map((item) => (
            <div
              key={item}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-sky-500/40 transition-all"
            >
              <h3 className="text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>

        {/* Join Us */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Interested In Joining Us?
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            If you're passionate about cybersecurity, training, research,
            technology, and innovation, we'd love to hear from you.
          </p>

          <a
            href="mailto:info@abreonix.in"
            className="inline-block px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 transition font-semibold"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </main>
  );
}