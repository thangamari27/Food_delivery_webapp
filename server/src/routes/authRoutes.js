// ============================================
// ROUTES: Authentication Route
// ============================================
const express = require('express');
const passport = require('passport');
const config = require('../config/env');
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

// Test endpoint for OAuth configuration (for debugging)
router.get('/test-oauth-config', (req, res) => {
  res.status(200).json({
    googleConfigured: !!config.GOOGLE_CLIENT_ID,
    googleCallbackUrl: config.GOOGLE_CALLBACK_URL,
    frontendUrl: config.FRONTEND_URL,
    backendUrl: config.BACKEND_URL
  });
});

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

// Google OAuth Routes
router.get('/google', 
  (req, res, next) => {
    console.log('Google OAuth initiated');
    next();
  },
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    accessType: 'offline',
    prompt: 'consent' 
  })
);

router.get('/google/callback',
  (req, res, next) => {
    console.log('Google OAuth callback received');
    next();
  },
  passport.authenticate('google', {
    failureRedirect: `${config.FRONTEND_URL || 'http://localhost:5173'}/login?error=social_auth_failed`,
    session: false
  }),
  async (req, res) => {
    try {
      console.log('Google OAuth successful for user:', req.user);
      console.log('User object structure:', {
        hasId: !!req.user.id,
        has_id: !!req.user._id,
        role: req.user.role,
        email: req.user.email
      });
      
      const userId = req.user.id;  
      const userRole = req.user.role || 'customer';
      
      if (!userId) {
        throw new Error('User ID not found in OAuth response');
      }
      
      // Generate JWT tokens
      const tokenUtils = require('../utils/tokenUtils');
      const tokens = tokenUtils.generateTokenPair(userId, userRole);
      
      // Decode to verify token payload
      const decoded = require('jsonwebtoken').decode(tokens.accessToken);
      
      // Sanitize user object for frontend (already sanitized, but ensure consistency)
      const userForFrontend = {
        id: req.user.id,
        user_id: req.user.user_id,
        username: req.user.username,
        email: req.user.email,
        fullname: req.user.fullname,
        role: userRole,
        profile_image: req.user.profile_image,
        is_verified: req.user.is_verified,
        email_verified: req.user.email_verified
      };
      
      const frontendUrl = config.FRONTEND_URL;
      const redirectUrl = `${frontendUrl}/auth/callback?` + 
        `token=${tokens.accessToken}` + 
        `&refresh=${tokens.refreshToken}` + 
        `&user=${encodeURIComponent(JSON.stringify(userForFrontend))}`;
      
      console.log(`Redirecting to frontend: ${frontendUrl}/auth/callback`);
      res.redirect(redirectUrl);
      
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      const frontendUrl = config.FRONTEND_URL;
      res.redirect(`${frontendUrl}/login?error=auth_failed&message=${encodeURIComponent(error.message)}`);
    }
  }
);

// PROTECTED ROUTES
router.post('/logout', authenticate, authController.logout);
router.post('/change-password', authenticate, changePasswordValidation, authController.changePassword);
router.get('/profile', authenticate, authController.getProfile);

// Additional protected route for OAuth account linking (optional)
router.post('/link-social-account', authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Social account linking endpoint',
    note: 'Implementation required for linking existing accounts to social logins'
  });
});

module.exports = router;