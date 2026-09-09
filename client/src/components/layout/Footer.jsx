import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-semibold text-white font-heading">
              InterviewAI
            </span>
            <span className="text-xs text-slate-500">
              — AI-Powered MERN Career Preparation Platform
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>React • Vite • Tailwind • Node • MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
