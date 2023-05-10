import express from 'express';
import { createPost, updatePost, deletePost } from '../controllers/postControllers';
import { authGuard, adminGuard } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authGuard, adminGuard, createPost);
router.patch('/:slug', authGuard, adminGuard, updatePost);
router.delete('/:slug', authGuard, adminGuard, deletePost);

export default router;