const express = require('express');
const OrderController = require('../controllers/orderController');
const router = express.Router();

// Authentication middleware (import from your auth middleware)
const { authenticate, authorize } = require('../middleware/auth');

// Statistics and Analytics Routes (must be before :orderId routes)
router.get('/stats', OrderController.getStats);
router.get('/revenue', OrderController.getRevenue);
router.get('/popular-items', OrderController.getPopularItems);
router.get('/search', OrderController.search);

// My orders (authenticated user's orders)
router.get('/my-orders', authenticate, OrderController.getMyOrders);
    
// Get orders by customer
router.get('/customer/:customerId', authenticate, OrderController.getByCustomer);

// Get orders by restaurant
router.get('/restaurant/:restaurantId', OrderController.getByRestaurant);

// Bulk operations
router.patch('/bulk', authenticate, authorize(['admin']), OrderController.bulkUpdate);

// Get all orders
router.get('/', OrderController.getAll);

// Get order by ID
router.get('/:orderId', OrderController.getById);

// Create new order
router.post('/', OrderController.create);

// Update order
router.put('/:orderId', authenticate, OrderController.update);

// Update order status
router.patch('/:orderId/status', authenticate, authorize(['admin']), OrderController.updateStatus);

// Update payment status
router.patch('/:orderId/payment', authenticate, authorize(['admin']), OrderController.updatePayment);

// Cancel order
router.post('/:orderId/cancel', authenticate, OrderController.cancel);

// Process refund
router.post('/:orderId/refund', authenticate, authorize(['admin']), OrderController.refund);

// Delete order (soft delete)
router.delete('/:orderId', authenticate, authorize(['admin']), OrderController.delete);

// Delete order permanently
router.delete('/:orderId/permanent', authenticate, authorize(['admin']), OrderController.permanentDelete);

module.exports = router;