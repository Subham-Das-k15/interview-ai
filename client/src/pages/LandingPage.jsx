import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  BarChart3,
  FileText,
  Mic,
  Award,
  Zap,
  Code2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const topics = [
    'DSA', 'Java', 'JavaScript', 'React', 'Node.js',
    'MongoDB', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP', 'HR Interview'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-8 animate-in fade-in duration-700">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Production-Ready MERN & Google Gemini AI Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-heading max-w-4xl mx-auto leading-[1.1] mb-6">
          Master Technical Interviews with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Intelligent AI Feedback
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Generate realistic mock interviews tailored to your target role or resume.
          Answer with voice or text, get instant rubric evaluations, and analyze ATS resume gaps.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to={isAuthenticated ? '/dashboard' : '/register'}>
            <Button variant="primary" size="lg" icon={Sparkles} className="w-full sm:w-auto shadow-glow">
              {isAuthenticated ? 'Go to Dashboard' : 'Start Free Mock Interview'}
            </Button>
          </Link>
          <Link to={isAuthenticated ? '/resume' : '/login'}>
            <Button variant="secondary" size="lg" icon={FileText} className="w-full sm:w-auto">
              Analyze Your Resume
            </Button>
          </Link>
        </div>

        {/* Live Interactive Sneak Peek Card */}
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <Card className="relative p-6 sm:p-8 border-indigo-500/30 bg-slate-900/90 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <Badge variant="indigo" size="sm">React</Badge>
                <Badge variant="amber" size="sm">Medium</Badge>
                <span className="text-xs text-slate-400">Mock Session #104</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                Score: 92%
              </div>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white mb-3">
              "How does React's Virtual DOM diffing algorithm work, and why are keys essential in lists?"
            </h4>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 mb-4 leading-relaxed">
              <span className="font-semibold text-indigo-400 block mb-1">🤖 Gemini AI Rubric Feedback:</span>
              "Exceptional explanation of heuristic O(N) diffing and element reconciliation. Candidate clearly identified how stable keys prevent identity confusion during array mutations."
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-indigo-400" /> Speech-to-text recorded
              </span>
              <span className="text-purple-400 font-medium">
                Technical Accuracy: 94% • Completeness: 90%
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Topics Covered Pill Marquee */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-6">
            Comprehensive Topic Coverage for High-Impact Engineering Roles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {topics.map((topic, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-indigo-500/40 hover:text-white transition-all cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading mb-4">
            Everything You Need to Crack Any Tech Interview
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Built following industry hiring rubrics at top tech firms and startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-7">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Dynamic AI Question Generation
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No repeated question lists. Gemini AI dynamically creates contextual interview questions across 11 technical subjects at Easy, Medium, or Hard tiers.
            </p>
          </Card>

          <Card className="p-7">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              ATS Resume Skills Gap Analysis
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Upload your PDF resume. Our parser extracts technical skills, detects missing keywords required for placement, and generates tailored interview questions.
            </p>
          </Card>

          <Card className="p-7">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Voice Dictation & Timer
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Simulate real spoken interviews using browser speech-to-text. Practice pacing your answers under realistic time constraints with live timers.
            </p>
          </Card>

          <Card className="p-7">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Deep Rubric Evaluation
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Receive fine-grained ratings on Technical Accuracy, Completeness, and Communication Quality, along with model answers and bulleted critique.
            </p>
          </Card>

          <Card className="p-7">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Recharts Performance Analytics
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Track your scores over time with interactive area charts, identify weak subjects with topic radar breakdowns, and measure your weekly consistency.
            </p>
          </Card>

          <Card className="p-7">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-heading">
              Export PDF Reports & Bookmarks
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Save challenging questions to your personal question bank for revision, and export comprehensive interview performance scorecards as printable PDFs.
            </p>
          </Card>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-b from-transparent via-indigo-950/20 to-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading mb-6">
            Ready to Ace Your Next Tech Interview?
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Join candidates preparing for Full-Stack, Frontend, Backend, and Core Engineering interviews with personalized AI feedback.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg" icon={ArrowRight} className="shadow-glow">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
