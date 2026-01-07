import { TrendingUp, TrendingDown } from "lucide-react";

function StatsGrid({ content, styles }) {
  return (
    <div className={styles.statsGrid}>
        {content.stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
        <div key={idx} className={styles.statCard}>
            <div className={styles.statWrapper}>
                <div className="flex-1">
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
                <div className={styles.trendIndicator}>
                    {stat.isPositive ? 
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" /> : 
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    }
                    <span className={stat.isPositive ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                    </span>
                </div>
                </div>
                <div className={`${styles.iconWrapper} ${stat.gradient}`}>
                <Icon className={styles.statIcon} />
                </div>
            </div>
        </div>
        );
        })}
    </div>
  ) 
}

export default StatsGrid