import express from 'express';
import {
  generateRecommendations,
  chatWithAI,
  analyzeProductSustainability,
  generateESGReport,
  optimizeSupplyChain,
} from '@/controllers/ai';
import { authenticate } from '@/middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /api/ai/recommendations:
 *   post:
 *     summary: Generate sustainability recommendations
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userProfile:
 *                 type: object
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: string
 *               currentMetrics:
 *                 type: object
 *     responses:
 *       200:
 *         description: Recommendations generated successfully
 */
router.post('/recommendations', authenticate, generateRecommendations);

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Chat with AI assistant
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *               history:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant]
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: AI response generated successfully
 */
router.post('/chat', authenticate, chatWithAI);

/**
 * @swagger
 * /api/ai/analyze-product:
 *   post:
 *     summary: Analyze product sustainability
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product analysis completed
 */
router.post('/analyze-product', authenticate, analyzeProductSustainability);

/**
 * @swagger
 * /api/ai/generate-esg-report:
 *   post:
 *     summary: Generate ESG report
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplierId
 *             properties:
 *               supplierId:
 *                 type: string
 *               timeframe:
 *                 type: string
 *                 enum: [monthly, quarterly, yearly]
 *     responses:
 *       200:
 *         description: ESG report generated successfully
 */
router.post('/generate-esg-report', authenticate, generateESGReport);

/**
 * @swagger
 * /api/ai/optimize-supply-chain:
 *   post:
 *     summary: Optimize supply chain for sustainability
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplyChainData
 *             properties:
 *               supplyChainData:
 *                 type: object
 *               constraints:
 *                 type: object
 *     responses:
 *       200:
 *         description: Supply chain optimization completed
 */
router.post('/optimize-supply-chain', authenticate, optimizeSupplyChain);

export default router;
