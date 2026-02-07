const { body, param, query, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

// Validation middleware to handle errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    throw new ApiError(400, errorMessages);
  }
  next();
};

// Update user validation
const updateUserValidation = [
  param('id')
    .notEmpty().withMessage('User ID is required'),
  
  body('fullname')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/).withMessage('Please provide a valid phone number'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Address cannot exceed 500 characters'),
  
  body('role')
    .optional()
    .isIn(['customer', 'restaurant_owner', 'admin', 'delivery_partner'])
    .withMessage('Invalid role'),
  
  body('is_active')
    .optional()
    .isBoolean().withMessage('is_active must be a boolean'),
  
  body('is_verified')
    .optional()
    .isBoolean().withMessage('is_verified must be a boolean'),
  
  body('email_verified')
    .optional()
    .isBoolean().withMessage('email_verified must be a boolean'),
  
  handleValidationErrors
];

// Get user by ID validation
const getUserByIdValidation = [
  param('id')
    .notEmpty().withMessage('User ID is required'),
  
  handleValidationErrors
];

// Query parameters validation for listing
const listUsersValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  query('role')
    .optional()
    .isIn(['all', 'customer', 'restaurant_owner', 'admin', 'delivery_partner'])
    .withMessage('Invalid role filter'),
  
  query('status')
    .optional()
    .isIn(['all', 'active', 'inactive', 'verified', 'unverified'])
    .withMessage('Invalid status filter'),
  
  query('sortBy')
    .optional()
    .isIn(['newest', 'oldest', 'name-asc', 'name-desc', 'recent-login'])
    .withMessage('Invalid sort option'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Search query too long'),
  
  query('startDate')
    .optional()
    .isISO8601().withMessage('Invalid start date format'),
  
  query('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date format'),
  
  handleValidationErrors
];

// Search validation
const searchUsersValidation = [
  query('q')
    .notEmpty().withMessage('Search query is required')
    .trim()
    .isLength({ min: 1, max: 200 }).withMessage('Search query must be between 1 and 200 characters'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  
  handleValidationErrors
];

// Bulk update validation
const bulkUpdateValidation = [
  body('userIds')
    .isArray({ min: 1 }).withMessage('User IDs must be a non-empty array')
    .custom((value) => {
      if (!value.every(id => typeof id === 'string')) {
        throw new Error('All user IDs must be strings');
      }
      return true;
    }),
  
  body('isActive')
    .notEmpty().withMessage('Status is required')
    .isBoolean().withMessage('isActive must be a boolean'),
  
  handleValidationErrors
];

module.exports = {
  updateUserValidation,
  getUserByIdValidation,
  listUsersValidation,
  searchUsersValidation,
  bulkUpdateValidation
};