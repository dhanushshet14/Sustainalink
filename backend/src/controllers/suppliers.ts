import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import memoryStore from '@/data/memoryStore';
import { AuthRequest } from '@/middleware/auth';

/**
 * @desc    Get all suppliers
 * @route   GET /api/suppliers
 * @access  Public
 */
export const getSuppliers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const suppliers = memoryStore.getAllSuppliers();
    
    res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single supplier
 * @route   GET /api/suppliers/:id
 * @access  Public
 */
export const getSupplier = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const supplier = memoryStore.findSupplierById(req.params.id);

    if (!supplier) {
      res.status(404).json({
        success: false,
        message: 'Supplier not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new supplier
 * @route   POST /api/suppliers
 * @access  Private (Admin)
 */
export const createSupplier = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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

    const supplier = memoryStore.createSupplier(req.body);

    res.status(201).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    next(error);
  }
};
