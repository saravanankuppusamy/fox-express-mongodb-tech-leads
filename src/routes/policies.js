import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validatePolicy, handleValidation } from '../middleware/validation.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { listPolicies, getPolicy, createPolicy, updatePolicy, deletePolicy } from '../controllers/policyController.js';

const router = Router();
router.get('/', asyncHandler(listPolicies));
router.get('/:id', asyncHandler(getPolicy));
router.post('/', validatePolicy, handleValidation, asyncHandler(createPolicy));
router.put('/:id', authenticate, validatePolicy, handleValidation, asyncHandler(updatePolicy));
router.delete('/:id', authenticate, authorize('admin'), asyncHandler(deletePolicy));
export default router;
