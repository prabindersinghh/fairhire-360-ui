import { motion } from "framer-motion";
import { GitCompare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonItem {
  attribute: string;
  original: string;
  counterfactual: string;
  originalScore: number;
  counterfactualScore: number;
  impact: "positive" | "negative" | "neutral";
}

interface CounterfactualComparisonProps {
  comparisons: ComparisonItem[];
}

export function CounterfactualComparison({ comparisons }: CounterfactualComparisonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-2">
        <GitCompare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Counterfactual Analysis</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        How would the evaluation change if certain attributes were different?
      </p>

      <div className="space-y-4">
        {comparisons.map((item, index) => (
          <motion.div
            key={item.attribute}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 rounded-lg bg-secondary/30"
          >
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {item.attribute}
            </div>
            
            <div className="flex items-center gap-4">
              {/* Original */}
              <div className="flex-1 p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Original</p>
                <p className="text-sm font-medium text-foreground truncate">{item.original}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.originalScore}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <span className="text-xs font-medium text-primary">{item.originalScore}</span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />

              {/* Counterfactual */}
              <div className={cn(
                "flex-1 p-3 rounded-lg",
                item.impact === "positive" ? "bg-success/10" :
                item.impact === "negative" ? "bg-destructive/10" : "bg-secondary/50"
              )}>
                <p className="text-xs text-muted-foreground mb-1">Counterfactual</p>
                <p className="text-sm font-medium text-foreground truncate">{item.counterfactual}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.counterfactualScore}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={cn(
                        "h-full rounded-full",
                        item.impact === "positive" ? "bg-success" :
                        item.impact === "negative" ? "bg-destructive" : "bg-primary"
                      )}
                    />
                  </div>
                  <span className={cn(
                    "text-xs font-medium",
                    item.impact === "positive" ? "text-success" :
                    item.impact === "negative" ? "text-destructive" : "text-primary"
                  )}>
                    {item.counterfactualScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Impact indicator */}
            <div className={cn(
              "mt-3 text-xs font-medium text-center py-1 rounded",
              item.impact === "positive" ? "bg-success/10 text-success" :
              item.impact === "negative" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
            )}>
              {item.impact === "positive" ? "⬆ Score would increase" :
               item.impact === "negative" ? "⬇ Score would decrease" : "→ No significant change"}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
