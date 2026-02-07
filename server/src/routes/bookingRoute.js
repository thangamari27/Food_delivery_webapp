const express = require('express');
const BookingController = require('../controllers/bookingController');
const router = express.Router();

// Authentication middleware (import from your auth middleware)
const { authenticate, authorize } = require('../middleware/auth');

// Statistics and Analytics Routes (must be before :bookingId routes)
router.get('/stats', BookingController.getStats);
router.get('/calendar', BookingController.getCalendar);
router.get('/upcoming', BookingController.getUpcoming);
router.get('/search', BookingController.search);

// Check availability
router.post('/check-availability', BookingController.checkAvailability);

// My bookings (authenticated user's bookings)
router.get('/my-bookings', authenticate, BookingController.getMyBookings);

// Get bookings by customer
router.get('/customer/:customerId', authenticate, BookingController.getByCustomer);

// Get bookings by restaurant
router.get('/restaurant/:restaurantId', BookingController.getByRestaurant);

// Bulk operations
router.patch('/bulk', authenticate, authorize(['admin']), BookingController.bulkUpdate);

// Get all bookings
router.get('/', BookingController.getAll);

// Get booking by ID
router.get('/:bookingId', BookingController.getById);

// Create new booking
router.post('/', authenticate, BookingController.create);

// Update booking
router.put('/:bookingId', authenticate, BookingController.update);

// Confirm booking
router.patch('/:bookingId/confirm', authenticate, authorize(['admin']), BookingController.confirm);

// Complete booking
router.patch('/:bookingId/complete', authenticate, authorize(['admin']), BookingController.complete);

// Cancel booking
router.post('/:bookingId/cancel', authenticate, BookingController.cancel);

// Mark as no show
router.patch('/:bookingId/no-show', authenticate, authorize(['admin']), BookingController.markNoShow);

// Update admin notes
router.patch('/:bookingId/notes', authenticate, authorize(['admin']), BookingController.updateNotes);

// Delete booking (soft delete)
router.delete('/:bookingId', authenticate, authorize(['admin']), BookingController.delete);

// Delete booking permanently
router.delete('/:bookingId/permanent', authenticate, authorize(['admin']), BookingController.permanentDelete);

module.exports = router;