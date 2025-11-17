"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading() {
  const [displayText, setDisplayText] = useState<string>("");
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on component mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

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

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    fontFamily: "'Share Tech Mono', monospace, monospace",
    fontSize: isMobile ? "clamp(1rem, 5vw, 1.8rem)" : "clamp(1.5rem, 4vw, 2.5rem)",
    letterSpacing: isMobile ? "2px" : "4px",
    fontWeight: 600,
    textTransform: "uppercase",
    textAlign: "center",
    opacity: fadeOut ? 0 : 1,
    transition: "opacity 1s ease",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    padding: isMobile ? "1rem" : "2rem",
  };

  const logoStyle: React.CSSProperties = {
    marginRight: isMobile ? 0 : "20px",
    marginBottom: isMobile ? "15px" : 0,
    filter: "brightness(1)",
  };

  const textContainerStyle: React.CSSProperties = {
    maxWidth: isMobile ? "90%" : "100%",
    wordWrap: "break-word",
  };

  return (
    <div style={containerStyle}>
      <Image 
        src="/logo2.png" 
        alt="Abreonix Logo" 
        width={isMobile ? 60 : 80} 
        height={isMobile ? 60 : 80} 
        style={logoStyle} 
        priority 
      />
      <div style={textContainerStyle}>
        <h1 style={{ margin: 0, lineHeight: 1.2 }}>{displayText}</h1>
      </div>
    </div>
  );
}