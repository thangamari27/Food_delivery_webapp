const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const BookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        unique: true,
        required: true,
        default: function() {
            const prefix = 'BK';
            const uuid = randomUUID();
            return `${prefix}${uuid}`;
        },
        index: true
    },

    // Restaurant Information
    restaurant: {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: [true, 'Restaurant is required'],
            index: true
        },
        restaurantName: {
            type: String,
            required: [true, 'Restaurant name is required'],
            trim: true
        },
        cuisine: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
        }
    },

    // Customer Information
    customer: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true
        },
        name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        email: {
            type: String,
            required: [true, 'Customer email is required'],
            trim: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: 'Invalid email format'
            }
        },
        phone: {
            type: String,
            required: [true, 'Customer phone is required'],
            trim: true,
            validate: {
                validator: function(v) {
                    return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(v);
                },
                message: 'Invalid phone number format'
            }
        }
    },

    // Booking Details
    bookingDate: {
        type: Date,
        required: [true, 'Booking date is required'],
        index: true,
        validate: {
            validator: function(v) {
                // Booking must be for a future date (or today)
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return v >= today;
            },
            message: 'Booking date must be today or in the future'
        }
    },

    bookingTime: {
        type: String,
        required: [true, 'Booking time is required'],
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: 'Time must be in HH:MM format (24-hour)'
        }
    },

    numberOfGuests: {
        type: Number,
        required: [true, 'Number of guests is required'],
        min: [1, 'At least 1 guest is required'],
        max: [50, 'Cannot book for more than 50 guests'],
        validate: {
            validator: Number.isInteger,
            message: 'Number of guests must be an integer'
        }
    },

    tableNumber: {
        type: String,
        trim: true
    },

    tableType: {
        type: String,
        enum: ['Standard', 'Window', 'Outdoor', 'Private', 'Bar', 'VIP'],
        default: 'Standard'
    },

    // Special Requirements
    specialRequests: {
        type: String,
        maxlength: [500, 'Special requests cannot exceed 500 characters'],
        trim: true
    },

    dietaryRestrictions: [{
        type: String,
        enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Seafood Allergy', 'None']
    }],

    occasion: {
        type: String,
        enum: ['Birthday', 'Anniversary', 'Business Meeting', 'Date', 'Family Gathering', 'Celebration', 'Regular', 'Other'],
        default: 'Regular'
    },

    // Booking Status
    status: {
        type: String,
        enum: {
            values: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
            message: '{VALUE} is not a valid booking status'
        },
        default: 'pending',
        index: true
    },

    // Cancellation Information
    canCancel: {
        type: Boolean,
        default: true
    },

    cancellationDeadline: {
        type: Date
    },

    isCancelled: {
        type: Boolean,
        default: false,
        index: true
    },

    cancelledAt: {
        type: Date
    },

    cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    cancellationReason: {
        type: String,
        enum: ['Customer Request', 'Restaurant Closed', 'Overbooking', 'Emergency', 'Weather', 'No Show', 'Other'],
        trim: true
    },

    cancellationNotes: {
        type: String,
        maxlength: [500, 'Cancellation notes cannot exceed 500 characters'],
        trim: true
    },

    // Admin Management
    adminNotes: {
        type: String,
        maxlength: [1000, 'Admin notes cannot exceed 1000 characters'],
        trim: true
    },

    internalNotes: {
        type: String,
        maxlength: [1000, 'Internal notes cannot exceed 1000 characters'],
        trim: true
    },

    confirmedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    confirmedAt: {
        type: Date
    },

    // Payment Information (if deposit required)
    deposit: {
        required: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
            min: [0, 'Deposit amount cannot be negative'],
            default: 0
        },
        paid: {
            type: Boolean,
            default: false
        },
        paidAt: {
            type: Date
        },
        refunded: {
            type: Boolean,
            default: false
        },
        refundedAt: {
            type: Date
        },
        paymentMethod: {
            type: String,
            enum: ['Cash', 'Card', 'Online', 'UPI', 'Wallet']
        },
        transactionId: {
            type: String,
            trim: true
        }
    },

    // Reminder & Notification
    reminderSent: {
        type: Boolean,
        default: false
    },

    reminderSentAt: {
        type: Date
    },

    confirmationEmailSent: {
        type: Boolean,
        default: false
    },

    confirmationEmailSentAt: {
        type: Date
    },

    // Rating & Feedback (post-booking)
    rating: {
        overall: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        food: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        service: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        ambience: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        review: {
            type: String,
            maxlength: [1000, 'Review cannot exceed 1000 characters'],
            trim: true
        },
        reviewedAt: {
            type: Date
        }
    },

    // Visit Status
    arrivedAt: {
        type: Date
    },

    departedAt: {
        type: Date
    },

    actualGuests: {
        type: Number,
        min: [0, 'Actual guests cannot be negative']
    },

    // Metadata
    source: {
        type: String,
        enum: ['Web', 'Mobile App', 'Phone', 'Walk-in', 'Admin', 'Third Party'],
        default: 'Web'
    },

    ipAddress: {
        type: String,
        trim: true
    },

    userAgent: {
        type: String,
        trim: true
    },

    // Status History
    statusHistory: [{
        status: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        note: {
            type: String,
            trim: true
        }
    }],

    isActive: {
        type: Boolean,
        default: true,
        index: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance optimization
BookingSchema.index({ bookingId: 1 });
BookingSchema.index({ 'customer.name': 1 });
BookingSchema.index({ 'customer.email': 1 });
BookingSchema.index({ 'customer.phone': 1 });
BookingSchema.index({ 'customer.userId': 1 });
BookingSchema.index({ 'restaurant.restaurantId': 1 });
BookingSchema.index({ 'restaurant.restaurantName': 1 });
BookingSchema.index({ bookingDate: 1, bookingTime: 1 });
BookingSchema.index({ status: 1, bookingDate: 1 });
BookingSchema.index({ isActive: 1, status: 1, bookingDate: -1 });
BookingSchema.index({ 'restaurant.restaurantId': 1, bookingDate: 1 });
BookingSchema.index({ 'customer.userId': 1, bookingDate: -1 });

// Text search index
BookingSchema.index({
    bookingId: 'text',
    'customer.name': 'text',
    'restaurant.restaurantName': 'text'
});

// Compound indexes for common queries
BookingSchema.index({ 'restaurant.restaurantId': 1, status: 1, bookingDate: 1 });
BookingSchema.index({ status: 1, canCancel: 1, bookingDate: 1 });

// Virtual for booking duration (if needed)
BookingSchema.virtual('duration').get(function() {
    if (this.arrivedAt && this.departedAt) {
        return Math.floor((this.departedAt - this.arrivedAt) / (1000 * 60)); // in minutes
    }
    return null;
});

// Virtual for time until booking
BookingSchema.virtual('hoursUntilBooking').get(function() {
    const now = new Date();
    const bookingDateTime = new Date(this.bookingDate);
    const [hours, minutes] = this.bookingTime.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const diff = bookingDateTime - now;
    return Math.floor(diff / (1000 * 60 * 60));
});

// Virtual for is upcoming
BookingSchema.virtual('isUpcoming').get(function() {
    const now = new Date();
    const bookingDateTime = new Date(this.bookingDate);
    const [hours, minutes] = this.bookingTime.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    return bookingDateTime > now && this.status !== 'cancelled' && this.status !== 'completed';
});

// Virtual for is past
BookingSchema.virtual('isPast').get(function() {
    const now = new Date();
    const bookingDateTime = new Date(this.bookingDate);
    const [hours, minutes] = this.bookingTime.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    return bookingDateTime < now;
});

// Pre-save middleware
BookingSchema.pre('save', async function() {
    // Set cancellation deadline (24 hours before booking by default)
    if (this.isNew && !this.cancellationDeadline) {
        const bookingDateTime = new Date(this.bookingDate);
        const [hours, minutes] = this.bookingTime.split(':');
        bookingDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        this.cancellationDeadline = new Date(bookingDateTime.getTime() - (24 * 60 * 60 * 1000));
    }

    // Check if can cancel based on cancellation deadline
    const now = new Date();
    if (this.cancellationDeadline && now > this.cancellationDeadline) {
        this.canCancel = false;
    }

    // If status changed to cancelled
    if (this.isModified('status') && this.status === 'cancelled' && !this.isCancelled) {
        this.isCancelled = true;
        if (!this.cancelledAt) {
            this.cancelledAt = new Date();
        }
    }

    // Add status to history if status changed
    if (this.isModified('status')) {
        this.statusHistory.push({
            status: this.status,
            timestamp: new Date(),
            updatedBy: this.updatedBy
        });
    }

    // Set confirmed timestamp
    if (this.isModified('status') && this.status === 'confirmed' && !this.confirmedAt) {
        this.confirmedAt = new Date();
    }
});

// Static method to find bookings by customer
BookingSchema.statics.findByCustomer = function(customerId, filters = {}) {
    return this.find({
        'customer.userId': customerId,
        isActive: true,
        ...filters
    }).sort('-bookingDate');
};

// Static method to find bookings by restaurant
BookingSchema.statics.findByRestaurant = function(restaurantId, filters = {}) {
    return this.find({
        'restaurant.restaurantId': restaurantId,
        isActive: true,
        ...filters
    }).sort('-bookingDate');
};

// Static method to find upcoming bookings
BookingSchema.statics.findUpcoming = function(restaurantId = null) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const query = {
        bookingDate: { $gte: today },
        status: { $in: ['pending', 'confirmed'] },
        isActive: true
    };
    
    if (restaurantId) {
        query['restaurant.restaurantId'] = restaurantId;
    }
    
    return this.find(query).sort('bookingDate bookingTime');
};

// Static method to find bookings for a specific date
BookingSchema.statics.findByDate = function(date, restaurantId = null) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const query = {
        bookingDate: { $gte: startOfDay, $lte: endOfDay },
        isActive: true
    };
    
    if (restaurantId) {
        query['restaurant.restaurantId'] = restaurantId;
    }
    
    return this.find(query).sort('bookingTime');
};

// Instance method to cancel booking
BookingSchema.methods.cancelBooking = async function(reason, notes = '', userId = null) {
    if (this.status === 'completed') {
        throw new Error('Cannot cancel a completed booking');
    }
    
    if (this.status === 'cancelled') {
        throw new Error('Booking is already cancelled');
    }
    
    if (!this.canCancel) {
        throw new Error('Cancellation deadline has passed');
    }
    
    this.status = 'cancelled';
    this.isCancelled = true;
    this.cancelledAt = new Date();
    this.cancellationReason = reason;
    this.cancellationNotes = notes;
    this.cancelledBy = userId;
    this.updatedBy = userId;
    
    return this.save();
};

// Instance method to confirm booking
BookingSchema.methods.confirmBooking = async function(userId = null) {
    if (this.status === 'cancelled') {
        throw new Error('Cannot confirm a cancelled booking');
    }
    
    if (this.status === 'completed') {
        throw new Error('Booking is already completed');
    }
    
    this.status = 'confirmed';
    this.confirmedAt = new Date();
    this.confirmedBy = userId;
    this.updatedBy = userId;
    
    return this.save();
};

// Instance method to complete booking
BookingSchema.methods.completeBooking = async function(userId = null) {
    if (this.status === 'cancelled') {
        throw new Error('Cannot complete a cancelled booking');
    }
    
    this.status = 'completed';
    this.canCancel = false;
    this.updatedBy = userId;
    
    return this.save();
};

// Instance method to mark as no show
BookingSchema.methods.markAsNoShow = async function(userId = null) {
    this.status = 'no_show';
    this.canCancel = false;
    this.updatedBy = userId;
    
    return this.save();
};

// Instance method to check availability conflict
BookingSchema.statics.checkConflict = async function(restaurantId, date, time, tableNumber = null, excludeBookingId = null) {
    const query = {
        'restaurant.restaurantId': restaurantId,
        bookingDate: date,
        bookingTime: time,
        status: { $in: ['pending', 'confirmed'] },
        isActive: true
    };
    
    if (tableNumber) {
        query.tableNumber = tableNumber;
    }
    
    if (excludeBookingId) {
        query.bookingId = { $ne: excludeBookingId };
    }
    
    const conflictingBooking = await this.findOne(query);
    return !!conflictingBooking;
};

module.exports = mongoose.model('Booking', BookingSchema);