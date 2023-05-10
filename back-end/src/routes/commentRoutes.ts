import express from 'express';
import { authGuard, adminGuard } from '../middleware/authMiddleware';
import { createComment } from '../controllers/commentController';

const router = express.Router();

router.post('/', authGuard, createComment);

export default router;