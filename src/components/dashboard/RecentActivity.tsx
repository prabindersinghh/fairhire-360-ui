import { motion } from "framer-motion";
import { Activity, UserCheck, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: number;
  type: "review" | "flag" | "shortlist" | "approve";
  message: string;
  time: string;
  user: string;
}

const activities: ActivityItem[] = [
  { id: 1, type: "approve", message: "Approved blind screening for Engineering roles", time: "2 min ago", user: "Sarah Chen" },
  { id: 2, type: "flag", message: "Bias flag raised: Age pattern detected in Marketing", time: "15 min ago", user: "System" },
  { id: 3, type: "review", message: "Reviewed 23 candidates for Product Designer role", time: "1 hour ago", user: "Marcus Johnson" },
  { id: 4, type: "shortlist", message: "Generated fair shortlist for Backend Developer", time: "2 hours ago", user: "Emily Rodriguez" },
  { id: 5, type: "approve", message: "Completed bias training certification", time: "3 hours ago", user: "David Kim" },
];

const activityIcons = {
  review: UserCheck,
  flag: AlertTriangle,
  shortlist: FileText,
  approve: CheckCircle2,
};

const activityColors = {
  review: "bg-primary/10 text-primary",
  flag: "bg-warning/10 text-warning",
  shortlist: "bg-accent/10 text-accent",
  approve: "bg-success/10 text-success",
};

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex gap-4"
            >
              <div className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                activityColors[activity.type]
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
