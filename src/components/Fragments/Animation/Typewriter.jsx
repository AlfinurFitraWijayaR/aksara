import { useState, useEffect } from "react";

export const Typewriter = ({ text, speed = 15, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) {
      if (onComplete) onComplete();
      return;
    }

    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        const next = text.slice(0, index + 1);
        return next;
      });

      index++;

      if (index === text.length) {
        clearInterval(intervalId);
        if (onComplete) {
          setTimeout(() => onComplete(), 200); // Jeda dikit biar natural
        }
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};
