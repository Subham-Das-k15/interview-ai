import express from 'express';
import {
  uploadAndParseResume,
  analyzeResumeText,
  getLatestResume,
  generateFromResume,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/upload', uploadResume.single('resume'), uploadAndParseResume);
router.post('/analyze', analyzeResumeText);
router.get('/latest', getLatestResume);
router.post('/generate-interview', generateFromResume);

export default router;
