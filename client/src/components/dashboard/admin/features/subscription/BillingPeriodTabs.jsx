import { useCallback } from 'react'

function BillingPeriodTabs({ content, periods, activePeriod, onPeriodChange, planCounts, styles }) {
  const handlePeriodClick = useCallback((period) => {
    onPeriodChange(period);
  }, [onPeriodChange]);

  return (
    <div className="mb-6">
      <div className={styles.tab.container}>
        <nav className={styles.tab.nav} aria-label="Billing period tabs">
          {periods.map((period) => {
            // Ensure consistent case comparison
            const isActive = period.toLowerCase() === activePeriod.toLowerCase();
            
            // Use lowercase key for planCounts access
            const periodKey = period.toLowerCase();
            const count = planCounts[periodKey] || 0;
            
            // Capitalize for display
            const displayName = period.charAt(0).toUpperCase() + period.slice(1);
            
            return (
              <button
                key={period}
                onClick={() => handlePeriodClick(period)}
                className={`
                  whitespace-nowrap transition-colors
                  ${isActive 
                    ? styles.tab.button.active
                    : styles.tab.button.inactive
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {displayName}
                <span className={styles.badge.count}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  )
}

export default BillingPeriodTabs