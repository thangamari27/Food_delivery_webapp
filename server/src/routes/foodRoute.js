const express = require('express');
const FoodController = require('../controllers/foodController');
const router = express.Router();

// authentication middleware where needed
const { authenticate, authorize } = require('../middleware/auth');
const { handleFoodImageUpload, handleOptionalImageUpload, processUploadedImage } = require('../middleware/imageupload');

// Statistics and Popular (must be before :fid routes)
router.get('/stats', FoodController.getStats);
router.get('/popular', FoodController.getPopular);
router.get('/search', FoodController.search);

// Get foods by restaurant
router.get('/restaurant/:restaurantId', FoodController.getByRestaurant);

// Bulk operations
router.patch('/bulk', authenticate, authorize(['admin']),FoodController.bulkUpdate);

// Get all foods
router.get('/', FoodController.getAll);

// Get food by ID
router.get('/:fid', FoodController.getById);

// Create new food
router.post('/', 
    authenticate, 
    authorize(['admin']), 
    handleOptionalImageUpload(handleFoodImageUpload),
    processUploadedImage,
    FoodController.create
);

// Update food
router.put('/:fid', 
    authenticate, 
    authorize(['admin']), 
    handleOptionalImageUpload(handleFoodImageUpload),
    processUploadedImage,
    FoodController.update
);

// Update availability
router.patch('/:fid/availability', authenticate, authorize(['admin']), FoodController.updateAvailability);

// Update quantity
router.patch('/:fid/quantity', authenticate, authorize(['admin']), FoodController.updateQuantity);

// Deactivate food (soft delete)
router.delete('/:fid', authenticate, authorize(['admin']), FoodController.deactivate);

// Delete food permanently
router.delete('/:fid/permanent', authenticate, authorize(['admin']), FoodController.delete);

module.exports = router;