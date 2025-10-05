import { motion } from "framer-motion";

interface MascotProps {
  level: number; // 0 = mild, 1 = medium, 2 = nuclear
}

export function Mascot({ level }: MascotProps) {
  const expressions = [
    { emoji: "🤓", label: "CHILL", rotate: 0 },
    { emoji: "🤨", label: "SUSPICIOUS", rotate: -10 },
    { emoji: "😈", label: "ALL BETS OFF", rotate: 15 },
  ];

  const current = expressions[level];

  return (
    <motion.div
      className="relative"
      animate={{
        rotate: current.rotate,
        scale: level === 2 ? [1, 1.1, 1] : 1,
      }}
      transition={{
        rotate: { type: "spring", stiffness: 200 },
        scale: { repeat: level === 2 ? Infinity : 0, duration: 0.5 },
      }}
    >
      <div className="text-6xl">{current.emoji}</div>
      {level === 2 && (
        <motion.div
          className="absolute -top-2 -right-2 text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >
          🔥
        </motion.div>
      )}
      <div className="text-xs text-center mt-2 font-medium">
        {current.label}
      </div>
    </motion.div>
  );
}
