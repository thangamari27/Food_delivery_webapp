const User = require('../models/auth.model');
const ApiError = require('../utils/ApiError');

class CustomerService {
  /**
   * Get all users with filtering, sorting, and pagination
   * For admin dashboard
   */
  async getAllUsers(options = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      role = 'all',
      status = 'all',
      sortBy = 'newest',
      startDate,
      endDate
    } = options;

    const query = {};

    // Search filter (name, email, username, user_id)
    if (search && search.trim()) {
      query.$or = [
        { fullname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { user_id: { $regex: search, $options: 'i' } }
      ];
    }

    // Role filter
    if (role && role !== 'all') {
      query.role = role;
    }

    // Status filter
    if (status === 'active') {
      query.is_active = true;
    } else if (status === 'inactive') {
      query.is_active = false;
    } else if (status === 'verified') {
      query.email_verified = true;
    } else if (status === 'unverified') {
      query.email_verified = false;
    }

    // Date range filter
    if (startDate || endDate) {
      query.created_at = {};
      if (startDate) query.created_at.$gte = new Date(startDate);
      if (endDate) query.created_at.$lte = new Date(endDate);
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'newest':
        sort = { created_at: -1 };
        break;
      case 'oldest':
        sort = { created_at: 1 };
        break;
      case 'name-asc':
        sort = { fullname: 1 };
        break;
      case 'name-desc':
        sort = { fullname: -1 };
        break;
      case 'recent-login':
        sort = { last_login: -1 };
        break;
      default:
        sort = { created_at: -1 };
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password -refresh_tokens -reset_password_token -email_verification_token')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(query)
    ]);

    return {
      users: users.map(u => this.sanitizeUser(u)),
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_items: total,
        items_per_page: parseInt(limit),
        has_next: page * limit < total,
        has_prev: page > 1
      }
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(id) {
    let user;

    // Try MongoDB _id first, then user_id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(id)
        .select('-password -refresh_tokens -reset_password_token -email_verification_token');
    } else {
      user = await User.findOne({ user_id: id })
        .select('-password -refresh_tokens -reset_password_token -email_verification_token');
    }

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return this.sanitizeUser(user);
  }

  /**
   * Update user (admin can update any user)
   */
  async updateUser(id, updateData, adminId) {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Prevent admin from updating their own critical fields accidentally
    if (user._id.toString() === adminId) {
      if (updateData.role && updateData.role !== 'admin') {
        throw new ApiError(400, 'Cannot change your own admin role');
      }
      if (updateData.is_active === false) {
        throw new ApiError(400, 'Cannot deactivate your own account');
      }
    }

    // Fields that can be updated by admin
    const allowedUpdates = [
      'fullname',
      'phone',
      'address',
      'role',
      'is_active',
      'is_verified',
      'email_verified'
    ];

    // Check if email is being updated (requires special handling)
    if (updateData.email && updateData.email !== user.email) {
      const existingEmail = await User.findOne({ 
        email: updateData.email.toLowerCase(),
        _id: { $ne: id }
      });
      
      if (existingEmail) {
        throw new ApiError(409, 'Email already exists');
      }
      
      user.email = updateData.email.toLowerCase();
      // Reset email verification if email changed
      user.email_verified = false;
    }

    // Check if username is being updated
    if (updateData.username && updateData.username !== user.username) {
      const existingUsername = await User.findOne({ 
        username: updateData.username.toLowerCase(),
        _id: { $ne: id }
      });
      
      if (existingUsername) {
        throw new ApiError(409, 'Username already exists');
      }
      
      user.username = updateData.username.toLowerCase();
    }

    // Update allowed fields
    allowedUpdates.forEach(field => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    user.updated_at = new Date();
    await user.save({ validateBeforeSave: false });

    // Sync with Customer if exists
    try {
      
      const customer = await User.findOne({ user_id: user._id });
      
      if (customer) {
        customer.name = user.fullname;
        customer.email = user.email;
        customer.phone = user.phone || customer.phone;
        customer.address = user.address || customer.address;
        
        // Sync status
        if (updateData.is_active === false) {
          customer.status = 'blocked';
        } else if (updateData.is_active === true && customer.status === 'blocked') {
          customer.status = 'active';
        }
        
        await customer.save();
      }
    } catch (error) {
      console.error('Error syncing user to customer:', error);
      // Don't fail the user update if customer sync fails
    }

    return this.sanitizeUser(user);
  }

  /**
   * Delete user (soft delete by deactivating)
   */
  async deleteUser(id, adminId) {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === adminId) {
      throw new ApiError(400, 'Cannot delete your own account');
    }

    // Soft delete - deactivate instead of removing
    user.is_active = false;
    user.updated_at = new Date();
    await user.save();

    // Also update customer status if exists
    try {
      
      await User.updateOne(
        { user_id: user._id },
        { status: 'inactive' }
      );
    } catch (error) {
      console.error('Error updating customer status:', error);
    }

    return {
      message: 'User deactivated successfully',
      user_id: user.user_id
    };
  }

  /**
   * Permanently delete user (hard delete)
   * Only for users without orders/activity
   */
  async permanentlyDeleteUser(id, adminId) {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === adminId) {
      throw new ApiError(400, 'Cannot delete your own account');
    }

    // Check if user has customer record with orders
    try {
      const customer = await User.findOne({ user_id: user._id });
      
      if (customer && customer.total_orders > 0) {
        throw new ApiError(400, 'Cannot delete user with order history. Use deactivate instead.');
      }

      // Delete customer record if exists and no orders
      if (customer) {
        await customer.deleteOne();
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error('Error checking customer:', error);
    }

    // Permanently delete user
    await user.deleteOne();

    return {
      message: 'User permanently deleted',
      user_id: user.user_id
    };
  }

  /**
   * Get dashboard statistics
   */
  async getStatistics() {
    const [
      total,
      activeUsers,
      inactiveUsers,
      verifiedUsers,
      totalAdmins,
      totalCustomers,
      totalRestaurantOwners,
      totalDeliveryPartners,
      newUsersThisWeek,
      newUsersThisMonth
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ is_active: true }),
      User.countDocuments({ is_active: false }),
      User.countDocuments({ email_verified: true }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ role: 'customer' }),
      User.countDocuments({ role: 'restaurant_owner' }),
      User.countDocuments({ role: 'delivery_partner' }),
      User.countDocuments({ 
        created_at: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } 
      }),
      User.countDocuments({ 
        created_at: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } 
      })
    ]);

    return {
      overview: {
        total,
        active: activeUsers,
        inactive: inactiveUsers,
        verified: verifiedUsers,
        unverified: total - verifiedUsers
      },
      by_role: {
        admin: totalAdmins,
        customer: totalCustomers,
        restaurant_owner: totalRestaurantOwners,
        delivery_partner: totalDeliveryPartners
      },
      growth: {
        this_week: newUsersThisWeek,
        this_month: newUsersThisMonth
      }
    };
  }

  /**
   * Bulk update user status
   */
  async bulkUpdateStatus(userIds, isActive, adminId) {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      throw new ApiError(400, 'User IDs array is required');
    }

    // Don't allow admin to deactivate themselves
    const adminIdStr = adminId.toString();
    if (!isActive && userIds.some(id => id === adminIdStr)) {
      throw new ApiError(400, 'Cannot deactivate your own account');
    }

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { 
        is_active: isActive,
        updated_at: new Date()
      }
    );

    // Update corresponding customers
    try {
      
      await User.updateMany(
        { user_id: { $in: userIds } },
        { status: isActive ? 'active' : 'inactive' }
      );
    } catch (error) {
      console.error('Error updating customers:', error);
    }

    return {
      message: `${result.modifiedCount} users updated successfully`,
      modified_count: result.modifiedCount
    };
  }

  /**
   * Search users
   */
  async searchUsers(searchText, limit = 10) {
    if (!searchText || !searchText.trim()) {
      throw new ApiError(400, 'Search text is required');
    }

    const users = await User.find({
      $or: [
        { fullname: { $regex: searchText, $options: 'i' } },
        { email: { $regex: searchText, $options: 'i' } },
        { username: { $regex: searchText, $options: 'i' } },
        { user_id: { $regex: searchText, $options: 'i' } }
      ]
    })
    .select('-password -refresh_tokens -reset_password_token -email_verification_token')
    .limit(limit)
    .lean();

    return users.map(u => this.sanitizeUser(u));
  }

  /**
   * Sanitize user object for admin view
   */
  sanitizeUser(user) {
    const sanitized = user.toObject ? user.toObject() : user;
    
    // Remove sensitive fields
    delete sanitized.password;
    delete sanitized.refresh_tokens;
    delete sanitized.reset_password_token;
    delete sanitized.reset_password_expires;
    delete sanitized.email_verification_token;
    delete sanitized.email_verification_expires;
    delete sanitized.__v;
    
    // Format dates
    if (sanitized.created_at) {
      sanitized.created = sanitized.created_at;
    }
    if (sanitized.last_login) {
      sanitized.lastLogin = sanitized.last_login;
    }
    
    // Rename _id to id
    if (sanitized._id) {
      sanitized.id = sanitized._id.toString();
      delete sanitized._id;
    }

    return sanitized;
  }
}

module.exports = new CustomerService();