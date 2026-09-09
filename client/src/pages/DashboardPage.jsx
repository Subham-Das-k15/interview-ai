import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { interviewService } from '../services/interviewService';
import { MetricCard } from '../components/dashboard/MetricCard';
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts';
import { RecentInterviewsTable } from '../components/dashboard/RecentInterviewsTable';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import {
  Sparkles,
  Trophy,
  Target,
  FileText,
  PlayCircle,
  HelpCircle,
  TrendingUp,
  Bookmark,
  CheckCircle,
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [analyticsRes, historyRes] = await Promise.all([
        interviewService.getAnalytics(),
        interviewService.getHistory({ limit: 5 }),
      ]);

      if (analyticsRes.success) {
        setAnalytics(analyticsRes);
      }
      if (historyRes.success) {
        setRecentInterviews(historyRes.interviews || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleFavorite = async (id) => {
    try {
      const res = await interviewService.toggleFavorite(id);
      setRecentInterviews((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isFavorite: res.isFavorite } : item
        )
      );
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/40 border border-indigo-500/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
              Candidate Command Center
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-medium bg-slate-800/80 px-2 py-0.5 rounded-full">
              {user?.targetRole || 'Full Stack Engineer'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Welcome back, {user?.name || 'Candidate'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Track your mock interview metrics, target weaker topics, and sharpen your technical communication with Google Gemini feedback.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/interview/setup">
            <Button variant="primary" size="md" icon={PlayCircle} className="shadow-glow">
              Start Mock Interview
            </Button>
          </Link>
          <Link to="/resume">
            <Button variant="secondary" size="md" icon={FileText}>
              Analyze Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          <Skeleton count={4} className="h-28" />
        ) : (
          <>
            <MetricCard
              title="Interviews Completed"
              value={analytics?.stats?.totalInterviews || 0}
              subtitle="All-time sessions"
              icon={Target}
              color="indigo"
            />
            <MetricCard
              title="Average Score"
              value={`${analytics?.stats?.averageScore || 0}%`}
              subtitle={
                (analytics?.stats?.averageScore || 0) >= 80
                  ? 'Placement ready'
                  : 'Needs steady practice'
              }
              trend={(analytics?.stats?.averageScore || 0) >= 80 ? 'Top 15%' : null}
              icon={Trophy}
              color="purple"
            />
            <MetricCard
              title="Best Score"
              value={`${analytics?.stats?.bestScore || 0}%`}
              subtitle="Personal record"
              icon={TrendingUp}
              color="emerald"
            />
            <MetricCard
              title="Questions Mastered"
              value={analytics?.stats?.totalQuestionsAnswered || 0}
              subtitle={`${user?.bookmarkedQuestions?.length || 0} bookmarked`}
              icon={HelpCircle}
              color="amber"
            />
          </>
        )}
      </div>

      {/* Analytics Visualizations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Performance & Mastery Analytics
          </h3>
          <span className="text-xs text-slate-400">
            Auto-calculated via Recharts
          </span>
        </div>

        {isLoading ? (
          <Skeleton count={2} className="h-72" />
        ) : (
          <AnalyticsCharts
            scoreOverTime={analytics?.scoreOverTime || []}
            topicBreakdown={analytics?.topicBreakdown || []}
            difficultyBreakdown={analytics?.difficultyBreakdown || []}
            weeklyActivity={analytics?.weeklyActivity || []}
          />
        )}
      </div>

      {/* Recent Interviews Table Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-base font-bold text-white font-heading">
              Recent Mock Interviews
            </h4>
            <p className="text-xs text-slate-400">
              Latest evaluations and AI rubric breakdowns
            </p>
          </div>
          <Link to="/history" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
            View Complete History →
          </Link>
        </div>

        {isLoading ? (
          <Skeleton count={3} className="h-14 my-2" />
        ) : (
          <RecentInterviewsTable
            interviews={recentInterviews}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </Card>
    </div>
  );
};
