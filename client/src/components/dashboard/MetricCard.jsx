import React from 'react';
import { Card } from '../common/Card';

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'indigo',
}) => {
  const colorSchemes = {
    indigo: {
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      valueColor: 'text-white',
      glow: 'hover:border-indigo-500/30',
    },
    purple: {
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      valueColor: 'text-white',
      glow: 'hover:border-purple-500/30',
    },
    emerald: {
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      valueColor: 'text-emerald-400',
      glow: 'hover:border-emerald-500/30',
    },
    amber: {
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      valueColor: 'text-amber-400',
      glow: 'hover:border-amber-500/30',
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.indigo;

  return (
    <Card className={`relative overflow-hidden ${scheme.glow} transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h4 className={`text-3xl font-extrabold font-heading ${scheme.valueColor}`}>
              {value}
            </h4>
            {trend && (
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl border flex items-center justify-center ${scheme.iconBg} shadow-sm`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
};
