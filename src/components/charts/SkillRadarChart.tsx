import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SkillData {
  skill: string;
  candidate: number;
  required: number;
}

interface SkillRadarChartProps {
  data: SkillData[];
  title?: string;
}

export function SkillRadarChart({ data, title = "Skill Match Analysis" }: SkillRadarChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="hsl(222 30% 20%)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
            />
            <Radar
              name="Required"
              dataKey="required"
              stroke="hsl(185 100% 50%)"
              fill="hsl(185 100% 50%)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Radar
              name="Candidate"
              dataKey="candidate"
              stroke="hsl(217 91% 60%)"
              fill="hsl(217 91% 60%)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
              formatter={(value) => <span style={{ color: "hsl(210 40% 98%)" }}>{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
