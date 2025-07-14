import express from 'express';
import { getRewards, createReward, getUserStats } from '@/controllers/rewards';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

router.get('/', getRewards);
router.get('/stats', authenticate, getUserStats);
router.post('/', authenticate, authorize('admin'), createReward);

export default router;
