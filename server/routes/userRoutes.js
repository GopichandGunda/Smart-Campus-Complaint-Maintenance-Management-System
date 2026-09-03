import express from 'express';
import { getProfile, updateProfile, getAllUsers, getUsersByRole } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/', authenticate, getAllUsers);
router.get('/role/:role', authenticate, getUsersByRole);

export default router;
