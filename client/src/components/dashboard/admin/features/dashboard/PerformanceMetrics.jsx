import { useState, useMemo } from "react";
import DonutChart from "./DonutChart";

function PerformanceMetrics({ content, styles }) {
  const [filter, setFilter] = useState('daily');
  const data = useMemo(() => content[filter], [filter, content]);

  return (
    <div className={`${styles.card} ${styles.cardPadding}`}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.heading}>{content.staticContent.title}</h3>
        <select
          className={styles.select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {content.staticContent.selectOption.map((optionItem) => (
            <option key={optionItem.id} value={optionItem.optionValue}>{optionItem.option}</option>
          ))}
        </select>
      </div>

      <div className={styles.donutGrid}>
        {data.map((chart) => (
          <DonutChart key={chart.label} data={chart} styles={styles} />
        ))}
      </div>
      <div className={styles.legendWrapper}>
        {data.map(item => (
            <div key={item.label} className={styles.legendItem}>
            <span className={`${styles.legendBox} ${item.indicator}`} />
            <span className={styles.legendText}>{item.label}</span>
            </div>
        ))}
      </div>
      <div className="mt-6 text-sm text-gray-500 text-center">
        Compared to {filter}, performance improved by <span className="font-semibold text-green-600">+12%</span>
      </div>
    </div>
  );
}

export default PerformanceMetrics;