import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeatmapData {
  recruiter: string;
  gender: number;
  age: number;
  college: number;
  regional: number;
}

interface BiasHeatmapProps {
  data: HeatmapData[];
}

const categories = ["Gender", "Age", "College", "Regional"];

function getCellColor(value: number): string {
  if (value <= 15) return "bg-success/60";
  if (value <= 30) return "bg-success/30";
  if (value <= 45) return "bg-warning/40";
  if (value <= 60) return "bg-warning/70";
  return "bg-destructive/70";
}

export function BiasHeatmap({ data }: BiasHeatmapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Recruiter Bias Heatmap</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4">
                Recruiter
              </th>
              {categories.map((cat) => (
                <th
                  key={cat}
                  className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3 px-4"
                >
                  {cat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={row.recruiter}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: rowIndex * 0.1 }}
                className="border-t border-border/50"
              >
                <td className="py-4 px-4 text-sm font-medium text-foreground">
                  {row.recruiter}
                </td>
                {[row.gender, row.age, row.college, row.regional].map((value, colIndex) => (
                  <td key={colIndex} className="py-4 px-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: rowIndex * 0.1 + colIndex * 0.05 }}
                      className={cn(
                        "w-14 h-10 mx-auto rounded-lg flex items-center justify-center text-sm font-semibold text-foreground",
                        getCellColor(value)
                      )}
                    >
                      {value}%
                    </motion.div>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/60" />
          <span className="text-xs text-muted-foreground">Low (&lt;15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning/40" />
          <span className="text-xs text-muted-foreground">Medium (15-45%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/70" />
          <span className="text-xs text-muted-foreground">High (&gt;45%)</span>
        </div>
      </div>
    </motion.div>
  );
}
