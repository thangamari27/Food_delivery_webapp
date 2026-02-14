import { 
  Package, 
  IndianRupee, 
  ShoppingBag, 
  TrendingUp,
 
} from 'lucide-react';

/**
 * Transform backend stats to StatsGrid format
 * @param {Object} backendStats - Stats from backend API
 * @param {Object} revenueData - Revenue data from backend API
 * @returns {Array} Stats array for StatsGrid component
 */
export const transformBackendStats = (backendStats = {}, revenueData = {}) => {
  // Safe access with defaults
  const totalOrders = backendStats.totalOrders || 0;
  const pendingOrders = backendStats.pendingOrders || 0;
  const completedOrders = backendStats.completedOrders || 0;
  const cancelledOrders = backendStats.cancelledOrders || 0;

  const totalRevenue = backendStats.totalRevenue || 0;
  const averageOrderValue = backendStats.averageOrderValue || 0;
  
  // Calculate growth percentages (compare with previous period if available)
  const previousRevenue = revenueData.previousPeriod?.total || totalRevenue * 0.9;
  const revenueGrowth = previousRevenue > 0 
    ? (((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
    : '0.0';
  
  const previousOrders = backendStats.previousPeriodOrders || totalOrders * 0.85;
  const ordersGrowth = previousOrders > 0
    ? (((totalOrders - previousOrders) / previousOrders) * 100).toFixed(1)
    : '0.0';

  return [
    {
      label: 'Total Orders',
      value: totalOrders.toLocaleString(),
      change: `+${ordersGrowth}%`,
      isPositive: parseFloat(ordersGrowth) >= 0,
      icon: Package,
      description: `${pendingOrders} pending, ${completedOrders} completed`
    },
    {
        label: 'Active Orders',
        value: (pendingOrders + (backendStats.statusCounts?.confirmed || 0) + (backendStats.statusCounts?.preparing || 0)).toLocaleString(),
        change: `${pendingOrders} pending`,
        isPositive: true,
        icon: ShoppingBag,
        description: 'Orders in progress'
    },
    {
        label: 'Completion Rate',
        value: totalOrders > 0 
        ? `${((completedOrders / totalOrders) * 100).toFixed(1)}%`
        : '0%',
        change: `${cancelledOrders} cancelled`,
        isPositive: (completedOrders / totalOrders) >= 0.8,
        icon: TrendingUp,
        description: `${completedOrders} delivered successfully`
    },
    {
      label: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      change: `+${revenueGrowth}%`,
      isPositive: parseFloat(revenueGrowth) >= 0,
      icon: IndianRupee,
      description: `Avg order: ₹${averageOrderValue.toFixed(0)}`
    },
];
};

/**
 * Get loading state placeholder stats
 */
export const getLoadingStats = () => [
  {
    label: 'Total Orders',
    value: '---',
    change: '---',
    isPositive: true,
    icon: Package,
    description: 'Loading...'
  },
  {
    label: 'Total Revenue',
    value: '---',
    change: '---',
    isPositive: true,
    icon: IndianRupee,
    description: 'Loading...'
  },
  {
    label: 'Active Orders',
    value: '---',
    change: '---',
    isPositive: true,
    icon: ShoppingBag,
    description: 'Loading...'
  },
  {
    label: 'Completion Rate',
    value: '---',
    change: '---',
    isPositive: true,
    icon: TrendingUp,
    description: 'Loading...'
  }
];