import mongoose from 'mongoose';

const QuestionItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  expectedConcepts: [{ type: String }],
  suggestedAnswer: { type: String },
});

const AnswerEvaluationSchema = new mongoose.Schema({
  questionIndex: { type: Number, required: true },
  question: { type: String, required: true },
  userAnswer: { type: String, default: '' },
  score: { type: Number, default: 0 }, // 0 to 10 scale for individual question
  technicalScore: { type: Number, default: 0 },
  completenessScore: { type: Number, default: 0 },
  communicationScore: { type: Number, default: 0 },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  suggestedAnswer: { type: String },
});

const FeedbackSchema = new mongoose.Schema({
  overallSummary: { type: String, default: 'Interview completed successfully.' },
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  technicalAccuracy: { type: Number, default: 0 }, // 0 to 100
  completeness: { type: Number, default: 0 },
  communicationQuality: { type: Number, default: 0 },
  actionableTips: [{ type: String }],
});

const InterviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    topic: {
      type: String,
      required: [true, 'Interview topic is required'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    questionCount: {
      type: Number,
      default: 5,
    },
    questions: [QuestionItemSchema],
    answers: [AnswerEvaluationSchema],
    score: {
      type: Number,
      default: 0, // 0 - 100 overall percentage
    },
    feedback: FeedbackSchema,
    isFavorite: {
      type: Boolean,
      default: false,
    },
    durationSeconds: {
      type: Number,
      default: 0,
    },
    isResumeBased: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['generated', 'in-progress', 'completed'],
      default: 'completed',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Interview', InterviewSchema);
