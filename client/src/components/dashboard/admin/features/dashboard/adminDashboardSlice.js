import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardContent } from '../../../../../utils/constant/admin/AdminDashboard';
import dashboardService from '../../../../../services/dashboardService';
import { DashboardTransformer } from '../../../../../utils/handler/admin/dashboardTransformer';

// Fetch all dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getDashboardStats(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch performance metrics
export const fetchPerformanceMetrics = createAsyncThunk(
  'dashboard/fetchPerformanceMetrics',
  async (dateRange = 'daily', { rejectWithValue }) => {
    try {
      const response = await dashboardService.getPerformanceMetrics(dateRange);

      return { data: response.data, dateRange };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch weekly orders
export const fetchWeeklyOrders = createAsyncThunk(
  'dashboard/fetchWeeklyOrders',
  async (period = 'daily', { rejectWithValue }) => {
    try {
      const response = await dashboardService.getOrdersAnalytics(period);

      return { data: response.data, period };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch revenue comparison
export const fetchRevenueComparison = createAsyncThunk(
  'dashboard/fetchRevenueComparison',
  async (period = 'monthly', { rejectWithValue }) => {
    try {
      const response = await dashboardService.getRevenueComparison(period);

      return { data: response.data, period };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch customer map
export const fetchCustomerMap = createAsyncThunk(
  'dashboard/fetchCustomerMap',
  async (period = 'weekly', { rejectWithValue }) => {
    try {
      const response = await dashboardService.getCustomerMap();

      return { data: response.data, period };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    // Stats cards
    stats: dashboardContent.stats,
    
    // Performance metrics
    performanceMetrics: {
      ...dashboardContent.performanceMetrics,
      loading: false,
      error: null
    },
    
    // Weekly orders
    weeklyOrders: {
      ...dashboardContent.weeklyOrders,
      loading: false,
      error: null
    },
    
    // Revenue comparison
    revenueComparison: {
      ...dashboardContent.revenueComparison,
      loading: false,
      error: null
    },
    
    // Customer map
    customerMap: {
      ...dashboardContent.customerMap,
      loading: false,
      error: null
    },
    
    // Global loading and error
    loading: false,
    error: null,
    
    // Last updated timestamp
    lastUpdated: null
}


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Manual data setters (for backward compatibility)
    setDashboardData(state, action) {
      return { ...state, ...action.payload };
    },
    
    setDashboardLoading(state, action) {
      state.loading = action.payload;
    },
    
    clearDashboardError(state) {
      state.error = null;
    },
    
    // Reset to static content
    resetToStaticContent(state) {
      return { ...initialState };
    }
  },
  
  extraReducers: (builder) => {
    /**
     * Fetch Dashboard Stats
     */
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
        
        // Transform and update stats
        const transformedStats = DashboardTransformer.transformStatsCards(action.payload);
        state.stats = transformedStats;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep static content on error
      });

    /**
     * Fetch Performance Metrics
     */
    builder
      .addCase(fetchPerformanceMetrics.pending, (state) => {
        state.performanceMetrics.loading = true;
        state.performanceMetrics.error = null;
      })
      .addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
        state.performanceMetrics.loading = false;
        
        const { data, dateRange } = action.payload;
        const transformed = DashboardTransformer.transformPerformanceMetrics(data, dateRange);
        
        // Merge with existing data
        state.performanceMetrics = {
          ...state.performanceMetrics,
          ...transformed,
          loading: false
        };
      })
      .addCase(fetchPerformanceMetrics.rejected, (state, action) => {
        state.performanceMetrics.loading = false;
        state.performanceMetrics.error = action.payload;
      });

    /**
     * Fetch Weekly Orders
     */
    builder
      .addCase(fetchWeeklyOrders.pending, (state) => {
        state.weeklyOrders.loading = true;
        state.weeklyOrders.error = null;
      })
      .addCase(fetchWeeklyOrders.fulfilled, (state, action) => {
        state.weeklyOrders.loading = false;
        
        const { data, period } = action.payload;
        const transformed = DashboardTransformer.transformWeeklyOrders(data, period);
        
        state.weeklyOrders = {
          ...state.weeklyOrders,
          ...transformed,
          loading: false
        };
      })
      .addCase(fetchWeeklyOrders.rejected, (state, action) => {
        state.weeklyOrders.loading = false;
        state.weeklyOrders.error = action.payload;
      });

    /**
     * Fetch Revenue Comparison
     */
    builder
      .addCase(fetchRevenueComparison.pending, (state) => {
        state.revenueComparison.loading = true;
        state.revenueComparison.error = null;
      })
      .addCase(fetchRevenueComparison.fulfilled, (state, action) => {
        state.revenueComparison.loading = false;
        
        const { data, period } = action.payload;
        const transformed = DashboardTransformer.transformRevenueComparison(data, period);
        
        state.revenueComparison = {
          ...state.revenueComparison,
          ...transformed,
          loading: false
        };
      })
      .addCase(fetchRevenueComparison.rejected, (state, action) => {
        state.revenueComparison.loading = false;
        state.revenueComparison.error = action.payload;
      });

    /**
     * Fetch Customer Map
     */
    builder
      .addCase(fetchCustomerMap.pending, (state) => {
        state.customerMap.loading = true;
        state.customerMap.error = null;
      })
      .addCase(fetchCustomerMap.fulfilled, (state, action) => {
        state.customerMap.loading = false;
        
        const { data, period } = action.payload;
        const transformed = DashboardTransformer.transformCustomerMap(data, period);
        
        state.customerMap = {
          ...state.customerMap,
          ...transformed,
          loading: false
        };
      })
      .addCase(fetchCustomerMap.rejected, (state, action) => {
        state.customerMap.loading = false;
        state.customerMap.error = action.payload;
      });
  }
});

export const { 
  setDashboardData, 
  setDashboardLoading,
  clearDashboardError,
  resetToStaticContent
} = dashboardSlice.actions;

export default dashboardSlice.reducer;