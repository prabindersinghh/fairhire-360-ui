import { motion } from "framer-motion";
import { Brain, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SHAPFeature {
  name: string;
  value: number;
  impact: number;
}

interface SHAPExplanationProps {
  features: SHAPFeature[];
  baseScore: number;
  finalScore: number;
}

export function SHAPExplanation({ features, baseScore, finalScore }: SHAPExplanationProps) {
  const sortedFeatures = [...features].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
  const maxImpact = Math.max(...features.map(f => Math.abs(f.impact)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">SHAP Explainability</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Understanding how each feature contributed to the final score
      </p>

      {/* Score waterfall summary */}
      <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-secondary/30">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Base Score</p>
          <p className="text-2xl font-bold text-foreground">{baseScore}</p>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-border relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-xs text-muted-foreground">
            Feature Impacts
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Final Score</p>
          <p className={cn(
            "text-2xl font-bold",
            finalScore >= 80 ? "text-success" : finalScore >= 60 ? "text-warning" : "text-destructive"
          )}>
            {finalScore}
          </p>
        </div>
      </div>

      {/* Feature impact bars */}
      <div className="space-y-3">
        {sortedFeatures.map((feature, index) => {
          const barWidth = (Math.abs(feature.impact) / maxImpact) * 100;
          const isPositive = feature.impact > 0;
          
          return (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              {/* Feature name */}
              <div className="w-32 shrink-0">
                <p className="text-sm font-medium text-foreground truncate">{feature.name}</p>
                <p className="text-xs text-muted-foreground">{feature.value}</p>
              </div>

              {/* Impact bar */}
              <div className="flex-1 flex items-center gap-2">
                {/* Negative side */}
                <div className="w-1/2 flex justify-end">
                  {!isPositive && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="h-6 bg-destructive/60 rounded-l flex items-center justify-start pl-2"
                    >
                      <TrendingDown className="w-3 h-3 text-destructive-foreground" />
                    </motion.div>
                  )}
                </div>
                
                {/* Center line */}
                <div className="w-px h-8 bg-border" />
                
                {/* Positive side */}
                <div className="w-1/2">
                  {isPositive && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="h-6 bg-success/60 rounded-r flex items-center justify-end pr-2"
                    >
                      <TrendingUp className="w-3 h-3 text-success-foreground" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Impact value */}
              <div className={cn(
                "w-16 text-right text-sm font-semibold",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {isPositive ? "+" : ""}{feature.impact.toFixed(1)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-4 h-4 rounded bg-success/60" />
          <span>Positive Impact</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-4 h-4 rounded bg-destructive/60" />
          <span>Negative Impact</span>
        </div>
      </div>
    </motion.div>
  );
}
