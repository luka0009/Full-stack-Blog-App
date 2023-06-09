import express from 'express';
import { getUserProfile, loginUser, registerUser, updateProfilePicture, updateUserProfile } from '../controllers/userControllers';
import { authGuard } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, getUserProfile);
router.patch('/updateprofile', authGuard, updateUserProfile);
router.patch('/updateprofilepic', authGuard, updateProfilePicture);

export default router;