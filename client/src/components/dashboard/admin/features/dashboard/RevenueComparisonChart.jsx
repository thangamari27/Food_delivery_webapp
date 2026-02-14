import { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Loader2 } from 'lucide-react';
import { fetchRevenueComparison } from './adminDashboardSlice';

const RevenueComparisonChart = ({ dashboardData, styles, dispatch }) => {
  const [filter, setFilter] = useState('monthly');
  const rawData = useMemo(() => dashboardData[filter] || [], [filter, dashboardData]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    dispatch(fetchRevenueComparison(newFilter));
  };

  const data = {
    labels: rawData.map(d => d.month),
    datasets: [
      {
        label: '2025', // Updated year
        data: rawData.map(d => d.year2025), // Updated field
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
      {
        label: '2026', // Updated year
        data: rawData.map(d => d.year2026), // Updated field
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderDash: [6, 6],
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { 
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        grid: { color: '#f3f4f6' },
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`
        }
      },
    },
  };

  return (
    <div className={`${styles.card} ${styles.cardPadding}`}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.heading}>{dashboardData.staticContent.title}</h3>
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

export default RevenueComparisonChart;