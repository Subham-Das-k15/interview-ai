import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { interviewService } from '../services/interviewService';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { exportInterviewReportPDF } from '../utils/pdfExport';
import {
  Trophy,
  Award,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileDown,
  RotateCcw,
  ArrowLeft,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ResultsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useAuth();

  const [interview, setInterview] = useState(location.state?.interview || null);
  const [isLoading, setIsLoading] = useState(!location.state?.interview);
  const [expandedAnswers, setExpandedAnswers] = useState({});

  useEffect(() => {
    const fetchInterview = async () => {
      if (!interview && id) {
        try {
          setIsLoading(true);
          const res = await interviewService.getInterviewById(id);
          if (res.success) {
            setInterview(res.interview);
          }
        } catch (err) {
          console.error('Failed to load interview report:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [id, interview]);

  // Launch celebratory confetti if score is great!
  useEffect(() => {
    if (interview && interview.score >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // confetti safe fallback
      }
    }
  }, [interview]);

  const toggleQuestionDetails = (idx) => {
    setExpandedAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleRetake = () => {
    navigate('/interview/setup');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <Skeleton count={1} className="h-44" />
        <Skeleton count={3} className="h-28" />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Interview Report Not Found</h3>
        <p className="text-sm text-slate-400">
          The requested interview could not be loaded or belongs to another account.
        </p>
        <Link to="/dashboard">
          <Button variant="primary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const { score, feedback = {}, questions = [], answers = [], topic, difficulty } = interview;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:max-w-full">
      {/* Top Breadcrumb / Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportInterviewReportPDF(interview)}
            icon={FileDown}
          >
            Export PDF Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRetake}
            icon={RotateCcw}
          >
            Retake Interview
          </Button>
        </div>
      </div>

      {/* Main Scorecard Hero Card */}
      <Card className="p-8 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-purple-950/40 border-indigo-500/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-6 flex-col sm:flex-row">
            {/* Score Circle */}
            <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={
                    score >= 80
                      ? 'text-emerald-400'
                      : score >= 60
                      ? 'text-indigo-400'
                      : 'text-amber-400'
                  }
                  strokeDasharray={`${score}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-white font-heading">{score}%</span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">Score</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                <Badge variant="indigo" size="sm">{topic}</Badge>
                <Badge variant={difficulty === 'Hard' ? 'rose' : difficulty === 'Medium' ? 'amber' : 'emerald'} size="sm">
                  {difficulty}
                </Badge>
                {interview.isResumeBased && (
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-semibold">
                    Resume Tailored
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                {score >= 85
                  ? 'Outstanding Performance!'
                  : score >= 70
                  ? 'Solid Baseline — Ready for Refinement'
                  : 'Good Practice Session'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
                {feedback.overallSummary}
              </p>
            </div>
          </div>

          {/* Sub-scores Rubric */}
          <div className="flex flex-col gap-3 w-full md:w-56 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400">Technical Accuracy</span>
                <span className="text-indigo-400">{feedback.technicalAccuracy || score}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${feedback.technicalAccuracy || score}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400">Completeness</span>
                <span className="text-purple-400">{feedback.completeness || score}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${feedback.completeness || score}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400">Communication Quality</span>
                <span className="text-emerald-400">{feedback.communicationQuality || score}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${feedback.communicationQuality || score}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Strengths & Weaknesses 2-Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-emerald-500/20">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="text-base font-bold text-white font-heading">
              Candidate Strengths
            </h4>
          </div>
          <ul className="space-y-2.5">
            {(feedback.strengths || ['Demonstrated clear familiarity with core terminology.']).map((str, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 border-rose-500/20">
          <div className="flex items-center gap-2 mb-4 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="text-base font-bold text-white font-heading">
              Areas to Improve
            </h4>
          </div>
          <ul className="space-y-2.5">
            {(feedback.weaknesses || ['Provide more concrete edge cases and complexity trade-offs.']).map((weak, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Actionable Tips */}
      {feedback.actionableTips && feedback.actionableTips.length > 0 && (
        <Card className="p-6 border-indigo-500/20">
          <div className="flex items-center gap-2 mb-4 text-indigo-400">
            <Lightbulb className="w-5 h-5" />
            <h4 className="text-base font-bold text-white font-heading">
              Actionable Next Steps from Gemini
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {feedback.actionableTips.map((tip, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed"
              >
                <span className="font-bold text-indigo-400 block mb-1">Tip #{i + 1}</span>
                {tip}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Question-by-Question Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-white font-heading flex items-center gap-2">
          <span>Question-by-Question Breakdown</span>
          <span className="text-xs font-normal text-slate-400">
            ({answers.length || questions.length} questions evaluated)
          </span>
        </h3>

        {answers.map((item, idx) => {
          const q = questions[idx] || {};
          const isExpanded = expandedAnswers[idx] !== false; // expanded by default
          const qScore = item.score || 0;

          return (
            <Card key={idx} className="p-6 border-slate-800 bg-slate-900/90">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-indigo-400">Q{idx + 1}</span>
                    <Badge variant={qScore >= 8 ? 'emerald' : qScore >= 5 ? 'amber' : 'rose'} size="sm">
                      Score: {qScore} / 10
                    </Badge>
                  </div>
                  <h4 className="text-base font-bold text-white font-heading leading-relaxed">
                    {item.question || q.question}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      toggleBookmark({
                        question: item.question || q.question,
                        topic,
                        difficulty,
                        expectedConcepts: q.expectedConcepts,
                        suggestedAnswer: item.suggestedAnswer || q.suggestedAnswer,
                      })
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked(item.question || q.question)
                          ? 'fill-amber-400 text-amber-400'
                          : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => toggleQuestionDetails(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-5 space-y-4 pt-4 border-t border-slate-800 animate-in fade-in duration-200">
                  {/* Candidate Answer */}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Your Answer:
                    </span>
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                      {item.userAnswer || (
                        <span className="text-slate-500 italic">No answer submitted.</span>
                      )}
                    </div>
                  </div>

                  {/* Model Suggested Answer */}
                  {(item.suggestedAnswer || q.suggestedAnswer) && (
                    <div>
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1.5">
                        Ideal Model Answer & Key Concepts:
                      </span>
                      <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed font-sans">
                        {item.suggestedAnswer || q.suggestedAnswer}
                      </div>
                    </div>
                  )}

                  {/* Feedback Strengths and Critiques */}
                  {(item.strengths?.length > 0 || item.weaknesses?.length > 0) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {item.strengths?.length > 0 && (
                        <div className="text-xs text-emerald-300/90 space-y-1">
                          <span className="font-semibold block text-emerald-400">Strengths:</span>
                          {item.strengths.map((s, i) => (
                            <p key={i}>• {s}</p>
                          ))}
                        </div>
                      )}
                      {item.weaknesses?.length > 0 && (
                        <div className="text-xs text-rose-300/90 space-y-1">
                          <span className="font-semibold block text-rose-400">Weaknesses / Missing:</span>
                          {item.weaknesses.map((w, i) => (
                            <p key={i}>• {w}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
