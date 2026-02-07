// ============================================
// ROUTES: Admin User Management Routes
// ============================================
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticate, authorize } = require('../middleware/auth');
const {
  updateUserValidation,
  listUsersValidation,
  searchUsersValidation,
  bulkUpdateValidation,
  getUserByIdValidation
} = require('../middleware/customerValidator');

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// Statistics endpoint (must be before /:id)
router.get(
  '/stats/overview',
  customerController.getStatistics
);

// Search endpoint (must be before /:id)
router.get(
  '/search',
  searchUsersValidation,
  customerController.searchUsers
);

// Export endpoint (must be before /:id)
router.get(
  '/export/csv',
  customerController.exportUsers
);

// Bulk operations
router.patch(
  '/bulk/status',
  bulkUpdateValidation,
  customerController.bulkUpdateStatus
);

// CRUD operations
router.get(
  '/',
  listUsersValidation,
  customerController.getAllUsers
);

router.get(
  '/:id',
  getUserByIdValidation,
  customerController.getUserById
);

router.put(
  '/:id',
  updateUserValidation,
  customerController.updateUser
);

router.delete(
  '/:id',
  getUserByIdValidation,
  customerController.deleteUser
);

// Permanent delete (dangerous - use with caution)
router.delete(
  '/:id/permanent',
  getUserByIdValidation,
  customerController.permanentlyDeleteUser
);

module.exports = router;