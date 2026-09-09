import mongoose from 'mongoose';

const CategorizedSkillsSchema = new mongoose.Schema({
  frontend: [{ type: String }],
  backend: [{ type: String }],
  database: [{ type: String }],
  cloudDevOps: [{ type: String }],
  tools: [{ type: String }],
  softSkills: [{ type: String }],
});

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fileUrl: {
      type: String,
      default: '',
    },
    originalFileName: {
      type: String,
      default: 'resume.pdf',
    },
    extractedSkills: [{ type: String }],
    categorizedSkills: {
      type: CategorizedSkillsSchema,
      default: () => ({}),
    },
    missingSkills: [{ type: String }],
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    recommendations: [{ type: String }],
    projectHighlights: [{ type: String }],
    parsedText: {
      type: String,
      default: '',
    },
    atsScore: {
      type: Number,
      default: 75,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Resume', ResumeSchema);
