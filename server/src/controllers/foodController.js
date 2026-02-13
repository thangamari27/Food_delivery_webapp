const foodService = require('../services/foodService');
const ApiResponse = require('../utils/ApiResponse');
const cloudinaryService = require('../services/cloudinaryservice');

class FoodController {
    /**
     * Create a new food item
     * POST /api/foods
     */
    async create(req, res) {
        try {
            const {
                name,
                category,
                cuisine,
                restaurant,
                description,
                ingredients,
                price,
                originalPrice,
                type,
                isVeg,
                isVegan,
                isGlutenFree,
                spiceLevel,
                allergens,
                nutritionalInfo,
                preparationTime,
                servingSize,
                availableQuantity,
                minOrderQuantity,
                maxOrderQuantity,
                tags,
                status,
                isActive,
                isAvailable,
                isFeatured,
                isBestseller,
                isNewArrival
            } = req.body;

            // Validation
            if (!name || !category || !cuisine || !restaurant || !description || !price) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, category, cuisine, restaurant, description, and price are required'
                });
            }

            // Build food data
            const foodData = {
                name,
                category,
                cuisine,
                restaurant,
                description,
                price: parseFloat(price)
            };

            // Handle image from middleware (processUploadedImage)
            if (req.body.uploadedImage) {
                foodData.image = {
                    publicId: req.body.uploadedImage.publicId,
                    url: req.body.uploadedImage.url,
                    format: req.body.uploadedImage.format
                };
            }

            // Optional fields
            if (ingredients) foodData.ingredients = ingredients;
            if (originalPrice) foodData.originalPrice = parseFloat(originalPrice);
            if (type) foodData.type = type;
            if (isVeg !== undefined) foodData.isVeg = isVeg === 'true' || isVeg === true;
            if (isVegan !== undefined) foodData.isVegan = isVegan === 'true' || isVegan === true;
            if (isGlutenFree !== undefined) foodData.isGlutenFree = isGlutenFree === 'true' || isGlutenFree === true;
            if (spiceLevel) foodData.spiceLevel = spiceLevel;
            
            // Handle arrays (from FormData they come as strings)
            if (allergens) {
                foodData.allergens = typeof allergens === 'string' 
                    ? JSON.parse(allergens) 
                    : allergens;
            }
            if (tags) {
                foodData.tags = typeof tags === 'string' 
                    ? JSON.parse(tags) 
                    : tags;
            }
            
            // Handle nested nutritionalInfo (from FormData it's a string)
            if (nutritionalInfo) {
                foodData.nutritionalInfo = typeof nutritionalInfo === 'string'
                    ? JSON.parse(nutritionalInfo)
                    : nutritionalInfo;
            }

            if (preparationTime) foodData.preparationTime = parseInt(preparationTime);
            if (servingSize) foodData.servingSize = servingSize;
            if (availableQuantity !== undefined) foodData.availableQuantity = parseInt(availableQuantity);
            if (minOrderQuantity) foodData.minOrderQuantity = parseInt(minOrderQuantity);
            if (maxOrderQuantity) foodData.maxOrderQuantity = parseInt(maxOrderQuantity);

            // Status fields
            if (status) foodData.status = status;
            if (isActive !== undefined) foodData.isActive = isActive === 'true' || isActive === true;
            if (isAvailable !== undefined) foodData.isAvailable = isAvailable === 'true' || isAvailable === true;
            if (isFeatured !== undefined) foodData.isFeatured = isFeatured === 'true' || isFeatured === true;
            if (isBestseller !== undefined) foodData.isBestseller = isBestseller === 'true' || isBestseller === true;
            if (isNewArrival !== undefined) foodData.isNewArrival = isNewArrival === 'true' || isNewArrival === true;

            // Add user ID if authenticated
            if (req.user) {
                foodData.createdBy = req.user._id;
            }

            const food = await foodService.createFood(foodData);

            return res.status(201).json(
                new ApiResponse(201, {
                    success: true,
                    message: 'Food item created successfully',
                    data: food
                })
            );
        } catch (error) {
            console.error('Food creation error:', error);
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Update food item
     * PUT /api/foods/:fid
     */
    async update(req, res) {
        try {
            const { fid } = req.params;
            const updateData = { ...req.body };

            // Handle image update from middleware
            if (req.body.uploadedImage) {
                // Get old food to delete old image
                const oldFood = await foodService.getFoodById(fid);
                
                // Delete old image if it exists and is not a placeholder
                if (oldFood.image?.publicId && 
                    oldFood.image.publicId !== 'food_placeholder') {
                    try {
                        await cloudinaryService.deleteImage(oldFood.image.publicId);
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

            // Handle FormData string conversions for booleans
            ['isVeg', 'isVegan', 'isGlutenFree', 'isActive', 'isAvailable', 
             'isFeatured', 'isBestseller', 'isNewArrival'].forEach(field => {
                if (updateData[field] !== undefined) {
                    updateData[field] = updateData[field] === 'true' || updateData[field] === true;
                }
            });

            // Handle arrays from FormData
            if (updateData.allergens && typeof updateData.allergens === 'string') {
                updateData.allergens = JSON.parse(updateData.allergens);
            }
            if (updateData.tags && typeof updateData.tags === 'string') {
                updateData.tags = JSON.parse(updateData.tags);
            }

            // Handle nested nutritionalInfo from FormData
            if (updateData.nutritionalInfo && typeof updateData.nutritionalInfo === 'string') {
                updateData.nutritionalInfo = JSON.parse(updateData.nutritionalInfo);
            }

            // Parse numeric fields from FormData
            ['price', 'originalPrice'].forEach(field => {
                if (updateData[field]) updateData[field] = parseFloat(updateData[field]);
            });
            
            ['preparationTime', 'availableQuantity', 'minOrderQuantity', 'maxOrderQuantity'].forEach(field => {
                if (updateData[field]) updateData[field] = parseInt(updateData[field]);
            });

            // Add user ID if authenticated
            const userId = req.user ? req.user._id : null;

            const food = await foodService.updateFood(fid, updateData, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Food item updated successfully',
                    data: food
                })
            );
        } catch (error) {
            console.error('Food update error:', error);
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get all food items with filters
     * GET /api/foods
     */
    async getAll(req, res) {
        try {
            const filters = {
                isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : true,
                isAvailable: req.query.isAvailable !== undefined ? req.query.isAvailable === 'true' : undefined,
                category: req.query.category,
                cuisine: req.query.cuisine,
                restaurant: req.query.restaurant,
                restaurantName: req.query.restaurantName,
                type: req.query.type,
                isVeg: req.query.isVeg !== undefined ? req.query.isVeg === 'true' : undefined,
                isVegan: req.query.isVegan !== undefined ? req.query.isVegan === 'true' : undefined,
                isGlutenFree: req.query.isGlutenFree !== undefined ? req.query.isGlutenFree === 'true' : undefined,
                spiceLevel: req.query.spiceLevel,
                minPrice: req.query.minPrice,
                maxPrice: req.query.maxPrice,
                isFeatured: req.query.isFeatured !== undefined ? req.query.isFeatured === 'true' : undefined,
                isBestseller: req.query.isBestseller !== undefined ? req.query.isBestseller === 'true' : undefined,
                search: req.query.search,
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                sortBy: req.query.sortBy || '-create_at',
                populate: req.query.populate === 'true'
            };

            const result = await foodService.getAllFoods(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Food items fetched successfully',
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
     * Get food item by ID
     * GET /api/foods/:fid
     */
    async getById(req, res) {
        try {
            const { fid } = req.params;
            const incrementView = req.query.view === 'true';

            const food = await foodService.getFoodById(fid, incrementView);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Food item fetched successfully',
                    data: food
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
     * Get food items by restaurant
     * GET /api/foods/restaurant/:restaurantId
     */
    async getByRestaurant(req, res) {
        try {
            const { restaurantId } = req.params;
            const filters = {
                isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : true,
                isAvailable: req.query.isAvailable !== undefined ? req.query.isAvailable === 'true' : undefined,
                category: req.query.category,
                limit: req.query.limit || 50,
                skip: req.query.skip || 0
            };

            const result = await foodService.getFoodsByRestaurant(restaurantId, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant food items fetched successfully',
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
     * Bulk update food items
     * PATCH /api/foods/bulk
     */
    async bulkUpdate(req, res) {
        try {
            const { foodIds, updateData } = req.body;

            if (!foodIds || !Array.isArray(foodIds) || foodIds.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'foodIds array is required'
                });
            }

            if (!updateData || Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'updateData is required'
                });
            }

            const result = await foodService.bulkUpdateFoods(foodIds, updateData);

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
     * Update food availability
     * PATCH /api/foods/:fid/availability
     */
    async updateAvailability(req, res) {
        try {
            const { fid } = req.params;
            const { isAvailable } = req.body;

            if (isAvailable === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'isAvailable field is required'
                });
            }

            const food = await foodService.updateAvailability(fid, isAvailable);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Food availability updated successfully',
                    data: food
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : error.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Update food quantity
     * PATCH /api/foods/:fid/quantity
     */
    async updateQuantity(req, res) {
        try {
            const { fid } = req.params;
            const { quantity, operation } = req.body;

            if (quantity === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'quantity field is required'
                });
            }

            const food = await foodService.updateQuantity(fid, parseInt(quantity), operation || 'set');

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Food quantity updated successfully',
                    data: food
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : error.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Deactivate food item (soft delete)
     * DELETE /api/foods/:fid
     */
    async deactivate(req, res) {
        try {
            const { fid } = req.params;

            const result = await foodService.deactivateFood(fid);

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
     * Delete food item permanently
     * DELETE /api/foods/:fid/permanent
     */
    async delete(req, res) {
        try {
            const { fid } = req.params;

            // Get food to delete image
            const food = await foodService.getFoodById(fid);
            
            // Delete from Cloudinary if not placeholder
            if (food.image?.publicId && food.image.publicId !== 'food_placeholder') {
                try {
                    await cloudinaryService.deleteImage(food.image.publicId);
                } catch (err) {
                    console.error('Error deleting image from Cloudinary:', err);
                }
            }

            const result = await foodService.deleteFood(fid);

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
     * Get food statistics
     * GET /api/foods/stats
     */
    async getStats(req, res) {
        try {
            const filters = {
                restaurant: req.query.restaurant,
                category: req.query.category,
                cuisine: req.query.cuisine
            };

            const stats = await foodService.getFoodStats(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Food statistics fetched successfully',
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
     * Get popular food items
     * GET /api/foods/popular
     */
    async getPopular(req, res) {
        try {
            const limit = req.query.limit || 10;

            const foods = await foodService.getPopularFoods(limit);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Popular food items fetched successfully',
                    data: foods
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
     * Search food items
     * GET /api/foods/search
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
                skip: req.query.skip || 0
            };

            const result = await foodService.searchFoods(q, filters);

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
}

module.exports = new FoodController();