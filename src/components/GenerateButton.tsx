import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  level: number;
}

export function GenerateButton({ onClick, loading, level }: GenerateButtonProps) {
  const buttonVariants = [
    "bg-blue-500 hover:bg-blue-600 text-white",
    "bg-yellow-500 hover:bg-yellow-600 text-white",
    "bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white shadow-lg",
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Button
        onClick={onClick}
        disabled={loading}
        className={`w-full h-14 text-lg font-display font-bold ${buttonVariants[level]} ${
          level === 2 ? "animate-glow-pulse" : ""
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Sassy Reply
          </>
        )}
      </Button>
    </motion.div>
  );
}
