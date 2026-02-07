const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const OrderItemSchema = new mongoose.Schema({
    foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    foodId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Item price is required'],
        min: [0, 'Price cannot be negative']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer'
        }
    },
    category: {
        type: String,
        trim: true
    },
    subtotal: {
        type: Number,
        required: true,
        min: [0, 'Subtotal cannot be negative']
    }
}, { _id: true });

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
        default: function() {
            const year = new Date().getFullYear();
            const uuid = randomUUID().split('-')[0].toUpperCase();
            return `ORD-${year}-${uuid}`;
        },
        index: true
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
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            validate: {
                validator: function(v) {
                    return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(v);
                },
                message: 'Invalid phone number format'
            }
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    if (!v) return true; // Email is optional
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: 'Invalid email format'
            }
        }
    },

    // Delivery Information
    delivery: {
        address: {
            street: {
                type: String,
                required: [true, 'Street address is required'],
                trim: true
            },
            apartment: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                required: [true, 'City is required'],
                trim: true
            },
            state: {
                type: String,
                required: [true, 'State is required'],
                trim: true
            },
            zipCode: {
                type: String,
                required: [true, 'Zip code is required'],
                trim: true
            },
            country: {
                type: String,
                default: 'USA',
                trim: true
            },
            fullAddress: {
                type: String,
                trim: true
            }
        },
        instructions: {
            type: String,
            maxlength: [500, 'Delivery instructions cannot exceed 500 characters'],
            trim: true
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },

    // Restaurant Information
    restaurant: {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: [true, 'Restaurant is required'],
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        }
    },

    // Order Items
    items: {
        type: [OrderItemSchema],
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'Order must contain at least one item'
        }
    },

    // Pricing
    pricing: {
        subtotal: {
            type: Number,
            required: [true, 'Subtotal is required'],
            min: [0, 'Subtotal cannot be negative']
        },
        tax: {
            type: Number,
            required: [true, 'Tax is required'],
            min: [0, 'Tax cannot be negative'],
            default: 0
        },
        taxRate: {
            type: Number,
            min: [0, 'Tax rate cannot be negative'],
            max: [100, 'Tax rate cannot exceed 100%'],
            default: 9
        },
        deliveryFee: {
            type: Number,
            required: [true, 'Delivery fee is required'],
            min: [0, 'Delivery fee cannot be negative'],
            default: 5.00
        },
        discount: {
            amount: {
                type: Number,
                min: [0, 'Discount cannot be negative'],
                default: 0
            },
            code: {
                type: String,
                trim: true
            },
            type: {
                type: String,
                enum: ['percentage', 'fixed', 'none'],
                default: 'none'
            }
        },
        tip: {
            type: Number,
            min: [0, 'Tip cannot be negative'],
            default: 0
        },
        total: {
            type: Number,
            required: [true, 'Total is required'],
            min: [0, 'Total cannot be negative']
        }
    },

    // Order Status
    orderStatus: {
        type: String,
        enum: {
            values: ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way', 'delivered', 'cancelled', 'failed'],
            message: '{VALUE} is not a valid order status'
        },
        default: 'pending',
        index: true
    },

    // Payment Information
    payment: {
        status: {
            type: String,
            enum: {
                values: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
                message: '{VALUE} is not a valid payment status'
            },
            default: 'pending',
            index: true
        },
        method: {
            type: String,
            enum: ['cash', 'card', 'online', 'wallet', 'upi'],
            required: [true, 'Payment method is required']
        },
        transactionId: {
            type: String,
            trim: true,
            index: true
        },
        paidAt: {
            type: Date
        },
        refundedAt: {
            type: Date
        },
        refundAmount: {
            type: Number,
            min: [0, 'Refund amount cannot be negative'],
            default: 0
        }
    },

    // Delivery Tracking
    tracking: {
        estimatedDeliveryTime: {
            type: Date
        },
        actualDeliveryTime: {
            type: Date
        },
        preparationTime: {
            type: Number, // in minutes
            min: [0, 'Preparation time cannot be negative']
        },
        deliveryPartner: {
            partnerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DeliveryPartner'
            },
            name: {
                type: String,
                trim: true
            },
            phone: {
                type: String,
                trim: true
            },
            vehicleNumber: {
                type: String,
                trim: true
            }
        },
        statusHistory: [{
            status: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            note: {
                type: String,
                trim: true
            },
            updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }]
    },

    // Additional Information
    notes: {
        type: String,
        maxlength: [1000, 'Notes cannot exceed 1000 characters'],
        trim: true
    },

    specialRequests: {
        type: String,
        maxlength: [500, 'Special requests cannot exceed 500 characters'],
        trim: true
    },

    // Ratings and Reviews
    rating: {
        food: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        delivery: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5']
        },
        overall: {
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

    // Metadata
    source: {
        type: String,
        enum: ['web', 'mobile', 'app', 'phone', 'admin'],
        default: 'web'
    },

    isActive: {
        type: Boolean,
        default: true,
        index: true
    },

    isCancelled: {
        type: Boolean,
        default: false,
        index: true
    },

    cancelledAt: {
        type: Date
    },

    cancelReason: {
        type: String,
        trim: true
    },

    cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    timestamps: { createdAt: 'orderDate', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance optimization
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ 'customer.name': 1 });
OrderSchema.index({ 'customer.phone': 1 });
OrderSchema.index({ 'customer.userId': 1 });
OrderSchema.index({ 'restaurant.restaurantId': 1 });
OrderSchema.index({ orderStatus: 1, 'payment.status': 1 });
OrderSchema.index({ orderDate: -1 });
OrderSchema.index({ 'payment.transactionId': 1 });
OrderSchema.index({ orderStatus: 1, orderDate: -1 });
OrderSchema.index({ 'payment.status': 1, orderDate: -1 });

// Text search index
OrderSchema.index({
    orderId: 'text',
    'customer.name': 'text',
    'customer.phone': 'text'
});

// Compound indexes for common queries
OrderSchema.index({ isActive: 1, orderStatus: 1, orderDate: -1 });
OrderSchema.index({ 'restaurant.restaurantId': 1, orderDate: -1 });
OrderSchema.index({ 'customer.userId': 1, orderDate: -1 });

// Virtual for order age in hours
OrderSchema.virtual('orderAge').get(function() {
    if (!this.orderDate) return 0;
    const now = new Date();
    const diffMs = now - this.orderDate;
    return Math.floor(diffMs / (1000 * 60 * 60));
});

// Virtual for delivery status
OrderSchema.virtual('deliveryStatus').get(function() {
    if (this.tracking.actualDeliveryTime) return 'delivered';
    if (this.tracking.estimatedDeliveryTime) {
        const now = new Date();
        if (now > this.tracking.estimatedDeliveryTime) return 'delayed';
        return 'on_time';
    }
    return 'pending';
});

// Virtual for total items count
OrderSchema.virtual('totalItems').get(function() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Pre-save middleware
OrderSchema.pre('save', async function() {
    // Calculate item subtotals
    this.items.forEach(item => {
        item.subtotal = parseFloat((item.price * item.quantity).toFixed(2));
    });

    // Calculate pricing
    const itemsSubtotal = this.items.reduce((sum, item) => sum + item.subtotal, 0);
    this.pricing.subtotal = parseFloat(itemsSubtotal.toFixed(2));
    
    // Calculate tax if tax rate is provided
    if (this.pricing.taxRate) {
        this.pricing.tax = parseFloat((this.pricing.subtotal * (this.pricing.taxRate / 100)).toFixed(2));
    }
    
    // Calculate total
    const total = this.pricing.subtotal + 
                  this.pricing.tax + 
                  this.pricing.deliveryFee + 
                  this.pricing.tip - 
                  this.pricing.discount.amount;
    
    this.pricing.total = parseFloat(total.toFixed(2));

    // Build full address
    if (this.delivery.address) {
        const addr = this.delivery.address;
        this.delivery.address.fullAddress = [
            addr.street,
            addr.apartment,
            addr.city,
            addr.state,
            addr.zipCode,
            addr.country
        ].filter(Boolean).join(', ');
    }

    // Add status to history if status changed
    if (this.isModified('orderStatus')) {
        this.tracking.statusHistory.push({
            status: this.orderStatus,
            timestamp: new Date(),
            updatedBy: this.updatedBy
        });
    }

    // Set payment date if status changed to paid
    if (this.isModified('payment.status') && this.payment.status === 'paid' && !this.payment.paidAt) {
        this.payment.paidAt = new Date();
    }

    // Set cancelled date if order is cancelled
    if (this.isModified('isCancelled') && this.isCancelled && !this.cancelledAt) {
        this.cancelledAt = new Date();
        this.orderStatus = 'cancelled';
    }

});

// Static method to find orders by customer
OrderSchema.statics.findByCustomer = function(customerId, filters = {}) {
    return this.find({
        'customer.userId': customerId,
        isActive: true,
        ...filters
    }).sort('-orderDate');
};

// Static method to find orders by restaurant
OrderSchema.statics.findByRestaurant = function(restaurantId, filters = {}) {
    return this.find({
        'restaurant.restaurantId': restaurantId,
        isActive: true,
        ...filters
    }).sort('-orderDate');
};

// Static method to find pending orders
OrderSchema.statics.findPending = function() {
    return this.find({
        orderStatus: { $in: ['pending', 'confirmed', 'preparing'] },
        isActive: true,
        isCancelled: false
    }).sort('orderDate');
};

// Static method to get today's orders
OrderSchema.statics.getTodaysOrders = function(restaurantId = null) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const query = {
        orderDate: { $gte: today },
        isActive: true
    };
    
    if (restaurantId) {
        query['restaurant.restaurantId'] = restaurantId;
    }
    
    return this.find(query).sort('-orderDate');
};

// Instance method to cancel order
OrderSchema.methods.cancelOrder = async function(reason, userId) {
    if (this.orderStatus === 'delivered') {
        throw new Error('Cannot cancel a delivered order');
    }
    
    if (this.orderStatus === 'cancelled') {
        throw new Error('Order is already cancelled');
    }
    
    this.isCancelled = true;
    this.cancelledAt = new Date();
    this.cancelReason = reason;
    this.cancelledBy = userId;
    this.orderStatus = 'cancelled';
    
    return this.save();
};

// Instance method to update order status
OrderSchema.methods.updateStatus = async function(status, note = '', userId = null) {
    const validTransitions = {
        'pending': ['confirmed', 'cancelled'],
        'confirmed': ['preparing', 'cancelled'],
        'preparing': ['ready', 'cancelled'],
        'ready': ['picked_up', 'cancelled'],
        'picked_up': ['on_the_way', 'cancelled'],
        'on_the_way': ['delivered', 'failed'],
        'delivered': [],
        'cancelled': [],
        'failed': []
    };
    
    const allowedStatuses = validTransitions[this.orderStatus] || [];
    
    if (!allowedStatuses.includes(status)) {
        throw new Error(`Cannot transition from ${this.orderStatus} to ${status}`);
    }
    
    this.orderStatus = status;
    this.updatedBy = userId;
    
    this.tracking.statusHistory.push({
        status,
        timestamp: new Date(),
        note,
        updatedBy: userId
    });
    
    // Set delivery time if delivered
    if (status === 'delivered' && !this.tracking.actualDeliveryTime) {
        this.tracking.actualDeliveryTime = new Date();
    }
    
    return this.save();
};

// Instance method to process refund
OrderSchema.methods.processRefund = async function(amount = null, userId = null) {
    if (this.payment.status === 'refunded') {
        throw new Error('Order is already refunded');
    }
    
    const refundAmount = amount || this.pricing.total;
    
    if (refundAmount > this.pricing.total) {
        throw new Error('Refund amount cannot exceed order total');
    }
    
    this.payment.refundAmount = refundAmount;
    this.payment.refundedAt = new Date();
    this.payment.status = refundAmount === this.pricing.total ? 'refunded' : 'partially_refunded';
    this.updatedBy = userId;
    
    return this.save();
};

module.exports = mongoose.model('Order', OrderSchema);