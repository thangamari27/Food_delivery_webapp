const restaurantService = require('../services/restaurantService');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class RestaurantController {
    /**
     * Create a new restaurant
     * POST /api/restaurants
     */
    async create(req, res, next) {
        try {
            const {
                name,
                contactPerson,
                phone,
                email,
                description,
                cuisine,
                address,
                deliveryTime,
                priceRange,
                offers,
                badges,
                features,
                operatingHours,
                deliveryAvailable,
                takeawayAvailable,
                dineInAvailable,
                deliveryRadius,
                serviceAreas,
                paymentMethods,
                image,
                imageFallback,
                logo,
                minOrderAmount,
                deliveryFee
            } = req.body;

            // Validation
            if (!name || !contactPerson || !phone || !email || !description || !cuisine || !address || !operatingHours || !priceRange) {
                throw new ApiError(400, 'Name, contact person, phone, email, description, cuisine, address, operating hours, and price range are required');
            }

            if (!cuisine || !Array.isArray(cuisine) || cuisine.length === 0) {
                throw new ApiError(400, 'At least one cuisine type is required');
            }

            if (!address.street || !address.city) {
                throw new ApiError(400, 'Street and city are required in address');
            }

            if (!operatingHours.openingTime || !operatingHours.closingTime) {
                throw new ApiError(400, 'Opening time and closing time are required');
            }

            const restaurantData = {
                name,
                contactPerson,
                phone,
                email,
                description,
                cuisine,
                address,
                operatingHours,
                priceRange
            };

            // Optional fields
            if (deliveryTime) restaurantData.deliveryTime = deliveryTime;
            if (offers) restaurantData.offers = offers;
            if (badges) restaurantData.badges = badges;
            if (features) restaurantData.features = features;
            if (deliveryAvailable !== undefined) restaurantData.deliveryAvailable = deliveryAvailable;
            if (takeawayAvailable !== undefined) restaurantData.takeawayAvailable = takeawayAvailable;
            if (dineInAvailable !== undefined) restaurantData.dineInAvailable = dineInAvailable;
            if (deliveryRadius) restaurantData.deliveryRadius = parseInt(deliveryRadius);
            if (serviceAreas) restaurantData.serviceAreas = serviceAreas;
            if (paymentMethods) restaurantData.paymentMethods = paymentMethods;
            if (image) restaurantData.image = image;
            if (imageFallback) restaurantData.imageFallback = imageFallback;
            if (logo) restaurantData.logo = logo;
            if (minOrderAmount !== undefined) restaurantData.minOrderAmount = parseFloat(minOrderAmount);
            if (deliveryFee !== undefined) restaurantData.deliveryFee = parseFloat(deliveryFee);

            // Add user ID if authenticated
            const userId = req.user ? req.user._id : null;

            const restaurant = await restaurantService.createRestaurant(restaurantData, userId);

            return res.status(201).json(
                new ApiResponse(201, {
                    success: true,
                    message: 'Restaurant created successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all restaurants with filters
     * GET /api/restaurants
     */
    async getAll(req, res, next) {
        try {
            const filters = {
                isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : true,
                status: req.query.status,
                city: req.query.city,
                cuisine: req.query.cuisine,
                deliveryAvailable: req.query.deliveryAvailable !== undefined ? req.query.deliveryAvailable === 'true' : undefined,
                minRating: req.query.minRating,
                maxRating: req.query.maxRating,
                minPrice: req.query.minPrice,
                maxPrice: req.query.maxPrice,
                features: req.query.features,
                badges: req.query.badges,
                isFeatured: req.query.isFeatured !== undefined ? req.query.isFeatured === 'true' : undefined,
                isPremium: req.query.isPremium !== undefined ? req.query.isPremium === 'true' : undefined,
                verificationStatus: req.query.verificationStatus,
                search: req.query.search,
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                sortBy: req.query.sortBy || '-create_at',
                populate: req.query.populate === 'true'
            };

            const result = await restaurantService.getAllRestaurants(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurants fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get restaurant by ID
     * GET /api/restaurants/:rid
     */
    async getById(req, res, next) {
        try {
            const { rid } = req.params;
            const incrementView = req.query.view === 'true';

            const restaurant = await restaurantService.getRestaurantById(rid, incrementView);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant fetched successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get restaurant by email
     * GET /api/restaurants/email/:email
     */
    async getByEmail(req, res, next) {
        try {
            const { email } = req.params;

            const restaurant = await restaurantService.getRestaurantByEmail(email);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant fetched successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update restaurant
     * PUT /api/restaurants/:rid
     */
    async update(req, res, next) {
        try {
            const { rid } = req.params;
            const updateData = req.body;

            // Add user ID if authenticated
            const userId = req.user ? req.user._id : null;

            const restaurant = await restaurantService.updateRestaurant(rid, updateData, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant updated successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update restaurant status
     * PATCH /api/restaurants/:rid/status
     */
    async updateStatus(req, res, next) {
        try {
            const { rid } = req.params;
            const { status } = req.body;

            if (!status) {
                throw new ApiError(400, 'Status field is required');
            }

            const restaurant = await restaurantService.updateRestaurantStatus(rid, status);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant status updated successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Deactivate restaurant (soft delete)
     * DELETE /api/restaurants/:rid
     */
    async deactivate(req, res, next) {
        try {
            const { rid } = req.params;

            const result = await restaurantService.deactivateRestaurant(rid);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: result.message,
                    data: result.data
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete restaurant permanently
     * DELETE /api/restaurants/:rid/permanent
     */
    async delete(req, res, next) {
        try {
            const { rid } = req.params;

            const result = await restaurantService.deleteRestaurant(rid);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: result.message,
                    data: result.data
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get restaurants by city
     * GET /api/restaurants/city/:city
     */
    async getByCity(req, res, next) {
        try {
            const { city } = req.params;
            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : true
            };

            const result = await restaurantService.getRestaurantsByCity(city, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurants fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get restaurants by cuisine
     * GET /api/restaurants/cuisine/:cuisine
     */
    async getByCuisine(req, res, next) {
        try {
            const { cuisine } = req.params;
            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : true
            };

            const result = await restaurantService.getRestaurantsByCuisine(cuisine, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurants fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Add menu item to restaurant
     * POST /api/restaurants/:rid/menu
     */
    async addMenuItem(req, res, next) {
        try {
            const { rid } = req.params;
            const { foodId } = req.body;

            if (!foodId) {
                throw new ApiError(400, 'foodId is required');
            }

            const restaurant = await restaurantService.addMenuItem(rid, foodId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Menu item added successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Remove menu item from restaurant
     * DELETE /api/restaurants/:rid/menu/:foodId
     */
    async removeMenuItem(req, res, next) {
        try {
            const { rid, foodId } = req.params;

            const restaurant = await restaurantService.removeMenuItem(rid, foodId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Menu item removed successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update operating hours
     * PATCH /api/restaurants/:rid/hours
     */
    async updateOperatingHours(req, res, next) {
        try {
            const { rid } = req.params;
            const { operatingHours } = req.body;

            if (!operatingHours) {
                throw new ApiError(400, 'operatingHours is required');
            }

            const restaurant = await restaurantService.updateOperatingHours(rid, operatingHours);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Operating hours updated successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Add offer to restaurant
     * POST /api/restaurants/:rid/offers
     */
    async addOffer(req, res, next) {
        try {
            const { rid } = req.params;
            const offerData = req.body;

            if (!offerData.title || !offerData.description) {
                throw new ApiError(400, 'Offer title and description are required');
            }

            const restaurant = await restaurantService.addOffer(rid, offerData);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Offer added successfully',
                    data: restaurant
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get restaurant statistics
     * GET /api/restaurants/stats
     */
    async getStats(req, res) {
        try {
            const filters = {
                city: req.query.city,
                cuisine: req.query.cuisine
            };

            const stats = await restaurantService.getRestaurantStats(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant statistics fetched successfully',
                    data: stats
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get popular restaurants
     * GET /api/restaurants/popular
     */
    async getPopular(req, res, next) {
        try {
            const limit = req.query.limit || 10;
            const city = req.query.city;

            const restaurants = await restaurantService.getPopularRestaurants(limit, city);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Popular restaurants fetched successfully',
                    data: restaurants
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Search restaurants
     * GET /api/restaurants/search
     */
    async search(req, res, next) {
        try {
            const { q } = req.query;

            if (!q) {
                throw new ApiError(400, 'Search query (q) is required');
            }

            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                city: req.query.city
            };

            const result = await restaurantService.searchRestaurants(q, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Search results fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get nearby restaurants
     * POST /api/restaurants/nearby
     */
    async getNearby(req, res, next) {
        try {
            const { latitude, longitude } = req.body;

            if (!latitude || !longitude) {
                throw new ApiError(400, 'Latitude and longitude are required');
            }

            const filters = {
                maxDistance: req.query.maxDistance || 10,
                limit: req.query.limit || 20,
                skip: req.query.skip || 0
            };

            const result = await restaurantService.getNearbyRestaurants(
                parseFloat(latitude),
                parseFloat(longitude),
                filters
            );

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Nearby restaurants fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            next(error);
        }
    }

    /**
     * Bulk update restaurants
     * PATCH /api/restaurants/bulk
     */
    async bulkUpdate(req, res, next) {
        try {
            const { restaurantIds, updateData } = req.body;

            if (!restaurantIds || !Array.isArray(restaurantIds) || restaurantIds.length === 0) {
                throw new ApiError(400, 'restaurantIds array is required');
            }

            if (!updateData || Object.keys(updateData).length === 0) {
                throw new ApiError(400, 'updateData is required');
            }

            const result = await restaurantService.bulkUpdateRestaurants(restaurantIds, updateData);

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
            next(error);
        }
    }
}

module.exports = new RestaurantController();