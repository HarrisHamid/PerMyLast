import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SnarkMeterProps {
  level: number; // 0 = mild, 1 = medium, 2 = nuclear
}

export function SnarkMeter({ level }: SnarkMeterProps) {
  const [cracked, setCracked] = useState(false);

  useEffect(() => {
    if (level === 2) {
      setCracked(true);
    } else {
      setCracked(false);
    }
  }, [level]);

  const fillHeight = ((level + 1) / 3) * 100;

  const fillColors = [
    "bg-gradient-to-t from-blue-400 to-blue-300",
    "bg-gradient-to-t from-yellow-500 to-yellow-400",
    "bg-gradient-to-t from-red-600 to-red-500",
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-medium font-display">Snark Meter</div>
      <div className="relative w-12 h-40 rounded-full bg-card border-4 border-foreground overflow-hidden">
        <motion.div
          className={`absolute bottom-0 w-full ${fillColors[level]}`}
          initial={{ height: "0%" }}
          animate={{ height: `${fillHeight}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
        {cracked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg className="w-full h-full" viewBox="0 0 50 160">
              <motion.path
                d="M 25 0 L 20 40 L 30 80 L 15 120 L 25 160"
                stroke="black"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
          </motion.div>
        )}
      </div>
      <div className="text-xs text-muted-foreground text-center">
        {level === 0 && "Calm & Cool"}
        {level === 1 && "Getting Spicy"}
        {level === 2 && (
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-red-600 font-bold"
          >
            MAXIMUM SASS
          </motion.span>
        )}
      </div>
    </div>
  );
}
