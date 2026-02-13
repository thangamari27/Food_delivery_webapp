const restaurantService = require('../services/restaurantService');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const cloudinaryService = require('../services/cloudinaryservice');

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
                minOrderAmount,
                deliveryFee,
                status,
                verificationStatus,
                isActive,
                isFeatured,
                isPremium
            } = req.body;

            // Validation
            if (!name || !contactPerson || !phone || !email || !description || !cuisine || !address || !operatingHours || !priceRange) {
                throw new ApiError(400, 'Name, contact person, phone, email, description, cuisine, address, operating hours, and price range are required');
            }

            // Parse cuisine (from FormData it might be a string)
            let parsedCuisine = cuisine;
            if (typeof cuisine === 'string') {
                try {
                    parsedCuisine = JSON.parse(cuisine);
                } catch (e) {
                    parsedCuisine = [cuisine];
                }
            }

            if (!parsedCuisine || !Array.isArray(parsedCuisine) || parsedCuisine.length === 0) {
                throw new ApiError(400, 'At least one cuisine type is required');
            }

            // Parse address (from FormData it might be a string)
            let parsedAddress = address;
            if (typeof address === 'string') {
                try {
                    parsedAddress = JSON.parse(address);
                } catch (e) {
                    throw new ApiError(400, 'Invalid address format');
                }
            }

            if (!parsedAddress.street || !parsedAddress.city) {
                throw new ApiError(400, 'Street and city are required in address');
            }

            // Parse operating hours (from FormData it might be a string)
            let parsedOperatingHours = operatingHours;
            if (typeof operatingHours === 'string') {
                try {
                    parsedOperatingHours = JSON.parse(operatingHours);
                } catch (e) {
                    throw new ApiError(400, 'Invalid operating hours format');
                }
            }

            if (!parsedOperatingHours.openingTime || !parsedOperatingHours.closingTime) {
                throw new ApiError(400, 'Opening time and closing time are required');
            }

            const restaurantData = {
                name,
                contactPerson,
                phone,
                email,
                description,
                cuisine: parsedCuisine,
                address: parsedAddress,
                operatingHours: parsedOperatingHours,
                priceRange
            };

            // Handle image from middleware (processUploadedImage)
            if (req.body.uploadedImage) {
                restaurantData.image = {
                    publicId: req.body.uploadedImage.publicId,
                    url: req.body.uploadedImage.url,
                    format: req.body.uploadedImage.format
                };
            }

            // Optional fields with FormData parsing
            if (deliveryTime) restaurantData.deliveryTime = deliveryTime;
            if (offers) restaurantData.offers = offers;
            
            // Parse arrays from FormData
            if (badges) {
                restaurantData.badges = typeof badges === 'string' ? JSON.parse(badges) : badges;
            }
            if (features) {
                restaurantData.features = typeof features === 'string' ? JSON.parse(features) : features;
            }
            if (serviceAreas) {
                restaurantData.serviceAreas = typeof serviceAreas === 'string' ? JSON.parse(serviceAreas) : serviceAreas;
            }
            if (paymentMethods) {
                restaurantData.paymentMethods = typeof paymentMethods === 'string' ? JSON.parse(paymentMethods) : paymentMethods;
            }

            // Convert FormData booleans
            if (deliveryAvailable !== undefined) {
                restaurantData.deliveryAvailable = deliveryAvailable === 'true' || deliveryAvailable === true;
            }
            if (takeawayAvailable !== undefined) {
                restaurantData.takeawayAvailable = takeawayAvailable === 'true' || takeawayAvailable === true;
            }
            if (dineInAvailable !== undefined) {
                restaurantData.dineInAvailable = dineInAvailable === 'true' || dineInAvailable === true;
            }
            if (isActive !== undefined) {
                restaurantData.isActive = isActive === 'true' || isActive === true;
            }
            if (isFeatured !== undefined) {
                restaurantData.isFeatured = isFeatured === 'true' || isFeatured === true;
            }
            if (isPremium !== undefined) {
                restaurantData.isPremium = isPremium === 'true' || isPremium === true;
            }

            // Numeric fields
            if (deliveryRadius) restaurantData.deliveryRadius = parseInt(deliveryRadius);
            if (minOrderAmount !== undefined) restaurantData.minOrderAmount = parseFloat(minOrderAmount);
            if (deliveryFee !== undefined) restaurantData.deliveryFee = parseFloat(deliveryFee);

            // Status fields
            if (status) restaurantData.status = status;
            if (verificationStatus) restaurantData.verificationStatus = verificationStatus;

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
            console.error('Restaurant creation error:', error);
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
            const updateData = { ...req.body };

            // Handle image update from middleware
            if (req.body.uploadedImage) {
                // Get old restaurant to delete old image
                const oldRestaurant = await restaurantService.getRestaurantById(rid);
                
                // Delete old image if it exists and is not a placeholder
                if (oldRestaurant.image?.publicId && 
                    oldRestaurant.image.publicId !== 'restaurant_placeholder') {
                    try {
                        await cloudinaryService.deleteImage(oldRestaurant.image.publicId);
                    } catch (err) {
                        console.error('Error deleting old image:', err);
                    }
                }

                // Set new image
                updateData.image = {
                    publicId: req.body.uploadedImage.publicId,
                    url: req.body.uploadedImage.url,
                    format: req.body.uploadedImage.format
                };
            }

            // Parse nested objects from FormData
            if (updateData.address && typeof updateData.address === 'string') {
                updateData.address = JSON.parse(updateData.address);
            }
            if (updateData.operatingHours && typeof updateData.operatingHours === 'string') {
                updateData.operatingHours = JSON.parse(updateData.operatingHours);
            }

            // Parse arrays from FormData
            ['cuisine', 'badges', 'features', 'serviceAreas', 'paymentMethods'].forEach(field => {
                if (updateData[field] && typeof updateData[field] === 'string') {
                    updateData[field] = JSON.parse(updateData[field]);
                }
            });

            // Convert FormData booleans
            ['deliveryAvailable', 'takeawayAvailable', 'dineInAvailable', 
             'isActive', 'isFeatured', 'isPremium'].forEach(field => {
                if (updateData[field] !== undefined) {
                    updateData[field] = updateData[field] === 'true' || updateData[field] === true;
                }
            });

            // Parse numeric fields from FormData
            if (updateData.deliveryRadius) updateData.deliveryRadius = parseInt(updateData.deliveryRadius);
            if (updateData.minOrderAmount !== undefined) updateData.minOrderAmount = parseFloat(updateData.minOrderAmount);
            if (updateData.deliveryFee !== undefined) updateData.deliveryFee = parseFloat(updateData.deliveryFee);
            if (updateData.priceForTwo) updateData.priceForTwo = parseFloat(updateData.priceForTwo);

            // Parse rating object
            if (updateData.rating && typeof updateData.rating === 'string') {
                updateData.rating = JSON.parse(updateData.rating);
            }

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
            console.error('Restaurant update error:', error);
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

            // Get restaurant to delete image
            const restaurant = await restaurantService.getRestaurantById(rid);
            
            // Delete image from Cloudinary if not placeholder
            if (restaurant.image?.publicId && restaurant.image.publicId !== 'restaurant_placeholder') {
                try {
                    await cloudinaryService.deleteImage(restaurant.image.publicId);
                } catch (err) {
                    console.error('Error deleting image from Cloudinary:', err);
                }
            }

            // Delete gallery images if they exist
            if (restaurant.gallery && restaurant.gallery.length > 0) {
                const galleryPublicIds = restaurant.gallery
                    .map(img => img.publicId)
                    .filter(id => id && id !== 'restaurant_placeholder');
                
                if (galleryPublicIds.length > 0) {
                    try {
                        await cloudinaryService.deleteMultipleImages(galleryPublicIds);
                    } catch (err) {
                        console.error('Error deleting gallery images:', err);
                    }
                }
            }

            // Delete logo if it exists
            if (restaurant.logo?.publicId && restaurant.logo.publicId !== 'restaurant_placeholder') {
                try {
                    await cloudinaryService.deleteImage(restaurant.logo.publicId);
                } catch (err) {
                    console.error('Error deleting logo:', err);
                }
            }

            const result = await restaurantService.deleteRestaurant(rid);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: result.message,
                    data: result.data
                })
            );
        } catch (error) {
            console.error('Restaurant delete error:', error);
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