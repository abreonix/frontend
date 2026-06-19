"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const achievements = [
  {
    value: 5000,
    suffix: "+",
    title: "Students Trained",
    description:
      "Empowering future cybersecurity professionals through industry-aligned training, internships, and expert mentorship.",
  },
  {
    value: 150,
    suffix: "+",
    title: "Workshops & Expert Sessions",
    description:
      "Successfully delivering cybersecurity workshops, bootcamps, FDPs, and awareness programs.",
  },
  {
    value: 300,
    suffix: "+",
    title: "Projects Delivered",
    description:
      "Driving innovation through cybersecurity, AI, research, and technology-based project development.",
  },
  {
    value: 50,
    suffix: "+",
    title: "Strategic Collaborations",
    description:
      "Building partnerships with institutions, industry experts, and organizations to foster innovation.",
  },
];

export default function Achievements() {
  return (
    <section className="relative bg-gray-950 py-28 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-sky-400 text-xs mb-4">
            Achievements
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Our Impact in Numbers
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-white/60">
            Measurable outcomes that reflect our commitment to cybersecurity
            education, innovation, and professional excellence.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-sky-500/30 transition-all"
            >
              <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-4">
                <Counter end={item.value} suffix={item.suffix} />
              </div>

              <h3 className="text-white text-lg font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}