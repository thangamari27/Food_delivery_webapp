const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const RestaurantSchema = new mongoose.Schema({
    rid: {
        type: String,
        unique: true,
        required: true,
        default: () => randomUUID(),
    },
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
        index: true
    },
    contactPerson: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true,
        minlength: [2, 'Contact person name must be at least 2 characters'],
        maxlength: [100, 'Contact person name cannot exceed 100 characters']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,6}[)]?[-\s\.]?[0-9]{1,10}$/.test(v);
            },
            message: 'Please provide a valid phone number'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: 'Please provide a valid email address'
        },
        index: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    rating: {
        average: {
            type: Number,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot exceed 5'],
            default: 0
        },
        count: {
            type: Number,
            min: [0, 'Rating count cannot be negative'],
            default: 0
        }
    },
    cuisine: [{
        type: String,
        required: [true, 'At least one cuisine type is required'],
        enum: {
            values: ['North Indian', 'South Indian', 'Chinese', 'Biryani', 'Punjabi', 'Mughlai', 'Seafood', 'Kerala', 'Italian', 'Continental', 'American', 'Japanese', 'Thai', 'Arabic', 'Pakistani', 'Indian', 'Mexican', 'Healthy', 'Street Food', 'Cafe', 'Breakfast', 'Asian'],
            message: '{VALUE} is not a valid cuisine type'
        }
    }],
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
            trim: true
        },
        area: String,
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            index: true
        },
        state: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true,
            validate: {
                validator: function(v) {
                    return !v || /^\d{6}$/.test(v);
                },
                message: 'Pincode must be 6 digits'
            }
        },
        country: {
            type: String,
            default: 'India',
            trim: true
        },
        coordinates: {
            latitude: {
                type: Number,
                min: [-90, 'Latitude must be between -90 and 90'],
                max: [90, 'Latitude must be between -90 and 90']
            },
            longitude: {
                type: Number,
                min: [-180, 'Longitude must be between -180 and 180'],
                max: [180, 'Longitude must be between -180 and 180']
            }
        }
    },
    deliveryTime: {
        type: String,
        default: '30-40 mins',
        validate: {
            validator: function(v) {
                return /^\d+-\d+\s*(mins|minutes)$/i.test(v);
            },
            message: 'Delivery time must be in format: "30-40 mins"'
        }
    },
    deliveryTimeMin: {
        type: Number,
        min: [0, 'Delivery time cannot be negative'],
        default: 30
    },
    deliveryTimeMax: {
        type: Number,
        min: [0, 'Delivery time cannot be negative'],
        default: 40
    },
    priceRange: {
        type: String,
        required: [true, 'Price range is required'],
        validate: {
            validator: function(v) {
                return /^₹\d+\s*for\s*two$/i.test(v);
            },
            message: 'Price range must be in format: "₹300 for two"'
        }
    },
    priceForTwo: {
        type: Number,
        min: [0, 'Price cannot be negative'],
        default: 300
    },
    minOrderAmount: {
        type: Number,
        min: [0, 'Minimum order amount cannot be negative'],
        default: 0
    },
    deliveryFee: {
        type: Number,
        min: [0, 'Delivery fee cannot be negative'],
        default: 0
    },
    offers: {
        type: String,
        trim: true,
        maxlength: [200, 'Offers description cannot exceed 200 characters']
    },
    activeOffers: [{
        title: String,
        description: String,
        discountPercentage: {
            type: Number,
            min: [0, 'Discount cannot be negative'],
            max: [100, 'Discount cannot exceed 100%']
        },
        maxDiscount: Number,
        minOrder: Number,
        validFrom: Date,
        validUntil: Date,
        isActive: {
            type: Boolean,
            default: true
        }
    }],
    badges: [{
        type: String,
        enum: ['Pure Veg', 'Bestseller', 'Fast Delivery', 'Trending', 'Award Winner', 'New', 'Eco-Friendly', 'Premium']
    }],
    features: [{
        type: String,
        enum: ['Outdoor Seating', 'Home Delivery', 'Takeaway', 'AC', 'WiFi', 'Parking', 'Family Dining', 'Late Night', 'Catering', 'Bar Available', 'Valet', 'Live Music', 'Contactless Delivery', 'Eco-Friendly', 'Breakfast Specials', 'Filter Coffee', 'Chaat']
    }],
    operatingHours: {
        openingTime: {
            type: String,
            required: [true, 'Opening time is required'],
            validate: {
                validator: function(v) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
                },
                message: 'Opening time must be in HH:MM format (24-hour)'
            }
        },
        closingTime: {
            type: String,
            required: [true, 'Closing time is required'],
            validate: {
                validator: function(v) {
                    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
                },
                message: 'Closing time must be in HH:MM format (24-hour)'
            }
        },
        weeklySchedule: [{
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            openingTime: String,
            closingTime: String,
            isClosed: {
                type: Boolean,
                default: false
            }
        }]
    },
    deliveryAvailable: {
        type: Boolean,
        default: true,
        index: true
    },
    takeawayAvailable: {
        type: Boolean,
        default: true
    },
    dineInAvailable: {
        type: Boolean,
        default: true
    },
    deliveryRadius: {
        type: Number,
        min: [0, 'Delivery radius cannot be negative'],
        default: 10
    },
    serviceAreas: [{
        type: String,
        trim: true
    }],
    paymentMethods: [{
        type: String,
        enum: ['Cash', 'Card', 'UPI', 'Wallet', 'Net Banking']
    }],
    image: {
        publicId: {
            type: String,
            default: 'restaurant_placeholder'
        },
        format: {
            type: String,
            enum: ['webp', 'jpg', 'png'],
            default: 'webp'
        },
        url: String
    },
    imageFallback: {
        publicId: String,
        format: {
            type: String,
            enum: ['jpg', 'png'],
            default: 'jpg'
        },
        url: String
    },
    gallery: [{
        publicId: String,
        format: String,
        url: String,
        caption: String
    }],
    logo: {
        publicId: String,
        format: String,
        url: String
    },
    menuItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }],
    totalOrders: {
        type: Number,
        min: [0, 'Total orders cannot be negative'],
        default: 0,
        index: true
    },
    totalRevenue: {
        type: Number,
        min: [0, 'Total revenue cannot be negative'],
        default: 0
    },
    averageOrderValue: {
        type: Number,
        min: [0, 'Average order value cannot be negative'],
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    staff: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['Manager', 'Chef', 'Delivery', 'Cashier']
        },
        joinedDate: {
            type: Date,
            default: Date.now
        }
    }],
    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending',
        index: true
    },
    documents: [{
        type: {
            type: String,
            enum: ['License', 'Certificate', 'Registration', 'Other']
        },
        name: String,
        url: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended', 'Closed'],
        default: 'Active',
        index: true
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    viewCount: {
        type: Number,
        min: [0, 'View count cannot be negative'],
        default: 0
    },
    favoriteCount: {
        type: Number,
        min: [0, 'Favorite count cannot be negative'],
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    create_at: {
        type: Date,
        default: Date.now,
        index: true
    },
    update_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { createdAt: "create_at", updatedAt: "update_at" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
RestaurantSchema.index({ name: 'text', description: 'text' });
RestaurantSchema.index({ 'address.city': 1, isActive: 1 });
RestaurantSchema.index({ cuisine: 1, isActive: 1 });
RestaurantSchema.index({ 'rating.average': -1 });
RestaurantSchema.index({ isActive: 1, status: 1, create_at: -1 });

// Virtual for full address
RestaurantSchema.virtual('fullAddress').get(function() {
    const { street, area, city, state, pincode } = this.address;
    return `${street}${area ? ', ' + area : ''}, ${city}${state ? ', ' + state : ''}${pincode ? ' - ' + pincode : ''}`;
});

// Virtual for current operational status
RestaurantSchema.virtual('isOpen').get(function() {
    if (!this.isActive || this.status !== 'Active') return false;
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const { openingTime, closingTime } = this.operatingHours;
    
    return currentTime >= openingTime && currentTime <= closingTime;
});

// Pre-save middleware
RestaurantSchema.pre('save', async function() {
    // Extract price from priceRange string
    if (this.priceRange) {
        const priceMatch = this.priceRange.match(/₹(\d+)/);
        if (priceMatch) {
            this.priceForTwo = parseInt(priceMatch[1]);
        }
    }
    
    // Extract delivery time min and max
    if (this.deliveryTime) {
        const timeMatch = this.deliveryTime.match(/(\d+)-(\d+)/);
        if (timeMatch) {
            this.deliveryTimeMin = parseInt(timeMatch[1]);
            this.deliveryTimeMax = parseInt(timeMatch[2]);
        }
    }
    
    // Calculate average order value
    if (this.totalOrders > 0) {
        this.averageOrderValue = this.totalRevenue / this.totalOrders;
    }
});

// Static methods
RestaurantSchema.statics.findActive = function(filters = {}) {
    return this.find({
        isActive: true,
        status: 'Active',
        ...filters
    });
};

RestaurantSchema.statics.findByCity = function(city) {
    return this.find({
        'address.city': new RegExp(city, 'i'),
        isActive: true,
        status: 'Active'
    });
};

RestaurantSchema.statics.findByCuisine = function(cuisine) {
    return this.find({
        cuisine: cuisine,
        isActive: true,
        status: 'Active'
    });
};

RestaurantSchema.statics.findNearby = function(latitude, longitude, maxDistance = 10) {
    return this.find({
        'address.coordinates.latitude': {
            $gte: latitude - (maxDistance / 111),
            $lte: latitude + (maxDistance / 111)
        },
        'address.coordinates.longitude': {
            $gte: longitude - (maxDistance / 111),
            $lte: longitude + (maxDistance / 111)
        },
        isActive: true,
        status: 'Active'
    });
};

// Instance methods
RestaurantSchema.methods.incrementViewCount = function() {
    this.viewCount += 1;
    return this.save();
};

RestaurantSchema.methods.addOrder = function(orderValue) {
    this.totalOrders += 1;
    this.totalRevenue += orderValue;
    this.averageOrderValue = this.totalRevenue / this.totalOrders;
    return this.save();
};

RestaurantSchema.methods.checkDeliveryAvailability = function(userLocation) {
    if (!this.deliveryAvailable) return false;
    if (!this.address.coordinates.latitude || !this.address.coordinates.longitude) return true;
    
    // Simple distance calculation (approximate)
    const distance = Math.sqrt(
        Math.pow(this.address.coordinates.latitude - userLocation.latitude, 2) +
        Math.pow(this.address.coordinates.longitude - userLocation.longitude, 2)
    ) * 111; 
    
    return distance <= this.deliveryRadius;
};

module.exports = mongoose.model('Restaurant', RestaurantSchema);