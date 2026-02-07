const Booking = require('../models/booking.model');
const Restaurant = require('../models/restaurant.model');

class BookingService {
    /**
     * Create a new booking
     */
    async createBooking(data, userId = null) {
        try {
            // Validate restaurant exists
            if (data.restaurant?.restaurantId) {
                const restaurant = await Restaurant.findById(data.restaurant.restaurantId);
                if (!restaurant) {
                    throw new Error('Restaurant not found');
                }
                
                // Check if restaurant is active and accepting bookings
                if (!restaurant.isActive || restaurant.status !== 'Active') {
                    throw new Error('Restaurant is not currently accepting bookings');
                }
                
                // Add restaurant details if not provided
                if (!data.restaurant.restaurantName) {
                    data.restaurant.restaurantName = restaurant.name;
                }
                if (!data.restaurant.cuisine) {
                    data.restaurant.cuisine = restaurant.cuisine[0] || '';
                }
                if (!data.restaurant.phone) {
                    data.restaurant.phone = restaurant.phone;
                }
                if (!data.restaurant.address) {
                    data.restaurant.address = restaurant.fullAddress;
                }
            }

            // Check for booking conflicts (same restaurant, date, time)
            const hasConflict = await Booking.checkConflict(
                data.restaurant.restaurantId,
                data.bookingDate,
                data.bookingTime,
                data.tableNumber
            );

            if (hasConflict && data.tableNumber) {
                throw new Error('This table is already booked for the selected time');
            }

            // Set customer user ID if provided
            if (userId && data.customer) {
                data.customer.userId = userId;
            }

            // Set created by
            if (userId) {
                data.createdBy = userId;
            }

            // Create booking
            const booking = new Booking(data);
            const savedBooking = await booking.save();

            return savedBooking;
        } catch (error) {
            throw new Error(`Error creating booking: ${error.message}`);
        }
    }

    /**
     * Get all bookings with advanced filtering, sorting, and pagination
     */
    async getAllBookings(filters = {}) {
        try {
            const {
                isActive = true,
                status,
                restaurantId,
                customerId,
                dateFrom,
                dateTo,
                date,
                minGuests,
                maxGuests,
                canCancel,
                occasion,
                tableType,
                search,
                limit = 20,
                skip = 0,
                sortBy = '-bookingDate -bookingTime',
                populate = false
            } = filters;

            // Build query
            const query = {};

            if (isActive !== undefined) query.isActive = isActive;
            
            if (status) {
                if (status === 'all') {
                    // Don't filter by status
                } else if (Array.isArray(status)) {
                    query.status = { $in: status };
                } else {
                    query.status = status;
                }
            }
            
            if (restaurantId) {
                query['restaurant.restaurantId'] = restaurantId;
            }
            
            if (customerId) {
                query['customer.userId'] = customerId;
            }

            // Date filtering
            if (date) {
                const startOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);
                query.bookingDate = { $gte: startOfDay, $lte: endOfDay };
            } else if (dateFrom || dateTo) {
                query.bookingDate = {};
                if (dateFrom) {
                    const startDate = new Date(dateFrom);
                    startDate.setHours(0, 0, 0, 0);
                    query.bookingDate.$gte = startDate;
                }
                if (dateTo) {
                    const endDate = new Date(dateTo);
                    endDate.setHours(23, 59, 59, 999);
                    query.bookingDate.$lte = endDate;
                }
            }

            // Guest count filtering
            if (minGuests !== undefined || maxGuests !== undefined) {
                query.numberOfGuests = {};
                if (minGuests !== undefined) {
                    query.numberOfGuests.$gte = parseInt(minGuests);
                }
                if (maxGuests !== undefined) {
                    query.numberOfGuests.$lte = parseInt(maxGuests);
                }
            }

            if (canCancel !== undefined && canCancel !== null) {
                query.canCancel = canCancel === 'true' || canCancel === true;
            }

            if (occasion) {
                query.occasion = occasion;
            }

            if (tableType) {
                query.tableType = tableType;
            }

            // Text search
            if (search) {
                query.$or = [
                    { bookingId: new RegExp(search, 'i') },
                    { 'customer.name': new RegExp(search, 'i') },
                    { 'restaurant.restaurantName': new RegExp(search, 'i') }
                ];
            }

            // Build base query
            let bookingQuery = Booking.find(query)
                .sort(sortBy)
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            // Populate references if requested
            if (populate) {
                bookingQuery = bookingQuery
                    .populate('customer.userId', 'name email phone')
                    .populate('restaurant.restaurantId', 'name cuisine address phone rating')
                    .populate('confirmedBy', 'name email')
                    .populate('cancelledBy', 'name email');
            }

            const bookings = await bookingQuery;
            const total = await Booking.countDocuments(query);

            return {
                data: bookings,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit),
                    hasMore: skip + bookings.length < total
                }
            };
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    }

    /**
     * Get booking by ID
     */
    async getBookingById(bookingId, populate = true) {
        try {
            let query = Booking.findOne({ bookingId }).select('-__v');

            if (populate) {
                query = query
                    .populate('customer.userId', 'name email phone')
                    .populate('restaurant.restaurantId', 'name cuisine address phone rating image operatingHours')
                    .populate('confirmedBy', 'name email')
                    .populate('cancelledBy', 'name email')
                    .populate('createdBy', 'name email');
            }

            const booking = await query;

            if (!booking) {
                throw new Error('Booking not found');
            }

            return booking;
        } catch (error) {
            throw new Error(`Error fetching booking: ${error.message}`);
        }
    }

    /**
     * Get bookings by customer
     */
    async getBookingsByCustomer(customerId, filters = {}) {
        try {
            const { limit = 20, skip = 0, status, upcoming = false } = filters;

            const query = {
                'customer.userId': customerId,
                isActive: true
            };

            if (status) {
                query.status = status;
            }

            if (upcoming) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                query.bookingDate = { $gte: today };
                query.status = { $in: ['pending', 'confirmed'] };
            }

            const bookings = await Booking.find(query)
                .sort('-bookingDate -bookingTime')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .populate('restaurant.restaurantId', 'name cuisine address rating image')
                .select('-__v');

            const total = await Booking.countDocuments(query);

            return {
                data: bookings,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching customer bookings: ${error.message}`);
        }
    }

    /**
     * Get bookings by restaurant
     */
    async getBookingsByRestaurant(restaurantId, filters = {}) {
        try {
            const { limit = 20, skip = 0, status, date, upcoming = false } = filters;

            const query = {
                'restaurant.restaurantId': restaurantId,
                isActive: true
            };

            if (status && status !== 'all') {
                query.status = status;
            }

            if (date) {
                const startOfDay = new Date(date);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(date);
                endOfDay.setHours(23, 59, 59, 999);
                query.bookingDate = { $gte: startOfDay, $lte: endOfDay };
            } else if (upcoming) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                query.bookingDate = { $gte: today };
                query.status = { $in: ['pending', 'confirmed'] };
            }

            const bookings = await Booking.find(query)
                .sort('bookingDate bookingTime')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .populate('customer.userId', 'name phone email')
                .select('-__v');

            const total = await Booking.countDocuments(query);

            return {
                data: bookings,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching restaurant bookings: ${error.message}`);
        }
    }

    /**
     * Update booking
     */
    async updateBooking(bookingId, data, userId = null) {
        try {
            const booking = await Booking.findOne({ bookingId });

            if (!booking) {
                throw new Error('Booking not found');
            }

            // Prevent updating completed or cancelled bookings (except for admin notes)
            if (booking.status === 'completed' || booking.status === 'cancelled') {
                // Allow only admin notes to be updated
                const allowedFields = ['adminNotes', 'internalNotes', 'rating'];
                const updateKeys = Object.keys(data);
                const hasDisallowedUpdate = updateKeys.some(key => !allowedFields.includes(key));
                
                if (hasDisallowedUpdate) {
                    throw new Error('Cannot update completed or cancelled bookings');
                }
            }

            // Check for conflicts if date, time, or table is being changed
            if (data.bookingDate || data.bookingTime || data.tableNumber) {
                const newDate = data.bookingDate || booking.bookingDate;
                const newTime = data.bookingTime || booking.bookingTime;
                const newTable = data.tableNumber || booking.tableNumber;

                const hasConflict = await Booking.checkConflict(
                    booking.restaurant.restaurantId,
                    newDate,
                    newTime,
                    newTable,
                    bookingId
                );

                if (hasConflict) {
                    throw new Error('This time slot is already booked');
                }
            }

            // Update allowed fields
            const allowedUpdates = [
                'numberOfGuests',
                'bookingDate',
                'bookingTime',
                'specialRequests',
                'dietaryRestrictions',
                'occasion',
                'tableNumber',
                'tableType',
                'adminNotes',
                'internalNotes',
                'customer',
                'rating'
            ];

            allowedUpdates.forEach(field => {
                if (data[field] !== undefined) {
                    if (typeof data[field] === 'object' && !Array.isArray(data[field])) {
                        booking[field] = { ...booking[field], ...data[field] };
                    } else {
                        booking[field] = data[field];
                    }
                }
            });

            // Add updated by
            if (userId) {
                booking.updatedBy = userId;
            }

            const updatedBooking = await booking.save();

            return updatedBooking;
        } catch (error) {
            throw new Error(`Error updating booking: ${error.message}`);
        }
    }

    /**
     * Confirm booking
     */
    async confirmBooking(bookingId, userId = null) {
        try {
            const booking = await Booking.findOne({ bookingId });

            if (!booking) {
                throw new Error('Booking not found');
            }

            await booking.confirmBooking(userId);

            return booking;
        } catch (error) {
            throw new Error(`Error confirming booking: ${error.message}`);
        }
    }

    /**
     * Complete booking
     */
    async completeBooking(bookingId, userId = null) {
        try {
            const booking = await Booking.findOne({ bookingId });

            if (!booking) {
                throw new Error('Booking not found');
            }

            await booking.completeBooking(userId);

            return booking;
        } catch (error) {
            throw new Error(`Error completing booking: ${error.message}`);
        }
    }

    /**
     * Cancel booking
     */
    async cancelBooking(bookingId, reason, notes = '', userId = null) {
        try {
            const booking = await Booking.findOne({ bookingId });

            if (!booking) {
                throw new Error('Booking not found');
            }

            await booking.cancelBooking(reason, notes, userId);

            return booking;
        } catch (error) {
            throw new Error(`Error cancelling booking: ${error.message}`);
        }
    }

    /**
     * Mark as no show
     */
    async markAsNoShow(bookingId, userId = null) {
        try {
            const booking = await Booking.findOne({ bookingId });

            if (!booking) {
                throw new Error('Booking not found');
            }

            await booking.markAsNoShow(userId);

            return booking;
        } catch (error) {
            throw new Error(`Error marking as no show: ${error.message}`);
        }
    }

    /**
     * Delete booking (soft delete)
     */
    async deleteBooking(bookingId, userId = null) {
        try {
            const booking = await Booking.findOne({ bookingId });

            if (!booking) {
                throw new Error('Booking not found');
            }

            booking.isActive = false;
            
            if (userId) {
                booking.updatedBy = userId;
            }

            await booking.save();

            return {
                message: 'Booking deleted successfully',
                data: booking
            };
        } catch (error) {
            throw new Error(`Error deleting booking: ${error.message}`);
        }
    }

    /**
     * Delete booking permanently
     */
    async permanentlyDeleteBooking(bookingId) {
        try {
            const booking = await Booking.findOneAndDelete({ bookingId });

            if (!booking) {
                throw new Error('Booking not found');
            }

            return {
                message: 'Booking permanently deleted',
                data: booking
            };
        } catch (error) {
            throw new Error(`Error permanently deleting booking: ${error.message}`);
        }
    }

    /**
     * Update admin notes
     */
    async updateAdminNotes(bookingId, notes, userId = null) {
        try {
            const booking = await Booking.findOneAndUpdate(
                { bookingId },
                { 
                    $set: { 
                        adminNotes: notes,
                        updatedBy: userId
                    } 
                },
                { new: true }
            );

            if (!booking) {
                throw new Error('Booking not found');
            }

            return booking;
        } catch (error) {
            throw new Error(`Error updating admin notes: ${error.message}`);
        }
    }

    /**
     * Get booking statistics
     */
    async getBookingStats(filters = {}) {
        try {
            const { restaurantId, customerId, dateFrom, dateTo } = filters;

            const matchQuery = { isActive: true };

            if (restaurantId) {
                matchQuery['restaurant.restaurantId'] = restaurantId;
            }
            if (customerId) {
                matchQuery['customer.userId'] = customerId;
            }

            // Date filtering
            if (dateFrom || dateTo) {
                matchQuery.bookingDate = {};
                if (dateFrom) {
                    const startDate = new Date(dateFrom);
                    startDate.setHours(0, 0, 0, 0);
                    matchQuery.bookingDate.$gte = startDate;
                }
                if (dateTo) {
                    const endDate = new Date(dateTo);
                    endDate.setHours(23, 59, 59, 999);
                    matchQuery.bookingDate.$lte = endDate;
                }
            }

            const stats = await Booking.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: null,
                        totalBookings: { $sum: 1 },
                        pendingBookings: {
                            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
                        },
                        confirmedBookings: {
                            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
                        },
                        completedBookings: {
                            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
                        },
                        cancelledBookings: {
                            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
                        },
                        noShowBookings: {
                            $sum: { $cond: [{ $eq: ['$status', 'no_show'] }, 1, 0] }
                        },
                        totalGuests: { $sum: '$numberOfGuests' },
                        avgGuests: { $avg: '$numberOfGuests' },
                        totalDeposit: { $sum: '$deposit.amount' },
                        depositsPaid: {
                            $sum: { $cond: [{ $eq: ['$deposit.paid', true] }, '$deposit.amount', 0] }
                        }
                    }
                }
            ]);

            return stats[0] || {
                totalBookings: 0,
                pendingBookings: 0,
                confirmedBookings: 0,
                completedBookings: 0,
                cancelledBookings: 0,
                noShowBookings: 0,
                totalGuests: 0,
                avgGuests: 0,
                totalDeposit: 0,
                depositsPaid: 0
            };
        } catch (error) {
            throw new Error(`Error fetching booking statistics: ${error.message}`);
        }
    }

    /**
     * Get bookings by date range (for calendar view)
     */
    async getBookingsByDateRange(startDate, endDate, restaurantId = null) {
        try {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            const query = {
                bookingDate: { $gte: start, $lte: end },
                isActive: true
            };

            if (restaurantId) {
                query['restaurant.restaurantId'] = restaurantId;
            }

            const bookings = await Booking.find(query)
                .sort('bookingDate bookingTime')
                .select('-__v');

            // Group by date
            const groupedByDate = {};
            bookings.forEach(booking => {
                const dateKey = booking.bookingDate.toISOString().split('T')[0];
                if (!groupedByDate[dateKey]) {
                    groupedByDate[dateKey] = [];
                }
                groupedByDate[dateKey].push(booking);
            });

            return groupedByDate;
        } catch (error) {
            throw new Error(`Error fetching bookings by date range: ${error.message}`);
        }
    }

    /**
     * Check table availability
     */
    async checkAvailability(restaurantId, date, time, tableNumber = null) {
        try {
            const hasConflict = await Booking.checkConflict(restaurantId, date, time, tableNumber);
            
            return {
                available: !hasConflict,
                message: hasConflict ? 'Time slot is already booked' : 'Time slot is available'
            };
        } catch (error) {
            throw new Error(`Error checking availability: ${error.message}`);
        }
    }

    /**
     * Get upcoming bookings
     */
    async getUpcomingBookings(restaurantId = null, limit = 10) {
        try {
            const query = {
                bookingDate: { $gte: new Date() },
                status: { $in: ['pending', 'confirmed'] },
                isActive: true
            };

            if (restaurantId) {
                query['restaurant.restaurantId'] = restaurantId;
            }

            const bookings = await Booking.find(query)
                .sort('bookingDate bookingTime')
                .limit(parseInt(limit))
                .populate('customer.userId', 'name email phone')
                .populate('restaurant.restaurantId', 'name cuisine')
                .select('-__v');

            return bookings;
        } catch (error) {
            throw new Error(`Error fetching upcoming bookings: ${error.message}`);
        }
    }

    /**
     * Search bookings
     */
    async searchBookings(searchTerm, filters = {}) {
        try {
            const { limit = 20, skip = 0, restaurantId } = filters;

            const query = {
                $or: [
                    { bookingId: new RegExp(searchTerm, 'i') },
                    { 'customer.name': new RegExp(searchTerm, 'i') },
                    { 'customer.email': new RegExp(searchTerm, 'i') },
                    { 'customer.phone': new RegExp(searchTerm, 'i') },
                    { 'restaurant.restaurantName': new RegExp(searchTerm, 'i') }
                ],
                isActive: true
            };

            if (restaurantId) {
                query['restaurant.restaurantId'] = restaurantId;
            }

            const bookings = await Booking.find(query)
                .sort('-bookingDate -bookingTime')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            const total = await Booking.countDocuments(query);

            return {
                data: bookings,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error searching bookings: ${error.message}`);
        }
    }

    /**
     * Bulk update bookings
     */
    async bulkUpdateBookings(bookingIds, updateData) {
        try {
            // Only allow certain fields to be bulk updated
            const allowedFields = ['status', 'adminNotes', 'tableType'];
            const updates = {};
            
            Object.keys(updateData).forEach(key => {
                if (allowedFields.includes(key)) {
                    updates[key] = updateData[key];
                }
            });

            const result = await Booking.updateMany(
                { bookingId: { $in: bookingIds } },
                { $set: updates }
            );

            return {
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
                message: `${result.modifiedCount} bookings updated successfully`
            };
        } catch (error) {
            throw new Error(`Error bulk updating bookings: ${error.message}`);
        }
    }
}

module.exports = new BookingService();