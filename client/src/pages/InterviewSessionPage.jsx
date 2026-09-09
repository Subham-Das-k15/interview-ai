import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTimer } from '../hooks/useTimer';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { interviewService } from '../services/interviewService';
import { QuestionCard } from '../components/interview/QuestionCard';
import { Timer } from '../components/interview/Timer';
import { ProgressBar } from '../components/interview/ProgressBar';
import { SpeechInput } from '../components/interview/SpeechInput';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Sparkles,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  Clock,
  RotateCcw,
} from 'lucide-react';

export const InterviewSessionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useAuth();

  const sessionData = location.state || {};
  const topic = sessionData.topic || 'JavaScript';
  const difficulty = sessionData.difficulty || 'Medium';
  const questions = sessionData.questions || [
    {
      question: 'Explain the event loop in JavaScript and the difference between microtasks and macrotasks.',
      expectedConcepts: ['Single-threaded call stack', 'Microtask Queue', 'Macrotask Queue', 'Execution priority'],
      suggestedAnswer: 'The event loop checks the call stack and executes microtasks before macrotasks.',
    }
  ];
  const isResumeBased = sessionData.isResumeBased || false;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => ''));
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationStage, setEvaluationStage] = useState('Analyzing technical accuracy...');

  const { seconds, formattedTime } = useTimer({ initialSeconds: 0 });

  // Speech to text integration
  const handleTranscript = (text) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = (copy[currentIndex] ? `${copy[currentIndex]} ` : '') + text;
      return copy;
    });
  };

  const { isListening, startListening, stopListening, hasSupport } =
    useSpeechRecognition({ onTranscriptChange: handleTranscript });

  const currentQuestion = questions[currentIndex] || {};
  const currentAnswer = answers[currentIndex] || '';
  const currentWordCount = currentAnswer.trim().split(/\s+/).filter(Boolean).length;

  const handleAnswerChange = (val) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = val;
      return copy;
    });
  };

  const handleNext = () => {
    if (isListening) stopListening();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsSubmitModalOpen(true);
    }
  };

  const handlePrev = () => {
    if (isListening) stopListening();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleToggleBookmarkCurrent = () => {
    toggleBookmark({
      question: currentQuestion.question,
      topic,
      difficulty,
      expectedConcepts: currentQuestion.expectedConcepts,
      suggestedAnswer: currentQuestion.suggestedAnswer,
    });
  };

  const handleSubmitInterview = async () => {
    if (isListening) stopListening();
    setIsSubmitModalOpen(false);
    setIsEvaluating(true);

    const stages = [
      'Reading your technical explanations...',
      'Evaluating algorithmic concepts & accuracy...',
      'Assessing clarity and communication depth with Gemini...',
      'Compiling final scorecards & actionable feedback...',
    ];

    let stageIdx = 0;
    const interval = setInterval(() => {
      stageIdx = (stageIdx + 1) % stages.length;
      setEvaluationStage(stages[stageIdx]);
    }, 1500);

    try {
      const payload = {
        topic,
        difficulty,
        questions,
        answers: answers.map((ans, idx) => ({
          questionIndex: idx,
          userAnswer: ans,
        })),
        durationSeconds: seconds,
        isResumeBased,
      };

      const res = await interviewService.evaluateInterview(payload);
      clearInterval(interval);

      if (res.success && res.interview?._id) {
        navigate(`/results/${res.interview._id}`, {
          state: { interview: res.interview },
        });
      } else {
        alert('Evaluation failed. Please check server logs.');
        setIsEvaluating(false);
      }
    } catch (err) {
      clearInterval(interval);
      console.error('Error submitting interview:', err);
      alert('Error evaluating interview: ' + (err.response?.data?.message || err.message));
      setIsEvaluating(false);
    }
  };

  const answeredCount = answers.filter((a) => a && a.trim().length > 0).length;

  if (isEvaluating) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 animate-ping" />
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-glow animate-bounce">
            <Sparkles className="w-10 h-10" />
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-white font-heading mb-2">
          Gemini AI Evaluation in Progress
        </h3>
        <p className="text-indigo-400 font-semibold text-sm mb-6 animate-pulse">
          {evaluationStage}
        </p>

        <div className="max-w-md p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed text-left">
          <span className="font-bold text-slate-200 block mb-1">💡 What Gemini analyzes:</span>
          • Technical precision & correctness of terminology<br />
          • Coverage of critical architectural/algorithmic concepts<br />
          • Communication structure and delivery quality
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-extrabold text-white font-heading">
            {topic} Mock Interview
          </h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
            {difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Timer formattedTime={formattedTime} />
          <Button
            variant="danger"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            icon={Send}
          >
            End & Submit
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar current={currentIndex} total={questions.length} />

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        index={currentIndex}
        total={questions.length}
        topic={topic}
        difficulty={difficulty}
        isBookmarked={isBookmarked(currentQuestion.question)}
        onToggleBookmark={handleToggleBookmarkCurrent}
      />

      {/* Answer Area */}
      <Card className="p-6 space-y-4 border-slate-800 bg-slate-900/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white font-heading">
              Your Answer
            </span>
            <span className="text-xs text-slate-400">
              ({currentWordCount} words • {currentAnswer.length} characters)
            </span>
          </div>

          <SpeechInput
            isListening={isListening}
            onStart={startListening}
            onStop={stopListening}
            hasSupport={hasSupport}
          />
        </div>

        <div className="relative">
          <textarea
            rows={8}
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your technical response here, or click 'Voice Input' to speak naturally. Explain concepts, syntax, edge cases, and performance trade-offs..."
            className="w-full p-4 rounded-xl glass-input text-sm text-white font-sans leading-relaxed resize-y min-h-[180px]"
          />
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
          <span>
            {currentWordCount < 20 ? (
              <span className="text-amber-400">
                Aim for at least 30-50 words for a comprehensive evaluation.
              </span>
            ) : (
              <span className="text-emerald-400">
                Good response depth! You can continue expanding or proceed to the next question.
              </span>
            )}
          </span>

          {currentAnswer && (
            <button
              onClick={() => handleAnswerChange('')}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Clear Answer
            </button>
          )}
        </div>
      </Card>

      {/* Question Navigation Drawer & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Button
          variant="secondary"
          size="md"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          icon={ChevronLeft}
        >
          Previous
        </Button>

        {/* Question Bubbles */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {questions.map((_, idx) => {
            const isCurrent = idx === currentIndex;
            const hasAnswer = answers[idx] && answers[idx].trim().length > 0;

            return (
              <button
                key={idx}
                onClick={() => {
                  if (isListening) stopListening();
                  setCurrentIndex(idx);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold font-heading transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                    : hasAnswer
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleNext}
          icon={currentIndex === questions.length - 1 ? Send : ChevronRight}
        >
          {currentIndex === questions.length - 1 ? 'Review & Submit' : 'Next Question'}
        </Button>
      </div>

      {/* Submission Confirmation Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Ready to Submit Interview?"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            You have answered{' '}
            <span className="font-bold text-white">
              {answeredCount} of {questions.length}
            </span>{' '}
            questions. Once submitted, your answers will be reviewed by the Gemini AI evaluation engine.
          </p>

          {answeredCount < questions.length && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                You have {questions.length - answeredCount} unanswered question(s). Unanswered questions will receive 0 points.
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsSubmitModalOpen(false)}
            >
              Continue Answering
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmitInterview}
              icon={Sparkles}
            >
              Submit for AI Feedback
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
