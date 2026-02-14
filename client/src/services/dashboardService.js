import api from './api';
import orderService from './orderservice';
import foodService from './foodservice';
import customerService from './customerService';

class DashboardService {
  /**
   * Fetch all dashboard statistics
   * Aggregates data from multiple endpoints
   */
  async getDashboardStats(params = {}) {
    try {
      // Fetch all stats in parallel for better performance
      const [orderStats, foodStats, customerStats, revenueData] = await Promise.all([
        orderService.getStats(params),
        foodService.getStats(params),
        customerService.getStatistics(),
        orderService.getRevenue({ dateRange: params.dateRange || 'month' })
      ]);

      return {
        success: true,
        data: {
          orders: orderStats.data || {},
          foods: foodStats.data || {},
          customers: customerStats.data || {},
          revenue: revenueData.data || []
        }
      };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Get performance metrics data
   */
  async getPerformanceMetrics(dateRange = 'daily') {
    try {
      const response = await orderService.getStats({ dateRange });
      return {
        success: true,
        data: response.data || {}
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get orders analytics (weekly, monthly, etc.)
   */
  async getOrdersAnalytics(period = 'daily') {
    try {
      const response = await orderService.getRevenue({ dateRange: period });
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get revenue comparison data
   */
  async getRevenueComparison(period = 'monthly') {
    try {
      const response = await orderService.getRevenue({ dateRange: period });
      return {
        success: true,
        data: response.data || []
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get customer map data
   */
  async getCustomerMap(period = 'weekly') {
    try {
      const response = await customerService.getStatistics();
      return {
        success: true,
        data: response.data || {}
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Error handler
   */
  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     'Server error occurred';
      const err = new Error(message);
      err.status = error.response.status;
      return err;
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export default new DashboardService();