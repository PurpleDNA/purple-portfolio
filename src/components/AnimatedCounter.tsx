import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
}

const Digit = ({ digit, index }: { digit: string; index: number }) => {
  const numDigit = parseInt(digit);

  if (isNaN(numDigit)) {
    return <span>{digit}</span>;
  }

  return (
    <div className="relative h-[1em] overflow-hidden inline-block leading-none">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: `-${numDigit * 10}%` }}
        transition={{
          duration: 2,
          ease: [0.45, 0.05, 0.55, 0.95],
          delay: index * 0.1,
        }}
        className="flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-full flex items-center justify-center">
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const AnimatedCounter = ({ value }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className="inline-flex">
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
