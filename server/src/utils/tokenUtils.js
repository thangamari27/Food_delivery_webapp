const jwt = require('jsonwebtoken');
const config = require('../config/env');

class TokenUtils {
  static generateAccessToken(userId, role) {
    return jwt.sign(
      { userId, role },
      config.JWT_ACCESS_SECRET,
      { expiresIn: config.JWT_ACCESS_EXPIRES_IN }
    );
  }

  static generateRefreshToken(userId) {
    return jwt.sign(
      { userId },
      config.JWT_REFRESH_SECRET,
      { expiresIn: config.JWT_REFRESH_EXPIRES_IN }
    );
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, config.JWT_ACCESS_SECRET);
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, config.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  static generateTokenPair(userId, role) {
    return {
      accessToken: this.generateAccessToken(userId, role),
      refreshToken: this.generateRefreshToken(userId)
    };
  }
}

module.exports = TokenUtils;