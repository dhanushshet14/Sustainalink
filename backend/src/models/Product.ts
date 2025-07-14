import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  barcode?: string;
  qrCode?: string;
  images: string[];
  sustainabilityMetrics: {
    carbonFootprint: number;
    recyclabilityScore: number;
    sustainabilityRating: number;
    certifications: string[];
  };
  supplyChain: {
    supplierId: mongoose.Types.ObjectId;
    originCountry: string;
    manufacturingDate: Date;
    transportationMode: 'air' | 'sea' | 'land' | 'rail';
    intermediaries: {
      name: string;
      location: string;
      date: Date;
    }[];
  };
  esgData: {
    environmental: {
      waterUsage: number;
      energyConsumption: number;
      wasteGenerated: number;
      renewableEnergyPercentage: number;
    };
    social: {
      fairTrade: boolean;
      laborStandards: string;
      communityImpact: number;
    };
    governance: {
      transparency: number;
      ethicalSourcing: boolean;
      complianceScore: number;
    };
  };
  price: {
    amount: number;
    currency: string;
  };
  availability: {
    inStock: boolean;
    quantity: number;
    locations: string[];
  };
  reviews: {
    rating: number;
    sustainabilityRating: number;
    reviewCount: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['food', 'clothing', 'electronics', 'home', 'beauty', 'automotive', 'industrial', 'other'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true,
  },
  qrCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  images: [String],
  sustainabilityMetrics: {
    carbonFootprint: {
      type: Number,
      required: true,
      min: 0,
    },
    recyclabilityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    sustainabilityRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    certifications: [String],
  },
  supplyChain: {
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    originCountry: {
      type: String,
      required: true,
    },
    manufacturingDate: {
      type: Date,
      required: true,
    },
    transportationMode: {
      type: String,
      enum: ['air', 'sea', 'land', 'rail'],
      required: true,
    },
    intermediaries: [{
      name: String,
      location: String,
      date: Date,
    }],
  },
  esgData: {
    environmental: {
      waterUsage: { type: Number, default: 0 },
      energyConsumption: { type: Number, default: 0 },
      wasteGenerated: { type: Number, default: 0 },
      renewableEnergyPercentage: { type: Number, default: 0, min: 0, max: 100 },
    },
    social: {
      fairTrade: { type: Boolean, default: false },
      laborStandards: String,
      communityImpact: { type: Number, default: 0, min: 0, max: 100 },
    },
    governance: {
      transparency: { type: Number, default: 0, min: 0, max: 100 },
      ethicalSourcing: { type: Boolean, default: false },
      complianceScore: { type: Number, default: 0, min: 0, max: 100 },
    },
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
  },
  availability: {
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    locations: [String],
  },
  reviews: {
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    sustainabilityRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for better performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ 'sustainabilityMetrics.sustainabilityRating': -1 });
ProductSchema.index({ 'supplyChain.supplierId': 1 });
ProductSchema.index({ barcode: 1 });
ProductSchema.index({ qrCode: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
