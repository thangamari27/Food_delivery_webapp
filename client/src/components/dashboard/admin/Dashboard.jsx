import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardContent } from "@/utils/constant/admin/AdminDashboard";
import { dashboardStyles } from "@/utils/styles/AdminStyle";
import { 
  fetchDashboardStats,
  fetchPerformanceMetrics,
  fetchWeeklyOrders,
  fetchRevenueComparison,
  fetchCustomerMap
} from './features/dashboard/adminDashboardSlice';
import Title from '@/components/common/Title';
import StatCard from "./features/dashboard/StatCard";
import PerformanceMetrics from "./features/dashboard/PerformanceMetrics";
import WeeklyOrdersChart from "./features/dashboard/WeeklyOrdersChart";
import RevenueComparisonChart from "./features/dashboard/RevenueComparisonChart";
import CustomerMapChart from "./features/dashboard/CustomerMapChart";
import { RefreshCw, AlertCircle } from 'lucide-react';

function Dashboard() {
  const dispatch = useDispatch();
  const content = dashboardContent;
  const styles = dashboardStyles;

  const { 
    stats,
    performanceMetrics,
    weeklyOrders,
    revenueComparison,
    customerMap,
    loading,
    error,
    lastUpdated
  } = useSelector(state => state.dashboard);

  /**
   * Load dashboard data on mount
   */
  useEffect(() => {
    loadDashboardData();
  }, []);

  /**
   * Load all dashboard data
   */
  const loadDashboardData = () => {
    dispatch(fetchDashboardStats());
    dispatch(fetchPerformanceMetrics('daily'));
    dispatch(fetchWeeklyOrders('daily'));
    dispatch(fetchRevenueComparison('monthly'));
    dispatch(fetchCustomerMap('weekly'));
  };

  /**
   * Refresh dashboard manually
   */
  const handleRefresh = () => {
    loadDashboardData();
  };

  return (
    <section className={styles.container}>
      {/* Header with Refresh Button */}
      <div className={styles.headerSection}>
        <div className="flex items-center justify-between w-full">
          <Title 
            title={content.header.title} 
            titleStyle={styles.headerTitle} 
            highlightedText={content.header.highlightText} 
            highlightedTextStyle={styles.headerHighlight} 
          />
          
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh dashboard data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
        
        {/* Last Updated Timestamp */}
        {lastUpdated && !loading && (
          <div className="mt-2 text-xs text-gray-500">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className={`${styles.gridLayout} ${styles.gridGap} mb-6`}>
        {stats.map((stat, index) => (
          <StatCard 
            key={index} 
            stats={stat} 
            styles={styles}
            loading={loading}
          />
        ))}
      </div>

      {/* Performance Metrics & Weekly Orders */}
      <div className={`${styles.grid2Col} ${styles.gridGap} mb-6`}>
        <PerformanceMetrics 
          content={performanceMetrics} 
          styles={styles}
          dispatch={dispatch}
        />
        <WeeklyOrdersChart 
          dashboardData={weeklyOrders} 
          styles={styles}
          dispatch={dispatch}
        />
      </div>

      {/* Revenue Comparison & Customer Map */}
      <div className={`${styles.grid2Col} ${styles.gridGap}`}>
        <RevenueComparisonChart 
          dashboardData={revenueComparison} 
          styles={styles}
          dispatch={dispatch}
        />
        <CustomerMapChart 
          dashboardData={customerMap} 
          styles={styles}
          dispatch={dispatch}
        />
      </div>
    </section>
  );
}

export default Dashboard;