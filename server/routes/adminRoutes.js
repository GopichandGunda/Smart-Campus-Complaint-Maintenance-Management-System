import express from 'express';
import {
  getAdminStatistics,
  getAllStudents,
  getAllStaff,
  getRecentFeedback
} from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/statistics', authenticate, authorize('admin'), getAdminStatistics);
router.get('/students', authenticate, authorize('admin'), getAllStudents);
router.get('/staff', authenticate, authorize('admin'), getAllStaff);
router.get('/feedback/recent', authenticate, authorize('admin'), getRecentFeedback);

export default router;
