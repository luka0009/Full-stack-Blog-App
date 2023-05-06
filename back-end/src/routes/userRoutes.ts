import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/userControllers';
import { authGuard } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, getUserProfile);

export default router;