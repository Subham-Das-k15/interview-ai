import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { formatDate, formatDuration, getScoreBadgeVariant } from '../utils/formatters';
import {
  Search,
  Filter,
  Star,
  Trash2,
  ChevronRight,
  History as HistoryIcon,
  Calendar,
  Clock,
  RotateCcw,
} from 'lucide-react';

export const HistoryPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await interviewService.getHistory({
        search,
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        favoritesOnly: favoritesOnly ? 'true' : 'false',
      });
      if (res.success) {
        setInterviews(res.interviews || []);
      }
    } catch (err) {
      console.error('Failed to fetch interview history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [search, selectedTopic, selectedDifficulty, favoritesOnly]);

  const handleToggleFavorite = async (id) => {
    try {
      const res = await interviewService.toggleFavorite(id);
      setInterviews((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isFavorite: res.isFavorite } : item
        )
      );
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this interview record?')) return;
    try {
      await interviewService.deleteInterview(id);
      setInterviews((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to delete interview:', err);
    }
  };

  const topics = [
    'All', 'DSA', 'Java', 'JavaScript', 'React', 'Node.js',
    'MongoDB', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP', 'HR Interview'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="indigo" size="sm">Archives & Logs</Badge>
        </div>
        <h1 className="text-3xl font-black text-white font-heading">
          Interview History & Records
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review past scores, model feedback, and retake previous interviews to track progress.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-slate-900/90 border-slate-800">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic or feedback keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-sm text-white"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2 rounded-xl glass-input text-xs text-white bg-slate-900 border-slate-700"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  Topic: {t}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl glass-input text-xs text-white bg-slate-900 border-slate-700"
            >
              <option value="All">Difficulty: All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                favoritesOnly
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-400' : ''}`} />
              <span>Favorites Only</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Interviews List */}
      {isLoading ? (
        <Skeleton count={4} className="h-24 my-2" />
      ) : interviews.length === 0 ? (
        <EmptyState
          icon={HistoryIcon}
          title="No Interviews Found"
          description="No sessions match your search criteria. Try adjusting your filters or start a new mock interview."
          actionText="Start New Mock Interview"
          onAction={() => window.location.href = '/interview/setup'}
        />
      ) : (
        <div className="space-y-3">
          {interviews.map((item) => (
            <Card
              key={item._id}
              className="p-5 hover:border-slate-700 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <button
                    onClick={() => handleToggleFavorite(item._id)}
                    className="mt-1 sm:mt-0 text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        item.isFavorite
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-base font-bold text-white font-heading group-hover:text-indigo-400 transition-colors">
                        {item.topic}
                      </h4>
                      <Badge
                        variant={
                          item.difficulty === 'Hard'
                            ? 'rose'
                            : item.difficulty === 'Medium'
                            ? 'amber'
                            : 'emerald'
                        }
                        size="sm"
                      >
                        {item.difficulty}
                      </Badge>
                      {item.isResumeBased && (
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-semibold">
                          Resume
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {formatDate(item.createdAt)}
                      </span>
                      {item.durationSeconds > 0 && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {formatDuration(item.durationSeconds)}
                        </span>
                      )}
                      <span>
                        {item.questionCount || 5} Questions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex items-center gap-4 justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <Badge variant={getScoreBadgeVariant(item.score)} size="lg" dot>
                    {item.score}% Score
                  </Badge>

                  <div className="flex items-center gap-2">
                    <Link to={`/results/${item._id}`}>
                      <Button variant="outline" size="sm" icon={ChevronRight}>
                        Report
                      </Button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
