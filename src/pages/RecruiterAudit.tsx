import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BiasHeatmap } from "@/components/charts/BiasHeatmap";
import { BiasTrendChart } from "@/components/charts/BiasTrendChart";
import { ShortlistBreakdown } from "@/components/audit/ShortlistBreakdown";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, Award } from "lucide-react";

const heatmapData = [
  { recruiter: "Sarah Chen", gender: 8, age: 12, college: 15, regional: 10 },
  { recruiter: "Marcus Johnson", gender: 22, age: 35, college: 28, regional: 18 },
  { recruiter: "Emily Rodriguez", gender: 10, age: 8, college: 12, regional: 25 },
  { recruiter: "David Kim", gender: 18, age: 42, college: 35, regional: 22 },
  { recruiter: "Lisa Park", gender: 5, age: 15, college: 8, regional: 12 },
];

const trendData = [
  { month: "Jan", gender: 25, age: 32, college: 28, regional: 35 },
  { month: "Feb", gender: 22, age: 30, college: 25, regional: 32 },
  { month: "Mar", gender: 20, age: 28, college: 22, regional: 30 },
  { month: "Apr", gender: 18, age: 25, college: 20, regional: 28 },
  { month: "May", gender: 15, age: 22, college: 18, regional: 25 },
  { month: "Jun", gender: 12, age: 28, college: 18, regional: 35 },
];

const breakdownData = [
  { name: "Skills-Based", value: 65, color: "hsl(142 76% 45%)" },
  { name: "Experience Match", value: 20, color: "hsl(217 91% 60%)" },
  { name: "Culture Fit", value: 10, color: "hsl(185 100% 50%)" },
  { name: "Potentially Biased", value: 5, color: "hsl(38 92% 50%)" },
];

const stats = [
  { label: "Total Reviews", value: "1,247", icon: Users, change: "+12%" },
  { label: "Bias Flags", value: "23", icon: AlertTriangle, change: "-18%" },
  { label: "Avg FairScore", value: "84", icon: Award, change: "+5%" },
  { label: "Bias Reduction", value: "32%", icon: TrendingDown, change: "YoY" },
];

export default function RecruiterAudit() {
  return (
    <DashboardLayout title="Recruiter Audit" subtitle="Analyze and improve recruiter decision patterns">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-success">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="mb-8">
        <BiasHeatmap data={heatmapData} />
      </div>

      {/* Trend Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BiasTrendChart data={trendData} />
        <ShortlistBreakdown data={breakdownData} />
      </div>
    </DashboardLayout>
  );
}
