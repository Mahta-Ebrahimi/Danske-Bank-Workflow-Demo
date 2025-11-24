import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useApp } from "../context/AppContext";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Analytics() {
  const { tasks } = useApp();
  const [chartType, setChartType] = useState("pie");

  // Count tasks by status
  const counts = {
    Pending: tasks.filter((t) => t.status === "Pending").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  // Calculate percentages
  const percentages = {
    Pending: total ? ((counts.Pending / total) * 100).toFixed(1) : 0,
    "In Progress": total ? ((counts["In Progress"] / total) * 100).toFixed(1) : 0,
    Completed: total ? ((counts.Completed / total) * 100).toFixed(1) : 0,
  };

  // Categories + statuses for bar chart
  const categories = ["Finance", "HR", "IT"];
  const statuses = ["Pending", "In Progress", "Completed"];

  const barDatasets = statuses.map((status, i) => ({
    label: status,
    data: categories.map(
      (cat) => tasks.filter((t) => t.category === cat && t.status === status).length
    ),
    backgroundColor: ["#fbbf24", "#009EDC", "#10b981"][i],
  }));

  // Pie chart data
  const pieData = {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
        backgroundColor: ["#fbbf24", "#009EDC", "#10b981"],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: categories,
    datasets: barDatasets,
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="border border-cerulean rounded-lg shadow-md p-6 bg-white text-center w-4/5">
        {/* Section heading */}
        <h2 className="text-xl font-bold text-prussian mb-4">
          Task Analytics
        </h2>

        {/* Buttons above chart */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setChartType("pie")}
            className={`px-3 py-1 rounded-md font-medium transition ${
              chartType === "pie"
                ? "bg-cerulean text-white shadow"
                : "bg-powder text-prussian hover:bg-cerulean hover:text-white"
            }`}
          >
            Pie
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={`px-3 py-1 rounded-md font-medium transition ${
              chartType === "bar"
                ? "bg-cerulean text-white shadow"
                : "bg-powder text-prussian hover:bg-cerulean hover:text-white"
            }`}
          >
            Bar
          </button>
        </div>

        {/* Chart container */}
        <div className="w-[400px] h-[400px] mx-auto">
          {chartType === "pie" ? (
            <Pie
              data={pieData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          ) : (
            <Bar
              data={barData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          )}
        </div>
      </div>

      {/* Summary table with percentages */}
      <div className="mt-24 w-4/5">
        <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-md bg-white">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="border border-gray-300 p-4 text-left">Status</th>
              <th className="border border-gray-300 p-4 text-left">Count</th>
              <th className="border border-gray-300 p-4 text-left">Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 p-4 font-semibold text-yellow-600">
                Pending
              </td>
              <td className="border border-gray-300 p-4">{counts.Pending}</td>
              <td className="border border-gray-300 p-4">{percentages.Pending}%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 p-4 font-semibold text-blue-600">
                In Progress
              </td>
              <td className="border border-gray-300 p-4">{counts["In Progress"]}</td>
              <td className="border border-gray-300 p-4">{percentages["In Progress"]}%</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 p-4 font-semibold text-green-600">
                Completed
              </td>
              <td className="border border-gray-300 p-4">{counts.Completed}</td>
              <td className="border border-gray-300 p-4">{percentages.Completed}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
