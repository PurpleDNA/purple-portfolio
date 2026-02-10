import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
}

const Digit = ({ digit, index }: { digit: string; index: number }) => {
  const numDigit = parseInt(digit);

  if (isNaN(numDigit)) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <span className="relative h-[1em] overflow-hidden inline-flex flex-col items-center leading-none min-w-[0.6ch]">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: `-${numDigit * 10}%` }}
        transition={{
          duration: 2,
          ease: [0.45, 0.05, 0.55, 0.95],
          delay: index * 0.1,
        }}
        className="flex flex-col will-change-transform"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1em] flex items-center justify-center">
            {n}
          </span>
        ))}
      </motion.div>
    </span>
  );
};

export const AnimatedCounter = ({ value }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {isInView ? (
        value
          .split("")
          .map((char, i) => <Digit key={i} digit={char} index={i} />)
      ) : (
        <span className="opacity-0">{value}</span>
      )}
    </span>
  );
};
