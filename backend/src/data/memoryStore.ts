// In-memory data types (without Mongoose dependency)
export interface IUser {
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
}

export interface IProduct {
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
    supplierId: string;
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
    sustainabilityRating: number;
    totalReviews: number;
    averageRating: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISupplier {
  _id: string;
  companyName: string;
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  industry: string;
  certifications: string[];
  esgMetrics: {
    environmental: {
      carbonEmissions: number;
      waterUsage: number;
      wasteReduction: number;
      renewableEnergy: number;
    };
    social: {
      employeeSatisfaction: number;
      diversityIndex: number;
      communityInvestment: number;
      safetyRecord: number;
    };
    governance: {
      transparencyScore: number;
      ethicsRating: number;
      complianceRecord: number;
      boardDiversity: number;
    };
  };
  sustainabilityScore: number;
  products: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  documents: {
    name: string;
    url: string;
    type: string;
    uploadedAt: Date;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IESGReport {
  _id: string;
  supplier: string;
  reportingPeriod: {
    startDate: Date;
    endDate: Date;
  };
  metrics: {
    environmental: {
      carbonEmissions: number;
      waterUsage: number;
      wasteReduction: number;
      renewableEnergy: number;
    };
    social: {
      employeeSatisfaction: number;
      diversityIndex: number;
      communityInvestment: number;
      safetyRecord: number;
    };
    governance: {
      transparencyScore: number;
      ethicsRating: number;
      complianceRecord: number;
      boardDiversity: number;
    };
  };
  overallScore: number;
  improvements: {
    area: string;
    description: string;
    impact: number;
    timeframe: string;
  }[];
  targets: {
    metric: string;
    currentValue: number;
    targetValue: number;
    deadline: Date;
  }[];
  certifications: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  submittedBy: string;
  submittedAt: Date;
  lastUpdated: Date;
}

export interface IReward {
  _id: string;
  title: string;
  description: string;
  type: 'discount' | 'product' | 'experience' | 'nft' | 'donation';
  pointsCost: number;
  value: number;
  category: string;
  icon?: string;
  image?: string;
  availableQuantity?: number;
  expiryDate?: Date;
  terms: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory data storage
export class MemoryStore {
  private static instance: MemoryStore;
  
  private users: Map<string, IUser> = new Map();
  private products: Map<string, IProduct> = new Map();
  private suppliers: Map<string, ISupplier> = new Map();
  private esgReports: Map<string, IESGReport> = new Map();
  private rewards: Map<string, IReward> = new Map();
  
  private userIdCounter = 1;
  private productIdCounter = 1;
  private supplierIdCounter = 1;
  private esgReportIdCounter = 1;
  private rewardIdCounter = 1;

  private constructor() {
    this.initializeSampleData();
  }

  public static getInstance(): MemoryStore {
    if (!MemoryStore.instance) {
      MemoryStore.instance = new MemoryStore();
    }
    return MemoryStore.instance;
  }

  // User operations
  createUser(userData: Partial<IUser>): IUser {
    const id = this.userIdCounter++;
    const user: IUser = {
      _id: id.toString(),
      email: userData.email!,
      password: userData.password!,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      role: userData.role || 'consumer',
      profile: userData.profile || {
        preferences: {
          sustainabilityGoals: [],
          notifications: true
        }
      },
      esgMetrics: userData.esgMetrics || {
        carbonFootprint: 0,
        sustainabilityScore: 0,
        wasteReduction: 0
      },
      rewards: userData.rewards || {
        points: 0,
        level: 1,
        badges: [],
        nfts: []
      },
      isActive: userData.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id.toString(), user);
    return user;
  }

  findUserByEmail(email: string): IUser | undefined {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  findUserById(id: string): IUser | undefined {
    return this.users.get(id);
  }

  updateUser(id: string, updates: Partial<IUser>): IUser | undefined {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, ...updates, updatedAt: new Date() };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  getAllUsers(): IUser[] {
    return Array.from(this.users.values());
  }

  // Product operations
  createProduct(productData: Partial<IProduct>): IProduct {
    const id = this.productIdCounter++;
    const product: IProduct = {
      _id: id.toString(),
      name: productData.name!,
      description: productData.description!,
      category: productData.category!,
      brand: productData.brand || '',
      barcode: productData.barcode,
      qrCode: productData.qrCode,
      images: productData.images || [],
      sustainabilityMetrics: productData.sustainabilityMetrics || {
        carbonFootprint: 0,
        recyclabilityScore: 0,
        sustainabilityRating: 0,
        certifications: []
      },
      supplyChain: productData.supplyChain || {
        supplierId: '',
        originCountry: '',
        manufacturingDate: new Date(),
        transportationMode: 'land',
        intermediaries: []
      },
      esgData: productData.esgData || {
        environmental: {
          waterUsage: 0,
          energyConsumption: 0,
          wasteGenerated: 0,
          renewableEnergyPercentage: 0
        },
        social: {
          fairTrade: false,
          laborStandards: 'unknown',
          communityImpact: 0
        },
        governance: {
          transparency: 0,
          ethicalSourcing: false,
          complianceScore: 0
        }
      },
      price: productData.price || {
        amount: 0,
        currency: 'USD'
      },
      availability: productData.availability || {
        inStock: true,
        quantity: 0,
        locations: []
      },
      reviews: productData.reviews || {
        sustainabilityRating: 0,
        totalReviews: 0,
        averageRating: 0
      },
      isActive: productData.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id.toString(), product);
    return product;
  }

  findProductById(id: string): IProduct | undefined {
    return this.products.get(id);
  }

  findProductByBarcode(barcode: string): IProduct | undefined {
    return Array.from(this.products.values()).find(product => product.barcode === barcode);
  }

  findProductByQRCode(qrCode: string): IProduct | undefined {
    return Array.from(this.products.values()).find(product => product.qrCode === qrCode);
  }

  getAllProducts(): IProduct[] {
    return Array.from(this.products.values());
  }

  // Supplier operations
  createSupplier(supplierData: Partial<ISupplier>): ISupplier {
    const id = this.supplierIdCounter++;
    const supplier: ISupplier = {
      _id: id.toString(),
      companyName: supplierData.companyName!,
      contactInfo: supplierData.contactInfo!,
      address: supplierData.address!,
      industry: supplierData.industry!,
      certifications: supplierData.certifications || [],
      esgMetrics: supplierData.esgMetrics || {
        environmental: { carbonEmissions: 0, waterUsage: 0, wasteReduction: 0, renewableEnergy: 0 },
        social: { employeeSatisfaction: 0, diversityIndex: 0, communityInvestment: 0, safetyRecord: 0 },
        governance: { transparencyScore: 0, ethicsRating: 0, complianceRecord: 0, boardDiversity: 0 }
      },
      sustainabilityScore: supplierData.sustainabilityScore || 0,
      products: supplierData.products || [],
      verificationStatus: supplierData.verificationStatus || 'pending',
      documents: supplierData.documents || [],
      isActive: supplierData.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.suppliers.set(id.toString(), supplier);
    return supplier;
  }

  findSupplierById(id: string): ISupplier | undefined {
    return this.suppliers.get(id);
  }

  getAllSuppliers(): ISupplier[] {
    return Array.from(this.suppliers.values());
  }

  // ESG Report operations
  createESGReport(reportData: Partial<IESGReport>): IESGReport {
    const id = this.esgReportIdCounter++;
    const report: IESGReport = {
      _id: id.toString(),
      supplier: reportData.supplier!,
      reportingPeriod: reportData.reportingPeriod!,
      metrics: reportData.metrics!,
      overallScore: reportData.overallScore || 0,
      improvements: reportData.improvements || [],
      targets: reportData.targets || [],
      certifications: reportData.certifications || [],
      verificationStatus: reportData.verificationStatus || 'pending',
      submittedBy: reportData.submittedBy!,
      submittedAt: new Date(),
      lastUpdated: new Date(),
    };
    this.esgReports.set(id.toString(), report);
    return report;
  }

  findESGReportsBySupplier(supplierId: string): IESGReport[] {
    return Array.from(this.esgReports.values()).filter(report => report.supplier === supplierId);
  }

  getAllESGReports(): IESGReport[] {
    return Array.from(this.esgReports.values());
  }

  // Reward operations
  createReward(rewardData: Partial<IReward>): IReward {
    const id = this.rewardIdCounter++;
    const reward: IReward = {
      _id: id.toString(),
      title: rewardData.title!,
      description: rewardData.description!,
      type: rewardData.type!,
      pointsCost: rewardData.pointsCost!,
      value: rewardData.value!,
      category: rewardData.category!,
      icon: rewardData.icon,
      image: rewardData.image,
      availableQuantity: rewardData.availableQuantity,
      expiryDate: rewardData.expiryDate,
      terms: rewardData.terms || [],
      isActive: rewardData.isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.rewards.set(id.toString(), reward);
    return reward;
  }

  getAllRewards(): IReward[] {
    return Array.from(this.rewards.values());
  }

  // Initialize with some sample data
  private initializeSampleData() {
    // Sample user
    this.createUser({
      email: 'demo@sustainalink.com',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
      firstName: 'Demo',
      lastName: 'User',
      role: 'consumer',
      esgMetrics: {
        carbonFootprint: 0,
        sustainabilityScore: 85,
        wasteReduction: 0
      },
      rewards: {
        points: 1250,
        level: 3,
        badges: ['eco-warrior', 'recycling-champion'],
        nfts: []
      },
      profile: {
        preferences: {
          sustainabilityGoals: ['reduce-waste', 'carbon-neutral'],
          notifications: true
        }
      },
      isActive: true
    });

    // Sample product
    this.createProduct({
      name: 'Eco-Friendly Water Bottle',
      description: 'Sustainable water bottle made from recycled materials',
      category: 'kitchenware',
      brand: 'GreenTech Industries',
      barcode: '1234567890123',
      qrCode: 'ECO-BOTTLE-001',
      sustainabilityMetrics: {
        carbonFootprint: 2.5,
        recyclabilityScore: 92,
        sustainabilityRating: 88,
        certifications: ['FSC Certified', 'Carbon Neutral']
      },
      supplyChain: {
        supplierId: '1',
        originCountry: 'USA',
        manufacturingDate: new Date('2024-01-15'),
        transportationMode: 'land',
        intermediaries: []
      },
      price: {
        amount: 29.99,
        currency: 'USD'
      },
      availability: {
        inStock: true,
        quantity: 100,
        locations: ['Online Store', 'Retail Partners']
      }
    });

    // Sample supplier
    this.createSupplier({
      companyName: 'GreenTech Industries',
      contactInfo: {
        email: 'contact@greentech.com',
        phone: '+1-555-0123',
        website: 'https://greentech.com'
      },
      address: {
        street: '123 Eco Street',
        city: 'Green Valley',
        state: 'CA',
        country: 'USA',
        zipCode: '90210'
      },
      industry: 'Manufacturing',
      certifications: ['ISO 14001', 'B-Corp Certified'],
      sustainabilityScore: 88,
      verificationStatus: 'verified'
    });

    // Sample rewards
    this.createReward({
      title: '10% Off Eco Products',
      description: 'Get 10% discount on all eco-friendly products',
      type: 'discount',
      pointsCost: 500,
      value: 10,
      category: 'shopping'
    });

    this.createReward({
      title: 'Tree Planting NFT',
      description: 'Unique NFT representing a tree planted in your name',
      type: 'nft',
      pointsCost: 1000,
      value: 1,
      category: 'environmental'
    });
  }

  // Utility methods
  clear() {
    this.users.clear();
    this.products.clear();
    this.suppliers.clear();
    this.esgReports.clear();
    this.rewards.clear();
    this.initializeSampleData();
  }

  getStats() {
    return {
      users: this.users.size,
      products: this.products.size,
      suppliers: this.suppliers.size,
      esgReports: this.esgReports.size,
      rewards: this.rewards.size
    };
  }
}

export default MemoryStore.getInstance();
