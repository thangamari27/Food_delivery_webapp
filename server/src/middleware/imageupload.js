// ============================================
// MIDDLEWARE: Image Upload Handler
// ============================================
const {
  uploadRestaurantImage,
  uploadFoodImage,
  uploadGalleryImages,
  uploadLogo
} = require('../config/cloudinary.config');
const ApiError = require('../utils/ApiError');

/**
 * Middleware to handle restaurant image upload
 */
const handleRestaurantImageUpload = (req, res, next) => {
  const upload = uploadRestaurantImage.single('image');
  
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ApiError(400, 'File size too large. Maximum size is 5MB'));
      }
      return next(new ApiError(400, err.message));
    }
    next();
  });
};

/**
 * Middleware to handle food image upload
 */
const handleFoodImageUpload = (req, res, next) => {
  const upload = uploadFoodImage.single('image');
  
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ApiError(400, 'File size too large. Maximum size is 5MB'));
      }
      return next(new ApiError(400, err.message));
    }
    next();
  });
};

/**
 * Middleware to handle restaurant gallery images upload (multiple)
 */
const handleGalleryImagesUpload = (req, res, next) => {
  const upload = uploadGalleryImages.array('images', 10);
  
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ApiError(400, 'File size too large. Maximum size is 5MB per file'));
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return next(new ApiError(400, 'Too many files. Maximum is 10 files'));
      }
      return next(new ApiError(400, err.message));
    }
    next();
  });
};

/**
 * Middleware to handle restaurant logo upload
 */
const handleLogoUpload = (req, res, next) => {
  const upload = uploadLogo.single('logo');
  
  upload(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ApiError(400, 'File size too large. Maximum size is 2MB'));
      }
      return next(new ApiError(400, err.message));
    }
    next();
  });
};

/**
 * Middleware to handle optional image upload
 * Doesn't throw error if no file is uploaded
 */
const handleOptionalImageUpload = (uploadHandler) => {
  return (req, res, next) => {
    uploadHandler(req, res, (err) => {
      // If no file provided, continue without error
      if (!req.file && !req.files) {
        return next();
      }
      
      // If there's an error with the upload, handle it
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new ApiError(400, 'File size too large'));
        }
        return next(new ApiError(400, err.message));
      }
      
      next();
    });
  };
};

/**
 * Middleware to process uploaded file and attach to request body
 */
const processUploadedImage = (req, res, next) => {
  if (req.file) {
    // Single file upload
    req.body.uploadedImage = {
      publicId: req.file.filename,
      url: req.file.path,
      format: req.file.format || req.file.mimetype.split('/')[1]
    };
  }
  
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    // Multiple files upload
    req.body.uploadedImages = req.files.map(file => ({
      publicId: file.filename,
      url: file.path,
      format: file.format || file.mimetype.split('/')[1]
    }));
  }
  
  next();
};

/**
 * Middleware to validate image requirements
 */
const validateImageUpload = (required = false) => {
  return (req, res, next) => {
    if (required && !req.file && !req.files) {
      return next(new ApiError(400, 'Image file is required'));
    }
    next();
  };
};

module.exports = {
  handleRestaurantImageUpload,
  handleFoodImageUpload,
  handleGalleryImagesUpload,
  handleLogoUpload,
  handleOptionalImageUpload,
  processUploadedImage,
  validateImageUpload
};