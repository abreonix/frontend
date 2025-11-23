"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "abreonix_notification_closed_v3";
const LATEST_IMG = "/notification/latest.jpg";

export default function InstagramToast() {
  const [visible, setVisible] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const closed = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    if (closed) return;

    async function loadImage() {
      try {
        const res = await fetch(LATEST_IMG, { method: "HEAD", cache: "no-store" });
        if (res.ok) setImageUrl(LATEST_IMG);
      } catch (e) {}

      setLoading(false);

      // delay 5s before showing
      setTimeout(() => {
        setVisible(true);

        // delay 50ms to trigger animation so browser can register initial state
        setTimeout(() => setStartAnimation(true), 50);
      }, 5000);
    }

    loadImage();
  }, []);

  const closePopup = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (!visible || !imageUrl) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <div
        className={`transition-all duration-500 ease-out transform 
          ${startAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <div className="relative w-48 sm:w-52 h-60 sm:h-64 rounded-xl shadow-xl overflow-hidden bg-white dark:bg-gray-800">

          {/* Close button */}
          <button
            onClick={closePopup}
            className="absolute top-2 right-2 z-20 bg-white/80 hover:bg-white p-1 rounded-full shadow"
            aria-label="Close"
            style={{ backdropFilter: "blur(4px)" }}
          >
            ✕
          </button>

          {/* Clickable Image */}
          <a
            href="https://wa.me/918690650532"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={imageUrl}
              alt="Notification"
              className="w-full h-full object-cover"
              onLoad={() => setLoading(false)}
            />
          </a>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-gray-400">Loading…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
