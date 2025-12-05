import { motion } from "framer-motion";
import { User, AlertCircle, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecruiterData {
  name: string;
  role: string;
  fairScore: number;
  reviewedCandidates: number;
  biasFlags: number;
  improvement: number;
}

const recruiters: RecruiterData[] = [
  { name: "Sarah Chen", role: "Senior Recruiter", fairScore: 92, reviewedCandidates: 245, biasFlags: 2, improvement: 8 },
  { name: "Marcus Johnson", role: "Tech Recruiter", fairScore: 78, reviewedCandidates: 189, biasFlags: 7, improvement: -3 },
  { name: "Emily Rodriguez", role: "HR Manager", fairScore: 88, reviewedCandidates: 312, biasFlags: 4, improvement: 12 },
  { name: "David Kim", role: "Recruiter", fairScore: 71, reviewedCandidates: 156, biasFlags: 11, improvement: 5 },
];

export function RecruiterPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recruiter Bias Profile</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recruiters.map((recruiter, index) => (
          <motion.div
            key={recruiter.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
              <span className="text-sm font-semibold text-foreground">
                {recruiter.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{recruiter.name}</p>
              <p className="text-xs text-muted-foreground">{recruiter.role}</p>
            </div>

            {/* Score */}
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-lg font-bold",
                  recruiter.fairScore >= 80 ? "text-success" :
                  recruiter.fairScore >= 60 ? "text-warning" : "text-destructive"
                )}>
                  {recruiter.fairScore}
                </span>
                <div className={cn(
                  "flex items-center gap-0.5 text-xs",
                  recruiter.improvement > 0 ? "text-success" : "text-destructive"
                )}>
                  <TrendingUp className={cn("w-3 h-3", recruiter.improvement < 0 && "rotate-180")} />
                  {Math.abs(recruiter.improvement)}%
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{recruiter.reviewedCandidates} reviewed</span>
                {recruiter.biasFlags > 5 && (
                  <span className="flex items-center gap-1 text-warning">
                    <AlertCircle className="w-3 h-3" />
                    {recruiter.biasFlags} flags
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
