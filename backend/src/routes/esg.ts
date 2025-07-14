import express from 'express';
import { getESGReports, getESGReportsBySupplier, createESGReport } from '@/controllers/esg';
import { authenticate } from '@/middleware/auth';

const router = express.Router();

router.get('/', getESGReports);
router.get('/supplier/:supplierId', getESGReportsBySupplier);
router.post('/', authenticate, createESGReport);

export default router;
