import express from 'express';
import {
  getProducts,
  getProduct,
  getProductByBarcode,
  getProductByQRCode,
  createProduct,
} from '@/controllers/products';
import { authenticate } from '@/middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/barcode/:barcode', getProductByBarcode);
router.get('/qr/:qrCode', getProductByQRCode);

// Protected routes
router.post('/', authenticate, createProduct);

export default router;
