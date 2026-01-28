import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '60%',
  };

  return (
    <div className="w-full h-[400px]">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DonutChart;
