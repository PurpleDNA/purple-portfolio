import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  eraseSpeed?: number;
  onComplete?: () => void;
}

const Typewriter = ({
  text,
  className = "",
  speed = 50,
  eraseSpeed = 30,
  onComplete,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const [prevText, setPrevText] = useState(text);
  const displayTextRef = useRef(displayText);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (text !== prevText) {
      setIsScrambling(true);
      setPrevText(text);
    }
  }, [text, prevText]);

  useEffect(() => {
    let frame = 0;
    const maxFrames = 15;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (isScrambling) {
        setDisplayText(() => {
          let current = "";
          const maxLength = Math.max(
            displayTextRef.current.length,
            text.length,
          );
          for (let i = 0; i < maxLength; i++) {
            current += chars[Math.floor(Math.random() * chars.length)];
          }
          displayTextRef.current = current;
          return current;
        });

        frame++;
        if (frame > maxFrames) {
          setIsScrambling(false);
        } else {
          timer = setTimeout(tick, eraseSpeed);
        }
      } else {
        if (displayTextRef.current !== text) {
          setDisplayText((prev) => {
            let updated = "";
            for (let i = 0; i < text.length; i++) {
              if (i < prev.length && prev[i] === text[i]) {
                updated += text[i];
              } else {
                if (updated.length === i) {
                  updated += text[i];
                } else {
                  updated += chars[Math.floor(Math.random() * chars.length)];
                }
              }
            }
            displayTextRef.current = updated;
            return updated;
          });
          timer = setTimeout(tick, speed);
        } else if (onComplete) {
          onComplete();
        }
      }
    };

    timer = setTimeout(tick, isScrambling ? eraseSpeed : speed);
    return () => clearTimeout(timer);
  }, [text, isScrambling, speed, eraseSpeed, onComplete]);

  // Handle special formatting for "CODENAME: PURPLE DNA"
  const renderContent = () => {
    if (displayText.includes("DNA") && text.includes("DNA")) {
      const parts = displayText.split("DNA");
      return (
        <>
          {parts[0]}
          <strong className="text-purple-500 transition-colors duration-500">
            DNA
          </strong>
          {parts.slice(1).join("DNA")}
        </>
      );
    }
    return displayText;
  };

  return (
    <span className={className + " cursor-crosshair"}>
      {renderContent()}
      <span className="w-2 h-[1.1em] bg-white inline-block ml-1 align-middle animate-blink shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
    </span>
  );
};

export default Typewriter;
