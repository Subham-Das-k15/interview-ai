import React, { useState, useRef } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export const ResumeUploader = ({ onUpload, isLoading = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    setErrorMessage('');
    if (!file) return;

    const allowedTypes = ['application/pdf', 'text/plain'];
    const isPDF = file.name.toLowerCase().endsWith('.pdf');
    const isTXT = file.name.toLowerCase().endsWith('.txt');

    if (!isPDF && !isTXT && !allowedTypes.includes(file.type)) {
      setErrorMessage('Please upload a PDF (.pdf) or text (.txt) resume file.');
      setSelectedFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('resume', selectedFile);
    onUpload(formData);
  };

  return (
    <Card className="p-8 border-indigo-500/20 bg-slate-900/80">
      <form onSubmit={handleSubmit}>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt"
          onChange={handleChange}
          className="hidden"
        />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            dragActive
              ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
              : selectedFile
              ? 'border-emerald-500/50 bg-emerald-950/20'
              : 'border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-850/50'
          }`}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-white mb-1">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-400">
                {(selectedFile.size / 1024).toFixed(1)} KB • Click or drop another file to replace
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-white mb-1">
                Drag & drop your resume here, or <span className="text-indigo-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-400">
                Supports PDF or TXT format (max 10MB)
              </p>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Gemini parses projects, skills, and missing keywords in seconds
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!selectedFile || isLoading}
            isLoading={isLoading}
            icon={Sparkles}
          >
            {isLoading ? 'Analyzing Resume...' : 'Analyze Resume with AI'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
