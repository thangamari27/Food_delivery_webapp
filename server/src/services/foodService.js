const Food = require('../models/food.model');
const Restaurant = require('../models/restaurant.model');

class FoodService {
    /**
     * Create a new food item
     */
    async createFood(data) {
        try {
            // Verify restaurant exists
            const restaurant = await Restaurant.findById(data.restaurant);
            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            // Add restaurant name for quick access
            data.restaurantName = restaurant.name;

            // Set default image if not provided
            if (!data.image) {
                data.image = {
                    publicId: 'food_placeholder',
                    format: 'webp',
                    url: null
                };
            }

            // Create food item
            const food = new Food(data);
            const savedFood = await food.save();

            // Add food to restaurant's menu
            if (!restaurant.menuItems.includes(savedFood._id)) {
                restaurant.menuItems.push(savedFood._id);
                await restaurant.save();
            }

            return savedFood;
        } catch (error) {
            throw new Error(`Error creating food item: ${error.message}`);
        }
    }

    /**
     * Get all food items with advanced filtering, sorting, and pagination
     */
    async getAllFoods(filters = {}) {
        try {
            const {
                isActive = true,
                isAvailable,
                category,
                cuisine,
                restaurant,
                restaurantName,
                type,
                isVeg,
                isVegan,
                isGlutenFree,
                spiceLevel,
                minPrice,
                maxPrice,
                isFeatured,
                isBestseller,
                search,
                limit = 20,
                skip = 0,
                sortBy = '-create_at',
                populate = false
            } = filters;

            // Build query
            const query = {};

            if (isActive !== undefined) query.isActive = isActive;
            if (isAvailable !== undefined) query.isAvailable = isAvailable;
            if (category) query.category = category;
            if (cuisine) query.cuisine = cuisine;
            if (restaurant) query.restaurant = restaurant;
            if (restaurantName) query.restaurantName = new RegExp(restaurantName, 'i');
            if (type) query.type = type;
            if (isVeg !== undefined) query.isVeg = isVeg;
            if (isVegan !== undefined) query.isVegan = isVegan;
            if (isGlutenFree !== undefined) query.isGlutenFree = isGlutenFree;
            if (spiceLevel) query.spiceLevel = spiceLevel;
            if (isFeatured !== undefined) query.isFeatured = isFeatured;
            if (isBestseller !== undefined) query.isBestseller = isBestseller;

            // Price range filter
            if (minPrice !== undefined || maxPrice !== undefined) {
                query.price = {};
                if (minPrice !== undefined) query.price.$gte = parseFloat(minPrice);
                if (maxPrice !== undefined) query.price.$lte = parseFloat(maxPrice);
            }

            // Text search
            if (search) {
                query.$text = { $search: search };
            }

            // Build base query
            let foodQuery = Food.find(query)
                .sort(sortBy)
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            // Populate restaurant if requested
            if (populate) {
                foodQuery = foodQuery.populate('restaurant', 'name email phone address.city rating deliveryTime features');
            }

            const foods = await foodQuery;
            const total = await Food.countDocuments(query);

            return {
                data: foods,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit),
                    hasMore: skip + foods.length < total
                }
            };
        } catch (error) {
            throw new Error(`Error fetching food items: ${error.message}`);
        }
    }

    /**
     * Get food item by ID (fid)
     */
    async getFoodById(fid, incrementView = false) {
        try {
            const food = await Food.findOne({ fid })
                .populate('restaurant', 'name email phone address rating deliveryTime features')
                .select('-__v');

            if (!food) {
                throw new Error('Food item not found');
            }

            // Increment view count if requested
            if (incrementView) {
                await food.incrementViewCount();
            }

            return food;
        } catch (error) {
            throw new Error(`Error fetching food item: ${error.message}`);
        }
    }

    /**
     * Get food items by restaurant
     */
    async getFoodsByRestaurant(restaurantId, filters = {}) {
        try {
            const { isActive = true, isAvailable, category, limit = 50, skip = 0 } = filters;

            const query = {
                restaurant: restaurantId,
                isActive
            };

            if (isAvailable !== undefined) query.isAvailable = isAvailable;
            if (category) query.category = category;

            const foods = await Food.find(query)
                .sort('-isFeatured -orderCount -create_at')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            const total = await Food.countDocuments(query);

            return {
                data: foods,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching restaurant foods: ${error.message}`);
        }
    }

    /**
     * Update food item
     */
    async updateFood(fid, data, userId = null) {
        try {
            // If restaurant is being changed, verify it exists
            if (data.restaurant) {
                const restaurant = await Restaurant.findById(data.restaurant);
                if (!restaurant) {
                    throw new Error('Restaurant not found');
                }
                data.restaurantName = restaurant.name;
            }

            // Add updatedBy if userId provided
            if (userId) {
                data.updatedBy = userId;
            }

            const food = await Food.findOneAndUpdate(
                { fid },
                { $set: data },
                { new: true, runValidators: true }
            ).select('-__v');

            if (!food) {
                throw new Error('Food item not found');
            }

            return food;
        } catch (error) {
            throw new Error(`Error updating food item: ${error.message}`);
        }
    }

    /**
     * Bulk update food items
     */
    async bulkUpdateFoods(foodIds, updateData) {
        try {
            const result = await Food.updateMany(
                { fid: { $in: foodIds } },
                { $set: updateData }
            );

            return {
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
                message: `${result.modifiedCount} food items updated successfully`
            };
        } catch (error) {
            throw new Error(`Error bulk updating food items: ${error.message}`);
        }
    }

    /**
     * Deactivate food item (soft delete)
     */
    async deactivateFood(fid) {
        try {
            const food = await Food.findOneAndUpdate(
                { fid },
                { 
                    $set: { 
                        isActive: false,
                        isAvailable: false,
                        status: 'Inactive'
                    } 
                },
                { new: true }
            );

            if (!food) {
                throw new Error('Food item not found');
            }

            return {
                message: 'Food item deactivated successfully',
                data: food
            };
        } catch (error) {
            throw new Error(`Error deactivating food item: ${error.message}`);
        }
    }

    /**
     * Delete food item permanently
     */
    async deleteFood(fid) {
        try {
            const food = await Food.findOneAndDelete({ fid });

            if (!food) {
                throw new Error('Food item not found');
            }

            // Remove from restaurant's menu
            await Restaurant.findByIdAndUpdate(
                food.restaurant,
                { $pull: { menuItems: food._id } }
            );

            return {
                message: 'Food item deleted permanently',
                data: food
            };
        } catch (error) {
            throw new Error(`Error permanently deleting food item: ${error.message}`);
        }
    }

    /**
     * Update food availability
     */
    async updateAvailability(fid, isAvailable) {
        try {
            const updateData = {
                isAvailable,
                status: isAvailable ? 'Active' : 'Unavailable'
            };

            const food = await Food.findOneAndUpdate(
                { fid },
                { $set: updateData },
                { new: true }
            );

            if (!food) {
                throw new Error('Food item not found');
            }

            return food;
        } catch (error) {
            throw new Error(`Error updating availability: ${error.message}`);
        }
    }

    /**
     * Update food quantity
     */
    async updateQuantity(fid, quantity, operation = 'set') {
        try {
            const food = await Food.findOne({ fid });

            if (!food) {
                throw new Error('Food item not found');
            }

            if (operation === 'increase') {
                food.availableQuantity += quantity;
            } else if (operation === 'decrease') {
                if (food.availableQuantity < quantity) {
                    throw new Error('Insufficient quantity available');
                }
                food.availableQuantity -= quantity;
            } else {
                food.availableQuantity = quantity;
            }

            // Update availability based on quantity
            if (food.availableQuantity === 0) {
                food.isAvailable = false;
                food.status = 'Out of Stock';
            } else if (!food.isAvailable && food.availableQuantity > 0) {
                food.isAvailable = true;
                food.status = 'Active';
            }

            await food.save();

            return food;
        } catch (error) {
            throw new Error(`Error updating quantity: ${error.message}`);
        }
    }

    /**
     * Get food statistics
     */
    async getFoodStats(filters = {}) {
        try {
            const { restaurant, category, cuisine } = filters;
            
            const matchQuery = { isActive: true };
            if (restaurant) matchQuery.restaurant = restaurant;
            if (category) matchQuery.category = category;
            if (cuisine) matchQuery.cuisine = cuisine;

            const stats = await Food.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: null,
                        totalItems: { $sum: 1 },
                        availableItems: {
                            $sum: { $cond: [{ $eq: ['$isAvailable', true] }, 1, 0] }
                        },
                        totalOrderCount: { $sum: '$orderCount' },
                        totalViewCount: { $sum: '$viewCount' },
                        avgPrice: { $avg: '$price' },
                        minPrice: { $min: '$price' },
                        maxPrice: { $max: '$price' },
                        avgRating: { $avg: '$rating.average' },
                        featuredCount: {
                            $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] }
                        },
                        bestsellerCount: {
                            $sum: { $cond: [{ $eq: ['$isBestseller', true] }, 1, 0] }
                        }
                    }
                }
            ]);

            return stats[0] || {
                totalItems: 0,
                availableItems: 0,
                totalOrderCount: 0,
                totalViewCount: 0,
                avgPrice: 0,
                minPrice: 0,
                maxPrice: 0,
                avgRating: 0,
                featuredCount: 0,
                bestsellerCount: 0
            };
        } catch (error) {
            throw new Error(`Error fetching food statistics: ${error.message}`);
        }
    }

    /**
     * Get popular food items
     */
    async getPopularFoods(limit = 10) {
        try {
            const foods = await Food.find({
                isActive: true,
                isAvailable: true
            })
                .sort('-orderCount -rating.average')
                .limit(parseInt(limit))
                .populate('restaurant', 'name address.city')
                .select('-__v');

            return foods;
        } catch (error) {
            throw new Error(`Error fetching popular foods: ${error.message}`);
        }
    }

    /**
     * Search food items
     */
    async searchFoods(searchTerm, filters = {}) {
        try {
            const { limit = 20, skip = 0 } = filters;

            const query = {
                $text: { $search: searchTerm },
                isActive: true
            };

            const foods = await Food.find(query, { score: { $meta: 'textScore' } })
                .sort({ score: { $meta: 'textScore' } })
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .populate('restaurant', 'name address.city')
                .select('-__v');

            const total = await Food.countDocuments(query);

            return {
                data: foods,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error searching food items: ${error.message}`);
        }
    }
}

module.exports = new FoodService();