const customerService = require('../services/customerService');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class CustomerController {
  /**
   * Get all users with filters
   * @route GET /api/admin/users
   * @access Private (Admin only)
   */
  async getAllUsers(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        search = '',
        role = 'all',
        status = 'all',
        sortBy = 'newest',
        startDate,
        endDate
      } = req.query;

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        search,
        role,
        status,
        sortBy,
        startDate,
        endDate
      };

      const result = await customerService.getAllUsers(options);

      res.status(200).json(
        new ApiResponse(200, result, 'Users retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   * @route GET /api/admin/users/:id
   * @access Private (Admin only)
   */
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await customerService.getUserById(id);

      res.status(200).json(
        new ApiResponse(200, user, 'User retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user
   * @route PUT /api/admin/users/:id
   * @access Private (Admin only)
   */
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const adminId = req.user.userId;

      const user = await customerService.updateUser(id, updateData, adminId);

      res.status(200).json(
        new ApiResponse(200, user, 'User updated successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user (soft delete - deactivate)
   * @route DELETE /api/admin/users/:id
   * @access Private (Admin only)
   */
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const adminId = req.user.userId;

      const result = await customerService.deleteUser(id, adminId);

      res.status(200).json(
        new ApiResponse(200, result, result.message)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Permanently delete user
   * @route DELETE /api/admin/users/:id/permanent
   * @access Private (Admin only)
   */
  async permanentlyDeleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const adminId = req.user.userId;

      const result = await customerService.permanentlyDeleteUser(id, adminId);

      res.status(200).json(
        new ApiResponse(200, result, result.message)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get statistics
   * @route GET /api/admin/users/stats/overview
   * @access Private (Admin only)
   */
  async getStatistics(req, res, next) {
    try {
      const stats = await customerService.getStatistics();

      res.status(200).json(
        new ApiResponse(200, stats, 'Statistics retrieved successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Bulk update user status
   * @route PATCH /api/admin/users/bulk/status
   * @access Private (Admin only)
   */
  async bulkUpdateStatus(req, res, next) {
    try {
      const { userIds, isActive } = req.body;
      const adminId = req.user.userId;

      if (!userIds || isActive === undefined) {
        throw new ApiError(400, 'User IDs and status are required');
      }

      const result = await customerService.bulkUpdateStatus(
        userIds, 
        isActive, 
        adminId
      );

      res.status(200).json(
        new ApiResponse(200, result, result.message)
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Search users
   * @route GET /api/admin/users/search
   * @access Private (Admin only)
   */
  async searchUsers(req, res, next) {
    try {
      const { q, limit = 10 } = req.query;

      if (!q) {
        throw new ApiError(400, 'Search query is required');
      }

      const users = await customerService.searchUsers(q, parseInt(limit));

      res.status(200).json(
        new ApiResponse(200, { users }, 'Search completed successfully')
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Export users to CSV
   * @route GET /api/admin/users/export/csv
   * @access Private (Admin only)
   */
  async exportUsers(req, res, next) {
    try {
      const { role = 'all', status = 'all' } = req.query;

      // Get all users without pagination
      const result = await customerService.getAllUsers({
        page: 1,
        limit: 100000,
        role,
        status
      });

      const users = result.users;
      
      if (users.length === 0) {
        throw new ApiError(404, 'No users found to export');
      }

      // CSV headers
      const headers = [
        'User ID',
        'Name',
        'Username',
        'Email',
        'Phone',
        'Role',
        'Status',
        'Email Verified',
        'Social Provider',
        'Last Login',
        'Created At'
      ];

      // CSV rows
      const rows = users.map(user => [
        user.user_id,
        user.fullname,
        user.username,
        user.email,
        user.phone || '',
        user.role,
        user.is_active ? 'Active' : 'Inactive',
        user.email_verified ? 'Yes' : 'No',
        user.social_auth_provider || 'Email',
        user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
        new Date(user.created_at).toLocaleDateString()
      ]);

      // Create CSV content
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=users_${Date.now()}.csv`);
      
      res.status(200).send(csvContent);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();