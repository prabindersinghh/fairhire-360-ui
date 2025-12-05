import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ResumePreview } from "@/components/candidate/ResumePreview";
import { BiasIndicators } from "@/components/candidate/BiasIndicators";
import { SkillRadarChart } from "@/components/charts/SkillRadarChart";
import { CounterfactualComparison } from "@/components/candidate/CounterfactualComparison";
import { SHAPExplanation } from "@/components/candidate/SHAPExplanation";

const candidateData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  experience: "6 years",
  education: "MS Computer Science, Stanford University",
  currentRole: "Senior Software Engineer",
  company: "TechCorp Inc.",
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "System Design", "GraphQL", "PostgreSQL"],
  summary: "Experienced software engineer with a proven track record in building scalable web applications. Led a team of 5 engineers in delivering a real-time analytics platform that processes 10M+ events daily. Passionate about clean code and mentoring junior developers.",
};

const biasIndicators = [
  { category: "Gender Identification", status: "safe" as const, description: "No gender-identifying information detected in evaluation criteria" },
  { category: "Age Pattern", status: "warning" as const, description: "Graduation year may indicate age - consider blind review", recommendation: "Enable graduation year masking for fairer evaluation" },
  { category: "Institution Bias", status: "safe" as const, description: "Skills prioritized over institution name in scoring" },
  { category: "Location Bias", status: "flagged" as const, description: "Location data may influence regional bias patterns", recommendation: "Review if role truly requires specific location" },
];

const skillData = [
  { skill: "Frontend", candidate: 92, required: 85 },
  { skill: "Backend", candidate: 88, required: 90 },
  { skill: "DevOps", candidate: 75, required: 70 },
  { skill: "System Design", candidate: 85, required: 80 },
  { skill: "Communication", candidate: 90, required: 85 },
  { skill: "Leadership", candidate: 78, required: 75 },
];

const counterfactualData = [
  { attribute: "University", original: "Stanford University", counterfactual: "State University", originalScore: 85, counterfactualScore: 83, impact: "neutral" as const },
  { attribute: "Location", original: "San Francisco, CA", counterfactual: "Rural Ohio", originalScore: 85, counterfactualScore: 72, impact: "negative" as const },
  { attribute: "Company", original: "TechCorp Inc.", counterfactual: "Small Startup", originalScore: 85, counterfactualScore: 81, impact: "neutral" as const },
];

const shapFeatures = [
  { name: "Technical Skills", value: 92, impact: 12.5 },
  { name: "Years Experience", value: 6, impact: 8.2 },
  { name: "Leadership Score", value: 78, impact: 5.1 },
  { name: "Communication", value: 90, impact: 4.8 },
  { name: "University Tier", value: 1, impact: -2.3 },
  { name: "Location Match", value: 85, impact: -3.5 },
];

export default function CandidateAnalysis() {
  return (
    <DashboardLayout title="Candidate Analysis" subtitle="Comprehensive bias-free candidate evaluation">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Resume Preview */}
        <ResumePreview candidate={candidateData} />
        
        {/* Bias Indicators */}
        <BiasIndicators indicators={biasIndicators} fairScore={82} />
      </div>

      {/* Skill Match Chart */}
      <div className="mb-6">
        <SkillRadarChart data={skillData} />
      </div>

      {/* Counterfactual & SHAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CounterfactualComparison comparisons={counterfactualData} />
        <SHAPExplanation features={shapFeatures} baseScore={60} finalScore={85} />
      </div>
    </DashboardLayout>
  );
}
