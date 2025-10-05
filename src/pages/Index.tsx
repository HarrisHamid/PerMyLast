import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { ToneSlider } from "@/components/ToneSlider";
import { SnarkMeter } from "@/components/SnarkMeter";
import { Mascot } from "@/components/Mascot";
import { GenerateButton } from "@/components/GenerateButton";
import { ReplyDisplay } from "@/components/ReplyDisplay";
import { HRWarning } from "@/components/HRWarning";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [toneLevel, setToneLevel] = useState(0); // 0 = mild, 1 = medium, 2 = nuclear
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHRWarning, setShowHRWarning] = useState(false);
  const [shake, setShake] = useState(false);

  const toneLabels = ["mild", "medium", "nuclear"];
  const currentTone = toneLabels[toneLevel];

  // Background gradients based on tone
  const bgGradients = [
    "bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50",
    "bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-50",
    "bg-gradient-to-br from-red-200 via-purple-200 to-red-100",
  ];

  // Easter egg: detect ASAP
  useEffect(() => {
    if (email.toLowerCase().includes("asap")) {
      setShake(true);
      toast({
        title: "🚨 ASAP DETECTED!",
        description: "Another 'urgent' email... sure buddy.",
        variant: "destructive",
      });
      setTimeout(() => setShake(false), 1000);
    }
  }, [email]);

  const handleGenerate = () => {
    if (!email.trim()) {
      toast({
        title: "⚠️ Email Required",
        description: "Please paste an email first!",
        variant: "destructive",
      });
      return;
    }

    if (toneLevel === 2) {
      setShowHRWarning(true);
    } else {
      generateReply();
    }
  };

  const generateReply = async () => {
    setLoading(true);
    setReply("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-reply",
        {
          body: {
            email,
            tone: currentTone,
          },
        }
      );

      if (error) {
        throw error;
      }

      setReply(data.reply);
    } catch (error) {
      console.error("Error generating reply:", error);
      toast({
        title: "❌ Error",
        description: "Failed to generate reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={`min-h-screen ${bgGradients[toneLevel]} transition-colors duration-700 p-8`}
      animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-display font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent pb-1">
            PerMyLast
          </h1>
          <p className="text-muted-foreground">
            Corporate professionalism meets chaotic fun 🎭
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar: Meter & Mascot */}
          <div className="lg:col-span-1 space-y-6 flex flex-col items-center">
            <SnarkMeter level={toneLevel} />
            <Mascot level={toneLevel} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg p-6 shadow-lg"
            >
              <label className="block text-sm font-display font-semibold mb-2">
                📨 Incoming Email
              </label>
              <Textarea
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Paste that annoying email here..."
                className="min-h-[150px] text-base"
              />
            </motion.div>

            {/* Tone Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-lg p-6 shadow-lg"
            >
              <label className="block text-sm font-display font-semibold mb-4">
                🎚️ Tone Control
              </label>
              <ToneSlider value={toneLevel} onChange={setToneLevel} />
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GenerateButton
                onClick={handleGenerate}
                loading={loading}
                level={toneLevel}
              />
            </motion.div>

            {/* Reply Display */}
            {reply && <ReplyDisplay reply={reply} level={toneLevel} />}
          </div>
        </div>
      </div>

      {/* HR Warning Dialog */}
      <HRWarning
        open={showHRWarning}
        onConfirm={() => {
          setShowHRWarning(false);
          generateReply();
        }}
        onCancel={() => {
          setShowHRWarning(false);
          setToneLevel(1); // Dial it back to medium
          toast({
            title: "Good choice!",
            description: "Reduced to Medium sass level.",
          });
        }}
      />
    </motion.div>
  );
};

export default Index;
