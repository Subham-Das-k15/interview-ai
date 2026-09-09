import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Toast } from '../components/common/Toast';
import {
  User,
  Mail,
  Briefcase,
  Layers,
  Key,
  Save,
  Sparkles,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full Stack Developer');
  const [experienceLevel, setExperienceLevel] = useState(
    user?.experienceLevel || 'Entry Level / Fresher'
  );
  const [skillsInput, setSkillsInput] = useState(
    (user?.skills || ['JavaScript', 'React', 'Node.js']).join(', ')
  );
  const [selectedAvatar, setSelectedAvatar] = useState(
    user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=AlexJohnson'
  );
  const [customApiKey, setCustomApiKey] = useState(
    () => localStorage.getItem('custom_gemini_key') || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const avatarSeeds = ['Developer', 'Engineer', 'CodeWizard', 'TechGuru', 'AlexJohnson', 'SarahPro'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skills = skillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await updateProfile({
        name,
        targetRole,
        experienceLevel,
        skills,
        avatar: selectedAvatar,
      });

      // Save or clear custom API key
      if (customApiKey.trim()) {
        localStorage.setItem('custom_gemini_key', customApiKey.trim());
      } else {
        localStorage.removeItem('custom_gemini_key');
      }

      setToast({ type: 'success', message: 'Profile and preferences updated successfully!' });
    } catch (err) {
      setToast({
        type: 'error',
        message: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="indigo" size="sm">Candidate Account</Badge>
        </div>
        <h1 className="text-3xl font-black text-white font-heading">
          Profile & AI Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your candidate identity, skills portfolio, and AI engine credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Selection */}
        <Card className="p-6 border-slate-800">
          <h4 className="text-sm font-bold text-white mb-4 font-heading">
            Choose Your Candidate Avatar
          </h4>
          <div className="flex items-center gap-4 flex-wrap">
            {avatarSeeds.map((seed) => {
              const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
              const isSelected = selectedAvatar === url;
              return (
                <button
                  key={seed}
                  type="button"
                  onClick={() => setSelectedAvatar(url)}
                  className={`w-14 h-14 rounded-2xl p-1 border-2 transition-all overflow-hidden ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/20 scale-105 shadow-glow'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-500'
                  }`}
                >
                  <img src={url} alt={seed} className="w-full h-full object-contain" />
                </button>
              );
            })}
          </div>
        </Card>

        {/* Profile Information */}
        <Card className="p-6 space-y-4 border-slate-800">
          <h4 className="text-sm font-bold text-white font-heading">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-400 bg-slate-950/60 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white bg-slate-900"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="DevOps / Cloud Engineer">DevOps / Cloud Engineer</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="Mobile App Developer">Mobile App Developer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Experience Tier
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white bg-slate-900"
              >
                <option value="Entry Level / Fresher">Entry Level / Fresher</option>
                <option value="Mid Level (1-3 yrs)">Mid Level (1-3 yrs)</option>
                <option value="Senior (4+ yrs)">Senior (4+ yrs)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Technical Skills (comma separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="JavaScript, React, Node.js, Express, MongoDB, Docker, Git"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white"
            />
          </div>
        </Card>

        {/* Gemini AI Key Settings */}
        <Card className="p-6 border-indigo-500/20 bg-slate-900/90">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-400" />
                Google Gemini API Key (Optional Override)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                By default, the server uses its configured backend key. You can optionally supply your own free Gemini API key here.
              </p>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Get Free Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <input
            type="password"
            value={customApiKey}
            onChange={(e) => setCustomApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white font-mono mt-2"
          />
        </Card>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            icon={Save}
            className="shadow-glow"
          >
            Save Profile & Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
