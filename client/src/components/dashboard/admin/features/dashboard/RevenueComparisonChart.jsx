import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';

const RevenueComparisonChart = ({ dashboardData, styles }) => {
  const [filter, setFilter] = useState('monthly');
  const rawData = useMemo(() => dashboardData[filter], [filter, dashboardData]);

  const data = {
    labels: rawData.map(d => d.month),
    datasets: [
      {
        label: '2020',
        data: rawData.map(d => d.year2020),
        borderColor: '#f59e0b',
        tension: 0.4,
      },
      {
        label: '2021',
        data: rawData.map(d => d.year2021),
        borderColor: '#3b82f6',
        borderDash: [6, 6],
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={`${styles.card} ${styles.cardPadding}`}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.heading}>{dashboardData.staticContent.title}</h3>
        <select className={styles.select} value={filter} onChange={e => setFilter(e.target.value)}>
          {dashboardData.staticContent.selectOption.map((optionItem) => (
            <option key={optionItem.id} value={optionItem.optionValue}>{optionItem.option}</option>
          ))}
        </select>
      </div>

      <div className={styles.graphLine}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default RevenueComparisonChart;