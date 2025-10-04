import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface ReplyDisplayProps {
  reply: string;
  level: number;
}

export function ReplyDisplay({ reply, level }: ReplyDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let currentIndex = 0;
    const speed = level === 2 ? 20 : level === 1 ? 30 : 40; // Faster typing at nuclear

    const timer = setInterval(() => {
      if (currentIndex < reply.length) {
        setDisplayedText(reply.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [reply, level]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(reply);
    setCopied(true);
    toast({
      title: "✂️ Copied!",
      description: "Reply copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const borderColors = [
    "border-blue-300",
    "border-yellow-400",
    "border-red-500",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-lg border-2 ${borderColors[level]} bg-card`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-display font-bold mb-2">Your Sassy Reply:</h3>
        <p className="text-foreground whitespace-pre-wrap">{displayedText}</p>
      </div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="w-full"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Reply
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
