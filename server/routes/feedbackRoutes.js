import express from 'express';
import {
  createFeedback,
  getFeedback,
  getComplaintFeedback
} from '../controllers/feedbackController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('student'), createFeedback);
router.get('/', authenticate, getFeedback);
router.get('/:complaintId', authenticate, getComplaintFeedback);

export default router;
