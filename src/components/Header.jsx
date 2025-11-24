import React from "react";
import { useApp } from "../context/AppContext";
import { exportTasksToCSV } from "../utils/csvExport";

function Header() {
  const { tasks } = useApp();
  return (
    <header className="bg-gradient-to-r from-cerulean to-prussian p-6 rounded-lg my-[88px] text-center shadow-lg">
      {/* Centered Title */}
      <h1 className="text-white text-3xl font-bold mb-6">
        Danske Bank Workflow Automation
      </h1>

      {/* Centered, larger CSV button */}
      <button
        onClick={() => exportTasksToCSV(tasks)}
        className="bg-white text-prussian px-6 py-3 rounded-lg text-lg font-semibold hover:bg-powder transition"
      >
        📊 Export CSV
      </button>
    </header>
  );
}

export default Header;

