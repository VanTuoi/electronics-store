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
import { Bar } from "react-chartjs-2";

// Đăng ký các thành phần cần thiết
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChartOne() {
    const data: ChartData<"bar"> = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Sales",
                data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
                backgroundColor: "#465fff",
                borderRadius: 5,
                barPercentage: 0.6,
                categoryPercentage: 0.6
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
                    label: ctx => `${ctx.raw}`
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
                    }
                }
            }
        }
    };

    return (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div className="min-w-[1000px] h-[180px]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}
