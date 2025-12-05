import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TrendData {
  month: string;
  gender: number;
  age: number;
  college: number;
  regional: number;
}

interface BiasTrendChartProps {
  data: TrendData[];
}

export function BiasTrendChart({ data }: BiasTrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Bias Trends Over Time</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 16%)" />
            <XAxis
              dataKey="month"
              stroke="hsl(215 20% 55%)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="hsl(215 20% 55%)"
              fontSize={12}
              tickLine={false}
              domain={[0, 50]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 47% 10%)",
                border: "1px solid hsl(222 30% 20%)",
                borderRadius: "8px",
                color: "hsl(210 40% 98%)",
              }}
              labelStyle={{ color: "hsl(210 40% 98%)" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => <span style={{ color: "hsl(210 40% 98%)" }}>{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="gender"
              name="Gender Bias"
              stroke="hsl(217 91% 60%)"
              strokeWidth={2}
              dot={{ fill: "hsl(217 91% 60%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="age"
              name="Age Bias"
              stroke="hsl(185 100% 50%)"
              strokeWidth={2}
              dot={{ fill: "hsl(185 100% 50%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="college"
              name="College Bias"
              stroke="hsl(142 76% 45%)"
              strokeWidth={2}
              dot={{ fill: "hsl(142 76% 45%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="regional"
              name="Regional Bias"
              stroke="hsl(38 92% 50%)"
              strokeWidth={2}
              dot={{ fill: "hsl(38 92% 50%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
