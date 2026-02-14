import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Download, Loader2 } from 'lucide-react';
import { fetchWeeklyOrders } from './adminDashboardSlice';

const WeeklyOrdersChart = ({ dashboardData, styles, dispatch }) => {
  const [filter, setFilter] = useState('daily');
  const rawData = useMemo(() => dashboardData[filter] || [], [filter, dashboardData]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    dispatch(fetchWeeklyOrders(newFilter));
  };

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
          <select 
            className={styles.select} 
            value={filter} 
            onChange={handleFilterChange}
            disabled={dashboardData.loading}
          >
            {dashboardData.staticContent.selectOption.map((optionItem) => (
              <option key={optionItem.id} value={optionItem.optionValue}>
                {optionItem.option}
              </option>
            ))}
          </select>
          <button className={styles.button}>
            <Download className="w-4 h-4 inline mr-2" /> Save
          </button>
        </div>
      </div>

      {dashboardData.loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className={styles.graphLine}>
          <Line data={data} options={options} />
        </div>
      )}

      {dashboardData.error && (
        <div className="mt-4 text-sm text-red-600 text-center">
          {dashboardData.error}
        </div>
      )}
    </div>
  );
};

export default WeeklyOrdersChart;