import express from 'express';
import { authUser, registerUser, getUserProfile } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', protect, authorize('Super Admin'), registerUser);
router.get('/profile', protect, getUserProfile);

export default router;
