const Restaurant = require('../models/restaurant.model');
const Food = require('../models/food.model');

class RestaurantService {
    /**
     * Create a new restaurant
     */
    async createRestaurant(data, userId = null) {
        try {
            // Add creator if provided
            if (userId) {
                data.createdBy = userId;
                data.owner = userId;
            }

            const restaurant = new Restaurant(data);
            return await restaurant.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Restaurant with this email already exists');
            }
            throw new Error(`Error creating restaurant: ${error.message}`);
        }
    }

    /**
     * Get all restaurants with advanced filtering, sorting, and pagination
     */
    async getAllRestaurants(filters = {}) {
        try {
            const {
                isActive = true,
                status,
                city,
                cuisine,
                deliveryAvailable,
                minRating,
                maxRating,
                minPrice,
                maxPrice,
                features,
                badges,
                isFeatured,
                isPremium,
                verificationStatus,
                search,
                limit = 20,
                skip = 0,
                sortBy = '-create_at',
                populate = false
            } = filters;

            // Build query
            const query = {};

            if (isActive !== undefined) query.isActive = isActive;
            if (status) query.status = status;
            if (city) query['address.city'] = new RegExp(city, 'i');
            if (cuisine) {
                if (Array.isArray(cuisine)) {
                    query.cuisine = { $in: cuisine };
                } else {
                    query.cuisine = cuisine;
                }
            }
            if (deliveryAvailable !== undefined) query.deliveryAvailable = deliveryAvailable;
            if (isFeatured !== undefined) query.isFeatured = isFeatured;
            if (isPremium !== undefined) query.isPremium = isPremium;
            if (verificationStatus) query.verificationStatus = verificationStatus;

            // Rating range filter
            if (minRating !== undefined || maxRating !== undefined) {
                query['rating.average'] = {};
                if (minRating !== undefined) query['rating.average'].$gte = parseFloat(minRating);
                if (maxRating !== undefined) query['rating.average'].$lte = parseFloat(maxRating);
            }

            // Price range filter
            if (minPrice !== undefined || maxPrice !== undefined) {
                query.priceForTwo = {};
                if (minPrice !== undefined) query.priceForTwo.$gte = parseFloat(minPrice);
                if (maxPrice !== undefined) query.priceForTwo.$lte = parseFloat(maxPrice);
            }

            // Features filter
            if (features) {
                if (Array.isArray(features)) {
                    query.features = { $all: features };
                } else {
                    query.features = features;
                }
            }

            // Badges filter
            if (badges) {
                if (Array.isArray(badges)) {
                    query.badges = { $in: badges };
                } else {
                    query.badges = badges;
                }
            }

            // Text search
            if (search) {
                query.$text = { $search: search };
            }

            // Build base query
            let restaurantQuery = Restaurant.find(query)
                .sort(sortBy)
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            // Populate menu items if requested
            if (populate) {
                restaurantQuery = restaurantQuery.populate('menuItems', 'name price category cuisine rating');
            }

            const restaurants = await restaurantQuery;
            const total = await Restaurant.countDocuments(query);

            return {
                data: restaurants,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit),
                    hasMore: skip + restaurants.length < total
                }
            };
        } catch (error) {
            throw new Error(`Error fetching restaurants: ${error.message}`);
        }
    }

    /**
     * Get restaurant by ID (rid)
     */
    async getRestaurantById(rid, incrementView = false) {
        try {
            const restaurant = await Restaurant.findOne({ rid })
                .populate('menuItems', 'name price category cuisine rating image')
                .populate('owner', 'name email')
                .select('-__v');

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            // Increment view count if requested
            if (incrementView) {
                await restaurant.incrementViewCount();
            }

            return restaurant;
        } catch (error) {
            throw new Error(`Error fetching restaurant: ${error.message}`);
        }
    }

    /**
     * Get restaurant by email
     */
    async getRestaurantByEmail(email) {
        try {
            const restaurant = await Restaurant.findOne({ email }).select('-__v');

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            return restaurant;
        } catch (error) {
            throw new Error(`Error fetching restaurant: ${error.message}`);
        }
    }

    /**
     * Update restaurant
     */
    async updateRestaurant(rid, data, userId = null) {
        try {
            // Add updatedBy if userId provided
            if (userId) {
                data.updatedBy = userId;
            }

            const restaurant = await Restaurant.findOneAndUpdate(
                { rid },
                { $set: data },
                { new: true, runValidators: true }
            ).select('-__v');

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            return restaurant;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error('Email already exists for another restaurant');
            }
            throw new Error(`Error updating restaurant: ${error.message}`);
        }
    }

    /**
     * Update restaurant status
     */
    async updateRestaurantStatus(rid, status) {
        try {
            const validStatuses = ['Active', 'Inactive', 'Suspended', 'Closed'];
            if (!validStatuses.includes(status)) {
                throw new Error('Invalid status value');
            }

            const restaurant = await Restaurant.findOneAndUpdate(
                { rid },
                { 
                    $set: { 
                        status,
                        isActive: status === 'Active'
                    } 
                },
                { new: true }
            );

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            // If restaurant is deactivated, also deactivate all its menu items
            if (status !== 'Active') {
                await Food.updateMany(
                    { restaurant: restaurant._id },
                    { $set: { isActive: false, isAvailable: false } }
                );
            }

            return restaurant;
        } catch (error) {
            throw new Error(`Error updating restaurant status: ${error.message}`);
        }
    }

    /**
     * Deactivate restaurant (soft delete)
     */
    async deactivateRestaurant(rid) {
        try {
            const restaurant = await Restaurant.findOneAndUpdate(
                { rid },
                { 
                    $set: { 
                        isActive: false,
                        status: 'Inactive'
                    } 
                },
                { new: true }
            );

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            // Deactivate all menu items
            await Food.updateMany(
                { restaurant: restaurant._id },
                { $set: { isActive: false, isAvailable: false } }
            );

            return {
                message: 'Restaurant deactivated successfully',
                data: restaurant
            };
        } catch (error) {
            throw new Error(`Error deactivating restaurant: ${error.message}`);
        }
    }

    /**
     * Delete restaurant permanently
     */
    async deleteRestaurant(rid) {
        try {
            const restaurant = await Restaurant.findOneAndDelete({ rid });

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            // Delete all associated food items
            await Food.deleteMany({ restaurant: restaurant._id });

            return {
                message: 'Restaurant deleted permanently',
                data: restaurant
            };
        } catch (error) {
            throw new Error(`Error permanently deleting restaurant: ${error.message}`);
        }
    }

    /**
     * Get restaurants by city
     */
    async getRestaurantsByCity(city, filters = {}) {
        try {
            const { limit = 20, skip = 0, isActive = true } = filters;

            const restaurants = await Restaurant.find({
                'address.city': new RegExp(city, 'i'),
                isActive,
                status: 'Active'
            })
                .sort('-rating.average -totalOrders')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            const total = await Restaurant.countDocuments({
                'address.city': new RegExp(city, 'i'),
                isActive,
                status: 'Active'
            });

            return {
                data: restaurants,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching restaurants by city: ${error.message}`);
        }
    }

    /**
     * Get restaurants by cuisine
     */
    async getRestaurantsByCuisine(cuisine, filters = {}) {
        try {
            const { limit = 20, skip = 0, isActive = true } = filters;

            const restaurants = await Restaurant.find({
                cuisine: cuisine,
                isActive,
                status: 'Active'
            })
                .sort('-rating.average')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            const total = await Restaurant.countDocuments({
                cuisine: cuisine,
                isActive,
                status: 'Active'
            });

            return {
                data: restaurants,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching restaurants by cuisine: ${error.message}`);
        }
    }

    /**
     * Add menu item to restaurant
     */
    async addMenuItem(rid, foodId) {
        try {
            const restaurant = await Restaurant.findOne({ rid });

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            // Check if food item exists
            const food = await Food.findById(foodId);
            if (!food) {
                throw new Error('Food item not found');
            }

            // Add to menu if not already present
            if (!restaurant.menuItems.includes(foodId)) {
                restaurant.menuItems.push(foodId);
                await restaurant.save();
            }

            return restaurant;
        } catch (error) {
            throw new Error(`Error adding menu item: ${error.message}`);
        }
    }

    /**
     * Remove menu item from restaurant
     */
    async removeMenuItem(rid, foodId) {
        try {
            const restaurant = await Restaurant.findOneAndUpdate(
                { rid },
                { $pull: { menuItems: foodId } },
                { new: true }
            );

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            return restaurant;
        } catch (error) {
            throw new Error(`Error removing menu item: ${error.message}`);
        }
    }

    /**
     * Update operating hours
     */
    async updateOperatingHours(rid, operatingHours) {
        try {
            const restaurant = await Restaurant.findOneAndUpdate(
                { rid },
                { $set: { operatingHours } },
                { new: true, runValidators: true }
            );

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            return restaurant;
        } catch (error) {
            throw new Error(`Error updating operating hours: ${error.message}`);
        }
    }

    /**
     * Add or update offer
     */
    async addOffer(rid, offerData) {
        try {
            const restaurant = await Restaurant.findOne({ rid });

            if (!restaurant) {
                throw new Error('Restaurant not found');
            }

            restaurant.activeOffers.push(offerData);
            await restaurant.save();

            return restaurant;
        } catch (error) {
            throw new Error(`Error adding offer: ${error.message}`);
        }
    }

    /**
     * Get restaurant statistics
     */
    async getRestaurantStats(filters = {}) {
        try {
            const { city, cuisine } = filters;
            
            const matchQuery = { isActive: true, status: 'Active' };
            if (city) matchQuery['address.city'] = new RegExp(city, 'i');
            if (cuisine) matchQuery.cuisine = cuisine;

            const stats = await Restaurant.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: null,
                        totalRestaurants: { $sum: 1 },
                        verifiedRestaurants: {
                            $sum: { $cond: [{ $eq: ['$verificationStatus', 'Verified'] }, 1, 0] }
                        },
                        featuredRestaurants: {
                            $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] }
                        },
                        premiumRestaurants: {
                            $sum: { $cond: [{ $eq: ['$isPremium', true] }, 1, 0] }
                        },
                        totalOrders: { $sum: '$totalOrders' },
                        totalRevenue: { $sum: '$totalRevenue' },
                        avgRating: { $avg: '$rating.average' },
                        avgPriceForTwo: { $avg: '$priceForTwo' },
                        minPriceForTwo: { $min: '$priceForTwo' },
                        maxPriceForTwo: { $max: '$priceForTwo' },
                        avgDeliveryTimeMin: { $avg: '$deliveryTimeMin' },
                        totalViewCount: { $sum: '$viewCount' }
                    }
                }
            ]);

            return stats[0] || {
                totalRestaurants: 0,
                verifiedRestaurants: 0,
                featuredRestaurants: 0,
                premiumRestaurants: 0,
                totalOrders: 0,
                totalRevenue: 0,
                avgRating: 0,
                avgPriceForTwo: 0,
                minPriceForTwo: 0,
                maxPriceForTwo: 0,
                avgDeliveryTimeMin: 0,
                totalViewCount: 0
            };
        } catch (error) {
            throw new Error(`Error fetching restaurant statistics: ${error.message}`);
        }
    }

    /**
     * Get popular restaurants
     */
    async getPopularRestaurants(limit = 10, city = null) {
        try {
            const query = {
                isActive: true,
                status: 'Active'
            };

            if (city) {
                query['address.city'] = new RegExp(city, 'i');
            }

            const restaurants = await Restaurant.find(query)
                .sort('-totalOrders -rating.average -viewCount')
                .limit(parseInt(limit))
                .select('-__v');

            return restaurants;
        } catch (error) {
            throw new Error(`Error fetching popular restaurants: ${error.message}`);
        }
    }

    /**
     * Search restaurants
     */
    async searchRestaurants(searchTerm, filters = {}) {
        try {
            const { limit = 20, skip = 0, city } = filters;

            const query = {
                $text: { $search: searchTerm },
                isActive: true,
                status: 'Active'
            };

            if (city) {
                query['address.city'] = new RegExp(city, 'i');
            }

            const restaurants = await Restaurant.find(query, { score: { $meta: 'textScore' } })
                .sort({ score: { $meta: 'textScore' } })
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            const total = await Restaurant.countDocuments(query);

            return {
                data: restaurants,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error searching restaurants: ${error.message}`);
        }
    }

    /**
     * Get nearby restaurants (requires coordinates)
     */
    async getNearbyRestaurants(latitude, longitude, filters = {}) {
        try {
            const { maxDistance = 10, limit = 20, skip = 0 } = filters;

            const restaurants = await Restaurant.findNearby(latitude, longitude, maxDistance)
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            return {
                data: restaurants,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: restaurants.length
                }
            };
        } catch (error) {
            throw new Error(`Error fetching nearby restaurants: ${error.message}`);
        }
    }

    /**
     * Bulk update restaurants
     */
    async bulkUpdateRestaurants(restaurantIds, updateData) {
        try {
            const result = await Restaurant.updateMany(
                { rid: { $in: restaurantIds } },
                { $set: updateData }
            );

            return {
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
                message: `${result.modifiedCount} restaurants updated successfully`
            };
        } catch (error) {
            throw new Error(`Error bulk updating restaurants: ${error.message}`);
        }
    }
}

module.exports = new RestaurantService();