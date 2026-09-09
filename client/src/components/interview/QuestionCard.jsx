import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Bookmark, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const QuestionCard = ({
  question,
  index,
  total,
  topic,
  difficulty,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [showHints, setShowHints] = useState(false);

  return (
    <Card className="border-indigo-500/20 bg-slate-900/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="indigo" size="sm">
            {topic}
          </Badge>
          <Badge
            variant={difficulty === 'Hard' ? 'rose' : difficulty === 'Medium' ? 'amber' : 'emerald'}
            size="sm"
          >
            {difficulty}
          </Badge>
          <span className="text-xs text-slate-400">
            Q{index + 1} of {total}
          </span>
        </div>

        <button
          onClick={onToggleBookmark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            isBookmarked
              ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed font-heading mb-4">
        {question.question}
      </h3>

      {question.expectedConcepts && question.expectedConcepts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{showHints ? 'Hide Key Concept Hints' : 'Reveal Key Concepts to Cover'}</span>
            {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showHints && (
            <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 animate-in fade-in duration-200">
              <p className="text-xs text-slate-400 mb-2">
                Tip: The AI evaluator checks for coverage of these key technical areas:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {question.expectedConcepts.map((concept, i) => (
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
        </div>
      )}
    </Card>
  );
};
