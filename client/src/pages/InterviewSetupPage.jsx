import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { resumeService } from '../services/resumeService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Code,
  Layers,
  Database,
  Server,
  Network,
  Cpu,
  Coffee,
  Users,
  Briefcase,
  Sparkles,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';

export const InterviewSetupPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('JavaScript');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [isResumeBased, setIsResumeBased] = useState(false);
  const [latestResume, setLatestResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const topics = [
    { id: 'DSA', name: 'DSA & Algorithms', icon: Code, desc: 'Arrays, Trees, Graphs, Sorting & Big-O' },
    { id: 'JavaScript', name: 'JavaScript Core', icon: Sparkles, desc: 'Event Loop, Closures, Async, Promises & V8' },
    { id: 'React', name: 'React.js', icon: Layers, desc: 'Hooks, Fiber, Reconciliation & State Patterns' },
    { id: 'Node.js', name: 'Node.js & Express', icon: Server, desc: 'Streams, Buffers, libuv, REST APIs & Event Loop' },
    { id: 'MongoDB', name: 'MongoDB & NoSQL', icon: Database, desc: 'Aggregation, Indexing, Sharding & Schema Design' },
    { id: 'DBMS', name: 'DBMS & SQL', icon: Database, desc: 'ACID, Normalization, Joins & Transaction Isolation' },
    { id: 'Operating Systems', name: 'Operating Systems', icon: Cpu, desc: 'Processes, Threads, Virtual Memory & Deadlocks' },
    { id: 'Computer Networks', name: 'Computer Networks', icon: Network, desc: 'TCP/IP, UDP, DNS, TLS Handshake & HTTP/2' },
    { id: 'OOP', name: 'OOP & System Design', icon: Layers, desc: 'SOLID Principles, Design Patterns & Architecture' },
    { id: 'Java', name: 'Java Programming', icon: Coffee, desc: 'JVM Internals, Garbage Collection & Multithreading' },
    { id: 'HR Interview', name: 'HR & Behavioral', icon: Users, desc: 'STAR Method, Team Conflicts & Career Roadmap' },
  ];

  const difficulties = [
    { id: 'Easy', name: 'Easy', desc: 'Foundational definitions, standard syntax & basic conceptual questions', color: 'emerald' },
    { id: 'Medium', name: 'Medium', desc: 'Practical problem solving, architecture nuances & common edge cases', color: 'amber' },
    { id: 'Hard', name: 'Hard', desc: 'Deep internal mechanisms, performance bottlenecks & advanced trade-offs', color: 'rose' },
  ];

  useEffect(() => {
    const checkResume = async () => {
      try {
        const res = await resumeService.getLatestResume();
        if (res.success && res.resume) {
          setLatestResume(res.resume);
        }
      } catch (err) {
        // No resume on file yet, perfectly fine
      }
    };
    checkResume();
  }, []);

  const handleStartInterview = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      let res;
      if (isResumeBased) {
        res = await resumeService.generateFromResume({
          difficulty,
          count: questionCount,
        });
      } else {
        res = await interviewService.generateInterview({
          topic: selectedTopic,
          difficulty,
          questionCount,
          isResumeBased: false,
        });
      }

      if (res.success && res.questions?.length > 0) {
        // Navigate to active session with state
        navigate('/interview/session', {
          state: {
            topic: res.topic,
            difficulty: res.difficulty,
            questions: res.questions,
            isResumeBased: Boolean(res.isResumeBased),
          },
        });
      } else {
        setErrorMessage('Failed to generate interview questions. Please try again.');
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 'Error communicating with AI engine.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="indigo" size="sm">Mock Interview Configurator</Badge>
        </div>
        <h1 className="text-3xl font-black text-white font-heading">
          Configure Your Mock Interview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Choose a core topic or generate an interview tailored to your uploaded resume skills.
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Resume Tailored Banner Option */}
      {latestResume && (
        <Card
          onClick={() => setIsResumeBased(!isResumeBased)}
          className={`p-6 cursor-pointer border-2 transition-all ${
            isResumeBased
              ? 'border-indigo-500 bg-indigo-950/30 shadow-glow'
              : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white font-heading">
                    Resume-Tailored Interview Mode
                  </h4>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-semibold uppercase">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gemini will formulate questions specifically targeting skills in your resume ({latestResume.extractedSkills?.slice(0, 5).join(', ')}).
                </p>
              </div>
            </div>

            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                isResumeBased
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'border-slate-600'
              }`}
            >
              {isResumeBased && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>
        </Card>
      )}

      {/* Step 1: Select Topic (disabled if resume based is active) */}
      <div className={isResumeBased ? 'opacity-40 pointer-events-none' : ''}>
        <h3 className="text-base font-bold text-white mb-3 font-heading flex items-center gap-2">
          <span>1. Select Technical Subject</span>
          {isResumeBased && (
            <span className="text-xs font-normal text-slate-400">(Overridden by Resume Mode)</span>
          )}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topics.map((t) => {
            const Icon = t.icon;
            const selected = selectedTopic === t.id && !isResumeBased;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  selected
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md text-white'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    selected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold leading-tight">{t.name}</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{t.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Difficulty Tier */}
      <div>
        <h3 className="text-base font-bold text-white mb-3 font-heading">
          2. Choose Difficulty Level
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {difficulties.map((d) => {
            const selected = difficulty === d.id;
            return (
              <div
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  selected
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-glow'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-bold text-white font-heading">{d.name}</h5>
                  <Badge variant={d.color} size="sm">
                    {d.id}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Question Count */}
      <div>
        <h3 className="text-base font-bold text-white mb-3 font-heading">
          3. Number of Questions
        </h3>
        <div className="grid grid-cols-3 gap-4 max-w-md">
          {[5, 10, 15].map((cnt) => (
            <button
              key={cnt}
              type="button"
              onClick={() => setQuestionCount(cnt)}
              className={`py-3 px-4 rounded-xl border text-sm font-bold font-heading transition-all ${
                questionCount === cnt
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cnt} Questions
              <span className="block text-[10px] font-normal text-slate-300 mt-0.5">
                ~{cnt * 3} mins
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>Interactive timer per question • Speech dictation supported</span>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleStartInterview}
          isLoading={isLoading}
          icon={Sparkles}
          className="shadow-glow"
        >
          {isLoading ? 'Generating Interview with Gemini...' : 'Generate & Begin Interview'}
        </Button>
      </div>
    </div>
  );
};
