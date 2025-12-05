import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CandidateTable } from "@/components/shortlist/CandidateTable";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const candidates = [
  { id: "1", name: "Alex Johnson", role: "Senior Engineer", experience: "6 years", fairScore: 92, skillMatch: 95, biasFlags: 0, status: "approved" as const },
  { id: "2", name: "Maria Garcia", role: "Senior Engineer", experience: "5 years", fairScore: 88, skillMatch: 90, biasFlags: 0, status: "approved" as const },
  { id: "3", name: "James Wilson", role: "Senior Engineer", experience: "7 years", fairScore: 85, skillMatch: 88, biasFlags: 1, status: "review" as const },
  { id: "4", name: "Sarah Kim", role: "Senior Engineer", experience: "4 years", fairScore: 82, skillMatch: 85, biasFlags: 0, status: "approved" as const },
  { id: "5", name: "Michael Brown", role: "Senior Engineer", experience: "8 years", fairScore: 78, skillMatch: 82, biasFlags: 2, status: "review" as const },
  { id: "6", name: "Emily Chen", role: "Senior Engineer", experience: "5 years", fairScore: 75, skillMatch: 80, biasFlags: 3, status: "flagged" as const },
  { id: "7", name: "David Lee", role: "Senior Engineer", experience: "6 years", fairScore: 90, skillMatch: 92, biasFlags: 0, status: "approved" as const },
  { id: "8", name: "Lisa Wang", role: "Senior Engineer", experience: "4 years", fairScore: 86, skillMatch: 88, biasFlags: 1, status: "review" as const },
];

const summaryStats = [
  { label: "Total Candidates", value: "248", icon: Users, color: "text-primary" },
  { label: "Fair Shortlisted", value: "42", icon: Shield, color: "text-success" },
  { label: "Avg FairScore", value: "84.5", icon: TrendingUp, color: "text-accent" },
  { label: "Zero Bias Flags", value: "31", icon: CheckCircle2, color: "text-success" },
];

export default function FairShortlist() {
  const handleDownload = () => {
    toast.success("Report generated successfully!", {
      description: "The fair shortlist report has been downloaded.",
    });
  };

  return (
    <DashboardLayout title="Fair Shortlist Generator" subtitle="Generate bias-free candidate shortlists">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="glass-card p-4 mb-6 border-l-4 border-primary"
      >
        <div className="flex items-start gap-4">
          <Shield className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground">Fair Evaluation Active</h4>
            <p className="text-sm text-muted-foreground mt-1">
              All candidates in this shortlist have been evaluated using blind screening, 
              skill-based scoring, and AI-assisted bias detection. Names, photos, and 
              demographic indicators were masked during the initial evaluation phase.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Candidate Table */}
      <CandidateTable candidates={candidates} onDownload={handleDownload} />
    </DashboardLayout>
  );
}
