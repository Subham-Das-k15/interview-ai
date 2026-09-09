import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import {
  Bookmark,
  Trash2,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const BookmarksPage = () => {
  const { user, toggleBookmark } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [expandedCards, setExpandedCards] = useState({});

  const bookmarkedQuestions = user?.bookmarkedQuestions || [];

  const topics = ['All', ...new Set(bookmarkedQuestions.map((q) => q.topic).filter(Boolean))];

  const filteredQuestions =
    selectedTopic === 'All'
      ? bookmarkedQuestions
      : bookmarkedQuestions.filter((q) => q.topic === selectedTopic);

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleRemove = (q) => {
    toggleBookmark({
      question: q.question,
      topic: q.topic,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="amber" size="sm">Personal Question Vault</Badge>
        </div>
        <h1 className="text-3xl font-black text-white font-heading">
          Bookmarked Interview Questions
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Revise challenging technical queries, key concepts, and model answers before your real interview.
        </p>
      </div>

      {/* Topic Filter Pills */}
      {topics.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap pb-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTopic === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Bookmarked Questions List */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No Bookmarked Questions"
          description="Bookmark challenging questions during your mock interviews or review sessions to revise them anytime."
          actionText="Practice Interviews"
          onAction={() => window.location.href = '/interview/setup'}
        />
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = expandedCards[idx];

            return (
              <Card key={idx} className="p-6 border-slate-800 bg-slate-900/90">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="indigo" size="sm">
                        {q.topic || 'Technical'}
                      </Badge>
                      {q.difficulty && (
                        <Badge
                          variant={
                            q.difficulty === 'Hard'
                              ? 'rose'
                              : q.difficulty === 'Medium'
                              ? 'amber'
                              : 'emerald'
                          }
                          size="sm"
                        >
                          {q.difficulty}
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white font-heading leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRemove(q)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 animate-in fade-in duration-200">
                    {/* Expected Concepts */}
                    {q.expectedConcepts && q.expectedConcepts.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                          Key Technical Concepts:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {q.expectedConcepts.map((concept, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-300 border border-indigo-800/40"
                            >
                              • {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Answer */}
                    {q.suggestedAnswer && (
                      <div>
                        <span className="text-xs font-semibold text-indigo-400 block mb-1.5">
                          Model Answer:
                        </span>
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                          {q.suggestedAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
