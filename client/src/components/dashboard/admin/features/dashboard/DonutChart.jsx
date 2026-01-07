import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Percent } from 'lucide-react';

function DonutChart({ data, styles }) {
  const chartData = useMemo(() => ({
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [data.percentage, 100 - data.percentage],
        backgroundColor: [data.color, '#f3f4f6'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  }), [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className={styles.donutChart.container}>
      <div className={styles.chartContainer}>
        <Doughnut data={chartData} options={options} />
        <div className={styles.donutChart.percentageContainer}>
          <span className={styles.donutChart.percentText}>
            {data.percentage}
            <Percent className={styles.donutChart.percentIcon} />
          </span>
        </div>
      </div>
      <p className={styles.chartLabel}>{data.label}</p>
    </div>
  );
}

export default DonutChart;