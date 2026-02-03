const mongoose = require('mongoose');
const { randomUUID } = require('crypto');

const FoodSchema = new mongoose.Schema({
    fid: {
        type: String,
        unique: true,
        required: true,
        default: () => randomUUID(),
    },
    name: {
        type: String,
        required: [true, 'Food name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters'],
        index: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['Rolls and Wraps', 'Noodle Dishes', 'Rice Dishes', 'Seafood Dishes', 'Beverages', 'Starters', 'Main Course', 'Breads', 'Desserts'],
            message: '{VALUE} is not a valid category'
        },
        index: true
    },
    cuisine: {
        type: String,
        required: [true, 'Cuisine is required'],
        enum: {
            values: ['Arabic', 'Thai', 'Pakistani', 'Indian', 'North Indian', 'South Indian', 'Chinese', 'Biryani', 'Punjabi', 'Mughlai', 'Seafood', 'Kerala', 'Italian', 'Continental', 'American', 'Japanese', 'Healthy', 'Street Food', 'Cafe'],
            message: '{VALUE} is not a valid cuisine type'
        },
        index: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Restaurant reference is required'],
        index: true
    },
    restaurantName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    ingredients: {
        type: String,
        trim: true,
        maxlength: [300, 'Ingredients cannot exceed 300 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: 'Price must be greater than 0'
        }
    },
    originalPrice: {
        type: Number,
        min: [0, 'Original price cannot be negative'],
        validate: {
            validator: function(v) {
                if (v && this.price) {
                    return v >= this.price;
                }
                return true;
            },
            message: 'Original price must be greater than or equal to current price'
        }
    },
    discount: {
        type: Number,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%'],
        default: 0
    },
    image: {
        publicId: {
            type: String,
            default: 'food_placeholder'
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
    type: {
        type: String,
        enum: {
            values: ['Special Menu Item', 'Regular Menu Item', 'Seasonal Item', 'Limited Edition'],
            message: '{VALUE} is not a valid food type'
        },
        default: 'Regular Menu Item',
        index: true
    },
    isVeg: {
        type: Boolean,
        default: true,
        index: true
    },
    isVegan: {
        type: Boolean,
        default: false
    },
    isGlutenFree: {
        type: Boolean,
        default: false
    },
    spiceLevel: {
        type: String,
        enum: ['Mild', 'Medium', 'Spicy', 'Extra Spicy', 'Not Applicable'],
        default: 'Not Applicable'
    },
    allergens: [{
        type: String,
        enum: ['Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'Fish', 'None']
    }],
    nutritionalInfo: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number,
        fiber: Number
    },
    preparationTime: {
        type: Number,
        min: [0, 'Preparation time cannot be negative'],
        default: 15
    },
    servingSize: {
        type: String,
        default: '1 serving'
    },
    availableQuantity: {
        type: Number,
        min: [0, 'Quantity cannot be negative'],
        default: 100
    },
    minOrderQuantity: {
        type: Number,
        min: [1, 'Minimum order quantity must be at least 1'],
        default: 1
    },
    maxOrderQuantity: {
        type: Number,
        min: [1, 'Maximum order quantity must be at least 1'],
        default: 10
    },
    tags: [{
        type: String,
        trim: true
    }],
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
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    orderCount: {
        type: Number,
        min: [0, 'Order count cannot be negative'],
        default: 0,
        index: true
    },
    viewCount: {
        type: Number,
        min: [0, 'View count cannot be negative'],
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },
    isBestseller: {
        type: Boolean,
        default: false,
        index: true
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    isAvailable: {
        type: Boolean,
        default: true,
        index: true
    },
    availableFrom: Date,
    availableUntil: Date,
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Out of Stock', 'Discontinued'],
        default: 'Active',
        index: true
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

// Indexes for performance optimization
FoodSchema.index({ name: 'text', description: 'text', ingredients: 'text' });
FoodSchema.index({ category: 1, cuisine: 1 });
FoodSchema.index({ price: 1 });
FoodSchema.index({ 'rating.average': -1 });
FoodSchema.index({ isActive: 1, isAvailable: 1, create_at: -1 });
FoodSchema.index({ restaurant: 1, isActive: 1 });

// Virtual for discount percentage
FoodSchema.virtual('discountPercentage').get(function() {
    if (this.originalPrice && this.price < this.originalPrice) {
        return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    return 0;
});

// Virtual for availability status
FoodSchema.virtual('availabilityStatus').get(function() {
    if (!this.isActive) return 'Inactive';
    if (!this.isAvailable) return 'Unavailable';
    if (this.availableQuantity === 0) return 'Out of Stock';
    if (this.availableQuantity < 10) return 'Low Stock';
    return 'Available';
});

// Pre-save middleware to calculate discount
FoodSchema.pre('save', async function() {
    if (this.originalPrice && this.price < this.originalPrice) {
        this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    
    // Auto-set isAvailable based on quantity
    if (this.availableQuantity === 0) {
        this.isAvailable = false;
        this.status = 'Out of Stock';
    }
});

// Static method to find available foods
FoodSchema.statics.findAvailable = function(filters = {}) {
    return this.find({
        isActive: true,
        isAvailable: true,
        availableQuantity: { $gt: 0 },
        ...filters
    });
};

// Static method to find by restaurant
FoodSchema.statics.findByRestaurant = function(restaurantId) {
    return this.find({ restaurant: restaurantId, isActive: true });
};

// Instance method to check if food is in stock
FoodSchema.methods.isInStock = function() {
    return this.isActive && this.isAvailable && this.availableQuantity > 0;
};

// Instance method to decrease quantity
FoodSchema.methods.decreaseQuantity = function(amount = 1) {
    if (this.availableQuantity >= amount) {
        this.availableQuantity -= amount;
        this.orderCount += amount;
        
        if (this.availableQuantity === 0) {
            this.isAvailable = false;
            this.status = 'Out of Stock';
        }
        
        return this.save();
    }
    throw new Error('Insufficient quantity available');
};

// Instance method to increase view count
FoodSchema.methods.incrementViewCount = function() {
    this.viewCount += 1;
    return this.save();
};

module.exports = mongoose.model('Food', FoodSchema);