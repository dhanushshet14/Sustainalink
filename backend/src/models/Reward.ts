import mongoose, { Document, Schema } from 'mongoose';

export interface IReward extends Document {
  _id: string;
  name: string;
  description: string;
  type: 'badge' | 'nft' | 'points' | 'discount' | 'certification';
  requirements: {
    minSustainabilityScore?: number;
    minPoints?: number;
    specificActions?: string[];
    timeframe?: string;
  };
  value: {
    points?: number;
    discountPercentage?: number;
    monetaryValue?: number;
  };
  imageUrl?: string;
  isActive: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  createdAt: Date;
  updatedAt: Date;
}

const RewardSchema = new Schema<IReward>({
  name: {
    type: String,
    required: [true, 'Reward name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  type: {
    type: String,
    enum: ['badge', 'nft', 'points', 'discount', 'certification'],
    required: true,
  },
  requirements: {
    minSustainabilityScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    minPoints: {
      type: Number,
      min: 0,
    },
    specificActions: [String],
    timeframe: String,
  },
  value: {
    points: {
      type: Number,
      min: 0,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    monetaryValue: {
      type: Number,
      min: 0,
    },
  },
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  rarity: {
    type: String,
    enum: ['common', 'rare', 'epic', 'legendary'],
    default: 'common',
  },
}, {
  timestamps: true,
});

// Indexes
RewardSchema.index({ type: 1 });
RewardSchema.index({ rarity: 1 });
RewardSchema.index({ isActive: 1 });

export default mongoose.model<IReward>('Reward', RewardSchema);
