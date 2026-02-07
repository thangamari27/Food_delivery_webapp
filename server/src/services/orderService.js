const Order = require('../models/order.model');
const Food = require('../models/food.model');
const Restaurant = require('../models/restaurant.model');

class OrderService {
    /**
     * Create a new order
     */
    async createOrder(data, userId = null) {
        try {
            // Validate restaurant exists
            if (data.restaurant?.restaurantId) {
                const restaurant = await Restaurant.findById(data.restaurant.restaurantId);
                if (!restaurant) {
                    throw new Error('Restaurant not found');
                }
                
                // Add restaurant details
                if (!data.restaurant.name) {
                    data.restaurant.name = restaurant.name;
                }
                if (!data.restaurant.phone) {
                    data.restaurant.phone = restaurant.phone;
                }
            }

            // Validate and enrich food items
            if (data.items && data.items.length > 0) {
                for (let item of data.items) {
                    if (item.foodItem) {
                        const food = await Food.findById(item.foodItem);
                        if (!food) {
                            throw new Error(`Food item ${item.name} not found`);
                        }
                        
                        // Check availability
                        if (!food.isAvailable || !food.isActive) {
                            throw new Error(`Food item ${food.name} is not available`);
                        }
                        
                        // Check quantity
                        if (food.availableQuantity < item.quantity) {
                            throw new Error(`Insufficient quantity for ${food.name}`);
                        }
                        
                        // Update item details
                        if (!item.name) item.name = food.name;
                        if (!item.price) item.price = food.price;
                        if (!item.category) item.category = food.category;
                        if (!item.foodId) item.foodId = food.fid;
                    }
                }
            }

            // Set customer user ID if provided
            if (userId && data.customer) {
                data.customer.userId = userId;
            }

            // Set created by
            if (userId) {
                data.createdBy = userId;
            }

            // Create order
            const order = new Order(data);
            const savedOrder = await order.save();

            // Update food quantities and order counts
            if (data.items && data.items.length > 0) {
                for (let item of data.items) {
                    if (item.foodItem) {
                        await Food.findByIdAndUpdate(
                            item.foodItem,
                            {
                                $inc: {
                                    availableQuantity: -item.quantity,
                                    orderCount: item.quantity
                                }
                            }
                        );
                    }
                }
            }

            return savedOrder;
        } catch (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
    }

    /**
     * Get all orders with advanced filtering, sorting, and pagination
     */
    async getAllOrders(filters = {}) {
        try {
            const {
                isActive = true,
                orderStatus,
                paymentStatus,
                restaurantId,
                customerId,
                dateRange,
                startDate,
                endDate,
                minAmount,
                maxAmount,
                search,
                limit = 20,
                skip = 0,
                sortBy = '-orderDate',
                populate = false
            } = filters;

            // Build query
            const query = {};

            if (isActive !== undefined) query.isActive = isActive;
            if (orderStatus && orderStatus !== 'all') {
                query.orderStatus = orderStatus;
            }
            if (paymentStatus && paymentStatus !== 'all') {
                query['payment.status'] = paymentStatus;
            }
            if (restaurantId) {
                query['restaurant.restaurantId'] = restaurantId;
            }
            if (customerId) {
                query['customer.userId'] = customerId;
            }

            // Date range filtering
            if (dateRange || startDate || endDate) {
                const now = new Date();
                query.orderDate = {};

                if (dateRange === 'today') {
                    const todayStart = new Date(now.setHours(0, 0, 0, 0));
                    query.orderDate.$gte = todayStart;
                } else if (dateRange === 'week') {
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay());
                    weekStart.setHours(0, 0, 0, 0);
                    query.orderDate.$gte = weekStart;
                } else if (dateRange === 'month') {
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    query.orderDate.$gte = monthStart;
                } else if (dateRange === 'year') {
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    query.orderDate.$gte = yearStart;
                }

                // Custom date range
                if (startDate) {
                    query.orderDate.$gte = new Date(startDate);
                }
                if (endDate) {
                    const endDateTime = new Date(endDate);
                    endDateTime.setHours(23, 59, 59, 999);
                    query.orderDate.$lte = endDateTime;
                }
            }

            // Amount range filter
            if (minAmount !== undefined || maxAmount !== undefined) {
                query['pricing.total'] = {};
                if (minAmount !== undefined) {
                    query['pricing.total'].$gte = parseFloat(minAmount);
                }
                if (maxAmount !== undefined) {
                    query['pricing.total'].$lte = parseFloat(maxAmount);
                }
            }

            // Text search
            if (search) {
                query.$or = [
                    { orderId: new RegExp(search, 'i') },
                    { 'customer.name': new RegExp(search, 'i') },
                    { 'customer.phone': new RegExp(search, 'i') }
                ];
            }

            // Build base query
            let orderQuery = Order.find(query)
                .sort(sortBy)
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .select('-__v');

            // Populate references if requested
            if (populate) {
                orderQuery = orderQuery
                    .populate('customer.userId', 'name email phone')
                    .populate('restaurant.restaurantId', 'name address phone')
                    .populate('items.foodItem', 'name category image');
            }

            const orders = await orderQuery;
            const total = await Order.countDocuments(query);

            return {
                data: orders,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit),
                    hasMore: skip + orders.length < total
                }
            };
        } catch (error) {
            throw new Error(`Error fetching orders: ${error.message}`);
        }
    }

    /**
     * Get order by ID
     */
    async getOrderById(orderId, populate = true) {
        try {
            let query = Order.findOne({ orderId }).select('-__v');

            if (populate) {
                query = query
                    .populate('customer.userId', 'name email phone')
                    .populate('restaurant.restaurantId', 'name address phone rating')
                    .populate('items.foodItem', 'name category image price')
                    .populate('tracking.deliveryPartner.partnerId', 'name phone vehicleNumber');
            }

            const order = await query;

            if (!order) {
                throw new Error('Order not found');
            }

            return order;
        } catch (error) {
            throw new Error(`Error fetching order: ${error.message}`);
        }
    }

    /**
     * Get orders by customer
     */
    async getOrdersByCustomer(customerId, filters = {}) {
        try {
            const { limit = 20, skip = 0, orderStatus } = filters;

            const query = {
                'customer.userId': customerId,
                isActive: true
            };

            if (orderStatus) {
                query.orderStatus = orderStatus;
            }

            const orders = await Order.find(query)
                .sort('-orderDate')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .populate('restaurant.restaurantId', 'name address')
                .select('-__v');

            const total = await Order.countDocuments(query);

            return {
                data: orders,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching customer orders: ${error.message}`);
        }
    }

    /**
     * Get orders by restaurant
     */
    async getOrdersByRestaurant(restaurantId, filters = {}) {
        try {
            const { limit = 20, skip = 0, orderStatus, dateRange } = filters;

            const query = {
                'restaurant.restaurantId': restaurantId,
                isActive: true
            };

            if (orderStatus && orderStatus !== 'all') {
                query.orderStatus = orderStatus;
            }

            // Date range filtering
            if (dateRange) {
                const now = new Date();
                if (dateRange === 'today') {
                    const todayStart = new Date(now.setHours(0, 0, 0, 0));
                    query.orderDate = { $gte: todayStart };
                } else if (dateRange === 'week') {
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay());
                    weekStart.setHours(0, 0, 0, 0);
                    query.orderDate = { $gte: weekStart };
                }
            }

            const orders = await Order.find(query)
                .sort('-orderDate')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .populate('customer.userId', 'name phone')
                .select('-__v');

            const total = await Order.countDocuments(query);

            return {
                data: orders,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error fetching restaurant orders: ${error.message}`);
        }
    }

    /**
     * Update order
     */
    async updateOrder(orderId, data, userId = null) {
        try {
            const order = await Order.findOne({ orderId });

            if (!order) {
                throw new Error('Order not found');
            }

            // Prevent updating completed or cancelled orders
            if (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') {
                throw new Error('Cannot update completed or cancelled orders');
            }

            // Update allowed fields
            const allowedUpdates = [
                'customer',
                'delivery',
                'notes',
                'specialRequests',
                'orderStatus',
                'payment',
                'tracking'
            ];

            allowedUpdates.forEach(field => {
                if (data[field] !== undefined) {
                    if (typeof data[field] === 'object' && !Array.isArray(data[field])) {
                        order[field] = { ...order[field], ...data[field] };
                    } else {
                        order[field] = data[field];
                    }
                }
            });

            // Add updated by
            if (userId) {
                order.updatedBy = userId;
            }

            const updatedOrder = await order.save();

            return updatedOrder;
        } catch (error) {
            throw new Error(`Error updating order: ${error.message}`);
        }
    }

    /**
     * Update order status
     */
    async updateOrderStatus(orderId, status, note = '', userId = null) {
        try {
            const order = await Order.findOne({ orderId });

            if (!order) {
                throw new Error('Order not found');
            }

            await order.updateStatus(status, note, userId);

            return order;
        } catch (error) {
            throw new Error(`Error updating order status: ${error.message}`);
        }
    }

    /**
     * Update payment status
     */
    async updatePaymentStatus(orderId, paymentStatus, transactionId = null, userId = null) {
        try {
            const order = await Order.findOne({ orderId });

            if (!order) {
                throw new Error('Order not found');
            }

            order.payment.status = paymentStatus;
            
            if (transactionId) {
                order.payment.transactionId = transactionId;
            }

            if (paymentStatus === 'paid' && !order.payment.paidAt) {
                order.payment.paidAt = new Date();
            }

            if (userId) {
                order.updatedBy = userId;
            }

            await order.save();

            return order;
        } catch (error) {
            throw new Error(`Error updating payment status: ${error.message}`);
        }
    }

    /**
     * Cancel order
     */
    async cancelOrder(orderId, reason, userId = null) {
        try {
            const order = await Order.findOne({ orderId });

            if (!order) {
                throw new Error('Order not found');
            }

            await order.cancelOrder(reason, userId);

            // Restore food quantities if items were decremented
            if (order.items && order.items.length > 0) {
                for (let item of order.items) {
                    if (item.foodItem) {
                        await Food.findByIdAndUpdate(
                            item.foodItem,
                            {
                                $inc: {
                                    availableQuantity: item.quantity,
                                    orderCount: -item.quantity
                                }
                            }
                        );
                    }
                }
            }

            return order;
        } catch (error) {
            throw new Error(`Error cancelling order: ${error.message}`);
        }
    }

    /**
     * Process refund
     */
    async processRefund(orderId, amount = null, userId = null) {
        try {
            const order = await Order.findOne({ orderId });

            if (!order) {
                throw new Error('Order not found');
            }

            await order.processRefund(amount, userId);

            return order;
        } catch (error) {
            throw new Error(`Error processing refund: ${error.message}`);
        }
    }

    /**
     * Delete order (soft delete)
     */
    async deleteOrder(orderId, userId = null) {
        try {
            const order = await Order.findOne({ orderId });

            if (!order) {
                throw new Error('Order not found');
            }

            order.isActive = false;
            
            if (userId) {
                order.updatedBy = userId;
            }

            await order.save();

            return {
                message: 'Order deleted successfully',
                data: order
            };
        } catch (error) {
            throw new Error(`Error deleting order: ${error.message}`);
        }
    }

    /**
     * Delete order permanently
     */
    async permanentlyDeleteOrder(orderId) {
        try {
            const order = await Order.findOneAndDelete({ orderId });

            if (!order) {
                throw new Error('Order not found');
            }

            return {
                message: 'Order permanently deleted',
                data: order
            };
        } catch (error) {
            throw new Error(`Error permanently deleting order: ${error.message}`);
        }
    }

    /**
     * Bulk update orders
     */
    async bulkUpdateOrders(orderIds, updateData) {
        try {
            const result = await Order.updateMany(
                { orderId: { $in: orderIds } },
                { $set: updateData }
            );

            return {
                matchedCount: result.matchedCount,
                modifiedCount: result.modifiedCount,
                message: `${result.modifiedCount} orders updated successfully`
            };
        } catch (error) {
            throw new Error(`Error bulk updating orders: ${error.message}`);
        }
    }

    /**
     * Get order statistics
     */
    async getOrderStats(filters = {}) {
        try {
            const { restaurantId, customerId, dateRange } = filters;

            const matchQuery = { isActive: true };

            if (restaurantId) {
                matchQuery['restaurant.restaurantId'] = restaurantId;
            }
            if (customerId) {
                matchQuery['customer.userId'] = customerId;
            }

            // Date range filtering
            if (dateRange) {
                const now = new Date();
                if (dateRange === 'today') {
                    const todayStart = new Date(now.setHours(0, 0, 0, 0));
                    matchQuery.orderDate = { $gte: todayStart };
                } else if (dateRange === 'week') {
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay());
                    weekStart.setHours(0, 0, 0, 0);
                    matchQuery.orderDate = { $gte: weekStart };
                } else if (dateRange === 'month') {
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    matchQuery.orderDate = { $gte: monthStart };
                }
            }

            const stats = await Order.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: null,
                        totalOrders: { $sum: 1 },
                        pendingOrders: {
                            $sum: {
                                $cond: [
                                    { $in: ['$orderStatus', ['pending', 'confirmed', 'preparing']] },
                                    1,
                                    0
                                ]
                            }
                        },
                        completedOrders: {
                            $sum: {
                                $cond: [{ $eq: ['$orderStatus', 'delivered'] }, 1, 0]
                            }
                        },
                        cancelledOrders: {
                            $sum: {
                                $cond: [{ $eq: ['$orderStatus', 'cancelled'] }, 1, 0]
                            }
                        },
                        totalRevenue: { $sum: '$pricing.total' },
                        averageOrderValue: { $avg: '$pricing.total' },
                        totalTax: { $sum: '$pricing.tax' },
                        totalDeliveryFees: { $sum: '$pricing.deliveryFee' },
                        totalTips: { $sum: '$pricing.tip' },
                        paidOrders: {
                            $sum: {
                                $cond: [{ $eq: ['$payment.status', 'paid'] }, 1, 0]
                            }
                        },
                        unpaidOrders: {
                            $sum: {
                                $cond: [{ $eq: ['$payment.status', 'pending'] }, 1, 0]
                            }
                        },
                        refundedAmount: { $sum: '$payment.refundAmount' }
                    }
                }
            ]);

            return stats[0] || {
                totalOrders: 0,
                pendingOrders: 0,
                completedOrders: 0,
                cancelledOrders: 0,
                totalRevenue: 0,
                averageOrderValue: 0,
                totalTax: 0,
                totalDeliveryFees: 0,
                totalTips: 0,
                paidOrders: 0,
                unpaidOrders: 0,
                refundedAmount: 0
            };
        } catch (error) {
            throw new Error(`Error fetching order statistics: ${error.message}`);
        }
    }

    /**
     * Get revenue statistics
     */
    async getRevenueStats(filters = {}) {
        try {
            const { restaurantId, dateRange = 'month' } = filters;

            const matchQuery = {
                isActive: true,
                'payment.status': 'paid'
            };

            if (restaurantId) {
                matchQuery['restaurant.restaurantId'] = restaurantId;
            }

            // Date range
            const now = new Date();
            if (dateRange === 'today') {
                const todayStart = new Date(now.setHours(0, 0, 0, 0));
                matchQuery.orderDate = { $gte: todayStart };
            } else if (dateRange === 'week') {
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                weekStart.setHours(0, 0, 0, 0);
                matchQuery.orderDate = { $gte: weekStart };
            } else if (dateRange === 'month') {
                const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                matchQuery.orderDate = { $gte: monthStart };
            }

            const revenue = await Order.aggregate([
                { $match: matchQuery },
                {
                    $group: {
                        _id: {
                            date: { $dateToString: { format: '%Y-%m-%d', date: '$orderDate' } }
                        },
                        totalRevenue: { $sum: '$pricing.total' },
                        orderCount: { $sum: 1 },
                        averageOrderValue: { $avg: '$pricing.total' }
                    }
                },
                { $sort: { '_id.date': 1 } }
            ]);

            return revenue;
        } catch (error) {
            throw new Error(`Error fetching revenue statistics: ${error.message}`);
        }
    }

    /**
     * Get popular items from orders
     */
    async getPopularItems(limit = 10, restaurantId = null) {
        try {
            const matchQuery = {
                isActive: true,
                orderStatus: 'delivered'
            };

            if (restaurantId) {
                matchQuery['restaurant.restaurantId'] = restaurantId;
            }

            const popularItems = await Order.aggregate([
                { $match: matchQuery },
                { $unwind: '$items' },
                {
                    $group: {
                        _id: '$items.foodId',
                        name: { $first: '$items.name' },
                        category: { $first: '$items.category' },
                        totalOrders: { $sum: '$items.quantity' },
                        totalRevenue: { $sum: '$items.subtotal' }
                    }
                },
                { $sort: { totalOrders: -1 } },
                { $limit: parseInt(limit) }
            ]);

            return popularItems;
        } catch (error) {
            throw new Error(`Error fetching popular items: ${error.message}`);
        }
    }

    /**
     * Search orders
     */
    async searchOrders(searchTerm, filters = {}) {
        try {
            const { limit = 20, skip = 0 } = filters;

            const query = {
                $or: [
                    { orderId: new RegExp(searchTerm, 'i') },
                    { 'customer.name': new RegExp(searchTerm, 'i') },
                    { 'customer.phone': new RegExp(searchTerm, 'i') },
                    { 'customer.email': new RegExp(searchTerm, 'i') }
                ],
                isActive: true
            };

            const orders = await Order.find(query)
                .sort('-orderDate')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .populate('restaurant.restaurantId', 'name')
                .select('-__v');

            const total = await Order.countDocuments(query);

            return {
                data: orders,
                pagination: {
                    limit: parseInt(limit),
                    skip: parseInt(skip),
                    total: total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Error searching orders: ${error.message}`);
        }
    }
}

module.exports = new OrderService();