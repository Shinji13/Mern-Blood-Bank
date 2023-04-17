import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  Filler,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export function LineChart({ data }: { data: any }) {
  return <Line data={data} options={{ responsive: true }} />;
}
export function BarChart({ data }: { data: any }) {
  return <Bar data={data} options={{ responsive: true }} />;
}
