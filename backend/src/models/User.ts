import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'consumer' | 'supplier' | 'admin';
  profile: {
    avatar?: string;
    bio?: string;
    location?: string;
    preferences: {
      sustainabilityGoals: string[];
      notifications: boolean;
    };
  };
  esgMetrics: {
    carbonFootprint: number;
    sustainabilityScore: number;
    wasteReduction: number;
  };
  rewards: {
    points: number;
    level: number;
    badges: string[];
    nfts: string[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  role: {
    type: String,
    enum: ['consumer', 'supplier', 'admin'],
    default: 'consumer',
  },
  profile: {
    avatar: String,
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    location: String,
    preferences: {
      sustainabilityGoals: [{
        type: String,
        enum: ['reduce_carbon', 'waste_reduction', 'renewable_energy', 'sustainable_packaging', 'ethical_sourcing'],
      }],
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  esgMetrics: {
    carbonFootprint: {
      type: Number,
      default: 0,
      min: 0,
    },
    sustainabilityScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    wasteReduction: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  rewards: {
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    badges: [String],
    nfts: [String],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ 'rewards.points': -1 });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IUser>('User', UserSchema);
