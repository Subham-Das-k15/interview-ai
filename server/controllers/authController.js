import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../validations/authValidation.js';

// @desc    Register a new candidate
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { isValid, errors } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const { name, email, password, targetRole, skills } = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      targetRole: targetRole || 'Full Stack Developer',
      skills: Array.isArray(skills) ? skills : ['JavaScript', 'React', 'Node.js'],
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        skills: user.skills,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        bookmarkedQuestions: user.bookmarkedQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { isValid, errors } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        skills: user.skills,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        bookmarkedQuestions: user.bookmarkedQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { name, skills, targetRole, experienceLevel, avatar, password } = req.body;

    if (name) user.name = name;
    if (skills) user.skills = Array.isArray(skills) ? skills : skills.split(',').map((s) => s.trim());
    if (targetRole) user.targetRole = targetRole;
    if (experienceLevel) user.experienceLevel = experienceLevel;
    if (avatar) user.avatar = avatar;
    if (password) user.password = password;

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        skills: updatedUser.skills,
        targetRole: updatedUser.targetRole,
        experienceLevel: updatedUser.experienceLevel,
        bookmarkedQuestions: updatedUser.bookmarkedQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle question bookmark
// @route   POST /api/auth/bookmark
// @access  Private
export const toggleBookmarkQuestion = async (req, res, next) => {
  try {
    const { question, topic, difficulty, expectedConcepts, suggestedAnswer } = req.body;
    const user = await User.findById(req.user._id);

    const existingIndex = user.bookmarkedQuestions.findIndex(
      (b) => b.question.trim().toLowerCase() === question.trim().toLowerCase()
    );

    let isBookmarked = false;

    if (existingIndex > -1) {
      // Remove bookmark
      user.bookmarkedQuestions.splice(existingIndex, 1);
      isBookmarked = false;
    } else {
      // Add bookmark
      user.bookmarkedQuestions.unshift({
        question,
        topic: topic || 'General',
        difficulty: difficulty || 'Medium',
        expectedConcepts: expectedConcepts || [],
        suggestedAnswer: suggestedAnswer || '',
      });
      isBookmarked = true;
    }

    await user.save();

    res.json({
      success: true,
      isBookmarked,
      bookmarkedQuestions: user.bookmarkedQuestions,
    });
  } catch (error) {
    next(error);
  }
};
