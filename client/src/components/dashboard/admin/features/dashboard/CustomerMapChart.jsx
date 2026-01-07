import { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

const CustomerMapChart = ({ dashboardData, styles }) => {
  const [filter, setFilter] = useState('weekly');
  const rawData = useMemo(() => dashboardData[filter], [filter, dashboardData]);

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
        <select className={styles.select} value={filter} onChange={e => setFilter(e.target.value)}>
          {dashboardData.staticContent.selectOption.map((optionItem) => (
            <option key={optionItem.id} value={optionItem.optionValue}>{optionItem.option}</option>
          ))}
        </select>
      </div>

      <div className={styles.graphLine}>
        <Bar data={data} />
      </div>


    </div>
  );
};

export default CustomerMapChart;