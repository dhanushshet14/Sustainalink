import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '@/models/User';
import Product from '@/models/Product';
import Supplier from '@/models/Supplier';
import Reward from '@/models/Reward';

// Load environment variables
dotenv.config();

const seedData = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sustainalink');
    console.log('🍃 Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Supplier.deleteMany({});
    await Reward.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create sample suppliers
    const suppliers = await Supplier.insertMany([
      {
        companyName: 'EcoTech Manufacturing',
        contactInfo: {
          email: 'contact@ecotech.com',
          phone: '+1-555-0123',
          address: {
            street: '123 Green Street',
            city: 'San Francisco',
            state: 'California',
            country: 'USA',
            zipCode: '94102',
          },
          website: 'https://ecotech.com',
        },
        certifications: [
          {
            name: 'ISO 14001',
            issuedBy: 'ISO',
            validUntil: new Date('2025-12-31'),
          },
          {
            name: 'Fair Trade Certified',
            issuedBy: 'Fair Trade USA',
            validUntil: new Date('2025-06-30'),
          },
        ],
        esgMetrics: {
          environmental: {
            carbonEmissions: 85,
            waterUsage: 90,
            wasteManagement: 88,
            renewableEnergyUsage: 75,
            biodiversityImpact: 80,
          },
          social: {
            employeeSafety: 95,
            laborPractices: 92,
            communityEngagement: 85,
            diversityInclusion: 78,
            humanRights: 90,
          },
          governance: {
            businessEthics: 88,
            transparency: 85,
            boardDiversity: 70,
            riskManagement: 82,
            compliance: 95,
          },
        },
        supplyChainTier: 1,
        lastAuditDate: new Date('2024-01-15'),
        nextAuditDate: new Date('2025-01-15'),
        isVerified: true,
      },
      {
        companyName: 'Sustainable Textiles Co.',
        contactInfo: {
          email: 'info@sustextiles.com',
          phone: '+1-555-0456',
          address: {
            street: '456 Organic Avenue',
            city: 'Austin',
            state: 'Texas',
            country: 'USA',
            zipCode: '73301',
          },
          website: 'https://sustextiles.com',
        },
        certifications: [
          {
            name: 'GOTS Certified',
            issuedBy: 'Global Organic Textile Standard',
            validUntil: new Date('2025-08-31'),
          },
        ],
        esgMetrics: {
          environmental: {
            carbonEmissions: 78,
            waterUsage: 82,
            wasteManagement: 85,
            renewableEnergyUsage: 65,
            biodiversityImpact: 75,
          },
          social: {
            employeeSafety: 88,
            laborPractices: 85,
            communityEngagement: 90,
            diversityInclusion: 85,
            humanRights: 92,
          },
          governance: {
            businessEthics: 85,
            transparency: 80,
            boardDiversity: 75,
            riskManagement: 78,
            compliance: 88,
          },
        },
        supplyChainTier: 2,
        lastAuditDate: new Date('2024-03-20'),
        nextAuditDate: new Date('2025-03-20'),
        isVerified: true,
      },
    ]);

    console.log('✅ Created sample suppliers');

    // Create sample products
    const products = await Product.insertMany([
      {
        name: 'Eco-Friendly Water Bottle',
        description: 'Made from 100% recycled materials with zero plastic waste',
        category: 'home',
        brand: 'EcoTech',
        barcode: '1234567890123',
        qrCode: 'ECO-BOTTLE-001',
        images: [
          'https://example.com/bottle1.jpg',
          'https://example.com/bottle2.jpg',
        ],
        sustainabilityMetrics: {
          carbonFootprint: 2.5,
          recyclabilityScore: 95,
          sustainabilityRating: 4.8,
          certifications: ['Cradle to Cradle', 'Carbon Neutral'],
        },
        supplyChain: {
          supplierId: suppliers[0]._id,
          originCountry: 'USA',
          manufacturingDate: new Date('2024-06-15'),
          transportationMode: 'land',
          intermediaries: [
            {
              name: 'Green Logistics',
              location: 'Denver, CO',
              date: new Date('2024-06-20'),
            },
          ],
        },
        esgData: {
          environmental: {
            waterUsage: 50,
            energyConsumption: 75,
            wasteGenerated: 10,
            renewableEnergyPercentage: 80,
          },
          social: {
            fairTrade: true,
            laborStandards: 'ILO Compliant',
            communityImpact: 85,
          },
          governance: {
            transparency: 90,
            ethicalSourcing: true,
            complianceScore: 95,
          },
        },
        price: {
          amount: 24.99,
          currency: 'USD',
        },
        availability: {
          inStock: true,
          quantity: 1500,
          locations: ['Online Store', 'Physical Stores'],
        },
        reviews: {
          rating: 4.7,
          sustainabilityRating: 4.9,
          reviewCount: 234,
        },
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: 'Sustainably sourced organic cotton with fair trade certification',
        category: 'clothing',
        brand: 'Sustainable Textiles',
        barcode: '2345678901234',
        qrCode: 'ORGANIC-TSHIRT-001',
        images: [
          'https://example.com/tshirt1.jpg',
          'https://example.com/tshirt2.jpg',
        ],
        sustainabilityMetrics: {
          carbonFootprint: 3.2,
          recyclabilityScore: 88,
          sustainabilityRating: 4.6,
          certifications: ['GOTS', 'Fair Trade', 'Organic'],
        },
        supplyChain: {
          supplierId: suppliers[1]._id,
          originCountry: 'India',
          manufacturingDate: new Date('2024-05-10'),
          transportationMode: 'sea',
          intermediaries: [
            {
              name: 'Fair Trade Distributors',
              location: 'Mumbai, India',
              date: new Date('2024-05-15'),
            },
          ],
        },
        esgData: {
          environmental: {
            waterUsage: 200,
            energyConsumption: 120,
            wasteGenerated: 25,
            renewableEnergyPercentage: 60,
          },
          social: {
            fairTrade: true,
            laborStandards: 'Fair Trade Certified',
            communityImpact: 90,
          },
          governance: {
            transparency: 85,
            ethicalSourcing: true,
            complianceScore: 92,
          },
        },
        price: {
          amount: 32.99,
          currency: 'USD',
        },
        availability: {
          inStock: true,
          quantity: 850,
          locations: ['Online Store'],
        },
        reviews: {
          rating: 4.5,
          sustainabilityRating: 4.8,
          reviewCount: 156,
        },
      },
    ]);

    console.log('✅ Created sample products');

    // Create sample users
    const users = await User.insertMany([
      {
        email: 'consumer@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'consumer',
        profile: {
          bio: 'Environmentally conscious consumer interested in sustainable products',
          location: 'San Francisco, CA',
          preferences: {
            sustainabilityGoals: ['reduce_carbon', 'waste_reduction'],
            notifications: true,
          },
        },
        esgMetrics: {
          carbonFootprint: 8.5,
          sustainabilityScore: 75,
          wasteReduction: 65,
        },
        rewards: {
          points: 1250,
          level: 3,
          badges: ['eco-warrior', 'carbon-reducer'],
          nfts: ['green-pioneer-nft'],
        },
      },
      {
        email: 'supplier@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'supplier',
        profile: {
          bio: 'Sustainability manager at EcoTech Manufacturing',
          location: 'San Francisco, CA',
          preferences: {
            sustainabilityGoals: ['renewable_energy', 'ethical_sourcing'],
            notifications: true,
          },
        },
        esgMetrics: {
          carbonFootprint: 15.2,
          sustainabilityScore: 88,
          wasteReduction: 82,
        },
        rewards: {
          points: 2800,
          level: 5,
          badges: ['supplier-excellence', 'green-manufacturer'],
          nfts: [],
        },
      },
      {
        email: 'admin@example.com',
        password: 'password123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        profile: {
          bio: 'Platform administrator',
          location: 'Remote',
          preferences: {
            sustainabilityGoals: ['reduce_carbon', 'renewable_energy', 'waste_reduction'],
            notifications: true,
          },
        },
        esgMetrics: {
          carbonFootprint: 5.0,
          sustainabilityScore: 95,
          wasteReduction: 90,
        },
        rewards: {
          points: 5000,
          level: 10,
          badges: ['admin', 'sustainability-champion'],
          nfts: ['admin-badge-nft'],
        },
      },
    ]);

    console.log('✅ Created sample users');

    // Create sample rewards
    const rewards = await Reward.insertMany([
      {
        name: 'Eco Warrior Badge',
        description: 'Awarded for achieving 50+ sustainability score',
        type: 'badge',
        requirements: {
          minSustainabilityScore: 50,
        },
        value: {
          points: 100,
        },
        imageUrl: 'https://example.com/eco-warrior-badge.png',
        rarity: 'common',
      },
      {
        name: 'Carbon Reducer NFT',
        description: 'Exclusive NFT for reducing carbon footprint by 25%',
        type: 'nft',
        requirements: {
          specificActions: ['carbon_reduction_25_percent'],
        },
        value: {
          monetaryValue: 50,
        },
        imageUrl: 'https://example.com/carbon-reducer-nft.png',
        rarity: 'rare',
      },
      {
        name: 'Sustainability Champion',
        description: 'Ultimate badge for achieving 90+ sustainability score',
        type: 'badge',
        requirements: {
          minSustainabilityScore: 90,
          minPoints: 5000,
        },
        value: {
          points: 1000,
        },
        imageUrl: 'https://example.com/sustainability-champion.png',
        rarity: 'legendary',
      },
      {
        name: '20% Green Discount',
        description: 'Discount on sustainable products',
        type: 'discount',
        requirements: {
          minPoints: 500,
        },
        value: {
          discountPercentage: 20,
        },
        rarity: 'common',
      },
    ]);

    console.log('✅ Created sample rewards');

    console.log(`
🎉 Database seeded successfully!

Sample accounts created:
- Consumer: consumer@example.com (password: password123)
- Supplier: supplier@example.com (password: password123)
- Admin: admin@example.com (password: password123)

Sample data includes:
- ${suppliers.length} suppliers
- ${products.length} products
- ${users.length} users
- ${rewards.length} rewards
    `);

    await mongoose.connection.close();
    console.log('🔚 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

export default seedData;
