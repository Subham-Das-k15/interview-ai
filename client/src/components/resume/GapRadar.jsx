import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export const GapRadar = ({
  atsScore = 75,
  missingSkills = [],
  strengths = [],
  weaknesses = [],
  recommendations = [],
  onStartTailoredInterview,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner: ATS Score & Launch Interview CTA */}
      <Card className="p-6 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/90 border-indigo-500/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${atsScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-white font-heading">{atsScore}</span>
                <span className="text-[9px] uppercase font-semibold text-indigo-400">ATS</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-heading">
                ATS Compatibility & Resume Readiness
              </h4>
              <p className="text-xs text-slate-400 max-w-md mt-0.5">
                Evaluated against industry tech stacks and hiring manager keyword rubrics.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onStartTailoredInterview}
            icon={Sparkles}
            className="w-full sm:w-auto shadow-glow"
          >
            Start Tailored Mock Interview
          </Button>
        </div>
      </Card>

      {/* Missing Skills Gap Analysis */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h4 className="text-base font-bold text-white font-heading">
            Identified Skill Gaps
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Technologies and concepts frequently demanded for Full Stack roles that are missing or underrepresented in your resume:
        </p>

        {missingSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-1.5"
              >
                + {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-emerald-400">
            Great news! No critical tech skill gaps detected for standard full stack roles.
          </p>
        )}
      </Card>

      {/* Strengths & Weaknesses 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="p-6 border-emerald-500/20">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="text-base font-bold text-white font-heading">
              Resume Strengths
            </h4>
          </div>
          <ul className="space-y-2.5">
            {strengths.map((str, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Weaknesses */}
        <Card className="p-6 border-rose-500/20">
          <div className="flex items-center gap-2 mb-4 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="text-base font-bold text-white font-heading">
              Areas to Strengthen
            </h4>
          </div>
          <ul className="space-y-2.5">
            {weaknesses.map((weak, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Placement Recommendations */}
      <Card className="p-6 border-indigo-500/20">
        <div className="flex items-center gap-2 mb-4 text-indigo-400">
          <Lightbulb className="w-5 h-5" />
          <h4 className="text-base font-bold text-white font-heading">
            Recruiter Placement Recommendations
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center text-xs mb-2">
                {i + 1}
              </div>
              {rec}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
