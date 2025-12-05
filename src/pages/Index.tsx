import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BiasCard } from "@/components/dashboard/BiasCard";
import { FairScoreGauge } from "@/components/dashboard/FairScoreGauge";
import { RecruiterPanel } from "@/components/dashboard/RecruiterPanel";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Users, Calendar, Building2, MapPin } from "lucide-react";

const biasData = [
  { title: "Gender Bias", value: 12, icon: Users, trend: -3 },
  { title: "Age Bias", value: 28, icon: Calendar, trend: 5 },
  { title: "College Bias", value: 18, icon: Building2, trend: -8 },
  { title: "Regional Bias", value: 35, icon: MapPin, trend: 2 },
];

export default function Index() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Monitor and eliminate hiring bias in real-time">
      {/* Bias Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {biasData.map((item, index) => (
          <BiasCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            trend={item.trend}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FairScore Gauge */}
        <div className="lg:col-span-1">
          <FairScoreGauge score={76} />
        </div>

        {/* Recruiter Panel */}
        <div className="lg:col-span-2">
          <RecruiterPanel />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}
