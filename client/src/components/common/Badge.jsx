import React from 'react';

export const Badge = ({
  children,
  variant = 'indigo',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variants = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    slate: 'bg-slate-800 text-slate-300 border-slate-700/80',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1.5 text-sm font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variants[variant] || variants.indigo} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'emerald'
              ? 'bg-emerald-400'
              : variant === 'amber'
              ? 'bg-amber-400'
              : variant === 'rose'
              ? 'bg-rose-400'
              : 'bg-indigo-400'
          }`}
        />
      )}
      {children}
    </span>
  );
};
