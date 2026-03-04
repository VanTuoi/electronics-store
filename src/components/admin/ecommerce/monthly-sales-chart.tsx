// eslint-disable-next-line simple-import-sort/imports
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions
} from "chart.js";
import { memo, useState } from "react";
import { Bar } from "react-chartjs-2";

import { MoreDotIcon } from "~/components/common/icons";

import { Dropdown } from "../ui/dropdown/dropdown";
import { DropdownItem } from "../ui/dropdown/dropdown-item";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const MonthlySalesChart = memo(() => {
  const data: ChartData<"bar"> = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Doanh số",
        data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
        backgroundColor: "#465fff",
        borderRadius: 5,
        borderWidth: 4,
        borderColor: "transparent",
        barPercentage: 0.39
      }
    ]
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          font: {
            family: "Outfit, sans-serif"
          }
        }
      },
      tooltip: {
        callbacks: {
          label: context => `${context.raw}`,
          title: () => ""
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
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          display: true
        },
        ticks: {
          font: {
            family: "Outfit, sans-serif"
          }
        },
        beginAtZero: true
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Doanh số bán hàng năm nay</h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Xem thêm
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Tùy chỉnh
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 h-[180px] ml-0">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
});
