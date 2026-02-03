// ============================================
// MIDDLEWARE: Authentication
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
    try {
      if (!req.user) {
        return next(new ApiError(401, 'Unauthorized'));
      }

      const userRole = req.user.role;
      
      // Validate userRole exists
      if (!userRole) {
        return next(new ApiError(403, 'User role not found in token'));
      }
      
      // Ensure role is string and normalize
      const normalizedUserRole = String(userRole).trim().toLowerCase();
      const normalizedRequiredRoles = roles.map(role => 
        String(role).trim().toLowerCase()
      );
      
      // Check if user has required role
      const hasRole = normalizedRequiredRoles.includes(normalizedUserRole);
      
      if (!hasRole) {
        return next(new ApiError(403, 
          `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${userRole}`
        ));
      }

      next();
    } catch (error) {
      // Handle unexpected errors
      console.error('Authorization error:', error);
      return next(new ApiError(500, 'Authorization check failed'));
    }
  };
};

module.exports = { authenticate, authorize };