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
    <div
      style={{
        margin: "34px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #007BA7", // cerulean
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "24px",
          backgroundColor: "#ffffff",
          textAlign: "center",
          width: "80%",
        }}
      >
        {/* Section heading */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#003153", // prussian blue
            marginBottom: "16px",
          }}
        >
          Task Analytics
        </h2>

        {/* Buttons above chart */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            margin: "16px 0",
          }}
        >
          <button
            onClick={() => setChartType("pie")}
            style={{
              padding: "4px 12px",
              borderRadius: "6px",
              fontWeight: 500,
              transition: "all 0.3s ease",
              backgroundColor: chartType === "pie" ? "#007BA7" : "#B0E0E6", // cerulean vs powder
              color: chartType === "pie" ? "#ffffff" : "#003153",
              boxShadow: chartType === "pie" ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
              cursor: "pointer",
            }}
          >
            Pie
          </button>
          <button
            onClick={() => setChartType("bar")}
            style={{
              padding: "4px 12px",
              borderRadius: "6px",
              fontWeight: 500,
              transition: "all 0.3s ease",
              backgroundColor: chartType === "bar" ? "#007BA7" : "#B0E0E6",
              color: chartType === "bar" ? "#ffffff" : "#003153",
              boxShadow: chartType === "bar" ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
              cursor: "pointer",
            }}
          >
            Bar
          </button>
        </div>

        {/* Chart container */}
        <div
          style={{
            width: "400px",
            height: "400px",
            margin: "0 auto",
          }}
        >
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
      <div style={{ marginBottom: "80px", width: "80%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            backgroundColor: "#ffffff",
            marginTop: "24px",
          }}
        >
          <thead
            style={{
              backgroundColor: "#dbeafe", // blue-100
              color: "#1e3a8a",           // blue-900
            }}
          >
            <tr>
              {["Status", "Count", "Percentage"].map((header) => (
                <th
                  key={header}
                  style={{
                    border: "1px solid #d1d5db",
                    padding: "16px",
                    textAlign: "left",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <td style={{ border: "1px solid #d1d5db", padding: "16px", fontWeight: 600, color: "#ca8a04" }}>
                Pending
              </td>
              <td style={{ border: "1px solid #d1d5db", padding: "16px" }}>{counts.Pending}</td>
              <td style={{ border: "1px solid #d1d5db", padding: "16px" }}>{percentages.Pending}%</td>
            </tr>
            <tr
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <td style={{ border: "1px solid #d1d5db", padding: "16px", fontWeight: 600, color: "#2563eb" }}>
                In Progress
              </td>
              <td style={{ border: "1px solid #d1d5db", padding: "16px" }}>{counts["In Progress"]}</td>
              <td style={{ border: "1px solid #d1d5db", padding: "16px" }}>{percentages["In Progress"]}%</td>
            </tr>
            <tr
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <td style={{ border: "1px solid #d1d5db", padding: "16px", fontWeight: 600, color: "#16a34a" }}>
                Completed
              </td>
              <td style={{ border: "1px solid #d1d5db", padding: "16px" }}>{counts.Completed}</td>
              <td style={{ border: "1px solid #d1d5db", padding: "16px" }}>{percentages.Completed}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
