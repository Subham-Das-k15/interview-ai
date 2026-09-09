import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  glow = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 p-6 transition-all duration-300 ${
        hover ? 'hover:border-slate-700 hover:bg-slate-900/90 hover:-translate-y-0.5 cursor-pointer shadow-lg hover:shadow-indigo-500/5' : ''
      } ${glow ? 'shadow-glow border-indigo-500/30' : 'shadow-xl'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
