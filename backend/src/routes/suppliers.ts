import express from 'express';
import { getSuppliers, getSupplier, createSupplier } from '@/controllers/suppliers';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

router.get('/', getSuppliers);
router.get('/:id', getSupplier);
router.post('/', authenticate, authorize('admin'), createSupplier);

export default router;
