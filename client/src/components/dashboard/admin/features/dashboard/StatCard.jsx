import IconComponent from '@/components/common/IconComponent'
import { TrendingUp, TrendingDown } from 'lucide-react'

function StatCard({ stats, styles }) {
  return (
     <div className={`${styles.card} ${styles.cardPadding} ${styles.statCard}`}>
      <div className={styles.statWrapper}>
        <div className={`${styles.iconWrapper} bg-linear-to-br ${stats.gradient}`}>
          <IconComponent Icon={stats.icon} className={styles.statIcon} />
        </div>
        <div className={`${styles.trendIndicator} ${stats.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {stats.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {stats.change}
        </div>
      </div>
      <div className="mt-4">
        <div className={styles.statValue}>{stats.value}</div>
        <div className={styles.statLabel}>{stats.label}</div>
      </div>
    </div>
  )
}

export default StatCard