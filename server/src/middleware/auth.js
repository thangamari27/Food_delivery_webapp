// ============================================
// 9. MIDDLEWARE: Authentication
// ============================================
const TokenUtils = require('../utils/tokenUtils');
const ApiError = require('../utils/ApiError');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access token required');
    }

    const token = authHeader.substring(7);
    const decoded = TokenUtils.verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Unauthorized'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied. Insufficient permissions'));
    }

    next();
  };
};

module.exports = { authenticate, authorize };