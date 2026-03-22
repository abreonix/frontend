"use client";
import Image from "next/image";

export default function RouteLoader() {
  const loaderStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(6px)",
    zIndex: 9998,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "opacity 0.6s ease",
  };

  const ringStyle: React.CSSProperties = {
    width: "90px",
    height: "90px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #0070f3",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const keyframes = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={loaderStyle}>
        <div style={{ position: "relative" }}>
          <div style={ringStyle}></div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="/logo2.png" alt="Loading" width={55} height={55} priority />
          </div>
        </div>
      </div>
    </>
  );
}
