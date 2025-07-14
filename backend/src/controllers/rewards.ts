import { Request, Response, NextFunction } from 'express';
import memoryStore from '@/data/memoryStore';
import { AuthRequest } from '@/middleware/auth';

/**
 * @desc    Get all rewards
 * @route   GET /api/rewards
 * @access  Public
 */
export const getRewards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rewards = memoryStore.getAllRewards();
    
    res.status(200).json({
      success: true,
      count: rewards.length,
      data: rewards,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new reward
 * @route   POST /api/rewards
 * @access  Private (Admin)
 */
export const createReward = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reward = memoryStore.createReward(req.body);

    res.status(201).json({
      success: true,
      data: reward,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user statistics
 * @route   GET /api/rewards/stats
 * @access  Private
 */
export const getUserStats = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = memoryStore.findUserById(req.user!._id);
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        points: user.rewards.points,
        level: user.rewards.level,
        badges: user.rewards.badges,
        nfts: user.rewards.nfts,
        esgScore: user.esgMetrics.sustainabilityScore,
      },
    });
  } catch (error) {
    next(error);
  }
};
