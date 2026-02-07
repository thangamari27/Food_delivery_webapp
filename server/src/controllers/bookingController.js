const bookingService = require('../services/bookingService');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class BookingController {
    /**
     * Create a new booking
     * POST /api/bookings
     */
    async create(req, res) {
        try {
            const {
                restaurant,
                customer,
                bookingDate,
                bookingTime,
                numberOfGuests,
                tableNumber,
                tableType,
                specialRequests,
                dietaryRestrictions,
                occasion,
                deposit,
                source
            } = req.body;

            // Validation
            if (!restaurant || !restaurant.restaurantId) {
                return res.status(400).json({
                    success: false,
                    message: 'Restaurant is required'
                });
            }

            if (!customer || !customer.name || !customer.email || !customer.phone) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer name, email, and phone are required'
                });
            }

            if (!bookingDate || !bookingTime || !numberOfGuests) {
                return res.status(400).json({
                    success: false,
                    message: 'Booking date, time, and number of guests are required'
                });
            }

            const bookingData = {
                restaurant,
                customer,
                bookingDate,
                bookingTime,
                numberOfGuests: parseInt(numberOfGuests)
            };

            // Optional fields
            if (tableNumber) bookingData.tableNumber = tableNumber;
            if (tableType) bookingData.tableType = tableType;
            if (specialRequests) bookingData.specialRequests = specialRequests;
            if (dietaryRestrictions) bookingData.dietaryRestrictions = dietaryRestrictions;
            if (occasion) bookingData.occasion = occasion;
            if (deposit) bookingData.deposit = deposit;
            if (source) bookingData.source = source;

            // Add user ID if authenticated
            const userId = req.user ? req.user._id : null;

            const booking = await bookingService.createBooking(bookingData, userId);

            return res.status(201).json(
                new ApiResponse(201, {
                    success: true,
                    message: 'Booking created successfully',
                    data: booking
                })
            );
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get all bookings with filters
     * GET /api/bookings
     */
    async getAll(req, res) {
        try {
            const filters = {
                isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : true,
                status: req.query.status,
                restaurantId: req.query.restaurantId,
                customerId: req.query.customerId,
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo,
                date: req.query.date,
                minGuests: req.query.minGuests,
                maxGuests: req.query.maxGuests,
                canCancel: req.query.canCancel,
                occasion: req.query.occasion,
                tableType: req.query.tableType,
                search: req.query.search,
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                sortBy: req.query.sortBy || '-bookingDate -bookingTime',
                populate: req.query.populate === 'true'
            };

            const result = await bookingService.getAllBookings(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Bookings fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get booking by ID
     * GET /api/bookings/:bookingId
     */
    async getById(req, res) {
        try {
            const { bookingId } = req.params;
            const populate = req.query.populate !== 'false';

            const booking = await bookingService.getBookingById(bookingId, populate);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Booking fetched successfully',
                    data: booking
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get bookings by customer
     * GET /api/bookings/customer/:customerId
     */
    async getByCustomer(req, res) {
        try {
            const { customerId } = req.params;
            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                status: req.query.status,
                upcoming: req.query.upcoming === 'true'
            };

            const result = await bookingService.getBookingsByCustomer(customerId, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Customer bookings fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get bookings by restaurant
     * GET /api/bookings/restaurant/:restaurantId
     */
    async getByRestaurant(req, res) {
        try {
            const { restaurantId } = req.params;
            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                status: req.query.status,
                date: req.query.date,
                upcoming: req.query.upcoming === 'true'
            };

            const result = await bookingService.getBookingsByRestaurant(restaurantId, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant bookings fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Update booking
     * PUT /api/bookings/:bookingId
     */
    async update(req, res) {
        try {
            const { bookingId } = req.params;
            const updateData = req.body;

            // Add user ID if authenticated
            const userId = req.user ? req.user._id : null;

            const booking = await bookingService.updateBooking(bookingId, updateData, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Booking updated successfully',
                    data: booking
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Confirm booking
     * PATCH /api/bookings/:bookingId/confirm
     */
    async confirm(req, res) {
        try {
            const { bookingId } = req.params;
            const userId = req.user ? req.user._id : null;

            const booking = await bookingService.confirmBooking(bookingId, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Booking confirmed successfully',
                    data: booking
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Complete booking
     * PATCH /api/bookings/:bookingId/complete
     */
    async complete(req, res) {
        try {
            const { bookingId } = req.params;
            const userId = req.user ? req.user._id : null;

            const booking = await bookingService.completeBooking(bookingId, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Booking completed successfully',
                    data: booking
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Cancel booking
     * POST /api/bookings/:bookingId/cancel
     */
    async cancel(req, res) {
        try {
            const { bookingId } = req.params;
            const { reason, notes } = req.body;

            if (!reason) {
                return res.status(400).json({
                    success: false,
                    message: 'Cancellation reason is required'
                });
            }

            const userId = req.user ? req.user._id : null;

            const booking = await bookingService.cancelBooking(bookingId, reason, notes, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Booking cancelled successfully',
                    data: booking
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Mark as no show
     * PATCH /api/bookings/:bookingId/no-show
     */
    async markNoShow(req, res) {
        try {
            const { bookingId } = req.params;
            const userId = req.user ? req.user._id : null;

            const booking = await bookingService.markAsNoShow(bookingId, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Booking marked as no-show',
                    data: booking
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Update admin notes
     * PATCH /api/bookings/:bookingId/notes
     */
    async updateNotes(req, res) {
        try {
            const { bookingId } = req.params;
            const { adminNotes } = req.body;

            const userId = req.user ? req.user._id : null;

            const booking = await bookingService.updateAdminNotes(bookingId, adminNotes, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Admin notes updated successfully',
                    data: booking
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Delete booking (soft delete)
     * DELETE /api/bookings/:bookingId
     */
    async delete(req, res) {
        try {
            const { bookingId } = req.params;
            const userId = req.user ? req.user._id : null;

            const result = await bookingService.deleteBooking(bookingId, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: result.message,
                    data: result.data
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Delete booking permanently
     * DELETE /api/bookings/:bookingId/permanent
     */
    async permanentDelete(req, res) {
        try {
            const { bookingId } = req.params;

            const result = await bookingService.permanentlyDeleteBooking(bookingId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: result.message,
                    data: result.data
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get booking statistics
     * GET /api/bookings/stats
     */
    async getStats(req, res) {
        try {
            const filters = {
                restaurantId: req.query.restaurantId,
                customerId: req.query.customerId,
                dateFrom: req.query.dateFrom,
                dateTo: req.query.dateTo
            };

            const stats = await bookingService.getBookingStats(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Booking statistics fetched successfully',
                    data: stats
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get bookings by date range
     * GET /api/bookings/calendar
     */
    async getCalendar(req, res) {
        try {
            const { startDate, endDate, restaurantId } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).json({
                    success: false,
                    message: 'Start date and end date are required'
                });
            }

            const bookings = await bookingService.getBookingsByDateRange(startDate, endDate, restaurantId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Calendar bookings fetched successfully',
                    data: bookings
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Check availability
     * POST /api/bookings/check-availability
     */
    async checkAvailability(req, res) {
        try {
            const { restaurantId, date, time, tableNumber } = req.body;

            if (!restaurantId || !date || !time) {
                return res.status(400).json({
                    success: false,
                    message: 'Restaurant ID, date, and time are required'
                });
            }

            const result = await bookingService.checkAvailability(restaurantId, date, time, tableNumber);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: result.message,
                    data: result
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get upcoming bookings
     * GET /api/bookings/upcoming
     */
    async getUpcoming(req, res) {
        try {
            const restaurantId = req.query.restaurantId;
            const limit = req.query.limit || 10;

            const bookings = await bookingService.getUpcomingBookings(restaurantId, limit);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Upcoming bookings fetched successfully',
                    data: bookings
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Search bookings
     * GET /api/bookings/search
     */
    async search(req, res) {
        try {
            const { q } = req.query;

            if (!q) {
                return res.status(400).json({
                    success: false,
                    message: 'Search query (q) is required'
                });
            }

            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                restaurantId: req.query.restaurantId
            };

            const result = await bookingService.searchBookings(q, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Search results fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Bulk update bookings
     * PATCH /api/bookings/bulk
     */
    async bulkUpdate(req, res) {
        try {
            const { bookingIds, updateData } = req.body;

            if (!bookingIds || !Array.isArray(bookingIds) || bookingIds.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'bookingIds array is required'
                });
            }

            if (!updateData || Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'updateData is required'
                });
            }

            const result = await bookingService.bulkUpdateBookings(bookingIds, updateData);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: result.message,
                    data: {
                        matchedCount: result.matchedCount,
                        modifiedCount: result.modifiedCount
                    }
                })
            );
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get my bookings (for authenticated users)
     * GET /api/bookings/my-bookings
     */
    async getMyBookings(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                status: req.query.status,
                upcoming: req.query.upcoming === 'true'
            };

            const result = await bookingService.getBookingsByCustomer(req.user._id, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Your bookings fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new BookingController();