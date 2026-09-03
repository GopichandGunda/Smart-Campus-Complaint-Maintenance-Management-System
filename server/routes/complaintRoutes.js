import express from 'express';
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  getMyComplaints,
  getStaffComplaints,
  updateComplaintStatus,
  updateComplaintPriority,
  assignStaff,
  addComment,
  addResolutionNotes,
  deleteComplaint
} from '../controllers/complaintController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes (authenticated users)
router.post('/', authenticate, createComplaint);
router.get('/', authenticate, getComplaints);
router.get('/:id', authenticate, getComplaintById);

// Student routes
router.get('/my/complaints', authenticate, authorize('student'), getMyComplaints);
router.post('/:id/comments', authenticate, addComment);
router.put('/:id/resolution-notes', authenticate, addResolutionNotes);

// Staff routes
router.get('/staff/assigned', authenticate, authorize('staff'), getStaffComplaints);
router.put('/:id/status', authenticate, authorize('admin', 'staff'), updateComplaintStatus);

// Admin routes
router.put('/:id/priority', authenticate, authorize('admin'), updateComplaintPriority);
router.put('/:id/assign', authenticate, authorize('admin'), assignStaff);
router.delete('/:id', authenticate, authorize('admin'), deleteComplaint);

export default router;
