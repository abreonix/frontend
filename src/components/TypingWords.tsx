"use client";
import { useEffect, useState } from "react";

export default function TypingWords({
  words = [],
  typingSpeed = 120,
  deletingSpeed = 70,
  delay = 1200
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
}) {
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // which letter
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // 🔒 SAFETY: If array is empty → render nothing
  if (!words || words.length === 0) return null;

  // ⭐ LOOP: ensure index never goes out of bounds
  const safeIndex = index % words.length;
  const currentWord = words[safeIndex] ?? "";

  useEffect(() => {
    // blinking cursor
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    // If the word is fully typed, wait before deleting
    if (!deleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(timeout);
    }

    // If word is fully deleted, move to next word
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length); // <— ALWAYS LOOPS
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
      },
      deleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, currentWord, delay, typingSpeed, deletingSpeed, words.length]);

  return (
    <span className="text-indigo-600 font-bold">
      {/* always safe because currentWord never becomes undefined */}
      {currentWord.substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
}