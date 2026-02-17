const orderService = require('../services/orderService');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class OrderController {
    /**
     * Create a new order
     * POST /api/orders
     * FIXED: Ensure userId is set from authenticated user
     */
    async create(req, res) {
        try {
            const {
                customer,
                delivery,
                restaurant,
                items,
                pricing,
                payment,
                notes,
                specialRequests,
                source
            } = req.body;

            // Validation
            if (!customer || !customer.name || !customer.phone) {
                return res.status(400).json({
                    success: false,
                    message: 'Customer name and phone are required'
                });
            }

            if (!delivery || !delivery.address) {
                return res.status(400).json({
                    success: false,
                    message: 'Delivery address is required'
                });
            }

            if (!restaurant || !restaurant.restaurantId) {
                return res.status(400).json({
                    success: false,
                    message: 'Restaurant is required'
                });
            }

            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Order must contain at least one item'
                });
            }

            if (!payment || !payment.method) {
                return res.status(400).json({
                    success: false,
                    message: 'Payment method is required'
                });
            }

            const orderData = {
                customer,
                delivery,
                restaurant,
                items,
                payment
            };

            // Optional fields
            if (pricing) orderData.pricing = pricing;
            if (notes) orderData.notes = notes;
            if (specialRequests) orderData.specialRequests = specialRequests;
            if (source) orderData.source = source;

            // FIXED: Ensure userId is set from authenticated user
            const userId = req.user ? req.user._id : null;
            
            // SAFETY CHECK: If userId not in customer object but user is authenticated, set it
            if (userId && !orderData.customer.userId) {
                orderData.customer.userId = userId;
            } else if (!orderData.customer.userId) {
                console.warn('Order created without userId. User authenticated:', !!req.user);
            }

            const order = await orderService.createOrder(orderData, userId);

            return res.status(201).json(
                new ApiResponse(201, {
                    success: true,
                    message: 'Order created successfully',
                    data: order
                })
            );
        } catch (error) {
            console.error('Order creation error:', error);
            return res.status(error.statusCode || 500).json({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * Get all orders with filters
     * GET /api/orders
     */
    async getAll(req, res) {
        try {
            const filters = {
                isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : true,
                orderStatus: req.query.orderStatus,
                paymentStatus: req.query.paymentStatus,
                restaurantId: req.query.restaurantId,
                customerId: req.query.customerId,
                dateRange: req.query.dateRange,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                minAmount: req.query.minAmount,
                maxAmount: req.query.maxAmount,
                search: req.query.search,
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                sortBy: req.query.sortBy || '-orderDate',
                populate: req.query.populate === 'true'
            };

            const result = await orderService.getAllOrders(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Orders fetched successfully',
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
     * Get order by ID
     * GET /api/orders/:orderId
     */
    async getById(req, res) {
        try {
            const { orderId } = req.params;
            const populate = req.query.populate !== 'false';

            const order = await orderService.getOrderById(orderId, populate);

            // SECURITY: Check if user owns this order (for non-admin users)
            if (req.user && req.user.role !== 'admin' && req.user.role !== 'restaurant') {
                if (order.customer.userId && order.customer.userId.toString() !== req.user._id.toString()) {
                    return res.status(403).json({
                        success: false,
                        message: 'You do not have permission to view this order'
                    });
                }
            }

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Order fetched successfully',
                    data: order
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
     * Get orders by customer
     * GET /api/orders/customer/:customerId
     */
    async getByCustomer(req, res) {
        try {
            const { customerId } = req.params;
            
            // SECURITY: Check if user is requesting their own orders
            if (req.user && req.user.role !== 'admin' && req.user.role !== 'restaurant') {
                if (customerId !== req.user._id.toString()) {
                    return res.status(403).json({
                        success: false,
                        message: 'You can only view your own orders'
                    });
                }
            }
            
            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                orderStatus: req.query.orderStatus
            };

            const result = await orderService.getOrdersByCustomer(customerId, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Customer orders fetched successfully',
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
     * Get orders by restaurant
     * GET /api/orders/restaurant/:restaurantId
     */
    async getByRestaurant(req, res) {
        try {
            const { restaurantId } = req.params;
            const filters = {
                limit: req.query.limit || 20,
                skip: req.query.skip || 0,
                orderStatus: req.query.orderStatus,
                dateRange: req.query.dateRange
            };

            const result = await orderService.getOrdersByRestaurant(restaurantId, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Restaurant orders fetched successfully',
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
     * Update order
     * PUT /api/orders/:orderId
     */
    async update(req, res) {
        try {
            const { orderId } = req.params;
            const updateData = req.body;

            // Add user ID if authenticated
            const userId = req.user ? req.user._id : null;

            const order = await orderService.updateOrder(orderId, updateData, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Order updated successfully',
                    data: order
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
     * Update order status
     * PATCH /api/orders/:orderId/status
     */
    async updateStatus(req, res) {
        try {
            const { orderId } = req.params;
            const { status, note } = req.body;

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: 'Status is required'
                });
            }

            const userId = req.user ? req.user._id : null;

            const order = await orderService.updateOrderStatus(orderId, status, note, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Order status updated successfully',
                    data: order
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
     * Update payment status
     * PATCH /api/orders/:orderId/payment
     */
    async updatePayment(req, res) {
        try {
            const { orderId } = req.params;
            const { paymentStatus, transactionId } = req.body;

            if (!paymentStatus) {
                return res.status(400).json({
                    success: false,
                    message: 'Payment status is required'
                });
            }

            const userId = req.user ? req.user._id : null;

            const order = await orderService.updatePaymentStatus(
                orderId,
                paymentStatus,
                transactionId,
                userId
            );

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Payment status updated successfully',
                    data: order
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
     * Cancel order
     * POST /api/orders/:orderId/cancel
     */
    async cancel(req, res) {
        try {
            const { orderId } = req.params;
            const { reason } = req.body;

            if (!reason) {
                return res.status(400).json({
                    success: false,
                    message: 'Cancel reason is required'
                });
            }

            const userId = req.user ? req.user._id : null;

            const order = await orderService.cancelOrder(orderId, reason, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Order cancelled successfully',
                    data: order
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
     * Process refund
     * POST /api/orders/:orderId/refund
     */
    async refund(req, res) {
        try {
            const { orderId } = req.params;
            const { amount } = req.body;

            const userId = req.user ? req.user._id : null;

            const order = await orderService.processRefund(orderId, amount, userId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Refund processed successfully',
                    data: order
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
     * Bulk update orders
     * PATCH /api/orders/bulk
     */
    async bulkUpdate(req, res) {
        try {
            const { orderIds, updateData } = req.body;

            if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'orderIds array is required'
                });
            }

            if (!updateData || Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'updateData is required'
                });
            }

            const result = await orderService.bulkUpdateOrders(orderIds, updateData);

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
     * Delete order (soft delete)
     * DELETE /api/orders/:orderId
     */
    async delete(req, res) {
        try {
            const { orderId } = req.params;
            const userId = req.user ? req.user._id : null;

            const result = await orderService.deleteOrder(orderId, userId);

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
     * Delete order permanently
     * DELETE /api/orders/:orderId/permanent
     */
    async permanentDelete(req, res) {
        try {
            const { orderId } = req.params;

            const result = await orderService.permanentlyDeleteOrder(orderId);

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
     * Get order statistics
     * GET /api/orders/stats
     */
    async getStats(req, res) {
        try {
            const filters = {
                restaurantId: req.query.restaurantId,
                customerId: req.query.customerId,
                dateRange: req.query.dateRange
            };

            const stats = await orderService.getOrderStats(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Order statistics fetched successfully',
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
     * Get revenue statistics
     * GET /api/orders/revenue
     */
    async getRevenue(req, res) {
        try {
            const filters = {
                restaurantId: req.query.restaurantId,
                dateRange: req.query.dateRange || 'month'
            };

            const revenue = await orderService.getRevenueStats(filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Revenue statistics fetched successfully',
                    data: revenue
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
     * Get popular items
     * GET /api/orders/popular-items
     */
    async getPopularItems(req, res) {
        try {
            const limit = req.query.limit || 10;
            const restaurantId = req.query.restaurantId;

            const items = await orderService.getPopularItems(limit, restaurantId);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Popular items fetched successfully',
                    data: items
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
     * Search orders
     * GET /api/orders/search
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

            const result = await orderService.searchOrders(q, filters);

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

    /**
     * Get my orders (for authenticated users)
     * GET /api/orders/my-orders
     */
    async getMyOrders(req, res) {
        try {
            // More robust user authentication check
            if (!req.user) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Authentication required' 
                });
            }

            // Extract user ID - handle different possible formats
            const userId = req.user._id || req.user.id || req.user.userId;
            
            if (!userId) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'User ID not found in authentication token' 
                });
            }

            // Validate ObjectId format
            const mongoose = require('mongoose');
            if (!mongoose.Types.ObjectId.isValid(String(userId))) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid user ID format in token' 
                });
            }

            const filters = {
                limit: parseInt(req.query.limit) || 20,
                skip: parseInt(req.query.skip) || 0,
                orderStatus: req.query.orderStatus !== 'all' ? req.query.orderStatus : undefined
            };

            // Use the userId directly - service will handle conversion
            const result = await orderService.getOrdersByCustomer(userId, filters);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Your orders fetched successfully',
                    data: result.data,
                    pagination: result.pagination
                })
            );
        } catch (error) {
            console.error('getMyOrders error:', error);
            return res.status(500).json({ 
                success: false, 
                message: error.message || 'Failed to fetch orders'
            });
        }
    }
}

module.exports = new OrderController();