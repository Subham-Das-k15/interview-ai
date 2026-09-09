import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { ResumeUploader } from '../components/resume/ResumeUploader';
import { SkillBadgeCloud } from '../components/resume/SkillBadgeCloud';
import { GapRadar } from '../components/resume/GapRadar';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Toast } from '../components/common/Toast';
import { Skeleton } from '../components/common/Skeleton';
import {
  FileText,
  Sparkles,
  UploadCloud,
  Layers,
  ArrowRight,
  ClipboardPaste,
} from 'lucide-react';

export const ResumeAnalysisPage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [showPasteMode, setShowPasteMode] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await resumeService.getLatestResume();
        if (res.success && res.resume) {
          setResumeData(res.resume);
        }
      } catch (err) {
        // No resume yet
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const handleUpload = async (formData) => {
    setIsLoading(true);
    try {
      const res = await resumeService.uploadResume(formData);
      if (res.success && res.resume) {
        setResumeData(res.resume);
        setToast({ type: 'success', message: 'Resume uploaded and analyzed successfully!' });
      }
    } catch (err) {
      console.error('Resume upload error:', err);
      setToast({
        type: 'error',
        message: err.response?.data?.message || 'Failed to analyze resume file.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzePastedText = async () => {
    if (!pastedText || pastedText.trim().length < 50) {
      setToast({ type: 'error', message: 'Please paste at least 50 characters of resume text.' });
      return;
    }

    setIsLoading(true);
    try {
      const res = await resumeService.analyzeText(pastedText);
      if (res.success && res.resume) {
        setResumeData(res.resume);
        setShowPasteMode(false);
        setToast({ type: 'success', message: 'Resume text analyzed successfully!' });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: err.response?.data?.message || 'Failed to analyze text.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartTailoredInterview = () => {
    navigate('/interview/setup');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
              ATS & Skills Intelligence
            </span>
          </div>
          <h1 className="text-3xl font-black text-white font-heading">
            Resume Analyzer & Skill Gap Radar
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Extract technical skills, uncover missing placement keywords, and generate customized mock interviews.
          </p>
        </div>

        <button
          onClick={() => setShowPasteMode(!showPasteMode)}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline self-start sm:self-auto"
        >
          {showPasteMode ? '← Upload PDF file instead' : 'Or paste resume text directly →'}
        </button>
      </div>

      {/* Upload or Paste Section */}
      {showPasteMode ? (
        <Card className="p-6 border-indigo-500/20">
          <h4 className="text-base font-bold text-white mb-2 font-heading flex items-center gap-2">
            <ClipboardPaste className="w-5 h-5 text-indigo-400" />
            Paste Resume Plain Text
          </h4>
          <p className="text-xs text-slate-400 mb-4">
            Copy and paste your resume text, bio, or skills summary below to run the AI ATS analysis.
          </p>
          <textarea
            rows={8}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="John Doe - Full Stack Developer... Experience: Built React & Node.js microservices..."
            className="w-full p-4 rounded-xl glass-input text-sm text-white font-sans leading-relaxed mb-4"
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" size="md" onClick={() => setShowPasteMode(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleAnalyzePastedText}
              isLoading={isLoading}
              icon={Sparkles}
            >
              Analyze Text with AI
            </Button>
          </div>
        </Card>
      ) : (
        <ResumeUploader onUpload={handleUpload} isLoading={isLoading} />
      )}

      {/* Results Section */}
      {isInitialLoading ? (
        <Skeleton count={2} className="h-64" />
      ) : resumeData ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Gap Radar & ATS Score */}
          <GapRadar
            atsScore={resumeData.atsScore || 80}
            missingSkills={resumeData.missingSkills || []}
            strengths={resumeData.strengths || []}
            weaknesses={resumeData.weaknesses || []}
            recommendations={resumeData.recommendations || []}
            onStartTailoredInterview={handleStartTailoredInterview}
          />

          {/* Categorized Skills Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-extrabold text-white font-heading flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Parsed Technical Skills Architecture
              </h3>
              <span className="text-xs text-slate-400">
                {resumeData.extractedSkills?.length || 0} skills detected
              </span>
            </div>

            <SkillBadgeCloud
              categorizedSkills={resumeData.categorizedSkills}
              allSkills={resumeData.extractedSkills}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
