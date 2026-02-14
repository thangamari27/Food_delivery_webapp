import IconComponent from '@/components/common/IconComponent';
import { TrendingUp, TrendingDown, Loader2, Package, ShoppingBag, Users, IndianRupee, } from 'lucide-react';

export const iconMapper = {
  Package,
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp
};

export const getIconByName = (iconName) => {
  return iconMapper[iconName] || Package; // Default fallback
};

function StatCard({ stats, styles, loading }) {
  // Resolve icon name to component
  const IconComponent = getIconByName(stats.icon);
  
  return (
    <div className={`${styles.card} ${styles.cardPadding} ${styles.statCard} ${loading ? 'animate-pulse' : ''}`}>
      <div className={styles.statWrapper}>
        <div className={`${styles.iconWrapper} bg-linear-to-br ${stats.gradient}`}>
          {loading ? (
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          ) : (
            <IconComponent className={styles.statIcon} />
          )}
        </div>
        {!loading && (
          <div className={`${styles.trendIndicator} ${stats.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {stats.isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            {stats.change}
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className={styles.statValue}>
          {loading ? '---' : stats.value}
        </div>
        <div className={styles.statLabel}>{stats.label}</div>
        {!loading && stats.description && (
          <div className="text-xs text-gray-500 mt-1">
            {stats.description}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;