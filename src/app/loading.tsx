"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading() {
  const [displayText, setDisplayText] = useState<string>("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const targetText = "WELCOME TO ABREONIX CYBERSEC";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let iteration = 0;

    const interval = setInterval(() => {
      const newText = targetText
        .split("")
        .map((letter, index) => {
          if (letter === " ") return " ";
          if (index < iteration) return targetText[index];
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      setDisplayText(newText);
      iteration += 0.5;

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 1000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const containerStyle: React.CSSProperties = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
    letterSpacing: "4px",
    fontWeight: 600,
    textTransform: "uppercase",
    textAlign: "center",
    opacity: fadeOut ? 0 : 1,
    transition: "opacity 1s ease",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const logoStyle: React.CSSProperties = {
    marginRight: "20px",
    filter: "brightness(1)",
  };

  return (
    <div style={containerStyle}>
      <Image src="/logo2.png" alt="Abreonix Logo" width={80} height={80} style={logoStyle} priority />
      <h1>{displayText}</h1>
    </div>
  );
}
