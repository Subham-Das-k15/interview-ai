import express from 'express';
import {
  generateInterview,
  evaluateInterview,
  getInterviewHistory,
  getInterviewById,
  toggleFavoriteInterview,
  deleteInterview,
  getAnalytics,
} from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth protection to all interview routes
router.use(protect);

router.post('/generate', generateInterview);
router.post('/evaluate', evaluateInterview);
router.get('/history', getInterviewHistory);
router.get('/analytics', getAnalytics);
router.get('/:id', getInterviewById);
router.patch('/:id/favorite', toggleFavoriteInterview);
router.delete('/:id', deleteInterview);

export default router;
