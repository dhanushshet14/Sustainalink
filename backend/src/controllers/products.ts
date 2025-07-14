import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import memoryStore from '@/data/memoryStore';
import { AuthRequest } from '@/middleware/auth';

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = memoryStore.getAllProducts();
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = memoryStore.findProductById(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get product by barcode
 * @route   GET /api/products/barcode/:barcode
 * @access  Public
 */
export const getProductByBarcode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = memoryStore.findProductByBarcode(req.params.barcode);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get product by QR code
 * @route   GET /api/products/qr/:qrCode
 * @access  Public
 */
export const getProductByQRCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = memoryStore.findProductByQRCode(req.params.qrCode);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private (Admin/Supplier)
 */
export const createProduct = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const product = memoryStore.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
