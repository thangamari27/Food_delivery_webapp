// ============================================
// SERVICE: authService
// ============================================
const User = require('../models/auth.model');
const ApiError = require('../utils/ApiError');
const TokenUtils = require('../utils/tokenUtils');
const emailService = require('./emailService');
const crypto = require('crypto');

class AuthService {
  async register(userData) {
    const { username, email, password, fullname, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ApiError(400, 'Email already registered');
      }
      if (existingUser.username === username) {
        throw new ApiError(400, 'Username already taken');
      }
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      fullname,
      role: role || 'customer'
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email (don't await to not block response)
    emailService.sendVerificationEmail(email, verificationToken, fullname)
      .catch(err => console.error('Email sending failed:', err));

    // Generate tokens
    const tokens = TokenUtils.generateTokenPair(user._id, user.role);

    // Store refresh token
    user.refresh_tokens.push({
      token: tokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    await user.save();

    return {
      user: this.sanitizeUser(user),
      tokens
    };
  }

  async login(identifier, password, rememberMe = false) {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      is_active: true
    });

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Check if account is locked
    if (user.isLocked) {
      const lockTimeRemaining = Math.ceil((user.lock_until - Date.now()) / 60000);
      throw new ApiError(423, `Account locked. Try again in ${lockTimeRemaining} minutes`);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      await user.incrementLoginAttempts();
      throw new ApiError(401, 'Invalid credentials');
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    // Update last login
    user.last_login = new Date();

    // Generate tokens
    const tokens = TokenUtils.generateTokenPair(user._id, user.role);

    // Store refresh token
    const expiresIn = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000; // 30 days or 7 days
    user.refresh_tokens.push({
      token: tokens.refreshToken,
      expires_at: new Date(Date.now() + expiresIn)
    });

    // Keep only last 5 refresh tokens
    if (user.refresh_tokens.length > 5) {
      user.refresh_tokens = user.refresh_tokens.slice(-5);
    }

    await user.save();

    return {
      user: this.sanitizeUser(user),
      tokens
    };
  }

  async socialLogin(provider, socialData) {
    const { id, email, name, picture } = socialData;

    // Find user by social auth ID or email
    let user = await User.findOne({
      $or: [
        { social_auth_id: id, social_auth_provider: provider },
        { email }
      ]
    });

    if (user) {
      // Update existing user
      if (!user.social_auth_id) {
        user.social_auth_id = id;
        user.social_auth_provider = provider;
      }
      if (picture && !user.profile_image) {
        user.profile_image = picture;
      }
      user.email_verified = true;
      user.is_verified = true;
      user.last_login = new Date();
    } else {

      // Generate unique username
      const baseUsername = email.split('@')[0].toLowerCase();
      const username = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
      
      // Create new user with 'customer' role
      user = new User({
        username,
        email,
        fullname: name,
        social_auth_provider: provider,
        social_auth_id: id,
        profile_image: picture,
        email_verified: true,  
        is_verified: true,     
        role: 'customer'       
      });
    }

    // Generate tokens
    const tokens = TokenUtils.generateTokenPair(user._id, user.role);

    // Store refresh token
    user.refresh_tokens.push({
      token: tokens.refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await user.save();

    return {
      user: this.sanitizeUser(user),
      tokens
    };
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = TokenUtils.verifyRefreshToken(refreshToken);
      
      const user = await User.findById(decoded.userId);
      if (!user || !user.is_active) {
        throw new ApiError(401, 'User not found or inactive');
      }

      // Check if refresh token exists and is valid
      const tokenExists = user.refresh_tokens.some(
        rt => rt.token === refreshToken && rt.expires_at > new Date()
      );

      if (!tokenExists) {
        throw new ApiError(401, 'Invalid or expired refresh token');
      }

      // Generate new tokens
      const tokens = TokenUtils.generateTokenPair(user._id, user.role);

      // Remove old refresh token and add new one
      user.refresh_tokens = user.refresh_tokens.filter(rt => rt.token !== refreshToken);
      user.refresh_tokens.push({
        token: tokens.refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });

      await user.save();

      return tokens;
    } catch (error) {
      throw new ApiError(401, 'Invalid refresh token');
    }
  }

  async logout(userId, refreshToken) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Remove specific refresh token
    user.refresh_tokens = user.refresh_tokens.filter(rt => rt.token !== refreshToken);
    await user.save();

    return { message: 'Logged out successfully' };
  }

  async verifyEmail(token) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      email_verification_token: hashedToken,
      email_verification_expires: { $gt: Date.now() }
    });

    if (!user) {
      throw new ApiError(400, 'Invalid or expired verification token');
    }

    user.email_verified = true;
    user.is_verified = true;
    user.email_verification_token = undefined;
    user.email_verification_expires = undefined;
    await user.save();

    // Send welcome email
    emailService.sendWelcomeEmail(user.email, user.fullname)
      .catch(err => console.error('Welcome email failed:', err));

    return { message: 'Email verified successfully' };
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email, is_active: true });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If email exists, password reset link has been sent' };
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send password reset email
    await emailService.sendPasswordResetEmail(email, resetToken, user.fullname);

    return { message: 'Password reset link sent to your email' };
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      reset_password_token: hashedToken,
      reset_password_expires: { $gt: Date.now() }
    });

    if (!user) {
      throw new ApiError(400, 'Invalid or expired reset token');
    }

    user.password = newPassword;
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;
    user.refresh_tokens = []; // Invalidate all sessions
    await user.save();

    return { message: 'Password reset successful' };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  sanitizeUser(user) {
    return {
      id: user._id,
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
      profile_image: user.profile_image,
      is_verified: user.is_verified,
      email_verified: user.email_verified,
      created_at: user.created_at
    };
  }
}

module.exports = new AuthService();