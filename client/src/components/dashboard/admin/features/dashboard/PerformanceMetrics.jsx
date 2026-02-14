import { useState, useMemo } from "react";
import { fetchPerformanceMetrics } from "./adminDashboardSlice";
import DonutChart from "./DonutChart";
import { Loader2 } from 'lucide-react';

function PerformanceMetrics({ content, styles, dispatch }) {
  const [filter, setFilter] = useState('daily');
  const data = useMemo(() => content[filter], [filter, content]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    // Fetch new data when filter changes
    dispatch(fetchPerformanceMetrics(newFilter));
  };

  return (
    <div className={`${styles.card} ${styles.cardPadding}`}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.heading}>{content.staticContent.title}</h3>
        <select
          className={styles.select}
          value={filter}
          onChange={handleFilterChange}
          disabled={content.loading}
        >
          {content.staticContent.selectOption.map((optionItem) => (
            <option key={optionItem.id} value={optionItem.optionValue}>
              {optionItem.option}
            </option>
          ))}
        </select>
      </div>

      {content.loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <div className={styles.donutGrid}>
            {data?.map((chart) => (
              <DonutChart key={chart.label} data={chart} styles={styles} />
            ))}
          </div>
          
          <div className={styles.legendWrapper}>
            {data?.map(item => (
              <div key={item.label} className={styles.legendItem}>
                <span className={`${styles.legendBox} ${item.indicator}`} />
                <span className={styles.legendText}>{item.label}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-sm text-gray-500 text-center">
            Compared to {filter}, performance improved by{' '}
            <span className="font-semibold text-green-600">+12%</span>
          </div>
        </>
      )}

      {content.error && (
        <div className="mt-4 text-sm text-red-600 text-center">
          {content.error}
        </div>
      )}
    </div>
  );
}

export default PerformanceMetrics;