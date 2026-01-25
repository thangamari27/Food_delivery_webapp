// ============================================
// ROUTES: Authentication Route
// ============================================
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
  socialLoginValidation
} = require('../middleware/validator');
const {
  loginLimiter,
  passwordResetLimiter,
  registerLimiter
} = require('../middleware/rateLimiter');

// Public routes
router.post('/register', registerLimiter, registerValidation, authController.register);
router.post('/login', loginLimiter, loginValidation, authController.login);
router.post('/social-login', socialLoginValidation, authController.socialLogin);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', passwordResetLimiter, forgotPasswordValidation, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

// Email verification routes
router.get('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authenticate, authController.resendVerification);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, changePasswordValidation, authController.changePassword);
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;