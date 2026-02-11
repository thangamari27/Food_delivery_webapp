import api from "./api";

/**
 * Booking API Service
 * Handles all booking-related API calls
 */
class BookingService {
  /**
   * Create a new booking
   * @param {Object} bookingData - Booking details
   * @returns {Promise}
   */
  async createBooking(bookingData) {
    try {
      const response = await api.post('/api/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all bookings with filters
   * @param {Object} filters - Filter parameters
   * @returns {Promise}
   */
  async getAllBookings(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/api/bookings?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get booking by ID
   * @param {string} bookingId - Booking ID
   * @param {boolean} populate - Whether to populate references
   * @returns {Promise}
   */
  async getBookingById(bookingId, populate = true) {
    try {
      const response = await api.get(`/api/bookings/${bookingId}?populate=${populate}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get bookings by customer
   * @param {string} customerId - Customer ID
   * @param {Object} filters - Additional filters
   * @returns {Promise}
   */
  async getBookingsByCustomer(customerId, filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/api/bookings/customer/${customerId}?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get bookings by restaurant
   * @param {string} restaurantId - Restaurant ID
   * @param {Object} filters - Additional filters
   * @returns {Promise}
   */
  async getBookingsByRestaurant(restaurantId, filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/api/bookings/restaurant/${restaurantId}?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get my bookings (authenticated user)
   * @param {Object} filters - Filter parameters
   * @returns {Promise}
   */
  async getMyBookings(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/api/bookings/my-bookings?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update booking
   * @param {string} bookingId - Booking ID
   * @param {Object} updateData - Data to update
   * @returns {Promise}
   */
  async updateBooking(bookingId, updateData) {
    try {
      const response = await api.put(`/api/bookings/${bookingId}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Confirm booking
   * @param {string} bookingId - Booking ID
   * @returns {Promise}
   */
  async confirmBooking(bookingId) {
    try {
      const response = await api.patch(`/api/bookings/${bookingId}/confirm`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Complete booking
   * @param {string} bookingId - Booking ID
   * @returns {Promise}
   */
  async completeBooking(bookingId) {
    try {
      const response = await api.patch(`/api/bookings/${bookingId}/complete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel booking
   * @param {string} bookingId - Booking ID
   * @param {string} reason - Cancellation reason
   * @param {string} notes - Additional notes
   * @returns {Promise}
   */
  async cancelBooking(bookingId, reason, notes = '') {
    try {
      const response = await api.post(`/api/bookings/${bookingId}/cancel`, {
        reason,
        notes
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark booking as no show
   * @param {string} bookingId - Booking ID
   * @returns {Promise}
   */
  async markAsNoShow(bookingId) {
    try {
      const response = await api.patch(`/api/bookings/${bookingId}/no-show`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update admin notes
   * @param {string} bookingId - Booking ID
   * @param {string} adminNotes - Admin notes
   * @returns {Promise}
   */
  async updateAdminNotes(bookingId, adminNotes) {
    try {
      const response = await api.patch(`/api/bookings/${bookingId}/notes`, {
        adminNotes
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete booking (soft delete)
   * @param {string} bookingId - Booking ID
   * @returns {Promise}
   */
  async deleteBooking(bookingId) {
    try {
      const response = await api.delete(`/api/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete booking permanently
   * @param {string} bookingId - Booking ID
   * @returns {Promise}
   */
  async permanentlyDeleteBooking(bookingId) {
    try {
      const response = await api.delete(`/api/bookings/${bookingId}/permanent`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get booking statistics
   * @param {Object} filters - Filter parameters
   * @returns {Promise}
   */
  async getBookingStats(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/api/bookings/stats?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get bookings by date range (calendar view)
   * @param {string} startDate - Start date
   * @param {string} endDate - End date
   * @param {string} restaurantId - Restaurant ID (optional)
   * @returns {Promise}
   */
  async getBookingsByDateRange(startDate, endDate, restaurantId = null) {
    try {
      const params = new URLSearchParams({
        startDate,
        endDate
      });

      if (restaurantId) {
        params.append('restaurantId', restaurantId);
      }

      const response = await api.get(`/api/bookings/calendar?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check availability
   * @param {Object} availabilityData - Availability check parameters
   * @returns {Promise}
   */
  async checkAvailability(availabilityData) {
    try {
      const response = await api.post('/api/bookings/check-availability', availabilityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get upcoming bookings
   * @param {string} restaurantId - Restaurant ID (optional)
   * @param {number} limit - Limit number of results
   * @returns {Promise}
   */
  async getUpcomingBookings(restaurantId = null, limit = 10) {
    try {
      const params = new URLSearchParams({ limit });

      if (restaurantId) {
        params.append('restaurantId', restaurantId);
      }

      const response = await api.get(`/api/bookings/upcoming?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search bookings
   * @param {string} searchQuery - Search query
   * @param {Object} filters - Additional filters
   * @returns {Promise}
   */
  async searchBookings(searchQuery, filters = {}) {
    try {
      const params = new URLSearchParams({ q: searchQuery });
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/api/bookings/search?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Bulk update bookings
   * @param {Array} bookingIds - Array of booking IDs
   * @param {Object} updateData - Data to update
   * @returns {Promise}
   */
  async bulkUpdateBookings(bookingIds, updateData) {
    try {
      const response = await api.patch('/api/bookings/bulk', {
        bookingIds,
        updateData
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new BookingService();