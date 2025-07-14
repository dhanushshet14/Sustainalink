import { Request, Response, NextFunction } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AuthRequest } from '@/middleware/auth';
import memoryStore from '@/data/memoryStore';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

/**
 * @desc    Generate sustainability recommendations
 * @route   POST /api/ai/recommendations
 * @access  Private
 */
export const generateRecommendations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userProfile, preferences, currentMetrics } = req.body;
    const userId = req.user!._id;

    // Get user data
    const user = memoryStore.findUserById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Prepare prompt for Gemini
    const prompt = `
      As a sustainability expert, provide personalized recommendations for a user with the following profile:
      
      User Profile:
      - Sustainability Score: ${user.esgMetrics.sustainabilityScore}
      - Carbon Footprint: ${user.esgMetrics.carbonFootprint}
      - Waste Reduction: ${user.esgMetrics.wasteReduction}
      - Goals: ${user.profile.preferences.sustainabilityGoals.join(', ')}
      
      Additional Context:
      ${JSON.stringify(userProfile || {})}
      
      Current Metrics:
      ${JSON.stringify(currentMetrics || {})}
      
      Please provide 5-7 specific, actionable sustainability recommendations that are:
      1. Tailored to their current metrics and goals
      2. Realistic and achievable
      3. Include estimated impact
      4. Prioritized by potential environmental benefit
      
      Format as a JSON array with each recommendation having: title, description, impact, difficulty, category.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Try to parse as JSON, fallback to structured text
      const recommendations = JSON.parse(text);
      
      res.status(200).json({
        success: true,
        data: recommendations,
      });
    } catch (parseError) {
      // If JSON parsing fails, return the text response
      res.status(200).json({
        success: true,
        data: {
          recommendations: text,
          type: 'text',
        },
      });
    }
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    next(error);
  }
};

/**
 * @desc    Chat with AI assistant
 * @route   POST /api/ai/chat
 * @access  Private
 */
export const chatWithAI = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { message, history = [] } = req.body;
    const userId = req.user!._id;

    // Get user context
    const user = memoryStore.findUserById(userId);
    
    // Build conversation context
    const conversationHistory = history
      .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const prompt = `
      You are SustainaBot, a helpful AI assistant for the SustainaLink sustainability platform.
      You help users with questions about sustainability, ESG metrics, supply chain transparency, and environmental impact.
      
      User Context:
      - Role: ${user?.role}
      - Sustainability Score: ${user?.esgMetrics.sustainabilityScore || 0}
      - Current Level: ${user?.rewards.level || 1}
      
      Previous conversation:
      ${conversationHistory}
      
      User: ${message}
      
      Provide a helpful, informative response focused on sustainability and environmental topics.
      Keep responses concise but informative.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      data: {
        response: text,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    next(error);
  }
};

/**
 * @desc    Analyze product sustainability
 * @route   POST /api/ai/analyze-product
 * @access  Private
 */
export const analyzeProductSustainability = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId } = req.body;

    // Get product data
    const product = memoryStore.findProductById(productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    const prompt = `
      Analyze the sustainability of this product and provide insights:
      
      Product: ${product.name}
      Category: ${product.category}
      Carbon Footprint: ${product.sustainabilityMetrics.carbonFootprint}
      Recyclability Score: ${product.sustainabilityMetrics.recyclabilityScore}
      Sustainability Rating: ${product.sustainabilityMetrics.sustainabilityRating}
      Certifications: ${product.sustainabilityMetrics.certifications.join(', ')}
      
      Supply Chain:
      - Origin: ${product.supplyChain.originCountry}
      - Transportation: ${product.supplyChain.transportationMode}
      
      ESG Data:
      - Water Usage: ${product.esgData.environmental.waterUsage}
      - Energy Consumption: ${product.esgData.environmental.energyConsumption}
      - Renewable Energy: ${product.esgData.environmental.renewableEnergyPercentage}%
      - Fair Trade: ${product.esgData.social.fairTrade}
      - Ethical Sourcing: ${product.esgData.governance.ethicalSourcing}
      
      Provide:
      1. Overall sustainability assessment
      2. Key strengths and areas for improvement
      3. Comparison to industry standards
      4. Specific recommendations for improvement
      5. Consumer guidance
      
      Format as structured JSON with sections for assessment, strengths, improvements, recommendations.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const analysis = JSON.parse(text);
      res.status(200).json({
        success: true,
        data: {
          productId,
          analysis,
          generatedAt: new Date().toISOString(),
        },
      });
    } catch (parseError) {
      res.status(200).json({
        success: true,
        data: {
          productId,
          analysis: text,
          type: 'text',
          generatedAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error('Product Analysis Error:', error);
    next(error);
  }
};

/**
 * @desc    Generate ESG report
 * @route   POST /api/ai/generate-esg-report
 * @access  Private
 */
export const generateESGReport = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { supplierId, timeframe = 'quarterly' } = req.body;

    // Get supplier data
    const supplier = memoryStore.findSupplierById(supplierId);
    if (!supplier) {
      res.status(404).json({
        success: false,
        message: 'Supplier not found',
      });
      return;
    }

    const prompt = `
      Generate a comprehensive ESG report for this supplier:
      
      Company: ${supplier.companyName}
      Overall Sustainability Score: ${supplier.sustainabilityScore}/100
      Industry: ${supplier.industry}
      Verification Status: ${supplier.verificationStatus}
      
      Environmental Metrics:
      - Carbon Emissions: ${supplier.esgMetrics.environmental.carbonEmissions}
      - Water Usage: ${supplier.esgMetrics.environmental.waterUsage}
      - Waste Reduction: ${supplier.esgMetrics.environmental.wasteReduction}
      - Renewable Energy: ${supplier.esgMetrics.environmental.renewableEnergy}
      
      Social Metrics:
      - Employee Satisfaction: ${supplier.esgMetrics.social.employeeSatisfaction}
      - Diversity Index: ${supplier.esgMetrics.social.diversityIndex}
      - Community Investment: ${supplier.esgMetrics.social.communityInvestment}
      - Safety Record: ${supplier.esgMetrics.social.safetyRecord}
      
      Governance Metrics:
      - Transparency Score: ${supplier.esgMetrics.governance.transparencyScore}
      - Ethics Rating: ${supplier.esgMetrics.governance.ethicsRating}
      - Compliance Record: ${supplier.esgMetrics.governance.complianceRecord}
      - Board Diversity: ${supplier.esgMetrics.governance.boardDiversity}
      
      Certifications: ${supplier.certifications.join(', ')}
      
      Generate a ${timeframe} ESG report including:
      1. Executive Summary
      2. Performance Overview
      3. Environmental Impact Analysis
      4. Social Responsibility Assessment
      5. Governance Evaluation
      6. Risk Assessment
      7. Recommendations for Improvement
      8. Benchmarking against industry standards
      
      Format as structured JSON with clear sections and actionable insights.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const report = JSON.parse(text);
      res.status(200).json({
        success: true,
        data: {
          supplierId,
          supplier: supplier.companyName,
          timeframe,
          report,
          generatedAt: new Date().toISOString(),
        },
      });
    } catch (parseError) {
      res.status(200).json({
        success: true,
        data: {
          supplierId,
          supplier: supplier.companyName,
          timeframe,
          report: text,
          type: 'text',
          generatedAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error('ESG Report Generation Error:', error);
    next(error);
  }
};

/**
 * @desc    Optimize supply chain for sustainability
 * @route   POST /api/ai/optimize-supply-chain
 * @access  Private
 */
export const optimizeSupplyChain = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { supplyChainData, constraints = {} } = req.body;

    const prompt = `
      Analyze and optimize this supply chain for sustainability:
      
      Current Supply Chain Data:
      ${JSON.stringify(supplyChainData, null, 2)}
      
      Constraints:
      ${JSON.stringify(constraints, null, 2)}
      
      Provide optimization recommendations focusing on:
      1. Reducing carbon footprint
      2. Improving supplier ESG scores
      3. Minimizing transportation impacts
      4. Enhancing transparency and traceability
      5. Cost-effective sustainability improvements
      
      Include:
      - Current sustainability assessment
      - Specific optimization strategies
      - Expected impact metrics
      - Implementation timeline
      - Risk assessment
      - ROI projections
      
      Format as structured JSON with actionable recommendations.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const optimization = JSON.parse(text);
      res.status(200).json({
        success: true,
        data: {
          optimization,
          generatedAt: new Date().toISOString(),
        },
      });
    } catch (parseError) {
      res.status(200).json({
        success: true,
        data: {
          optimization: text,
          type: 'text',
          generatedAt: new Date().toISOString(),
        },
      });
    }
  } catch (error) {
    console.error('Supply Chain Optimization Error:', error);
    next(error);
  }
};
