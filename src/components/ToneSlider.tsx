import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

export type ToneLevel = "mild" | "medium" | "nuclear";

interface ToneSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const toneLabels = [
  { emoji: "😇", label: "Mild", color: "text-blue-500" },
  { emoji: "😏", label: "Medium", color: "text-yellow-500" },
  { emoji: "😈", label: "Nuclear", color: "text-red-500" },
];

export function ToneSlider({ value, onChange }: ToneSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        {toneLabels.map((tone, idx) => (
          <motion.div
            key={idx}
            className={`text-center ${value === idx ? "scale-125" : "scale-100 opacity-50"}`}
            animate={{
              scale: value === idx ? 1.25 : 1,
              opacity: value === idx ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="text-3xl mb-1">{tone.emoji}</div>
            <div className={`text-xs font-medium ${tone.color}`}>{tone.label}</div>
          </motion.div>
        ))}
      </div>
      <Slider
        value={[value]}
        onValueChange={(vals) => onChange(vals[0])}
        max={2}
        step={1}
        className="w-full"
      />
    </div>
  );
}
