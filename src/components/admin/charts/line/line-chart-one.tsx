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
import { Line } from "react-chartjs-2";

// Đăng ký các components cần thiết
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

export default function LineChartOne() {
    const data: ChartData<"line"> = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales",
                data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
                borderColor: "#465FFF",
                backgroundColor: "rgba(70, 95, 255, 0.2)",
                borderWidth: 2,
                tension: 0, // Đường thẳng
                fill: true,
                pointBackgroundColor: "#fff",
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
            {
                label: "Revenue",
                data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
                borderColor: "#9CB9FF",
                backgroundColor: "rgba(156, 185, 255, 0.2)",
                borderWidth: 2,
                tension: 0,
                fill: true
            }
        ]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Ẩn legend (có thể hiển thị nếu cần)
            },
            tooltip: {
                enabled: true,
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
        }
    };

    return (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div className="min-w-[1000px] h-[310px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
