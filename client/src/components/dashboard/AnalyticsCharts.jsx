import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { Card } from '../common/Card';
import { TrendingUp, BarChart2, PieChart as PieIcon, Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-semibold text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-indigo-400">
          Score: {payload[0].value}%
        </p>
        {payload[0].payload.topic && (
          <p className="text-xs text-slate-300 mt-0.5">
            Topic: {payload[0].payload.topic}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const AnalyticsCharts = ({
  scoreOverTime = [],
  topicBreakdown = [],
  difficultyBreakdown = [],
  weeklyActivity = [],
}) => {
  const diffColors = {
    Easy: '#10b981', // emerald
    Medium: '#f59e0b', // amber
    Hard: '#ef4444', // red
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Score Progression Over Time */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                Performance Progression
              </h4>
              <p className="text-xs text-slate-400">
                Score trajectory across consecutive mock interviews
              </p>
            </div>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Target: 85%+
          </span>
        </div>

        <div className="h-64 w-full">
          {scoreOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="session" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#818cf8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              Complete interviews to see your score trajectory
            </div>
          )}
        </div>
      </Card>

      {/* Chart 2: Topic-wise Performance */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                Topic Mastery Breakdown
              </h4>
              <p className="text-xs text-slate-400">Average score by interview subject</p>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          {topicBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="topic" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Avg Score']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="avgScore" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              No topic data available yet
            </div>
          )}
        </div>
      </Card>

      {/* Chart 3: Difficulty Distribution */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <PieIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                Difficulty Distribution
              </h4>
              <p className="text-xs text-slate-400">Interviews by complexity tier</p>
            </div>
          </div>
        </div>

        <div className="h-56 w-full flex items-center justify-center">
          {difficultyBreakdown.some((d) => d.count > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyBreakdown}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                >
                  {difficultyBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={diffColors[entry.name] || '#6366f1'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name, entry) => [
                    `${val} sessions (${entry.payload.avgScore}% avg)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-sm text-slate-500">No difficulty data yet</div>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-2">
          {difficultyBreakdown.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: diffColors[item.name] || '#6366f1' }}
              />
              <span className="text-slate-300 font-medium">{item.name}</span>
              <span className="text-slate-500 font-bold">({item.count})</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Chart 4: Weekly Consistency */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                Weekly Practice Momentum
              </h4>
              <p className="text-xs text-slate-400">Daily mock interview session frequency</p>
            </div>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                formatter={(val) => [`${val} sessions`, 'Practice']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                }}
              />
              <Bar dataKey="sessions" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
