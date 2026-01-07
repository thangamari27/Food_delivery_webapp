import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../components/dashboard/admin/features/dashboard/adminDashboardSlice'

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
    },
})