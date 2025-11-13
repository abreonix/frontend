// ───────────────────────────────
// 🔽 Feature Card Component (Fixed icon hover)
const features = [
    {
      icon: ShieldCheck,
      title: "NIELIT Certified",
      description: "Government-recognized certification with industry acceptance in just 6 months.",
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      title: "Fast-Track Learning",
      description: "Intensive program focused on core cybersecurity skills for quick career entry.",
      color: "bg-orange-500"
    },
    {
      icon: BookOpen,
      title: "Hands-on Practice",
      description: "Practical sessions on system and network defense with real tools.",
      color: "bg-purple-500"
    },
    {
      icon: Target,
      title: "Career Ready",
      description: "Perfect for career upskilling or entry-level cybersecurity roles.",
      color: "bg-green-500"
    }
  ];
// ───────────────────────────────
export const FeatureCard = ({ icon: Icon, title, description, color }: any) => {
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
