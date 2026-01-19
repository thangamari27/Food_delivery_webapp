import React from 'react';
import { 
  Mail, 
  AlertCircle, 
  Clock, 
  CheckCircle,
  HelpCircle 
} from 'lucide-react';

const iconMap = {
  Mail,
  AlertCircle,
  Clock,
  CheckCircle,
  HelpCircle
};

function StatsSection({ content, stats, on_stat_click, styles }) {
  return (
    <div className={styles.stats_grid}>
      {content.stats.map((stat, idx) => {
        const Icon = iconMap[stat.icon] || HelpCircle;
        const value = stats?.[stat.key] || 0;
        
        return (
          <div
            key={idx}
            onClick={() => {
              if (stat.key === 'total') return;
              if (stat.key === 'high_priority') {
                on_stat_click({ priority: 'High' });
              } else {
                const status_map = { 
                  new: 'New', 
                  in_progress: 'In Progress', 
                  resolved: 'Resolved' 
                };
                on_stat_click({ status: status_map[stat.key] });
              }
            }}
            className={styles.stat_card}
          >
            <div className={styles.stat_wrapper}>
              <div className={`${styles.icon_wrapper} ${stat.gradient}`}>
                <Icon className={styles.stat_icon} />
              </div>
              <span className={styles.stat_value}>{value}</span>
            </div>
            <p className={styles.stat_label}>{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

export default StatsSection;