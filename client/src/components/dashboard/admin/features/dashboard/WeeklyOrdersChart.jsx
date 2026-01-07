import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Download } from 'lucide-react';

const WeeklyOrdersChart = ({ dashboardData, styles }) => {
  const [filter, setFilter] = useState('daily');
  const rawData = useMemo(() => dashboardData[filter], [filter, dashboardData]);

  const data = {
    labels: rawData.map(d => d.day),
    datasets: [
      {
        label: 'Orders',
        data: rawData.map(d => d.orders),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.2)',
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#f3f4f6' } },
    },
  };

  return (
    <div className={`${styles.card} ${styles.cardPadding}`}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.heading}>{dashboardData.staticContent.title}</h3>
        <div className="flex gap-2">
          <select className={styles.select} value={filter} onChange={e => setFilter(e.target.value)}>
            {dashboardData.staticContent.selectOption.map((optionItem) => (
              <option key={optionItem.id} value={optionItem.optionValue}>{optionItem.option}</option>
            ))}
          </select>
          <button className={styles.button}>
            <Download className="w-4 h-4 inline mr-2" /> Save
          </button>
        </div>
      </div>

      <div className={styles.graphLine}>
        <Line data={data} options={options} />
      </div>

    </div>
  );
};

export default WeeklyOrdersChart;