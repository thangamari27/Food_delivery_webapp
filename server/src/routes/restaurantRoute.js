const express = require('express');
const RestaurantController = require('../controllers/restaurantController');
const router = express.Router();

// authentication middleware where needed
const { authenticate, authorize } = require('../middleware/auth');
const { handleRestaurantImageUpload, handleOptionalImageUpload, processUploadedImage } = require('../middleware/imageupload');

// Statistics and Popular (must be before :rid routes)
router.get('/stats', RestaurantController.getStats);
router.get('/popular', RestaurantController.getPopular);
router.get('/search', RestaurantController.search);

// Get restaurants by city
router.get('/city/:city', RestaurantController.getByCity);

// Get restaurants by cuisine
router.get('/cuisine/:cuisine', RestaurantController.getByCuisine);

// Get restaurant by email
router.get('/email/:email', RestaurantController.getByEmail);

// Get nearby restaurants
router.post('/nearby', RestaurantController.getNearby);

// Bulk operations
router.patch('/bulk', RestaurantController.bulkUpdate);

// Get all restaurants
router.get('/', RestaurantController.getAll);

// Get restaurant by ID
router.get('/:rid', RestaurantController.getById);

// Create new restaurant
router.post('/', 
    authenticate,
    authorize(['admin']),
    handleOptionalImageUpload(handleRestaurantImageUpload),
    processUploadedImage,
    RestaurantController.create
);

// Update restaurant
router.put('/:rid',
    authenticate,
    authorize(['admin']),
    handleOptionalImageUpload(handleRestaurantImageUpload),
    processUploadedImage, 
    RestaurantController.update
);

// Update restaurant status
router.patch('/:rid/status', RestaurantController.updateStatus);

// Update operating hours
router.patch('/:rid/hours', RestaurantController.updateOperatingHours);

// Menu management
router.post('/:rid/menu', RestaurantController.addMenuItem);
router.delete('/:rid/menu/:foodId', RestaurantController.removeMenuItem);

// Offers management
router.post('/:rid/offers', RestaurantController.addOffer);

// Deactivate restaurant (soft delete)
router.delete('/:rid', RestaurantController.deactivate);

// Delete restaurant permanently
router.delete('/:rid/permanent', RestaurantController.delete);

module.exports = router;