import { body, validationResult } from 'express-validator';

export const validatePolicy = [
  body('policyNumber').trim().notEmpty().withMessage('policyNumber is required'),
  body('customerName').trim().notEmpty().withMessage('customerName is required'),
  body('email').isEmail().normalizeEmail(),
  body('productType').isIn(['auto', 'home', 'health', 'travel']),
  body('premium').isFloat({ min: 0 }),
  body('status').optional().isIn(['quoted', 'active', 'cancelled']),
  body('effectiveDate').isISO8601().toDate()
];

export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
