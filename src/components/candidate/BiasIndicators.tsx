import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface BiasIndicator {
  category: string;
  status: "safe" | "warning" | "flagged";
  description: string;
  recommendation?: string;
}

interface BiasIndicatorsProps {
  indicators: BiasIndicator[];
  fairScore: number;
}

const statusConfig = {
  safe: {
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
  },
  warning: {
    icon: Info,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
  },
  flagged: {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
  },
};

export function BiasIndicators({ indicators, fairScore }: BiasIndicatorsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Bias Analysis</h3>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-semibold",
          fairScore >= 80 ? "bg-success/10 text-success" :
          fairScore >= 60 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
        )}>
          FairScore: {fairScore}
        </div>
      </div>

      <div className="space-y-4">
        {indicators.map((indicator, index) => {
          const config = statusConfig[indicator.status];
          const Icon = config.icon;
          
          return (
            <motion.div
              key={indicator.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "p-4 rounded-lg border",
                config.bgColor,
                config.borderColor
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.color)} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{indicator.category}</h4>
                    <span className={cn("text-xs font-medium uppercase", config.color)}>
                      {indicator.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{indicator.description}</p>
                  {indicator.recommendation && (
                    <p className="text-sm text-primary mt-2 pt-2 border-t border-border/30">
                      💡 {indicator.recommendation}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
