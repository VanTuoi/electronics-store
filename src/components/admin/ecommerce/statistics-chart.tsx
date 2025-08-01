// eslint-disable-next-line simple-import-sort/imports
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions
} from "chart.js";
import { memo } from "react";
import { Line } from "react-chartjs-2";

import ChartTab from "../common/chart-tab";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

export const StatisticsChart = memo(() => {
  const data: ChartData<"line"> = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Sales",
        data: [18, 19, 17, 16, 17, 16, 17, 20, 23, 21, 24, 23],
        borderColor: "#465FFF",
        backgroundColor: "rgba(70, 95, 255, 0.1)",
        borderWidth: 2,
        tension: 0,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6
      },
      {
        label: "Revenue",
        data: [4, 3, 5, 4, 5, 4, 7, 10, 11, 12, 15, 14],
        borderColor: "#9CB9FF",
        backgroundColor: "rgba(156, 185, 255, 0.1)",
        borderWidth: 2,
        tension: 0,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6
      }
    ]
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: context => `${context.dataset.label}: ${context.raw}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "Outfit, sans-serif"
          }
        }
      },
      y: {
        grid: {
          display: true
        },
        ticks: {
          font: {
            family: "Outfit, sans-serif"
          },
          color: "#6B7280"
        }
      }
    },
    interaction: {
      intersect: false,
      mode: "index"
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Yêu cầu tư vấn</h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">Mục tiêu hằng tuần của bạn</p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full h-[310px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
});
