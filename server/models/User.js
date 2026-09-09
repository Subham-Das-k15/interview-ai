import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const BookmarkedQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  expectedConcepts: [{ type: String }],
  suggestedAnswer: { type: String },
  savedAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: 'https://api.dicebear.com/7.x/bottts/svg?seed=InterviewAI',
    },
    skills: {
      type: [String],
      default: ['JavaScript', 'React', 'Node.js'],
    },
    targetRole: {
      type: String,
      default: 'Full Stack Developer',
    },
    experienceLevel: {
      type: String,
      enum: ['Entry Level / Fresher', 'Mid Level (1-3 yrs)', 'Senior (4+ yrs)'],
      default: 'Entry Level / Fresher',
    },
    bookmarkedQuestions: [BookmarkedQuestionSchema],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
