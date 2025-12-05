import { motion } from "framer-motion";
import { Download, Filter, Search, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  fairScore: number;
  skillMatch: number;
  biasFlags: number;
  status: "approved" | "review" | "flagged";
}

interface CandidateTableProps {
  candidates: Candidate[];
  onDownload?: () => void;
}

export function CandidateTable({ candidates, onDownload }: CandidateTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Fair Shortlist</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {candidates.length} candidates evaluated with bias-free criteria
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-48 h-9 pl-9 pr-4 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button onClick={onDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr className="bg-secondary/30">
              <th className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
                Candidate <ChevronDown className="w-3 h-3" />
              </th>
              <th>Role Applied</th>
              <th>Experience</th>
              <th className="text-center">FairScore</th>
              <th className="text-center">Skill Match</th>
              <th className="text-center">Bias Flags</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <motion.tr
                key={candidate.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
                      <span className="text-xs font-semibold text-foreground">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{candidate.name}</span>
                  </div>
                </td>
                <td className="text-muted-foreground">{candidate.role}</td>
                <td className="text-muted-foreground">{candidate.experience}</td>
                <td className="text-center">
                  <span className={cn(
                    "inline-flex items-center justify-center w-12 h-7 rounded-lg font-semibold text-sm",
                    candidate.fairScore >= 80 ? "bg-success/10 text-success" :
                    candidate.fairScore >= 60 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  )}>
                    {candidate.fairScore}
                  </span>
                </td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${candidate.skillMatch}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{candidate.skillMatch}%</span>
                  </div>
                </td>
                <td className="text-center">
                  {candidate.biasFlags === 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-success mx-auto" />
                  ) : (
                    <span className="inline-flex items-center gap-1 text-warning">
                      <AlertTriangle className="w-4 h-4" />
                      {candidate.biasFlags}
                    </span>
                  )}
                </td>
                <td className="text-center">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    candidate.status === "approved" ? "badge-success" :
                    candidate.status === "review" ? "badge-warning" : "badge-danger"
                  )}>
                    {candidate.status === "approved" ? "Approved" :
                     candidate.status === "review" ? "Under Review" : "Flagged"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {candidates.length} of {candidates.length} candidates
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
