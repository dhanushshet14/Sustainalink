import express from 'express';
import { getUsers, getUser, updateUser } from '@/controllers/users';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

router.get('/', authenticate, authorize('admin'), getUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, updateUser);

export default router;
