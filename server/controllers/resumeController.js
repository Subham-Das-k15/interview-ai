import Resume from '../models/Resume.js';
import User from '../models/User.js';
import { parseResumeFile } from '../services/resumeParserService.js';
import {
  analyzeResumeAI,
  generateInterviewQuestionsAI,
} from '../services/geminiService.js';

// @desc    Upload resume PDF and run AI analysis
// @route   POST /api/resume/upload
// @access  Private
export const uploadAndParseResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF or TXT resume file',
      });
    }

    const filePath = req.file.path;
    const parsedText = await parseResumeFile(filePath);

    if (!parsedText || parsedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from the uploaded resume file',
      });
    }

    // Analyze using Gemini or fallback
    const analysis = await analyzeResumeAI({
      resumeText: parsedText,
      apiKey: req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY,
    });

    const fileUrl = `/uploads/${req.file.filename}`;

    // Save to database
    const resume = await Resume.create({
      userId: req.user._id,
      fileUrl,
      originalFileName: req.file.originalname,
      extractedSkills: analysis.extractedSkills || [],
      categorizedSkills: analysis.categorizedSkills || {},
      missingSkills: analysis.missingSkills || [],
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      recommendations: analysis.recommendations || [],
      projectHighlights: analysis.projectHighlights || [],
      parsedText: parsedText.slice(0, 10000),
      atsScore: analysis.atsScore || 78,
    });

    // Automatically sync extracted skills with user profile if profile has few skills
    if (analysis.extractedSkills?.length > 0) {
      const user = await User.findById(req.user._id);
      if (user) {
        const mergedSkills = Array.from(
          new Set([...(user.skills || []), ...analysis.extractedSkills])
        );
        user.skills = mergedSkills.slice(0, 15);
        await user.save();
      }
    }

    res.status(201).json({
      success: true,
      message: 'Resume uploaded and analyzed successfully',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze raw resume text directly (alternative to file upload)
// @route   POST /api/resume/analyze
// @access  Private
export const analyzeResumeText = async (req, res, next) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least 50 characters of resume content to analyze',
      });
    }

    const analysis = await analyzeResumeAI({
      resumeText,
      apiKey: req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY,
    });

    const resume = await Resume.create({
      userId: req.user._id,
      originalFileName: 'Pasted_Resume_Text.txt',
      extractedSkills: analysis.extractedSkills || [],
      categorizedSkills: analysis.categorizedSkills || {},
      missingSkills: analysis.missingSkills || [],
      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      recommendations: analysis.recommendations || [],
      projectHighlights: analysis.projectHighlights || [],
      parsedText: resumeText.slice(0, 10000),
      atsScore: analysis.atsScore || 80,
    });

    res.status(201).json({
      success: true,
      message: 'Resume text analyzed successfully',
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's latest parsed resume
// @route   GET /api/resume/latest
// @access  Private
export const getLatestResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'No resume found for this user',
      });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate tailored interview based on resume skills & projects
// @route   POST /api/resume/generate-interview
// @access  Private
export const generateFromResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: 'Please upload your resume before generating a resume-based interview',
      });
    }

    const { difficulty = 'Medium', count = 5 } = req.body;
    const skills = resume.extractedSkills || ['Full Stack', 'Web Development'];
    const topic = `Resume-Based (${skills.slice(0, 3).join(', ')})`;

    const questions = await generateInterviewQuestionsAI({
      topic,
      difficulty,
      count: parseInt(count, 10) || 5,
      resumeSkills: skills,
      apiKey: req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY,
    });

    res.json({
      success: true,
      topic,
      difficulty,
      isResumeBased: true,
      questionCount: questions.length,
      matchedSkills: skills,
      questions,
    });
  } catch (error) {
    next(error);
  }
};
