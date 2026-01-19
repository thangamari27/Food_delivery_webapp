import { useMemo } from "react";

function StatsOverview({ content, customers, onStatClick, styles }) {
    const stats = useMemo(() => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return {
      total: customers.length,
      active: customers.filter(c => c.status === 'active').length,
      blocked: customers.filter(c => c.status === 'blocked' || c.status === 'inactive').length,
      new: customers.filter(c => new Date(c.created) >= weekAgo).length
    };
  }, [customers]);

  const statItems = [
    { key: 'total', value: stats.total, ...content.stats.total, filter: 'all' },
    { key: 'active', value: stats.active, ...content.stats.active, filter: 'active' },
    { key: 'blocked', value: stats.blocked, ...content.stats.blocked, filter: 'blocked' },
    { key: 'new', value: stats.new, ...content.stats.new, filter: null }
  ];

  const getIconBgColor = (color) => {
    const colors = {
      orange: 'bg-orange-100',
      green: 'bg-green-100',
      red: 'bg-red-100',
      purple: 'bg-purple-100'
    };
    return colors[color] || 'bg-gray-100';
  };

  const getIconColor = (color) => {
    const colors = {
      orange: 'text-orange-600',
      green: 'text-green-600',
      red: 'text-red-600',
      purple: 'text-purple-600'
    };
    return colors[color] || 'text-gray-600';
  };

  return (
    <div className={styles.stats.container}>
      {statItems.map((stat) => (
        <div 
          key={stat.key} 
          className={styles.stats.card}
          onClick={() => stat.filter && onStatClick(stat.filter)}
          role={stat.filter ? "button" : "status"}
          tabIndex={stat.filter ? 0 : -1}
          onKeyDown={(e) => stat.filter && e.key === 'Enter' && onStatClick(stat.filter)}
        >
          <div className={styles.stats.content}>
            <div className={styles.stats.textGroup}>
              <div className={styles.stats.label}>{stat.label}</div>
              <div className={styles.stats.value}>{stat.value.toLocaleString()}</div>
            </div>
            <div className={`${styles.stats.iconWrapper} ${getIconBgColor(stat.color)}`}>
              <stat.icon className={`w-6 h-6 ${getIconColor(stat.color)}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsOverview