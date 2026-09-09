import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Star, ChevronRight, Calendar, Clock } from 'lucide-react';

export const RecentInterviewsTable = ({ interviews = [], onToggleFavorite }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return 'emerald';
    if (score >= 70) return 'indigo';
    if (score >= 50) return 'amber';
    return 'rose';
  };

  const getDifficultyColor = (diff) => {
    if (diff === 'Hard') return 'rose';
    if (diff === 'Medium') return 'amber';
    return 'emerald';
  };

  if (interviews.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-slate-500">
        No recent interviews found. Generate your first mock session to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="text-xs uppercase bg-slate-900/50 text-slate-400 border-b border-slate-800">
          <tr>
            <th className="px-4 py-3 font-semibold">Topic</th>
            <th className="px-4 py-3 font-semibold">Difficulty</th>
            <th className="px-4 py-3 font-semibold">Score</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {interviews.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-slate-850/50 transition-colors group"
            >
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onToggleFavorite && onToggleFavorite(item._id)}
                    className="text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        item.isFavorite
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                  <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {item.topic}
                  </span>
                  {item.isResumeBased && (
                    <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded font-medium">
                      Resume
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3.5">
                <Badge variant={getDifficultyColor(item.difficulty)} size="sm">
                  {item.difficulty}
                </Badge>
              </td>
              <td className="px-4 py-3.5">
                <Badge variant={getScoreColor(item.score)} size="md" dot>
                  {item.score}%
                </Badge>
              </td>
              <td className="px-4 py-3.5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </td>
              <td className="px-4 py-3.5 text-right">
                <Link to={`/results/${item._id}`}>
                  <Button variant="outline" size="sm" icon={ChevronRight}>
                    Review
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
