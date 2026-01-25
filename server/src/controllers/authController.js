const authService = require('../services/authService');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, password, fullname, role } = req.body;

      const result = await authService.register({
        username,
        email,
        password,
        fullname,
        role
      });

      // Set refresh token as httpOnly cookie
      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.status(201).json(
        new ApiResponse(201, {
          user: result.user,
          accessToken: result.tokens.accessToken
        }, 'Registration successful. Please check your email for verification.')
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { identifier, password, rememberMe } = req.body;

      const result = await authService.login(identifier, password, rememberMe);

      // Set refresh token as httpOnly cookie
      const cookieMaxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: cookieMaxAge
      });

      res.status(200).json(
        new ApiResponse(200, {
          user: result.user,
          accessToken: result.tokens.accessToken
        }, 'Login successful')
      );
    } catch (error) {
      next(error);
    }
  }

  async socialLogin(req, res, next) {
    try {
      const { provider, token, profile } = req.body;

      const result = await authService.socialLogin(provider, profile);

      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json(
        new ApiResponse(200, {
          user: result.user,
          accessToken: result.tokens.accessToken
        }, 'Social login successful')
      );
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        throw new ApiError(401, 'Refresh token not provided');
      }

      const tokens = await authService.refreshToken(refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json(
        new ApiResponse(200, {
          accessToken: tokens.accessToken
        }, 'Token refreshed successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const userId = req.user.userId;

      if (refreshToken) {
        await authService.logout(userId, refreshToken);
      }

      res.clearCookie('refreshToken');

      res.status(200).json(
        new ApiResponse(200, null, 'Logged out successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;

      if (!token) {
        throw new ApiError(400, 'Verification token required');
      }

      const result = await authService.verifyEmail(token);

      res.status(200).json(
        new ApiResponse(200, null, result.message)
      );
    } catch (error) {
      next(error);
    }
  }

  async resendVerification(req, res, next) {
    try {
      const User = require('../models/User');
      const emailService = require('../services/emailService');
    
      const user = await User.findById(req.user.userId);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      if (user.email_verified) {
        throw new ApiError(400, 'Email already verified');
      }

      // Generate new verification token
      const verificationToken = user.generateEmailVerificationToken();
      await user.save();

      // Send email
      const result = await emailService.sendVerificationEmail(
        user.email, 
        verificationToken, 
        user.full_name
      ).catch(err => ({ success: false }));

      res.status(200).json(
        new ApiResponse(200, { emailSent: result.success }, 
          result.success 
            ? 'Verification email sent successfully'
            : 'Verification email requested'
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const result = await authService.forgotPassword(email);

      res.status(200).json(
        new ApiResponse(200, null, result.message)
      );
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;

      const result = await authService.resetPassword(token, newPassword);

      res.status(200).json(
        new ApiResponse(200, null, result.message)
      );
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.userId;

      const result = await authService.changePassword(userId, currentPassword, newPassword);

      res.status(200).json(
        new ApiResponse(200, null, result.message)
      );
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const User = require('../models/User');
      const user = await User.findById(req.user.userId).select('-password -refresh_tokens');

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      res.status(200).json(
        new ApiResponse(200, authService.sanitizeUser(user), 'Profile retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();