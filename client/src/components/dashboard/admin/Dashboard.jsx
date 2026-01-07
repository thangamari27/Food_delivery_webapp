import { useSelector } from 'react-redux'
import { dashboardContent } from "@/utils/constant/admin/AdminDashboard";
import { dashboardStyles } from "@/utils/styles/AdminStyle";
import Title from '@/components/common/Title'
import StatCard from "./features/dashboard/StatCard";
import PerformanceMetrics from "./features/dashboard/PerformanceMetrics";
import WeeklyOrdersChart from "./features/dashboard/WeeklyOrdersChart";
import RevenueComparisonChart from "./features/dashboard/RevenueComparisonChart";
import CustomerMapChart from "./features/dashboard/CustomerMapChart";

function Dashboard() {
  const content = dashboardContent;
  const styles = dashboardStyles;

  const { 
    stats,
    performanceMetrics,
    weeklyOrders,
    revenueComparison,
    customerMap, 
  } = useSelector(state => state.dashboard);

  return (
    <section className={styles.container}>
      <div className={styles.headerSection}>
        <Title title={content.header.title} titleStyle={styles.headerTitle} highlightedText={content.header.highlightText} highlightedTextStyle={styles.headerHighlight} />
      </div>
      <div className={`${styles.gridLayout} ${styles.gridGap} mb-6`}>
        {stats.map((stat, index) => (
          <StatCard key={index} stats={stat} styles={styles} />
        ))}
      </div>
      <div className={`${styles.grid2Col} ${styles.gridGap} mb-6`}>
        <PerformanceMetrics content={performanceMetrics} styles={styles} />
        <WeeklyOrdersChart dashboardData={weeklyOrders} styles={styles}/>
      </div>
      <div className={`${styles.grid2Col} ${styles.gridGap}`}>
        <RevenueComparisonChart dashboardData={revenueComparison} styles={styles} />
        <CustomerMapChart dashboardData={customerMap} styles={styles} />
      </div>
    </section>
  )
}

export default Dashboard