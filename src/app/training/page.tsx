export default function TrainingPage() {
  const programs = [
    "Ethical Hacking",
    "Penetration Testing",
    "Network Security",
    "Cloud Security",
    "SOC Operations",
    "Digital Forensics",
    "Threat Intelligence",
    "Incident Response",
    "Security Compliance",
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Training Programs
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn Cybersecurity From Industry Experts
          </h1>

          <p className="max-w-3xl mx-auto text-white/70 text-lg">
            Industry-focused cybersecurity training programs designed to
            develop practical skills, hands-on experience, and real-world
            expertise required by modern organizations.
          </p>
        </div>

        {/* Programs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-sky-500/40 transition-all"
            >
              <h3 className="text-xl font-semibold">{program}</h3>
            </div>
          ))}
        </div>

        {/* Internship Section */}
        <div className="mt-20 bg-white/5 border border-white/10 rounded-3xl p-10">
          <h2 className="text-3xl font-bold mb-6">
            Internship & Career Development
          </h2>

          <p className="text-white/70 leading-relaxed">
            Abreonix provides hands-on internships, practical projects,
            mentorship, and industry exposure to help students transition
            from learning cybersecurity concepts to applying them in
            real-world environments.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 transition font-semibold"
          >
            Enroll Now
          </a>
        </div>
      </section>
    </main>
  );
}