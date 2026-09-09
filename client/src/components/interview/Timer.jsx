import React from 'react';
import { Clock } from 'lucide-react';

export const Timer = ({ formattedTime, isLowTime = false }) => {
  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border backdrop-blur-md text-sm font-mono font-semibold transition-all ${
        isLowTime
          ? 'bg-rose-500/15 border-rose-500/30 text-rose-400 animate-pulse'
          : 'bg-slate-800/80 border-slate-700/60 text-indigo-300'
      }`}
    >
      <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400' : 'text-indigo-400'}`} />
      <span>{formattedTime}</span>
    </div>
  );
};
