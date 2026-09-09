import Interview from '../models/Interview.js';
import Resume from '../models/Resume.js';
import {
  generateInterviewQuestionsAI,
  evaluateInterviewAI,
} from '../services/geminiService.js';

// @desc    Generate interview questions
// @route   POST /api/interviews/generate
// @access  Private
export const generateInterview = async (req, res, next) => {
  try {
    const {
      topic = 'JavaScript',
      difficulty = 'Medium',
      questionCount = 5,
      isResumeBased = false,
    } = req.body;

    let resumeSkills = [];

    if (isResumeBased) {
      const latestResume = await Resume.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
      if (latestResume && latestResume.extractedSkills?.length > 0) {
        resumeSkills = latestResume.extractedSkills;
      }
    }

    const count = parseInt(questionCount, 10) || 5;

    const questions = await generateInterviewQuestionsAI({
      topic,
      difficulty,
      count,
      resumeSkills,
      apiKey: req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY,
    });

    res.json({
      success: true,
      topic,
      difficulty,
      questionCount: questions.length,
      isResumeBased,
      questions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Evaluate candidate answers and save completed interview session
// @route   POST /api/interviews/evaluate
// @access  Private
export const evaluateInterview = async (req, res, next) => {
  try {
    const {
      topic,
      difficulty,
      questions,
      answers,
      durationSeconds = 0,
      isResumeBased = false,
    } = req.body;

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Questions array is required for evaluation',
      });
    }

    // Call Gemini or fallback evaluation engine
    const evaluationResult = await evaluateInterviewAI({
      topic: topic || 'General',
      difficulty: difficulty || 'Medium',
      questions,
      answers: answers || [],
      apiKey: req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY,
    });

    // Create persistent Interview document in database
    const interview = await Interview.create({
      userId: req.user._id,
      topic: topic || 'General',
      difficulty: difficulty || 'Medium',
      questionCount: questions.length,
      questions,
      answers: evaluationResult.answers || [],
      score: evaluationResult.score || 0,
      feedback: evaluationResult.feedback || {},
      durationSeconds: parseInt(durationSeconds, 10) || 0,
      isResumeBased: Boolean(isResumeBased),
      status: 'completed',
    });

    res.status(201).json({
      success: true,
      message: 'Interview evaluated and saved successfully',
      interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get candidate's past interview history
// @route   GET /api/interviews/history
// @access  Private
export const getInterviewHistory = async (req, res, next) => {
  try {
    const {
      search,
      topic,
      difficulty,
      favoritesOnly,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { userId: req.user._id };

    if (topic && topic !== 'All') {
      query.topic = topic;
    }

    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    if (favoritesOnly === 'true') {
      query.isFavorite = true;
    }

    if (search && search.trim()) {
      query.$or = [
        { topic: { $regex: search.trim(), $options: 'i' } },
        { 'feedback.overallSummary': { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Interview.countDocuments(query);
    const interviews = await Interview.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-questions -answers'); // lightweight summary for list view

    res.json({
      success: true,
      count: interviews.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      interviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get full interview session details by ID
// @route   GET /api/interviews/:id
// @access  Private
export const getInterviewById = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview session not found',
      });
    }

    // Verify ownership
    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this interview report',
      });
    }

    res.json({
      success: true,
      interview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle favorite interview
// @route   PATCH /api/interviews/:id/favorite
// @access  Private
export const toggleFavoriteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    interview.isFavorite = !interview.isFavorite;
    await interview.save();

    res.json({
      success: true,
      isFavorite: interview.isFavorite,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete interview session
// @route   DELETE /api/interviews/:id
// @access  Private
export const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ success: false, message: 'Interview not found' });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await interview.deleteOne();

    res.json({
      success: true,
      message: 'Interview session deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard analytics & performance metrics
// @route   GET /api/interviews/analytics
// @access  Private
export const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const interviews = await Interview.find({ userId }).sort({ createdAt: 1 });

    const totalInterviews = interviews.length;

    if (totalInterviews === 0) {
      return res.json({
        success: true,
        stats: {
          totalInterviews: 0,
          averageScore: 0,
          bestScore: 0,
          totalQuestionsAnswered: 0,
        },
        scoreOverTime: [],
        topicBreakdown: [],
        difficultyBreakdown: [
          { name: 'Easy', count: 0, avgScore: 0 },
          { name: 'Medium', count: 0, avgScore: 0 },
          { name: 'Hard', count: 0, avgScore: 0 },
        ],
        weeklyActivity: [],
      });
    }

    let totalScore = 0;
    let bestScore = 0;
    let totalQuestions = 0;

    const topicMap = {};
    const diffMap = {
      Easy: { count: 0, totalScore: 0 },
      Medium: { count: 0, totalScore: 0 },
      Hard: { count: 0, totalScore: 0 },
    };

    const scoreOverTime = interviews.map((item, index) => {
      totalScore += item.score;
      if (item.score > bestScore) bestScore = item.score;
      totalQuestions += item.questionCount || item.questions?.length || 5;

      // Group topic
      if (!topicMap[item.topic]) {
        topicMap[item.topic] = { count: 0, totalScore: 0 };
      }
      topicMap[item.topic].count++;
      topicMap[item.topic].totalScore += item.score;

      // Group difficulty
      const diff = item.difficulty || 'Medium';
      if (diffMap[diff]) {
        diffMap[diff].count++;
        diffMap[diff].totalScore += item.score;
      }

      const dateStr = new Date(item.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      return {
        session: `#${index + 1}`,
        date: dateStr,
        score: item.score,
        topic: item.topic,
        difficulty: item.difficulty,
      };
    });

    const averageScore = Math.round(totalScore / totalInterviews);

    const topicBreakdown = Object.keys(topicMap).map((topic) => ({
      topic,
      interviewsCount: topicMap[topic].count,
      avgScore: Math.round(topicMap[topic].totalScore / topicMap[topic].count),
    }));

    const difficultyBreakdown = Object.keys(diffMap).map((diff) => ({
      name: diff,
      count: diffMap[diff].count,
      avgScore: diffMap[diff].count ? Math.round(diffMap[diff].totalScore / diffMap[diff].count) : 0,
    }));

    // Generate weekly activity (last 7 days counts)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCounts = {};
    days.forEach((d) => (dayCounts[d] = 0));

    interviews.forEach((item) => {
      const dayName = days[new Date(item.createdAt).getDay()];
      dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
    });

    const weeklyActivity = days.map((day) => ({
      day,
      sessions: dayCounts[day],
    }));

    res.json({
      success: true,
      stats: {
        totalInterviews,
        averageScore,
        bestScore,
        totalQuestionsAnswered: totalQuestions,
      },
      scoreOverTime,
      topicBreakdown,
      difficultyBreakdown,
      weeklyActivity,
    });
  } catch (error) {
    next(error);
  }
};
