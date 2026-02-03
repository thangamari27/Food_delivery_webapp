// ============================================
// CLOUDINARY UTILITY SERVICE
// ============================================
const { cloudinary } = require('../config/cloudinary.config');

class CloudinaryService {
  /**
   * Upload single image to Cloudinary
   * @param {string} filePath - Local file path or buffer
   * @param {string} folder - Cloudinary folder name
   * @param {object} options - Additional upload options
   */
  async uploadImage(filePath, folder = 'uploads', options = {}) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        resource_type: 'image',
        ...options
      });

      return {
        publicId: result.public_id,
        url: result.secure_url,
        format: result.format,
        width: result.width,
        height: result.height
      };
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  }

  /**
   * Upload multiple images to Cloudinary
   * @param {Array} files - Array of file paths or buffers
   * @param {string} folder - Cloudinary folder name
   */
  async uploadMultipleImages(files, folder = 'uploads') {
    try {
      const uploadPromises = files.map(file =>
        this.uploadImage(file.path || file, folder)
      );
      return await Promise.all(uploadPromises);
    } catch (error) {
      throw new Error(`Cloudinary multiple upload failed: ${error.message}`);
    }
  }

  /**
   * Delete image from Cloudinary by public ID
   * @param {string} publicId - Cloudinary public ID
   */
  async deleteImage(publicId) {
    try {
      if (!publicId || publicId === 'restaurant_placeholder' || publicId === 'food_placeholder') {
        return { success: true, message: 'Placeholder image, no deletion needed' };
      }

      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image'
      });

      return {
        success: result.result === 'ok',
        message: result.result === 'ok' ? 'Image deleted successfully' : 'Image not found'
      };
    } catch (error) {
      throw new Error(`Cloudinary delete failed: ${error.message}`);
    }
  }

  /**
   * Delete multiple images from Cloudinary
   * @param {Array} publicIds - Array of public IDs
   */
  async deleteMultipleImages(publicIds) {
    try {
      const validIds = publicIds.filter(
        id => id && id !== 'restaurant_placeholder' && id !== 'food_placeholder'
      );

      if (validIds.length === 0) {
        return { success: true, message: 'No images to delete' };
      }

      const deletePromises = validIds.map(publicId =>
        this.deleteImage(publicId)
      );
      
      const results = await Promise.all(deletePromises);
      
      return {
        success: true,
        deleted: results.filter(r => r.success).length,
        total: validIds.length
      };
    } catch (error) {
      throw new Error(`Cloudinary multiple delete failed: ${error.message}`);
    }
  }

  /**
   * Update image (delete old and upload new)
   * @param {string} oldPublicId - Old image public ID to delete
   * @param {string} newFilePath - New file path to upload
   * @param {string} folder - Cloudinary folder name
   */
  async updateImage(oldPublicId, newFilePath, folder = 'uploads') {
    try {
      // Delete old image if exists
      if (oldPublicId && oldPublicId !== 'restaurant_placeholder' && oldPublicId !== 'food_placeholder') {
        await this.deleteImage(oldPublicId);
      }

      // Upload new image
      const newImage = await this.uploadImage(newFilePath, folder);
      
      return newImage;
    } catch (error) {
      throw new Error(`Cloudinary update failed: ${error.message}`);
    }
  }

  /**
   * Get image URL with transformations
   * @param {string} publicId - Cloudinary public ID
   * @param {object} transformations - Cloudinary transformation options
   */
  getImageUrl(publicId, transformations = {}) {
    try {
      return cloudinary.url(publicId, {
        secure: true,
        ...transformations
      });
    } catch (error) {
      throw new Error(`Failed to generate image URL: ${error.message}`);
    }
  }

  /**
   * Get optimized image URL (auto format and quality)
   * @param {string} publicId - Cloudinary public ID
   * @param {number} width - Desired width
   * @param {number} height - Desired height
   */
  getOptimizedImageUrl(publicId, width = null, height = null) {
    const transformations = {
      fetch_format: 'auto',
      quality: 'auto:good'
    };

    if (width) transformations.width = width;
    if (height) transformations.height = height;
    if (width || height) transformations.crop = 'limit';

    return this.getImageUrl(publicId, transformations);
  }

  /**
   * Generate responsive image URLs for different screen sizes
   * @param {string} publicId - Cloudinary public ID
   */
  getResponsiveImageUrls(publicId) {
    return {
      thumbnail: this.getOptimizedImageUrl(publicId, 150, 150),
      small: this.getOptimizedImageUrl(publicId, 400, 400),
      medium: this.getOptimizedImageUrl(publicId, 800, 800),
      large: this.getOptimizedImageUrl(publicId, 1200, 1200),
      original: this.getImageUrl(publicId)
    };
  }

  /**
   * Delete folder from Cloudinary
   * @param {string} folderPath - Folder path to delete
   */
  async deleteFolder(folderPath) {
    try {
      // First, get all resources in the folder
      const resources = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderPath,
        max_results: 500
      });

      // Delete all resources
      if (resources.resources.length > 0) {
        const publicIds = resources.resources.map(resource => resource.public_id);
        await cloudinary.api.delete_resources(publicIds);
      }

      // Delete the folder
      await cloudinary.api.delete_folder(folderPath);

      return {
        success: true,
        message: `Folder ${folderPath} deleted successfully`,
        deletedCount: resources.resources.length
      };
    } catch (error) {
      throw new Error(`Failed to delete folder: ${error.message}`);
    }
  }

  /**
   * Process uploaded file from multer
   * @param {object} file - Multer file object
   */
  processUploadedFile(file) {
    if (!file) return null;

    return {
      publicId: file.filename, // Cloudinary storage saves public_id as filename
      url: file.path, // Cloudinary storage provides secure_url as path
      format: file.format || file.mimetype.split('/')[1],
      size: file.size
    };
  }

  /**
   * Process multiple uploaded files from multer
   * @param {Array} files - Array of multer file objects
   */
  processUploadedFiles(files) {
    if (!files || files.length === 0) return [];

    return files.map(file => this.processUploadedFile(file));
  }
}

module.exports = new CloudinaryService();