import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Layers, Server, Database, Cloud, Wrench, Users } from 'lucide-react';

export const SkillBadgeCloud = ({ categorizedSkills = {}, allSkills = [] }) => {
  const categories = [
    {
      title: 'Frontend Development',
      key: 'frontend',
      icon: Layers,
      color: 'indigo',
    },
    {
      title: 'Backend & APIs',
      key: 'backend',
      icon: Server,
      color: 'purple',
    },
    {
      title: 'Databases & Storage',
      key: 'database',
      icon: Database,
      color: 'emerald',
    },
    {
      title: 'Cloud & DevOps',
      key: 'cloudDevOps',
      icon: Cloud,
      color: 'cyan',
    },
    {
      title: 'Tools & Ecosystem',
      key: 'tools',
      icon: Wrench,
      color: 'amber',
    },
    {
      title: 'Soft Skills & Leadership',
      key: 'softSkills',
      icon: Users,
      color: 'rose',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const skills = categorizedSkills[cat.key] || [];

        return (
          <Card key={cat.key} className="p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-lg bg-slate-800 text-slate-300">
                <Icon className="w-4 h-4 text-indigo-400" />
              </div>
              <h5 className="text-sm font-bold text-white font-heading">
                {cat.title}
              </h5>
            </div>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                  <Badge key={i} variant={cat.color} size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">None detected</p>
            )}
          </Card>
        );
      })}
    </div>
  );
};
