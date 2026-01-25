import React from 'react'

function BookingStats({ content, stats, onStatClick, activeFilter, styles }) {
  const getStatCardData = (stat) => {
    const card = content.stat_cards.find(c => c.filter === stat.filter);
    const style = styles.stat_colors[stat.filter || 'total'];
    
    return {
      ...card,
      ...stat,
      ...style
    };
  };

  const statCards = [
    getStatCardData({ filter: null, value: stats.total }),
    getStatCardData({ filter: 'pending', value: stats.pending }),
    getStatCardData({ filter: 'confirmed', value: stats.confirmed }),
    getStatCardData({ filter: 'completed', value: stats.completed }),
    getStatCardData({ filter: 'cancelled', value: stats.cancelled })
  ];

  return (
    <div className={styles.layout.stats_grid}>
      {statCards.map((stat) => (
        <div
          key={stat.label}
          onClick={() => onStatClick(stat.filter)}
          className={`${styles.cards.stat} ${
            activeFilter === stat.filter ? styles.cards.stat_active : ''
          }`}
        >
          <div className={`${stat.bgColor} ${styles.images.stat_icon}`}>
            <span className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
          <p className={styles.text.body.small}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default BookingStats