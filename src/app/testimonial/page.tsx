export default function BlogPage() {
  const upcomingTopics = [
    "Cybersecurity News & Updates",
    "Threat Intelligence Analysis",
    "Ethical Hacking Insights",
    "Digital Forensics",
    "Cloud Security",
    "Security Awareness & Best Practices",
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Blog & Insights
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Cybersecurity Knowledge Hub
          </h1>

          <p className="max-w-3xl mx-auto text-white/70 text-lg">
            Stay updated with cybersecurity trends, threat intelligence,
            industry developments, research insights, and practical security
            knowledge from the Abreonix team.
          </p>
        </div>

        {/* Topics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {upcomingTopics.map((topic) => (
            <div
              key={topic}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-sky-500/40 transition-all"
            >
              <h3 className="text-xl font-semibold">{topic}</h3>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Articles Coming Soon
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto">
            We are preparing detailed articles, cybersecurity research,
            industry insights, and educational resources that will be published
            here soon.
          </p>
        </div>
      </section>
    </main>
  );
}