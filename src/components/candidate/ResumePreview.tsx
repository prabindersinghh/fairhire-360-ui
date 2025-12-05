import { motion } from "framer-motion";
import { FileText, MapPin, Mail, Phone, Calendar, Briefcase, GraduationCap } from "lucide-react";

interface CandidateData {
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  currentRole: string;
  company: string;
  skills: string[];
  summary: string;
}

interface ResumePreviewProps {
  candidate: CandidateData;
}

export function ResumePreview({ candidate }: ResumePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 h-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Resume Preview</h3>
      </div>

      {/* Candidate Header */}
      <div className="mb-6 pb-6 border-b border-border/50">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{candidate.name}</h2>
            <p className="text-sm text-primary">{candidate.currentRole}</p>
            <p className="text-sm text-muted-foreground">{candidate.company}</p>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="truncate">{candidate.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>{candidate.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{candidate.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{candidate.experience} experience</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          Professional Summary
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {candidate.summary}
        </p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          Education
        </h4>
        <p className="text-sm text-muted-foreground">{candidate.education}</p>
      </div>

      {/* Skills */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
