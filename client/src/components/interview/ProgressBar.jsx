import React from 'react';

export const ProgressBar = ({ current, total }) => {
  const percentage = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>
          Question <span className="text-white font-bold">{current + 1}</span> of{' '}
          <span className="text-white font-bold">{total}</span>
        </span>
        <span className="text-indigo-400">{percentage}% Completed</span>
      </div>
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
