import { motion } from "framer-motion";
import { LucideIcon, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface BiasCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: number;
  delay?: number;
}

function getBiasLevel(value: number): { label: string; color: string; bgColor: string } {
  if (value <= 15) return { label: "Low", color: "text-success", bgColor: "bg-success/10" };
  if (value <= 35) return { label: "Medium", color: "text-warning", bgColor: "bg-warning/10" };
  if (value <= 55) return { label: "High", color: "text-destructive", bgColor: "bg-destructive/10" };
  return { label: "Critical", color: "text-bias-critical", bgColor: "bg-destructive/20" };
}

export function BiasCard({ title, value, icon: Icon, trend, delay = 0 }: BiasCardProps) {
  const biasLevel = getBiasLevel(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card-hover p-6 relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", biasLevel.bgColor)}>
          <Icon className={cn("w-6 h-6", biasLevel.color)} />
        </div>
        <div className={cn("flex items-center gap-1 text-sm", trend < 0 ? "text-success" : trend > 0 ? "text-destructive" : "text-muted-foreground")}>
          {trend < 0 ? (
            <TrendingDown className="w-4 h-4" />
          ) : trend > 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <Minus className="w-4 h-4" />
          )}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>

      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-foreground">{value}%</span>
        <span className={cn("text-sm font-medium mb-1", biasLevel.color)}>{biasLevel.label}</span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
          className={cn("h-full rounded-full", 
            value <= 15 ? "bg-success" :
            value <= 35 ? "bg-warning" :
            value <= 55 ? "bg-destructive" : "bg-bias-critical"
          )}
        />
      </div>
    </motion.div>
  );
}
