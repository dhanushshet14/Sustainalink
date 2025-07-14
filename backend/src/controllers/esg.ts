import { Request, Response, NextFunction } from 'express';
import memoryStore from '@/data/memoryStore';
import { AuthRequest } from '@/middleware/auth';

/**
 * @desc    Get all ESG reports
 * @route   GET /api/esg
 * @access  Public
 */
export const getESGReports = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reports = memoryStore.getAllESGReports();
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get ESG reports by supplier
 * @route   GET /api/esg/supplier/:supplierId
 * @access  Public
 */
export const getESGReportsBySupplier = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reports = memoryStore.findESGReportsBySupplier(req.params.supplierId);
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new ESG report
 * @route   POST /api/esg
 * @access  Private (Supplier/Admin)
 */
export const createESGReport = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reportData = {
      ...req.body,
      submittedBy: req.user!._id,
    };

    const report = memoryStore.createESGReport(reportData);

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};
