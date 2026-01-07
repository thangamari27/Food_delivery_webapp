import { createSlice } from '@reduxjs/toolkit'
import { dashboardContent } from '../../../../../utils/constant/admin/AdminDashboard'

const initialState = {
    stats: dashboardContent.stats,
    performanceMetrics: dashboardContent.performanceMetrics,
    weeklyOrders: dashboardContent.weeklyOrders,
    revenueComparison: dashboardContent.revenueComparison,
    customerMap: dashboardContent.customerMap,
    loading: false,
    error: null,
}


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers : {
      setDashboardData(state, action){
        return { ...state, ...action.payload }
      },
      setDashboardLoading(state, action){
        state.loading = action.payload;
      },
    },
})

export const { 
    setDashboardData, 
    setDashboardLoading 
} = dashboardSlice.actions;

export default dashboardSlice.reducer;