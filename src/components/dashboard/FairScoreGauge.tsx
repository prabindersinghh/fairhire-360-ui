import { motion } from "framer-motion";
import { Shield, CheckCircle2, AlertTriangle } from "lucide-react";

interface FairScoreGaugeProps {
  score: number;
}

export function FairScoreGauge({ score }: FairScoreGaugeProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = () => {
    if (score >= 80) return "text-success stroke-success";
    if (score >= 60) return "text-warning stroke-warning";
    return "text-destructive stroke-destructive";
  };

  const getScoreLabel = () => {
    if (score >= 80) return { label: "Excellent", sublabel: "Highly Fair Process" };
    if (score >= 60) return { label: "Good", sublabel: "Minor Improvements Needed" };
    return { label: "Needs Work", sublabel: "Significant Bias Detected" };
  };

  const scoreInfo = getScoreLabel();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">FairScore™</h3>
      </div>

      <div className="flex items-center gap-8">
        {/* Gauge */}
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-secondary"
            />
            {/* Progress circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="45"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              className={getScoreColor()}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={`text-3xl font-bold ${getScoreColor().split(' ')[0]}`}
            >
              {score}
            </motion.span>
            <span className="text-xs text-muted-foreground">out of 100</span>
          </div>
        </div>

        {/* Score details */}
        <div className="flex-1">
          <div className={`text-xl font-semibold mb-1 ${getScoreColor().split(' ')[0]}`}>
            {scoreInfo.label}
          </div>
          <p className="text-sm text-muted-foreground mb-4">{scoreInfo.sublabel}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-foreground">Skill-based evaluation active</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-foreground">Blind screening enabled</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-foreground">Review regional patterns</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
