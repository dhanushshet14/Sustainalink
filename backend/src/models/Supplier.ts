import mongoose, { Document, Schema } from 'mongoose';

export interface ISupplier extends Document {
  _id: string;
  companyName: string;
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    website?: string;
  };
  certifications: {
    name: string;
    issuedBy: string;
    validUntil: Date;
    documentUrl?: string;
  }[];
  esgMetrics: {
    environmental: {
      carbonEmissions: number;
      waterUsage: number;
      wasteManagement: number;
      renewableEnergyUsage: number;
      biodiversityImpact: number;
    };
    social: {
      employeeSafety: number;
      laborPractices: number;
      communityEngagement: number;
      diversityInclusion: number;
      humanRights: number;
    };
    governance: {
      businessEthics: number;
      transparency: number;
      boardDiversity: number;
      riskManagement: number;
      compliance: number;
    };
  };
  overallESGScore: number;
  supplyChainTier: 1 | 2 | 3 | 4;
  products: mongoose.Types.ObjectId[];
  lastAuditDate?: Date;
  nextAuditDate?: Date;
  riskLevel: 'low' | 'medium' | 'high';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SupplierSchema = new Schema<ISupplier>({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    unique: true,
    maxlength: [200, 'Company name cannot exceed 200 characters'],
  },
  contactInfo: {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    website: String,
  },
  certifications: [{
    name: {
      type: String,
      required: true,
    },
    issuedBy: {
      type: String,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    documentUrl: String,
  }],
  esgMetrics: {
    environmental: {
      carbonEmissions: { type: Number, default: 0, min: 0, max: 100 },
      waterUsage: { type: Number, default: 0, min: 0, max: 100 },
      wasteManagement: { type: Number, default: 0, min: 0, max: 100 },
      renewableEnergyUsage: { type: Number, default: 0, min: 0, max: 100 },
      biodiversityImpact: { type: Number, default: 0, min: 0, max: 100 },
    },
    social: {
      employeeSafety: { type: Number, default: 0, min: 0, max: 100 },
      laborPractices: { type: Number, default: 0, min: 0, max: 100 },
      communityEngagement: { type: Number, default: 0, min: 0, max: 100 },
      diversityInclusion: { type: Number, default: 0, min: 0, max: 100 },
      humanRights: { type: Number, default: 0, min: 0, max: 100 },
    },
    governance: {
      businessEthics: { type: Number, default: 0, min: 0, max: 100 },
      transparency: { type: Number, default: 0, min: 0, max: 100 },
      boardDiversity: { type: Number, default: 0, min: 0, max: 100 },
      riskManagement: { type: Number, default: 0, min: 0, max: 100 },
      compliance: { type: Number, default: 0, min: 0, max: 100 },
    },
  },
  overallESGScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  supplyChainTier: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  lastAuditDate: Date,
  nextAuditDate: Date,
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Calculate overall ESG score before saving
SupplierSchema.pre('save', function (next) {
  const environmental = Object.values(this.esgMetrics.environmental);
  const social = Object.values(this.esgMetrics.social);
  const governance = Object.values(this.esgMetrics.governance);
  
  const envAvg = environmental.reduce((a, b) => a + b, 0) / environmental.length;
  const socAvg = social.reduce((a, b) => a + b, 0) / social.length;
  const govAvg = governance.reduce((a, b) => a + b, 0) / governance.length;
  
  this.overallESGScore = Math.round((envAvg + socAvg + govAvg) / 3);
  
  // Auto-set risk level based on ESG score
  if (this.overallESGScore >= 75) {
    this.riskLevel = 'low';
  } else if (this.overallESGScore >= 50) {
    this.riskLevel = 'medium';
  } else {
    this.riskLevel = 'high';
  }
  
  next();
});

// Indexes
SupplierSchema.index({ companyName: 1 });
SupplierSchema.index({ 'contactInfo.email': 1 });
SupplierSchema.index({ overallESGScore: -1 });
SupplierSchema.index({ supplyChainTier: 1 });
SupplierSchema.index({ riskLevel: 1 });

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);
