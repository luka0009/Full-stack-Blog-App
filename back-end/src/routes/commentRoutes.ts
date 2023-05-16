import express from 'express';
import { authGuard, adminGuard } from '../middleware/authMiddleware';
import { createComment, deleteComment, updateComment } from '../controllers/commentController';

const router = express.Router();

router.post('/', authGuard, createComment);
router.put('/:commentId', authGuard, updateComment);
router.delete('/:commentId', authGuard, deleteComment);

export default router;