import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  CategoryScale
);

type CoinChartProps = {
  prices: [number, number][];
};

export default function CoinChart({ prices }: CoinChartProps) {
  if (!prices || prices.length === 0) {
    return <div className="text-center text-gray-400 py-8">No chart data</div>;
  }

  const data = {
    labels: prices.map(([timestamp]) => new Date(timestamp)),
    datasets: [
      {
        label: "Price (USD)",
        data: prices.map(([, price]) => price),
        fill: true,
        borderColor: "rgba(59,130,246,1)", // blue-500
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return "rgba(59,130,246,0.1)";
          const gradient = canvasCtx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(59,130,246,0.2)");
          gradient.addColorStop(1, "rgba(59,130,246,0)");
          return gradient;
        },
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow custom height
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#3b82f6",
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx: any) =>
            ` $${ctx.parsed.y.toLocaleString(undefined, {
              maximumFractionDigits: 6,
            })}`,
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: { unit: "hour" as const, tooltipFormat: "PPpp" },
        grid: { display: false },
        ticks: { color: "#64748b", font: { size: 12 } },
      },
      y: {
        beginAtZero: false,
        grid: { color: "#e5e7eb", borderDash: [4, 4] },
        ticks: {
          color: "#64748b",
          font: { size: 12 },
          callback: function (this: any, tickValue: string | number) {
            return `$${tickValue}`;
          },
        },
      },
    },
    elements: {
      line: { borderWidth: 3 },
    },
  };

  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow-inner w-full"
      style={{ minHeight: 200, height: "40vw", maxHeight: 350 }}
    >
      <Line data={data} options={options} />
    </div>
  );
}
