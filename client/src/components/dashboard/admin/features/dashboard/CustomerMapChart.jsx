import { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Loader2 } from 'lucide-react';
import { fetchCustomerMap } from './adminDashboardSlice';

const CustomerMapChart = ({ dashboardData, styles, dispatch }) => {
  const [filter, setFilter] = useState('weekly');
  const rawData = useMemo(() => dashboardData[filter] || [], [filter, dashboardData]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    dispatch(fetchCustomerMap(newFilter));
  };

  const data = {
    labels: rawData.map(d => d.week),
    datasets: [
      {
        label: 'Customers',
        data: rawData.map(d => d.customers),
        backgroundColor: '#f59e0b',
        borderRadius: 8,
      },
    ],
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
          <Bar data={data} />
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

export default CustomerMapChart;