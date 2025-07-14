import mongoose, { Document, Schema } from 'mongoose';

export interface IESGReport extends Document {
  _id: string;
  supplierId: mongoose.Types.ObjectId;
  reportPeriod: {
    startDate: Date;
    endDate: Date;
    quarter?: string;
    year: number;
  };
  executiveSummary: string;
  environmentalMetrics: {
    carbonEmissions: {
      scope1: number;
      scope2: number;
      scope3: number;
      total: number;
      unit: string;
    };
    waterUsage: {
      total: number;
      recycled: number;
      unit: string;
    };
    wasteManagement: {
      totalGenerated: number;
      recycled: number;
      landfill: number;
      unit: string;
    };
    energyConsumption: {
      total: number;
      renewable: number;
      unit: string;
    };
  };
  socialMetrics: {
    workforce: {
      totalEmployees: number;
      diversityRatio: number;
      turnoverRate: number;
      safetyIncidents: number;
    };
    communityImpact: {
      investmentAmount: number;
      beneficiaries: number;
      programs: string[];
    };
    laborPractices: {
      fairWageCompliance: boolean;
      workingHoursCompliance: boolean;
      childLaborCompliance: boolean;
    };
  };
  governanceMetrics: {
    boardComposition: {
      totalMembers: number;
      independentMembers: number;
      womenMembers: number;
    };
    transparency: {
      publicReporting: boolean;
      auditFrequency: string;
      stakeholderEngagement: boolean;
    };
    ethics: {
      codeOfConduct: boolean;
      whistleblowerPolicy: boolean;
      anticorruptionTraining: boolean;
    };
  };
  riskAssessment: {
    climateRisks: string[];
    operationalRisks: string[];
    reputationalRisks: string[];
    mitigationStrategies: string[];
  };
  targets: {
    shortTerm: string[];
    longTerm: string[];
    progress: number;
  };
  certifications: {
    name: string;
    issuer: string;
    validUntil: Date;
  }[];
  overallScore: number;
  generatedBy: mongoose.Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ESGReportSchema = new Schema<IESGReport>({
  supplierId: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  reportPeriod: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    quarter: String,
    year: { type: Number, required: true },
  },
  executiveSummary: {
    type: String,
    required: true,
    maxlength: [2000, 'Executive summary cannot exceed 2000 characters'],
  },
  environmentalMetrics: {
    carbonEmissions: {
      scope1: { type: Number, default: 0 },
      scope2: { type: Number, default: 0 },
      scope3: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      unit: { type: String, default: 'tCO2e' },
    },
    waterUsage: {
      total: { type: Number, default: 0 },
      recycled: { type: Number, default: 0 },
      unit: { type: String, default: 'liters' },
    },
    wasteManagement: {
      totalGenerated: { type: Number, default: 0 },
      recycled: { type: Number, default: 0 },
      landfill: { type: Number, default: 0 },
      unit: { type: String, default: 'kg' },
    },
    energyConsumption: {
      total: { type: Number, default: 0 },
      renewable: { type: Number, default: 0 },
      unit: { type: String, default: 'kWh' },
    },
  },
  socialMetrics: {
    workforce: {
      totalEmployees: { type: Number, default: 0 },
      diversityRatio: { type: Number, default: 0, min: 0, max: 100 },
      turnoverRate: { type: Number, default: 0, min: 0, max: 100 },
      safetyIncidents: { type: Number, default: 0 },
    },
    communityImpact: {
      investmentAmount: { type: Number, default: 0 },
      beneficiaries: { type: Number, default: 0 },
      programs: [String],
    },
    laborPractices: {
      fairWageCompliance: { type: Boolean, default: false },
      workingHoursCompliance: { type: Boolean, default: false },
      childLaborCompliance: { type: Boolean, default: false },
    },
  },
  governanceMetrics: {
    boardComposition: {
      totalMembers: { type: Number, default: 0 },
      independentMembers: { type: Number, default: 0 },
      womenMembers: { type: Number, default: 0 },
    },
    transparency: {
      publicReporting: { type: Boolean, default: false },
      auditFrequency: { type: String, default: 'annual' },
      stakeholderEngagement: { type: Boolean, default: false },
    },
    ethics: {
      codeOfConduct: { type: Boolean, default: false },
      whistleblowerPolicy: { type: Boolean, default: false },
      anticorruptionTraining: { type: Boolean, default: false },
    },
  },
  riskAssessment: {
    climateRisks: [String],
    operationalRisks: [String],
    reputationalRisks: [String],
    mitigationStrategies: [String],
  },
  targets: {
    shortTerm: [String],
    longTerm: [String],
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  certifications: [{
    name: String,
    issuer: String,
    validUntil: Date,
  }],
  overallScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  generatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
}, {
  timestamps: true,
});

// Calculate overall score before saving
ESGReportSchema.pre('save', function (next) {
  const envScore = (
    this.environmentalMetrics.carbonEmissions.total > 0 ? 20 : 0 +
    this.environmentalMetrics.waterUsage.recycled / this.environmentalMetrics.waterUsage.total * 20 +
    this.environmentalMetrics.wasteManagement.recycled / this.environmentalMetrics.wasteManagement.totalGenerated * 20 +
    this.environmentalMetrics.energyConsumption.renewable / this.environmentalMetrics.energyConsumption.total * 20
  );

  const socialScore = (
    this.socialMetrics.workforce.diversityRatio * 0.2 +
    (100 - this.socialMetrics.workforce.turnoverRate) * 0.2 +
    (this.socialMetrics.workforce.safetyIncidents === 0 ? 20 : 0) +
    this.socialMetrics.communityImpact.programs.length * 5
  );

  const govScore = (
    this.governanceMetrics.boardComposition.womenMembers / this.governanceMetrics.boardComposition.totalMembers * 20 +
    (this.governanceMetrics.transparency.publicReporting ? 10 : 0) +
    (this.governanceMetrics.ethics.codeOfConduct ? 10 : 0)
  );

  this.overallScore = Math.min(100, Math.round((envScore + socialScore + govScore) / 3));
  next();
});

// Indexes
ESGReportSchema.index({ supplierId: 1 });
ESGReportSchema.index({ 'reportPeriod.year': -1 });
ESGReportSchema.index({ status: 1 });
ESGReportSchema.index({ overallScore: -1 });

export default mongoose.model<IESGReport>('ESGReport', ESGReportSchema);
