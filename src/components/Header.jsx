import React from "react";
import { useApp } from "../context/AppContext";
import { exportTasksToCSV } from "../utils/csvExport";

function Header() {
  const { tasks } = useApp();
  return (
    <header style={{
    backgroundImage: "linear-gradient(to right, #007BA7, #003153)", // cerulean → prussian
    padding: "24px",            // p-6 → 1.5rem
    borderRadius: "12px",       // rounded-lg → 0.75rem
    marginTop: "88px",          // my-[88px] → top margin
    marginBottom: "88px",       // my-[88px] → bottom margin
    textAlign: "center",        // text-center
    boxShadow: "0 10px 15px rgba(0,0,0,0.25)", // shadow-lg
  }} className="bg-gradient-to-r from-cerulean to-prussian p-6 rounded-lg my-[88px] text-center shadow-lg">
      {/* Centered Title */}
      <h1  style={{
    color: "#ffffff",     // text-white
    fontSize: "1.875rem", // text-3xl → 30px
    fontWeight: "700",    // font-bold
    marginBottom: "24px", // mb-6 → 1.5rem
  }}>
        Danske Bank Workflow Automation
      </h1>

      {/* Centered, larger CSV button */}
      <button
        onClick={() => exportTasksToCSV(tasks)} style={{
  backgroundColor: "#ffffff",   // bg-white
  color: "#003153",             // text-prussian (Prussian blue hex)
  paddingLeft: "24px",          // px-6 → 1.5rem
  paddingRight: "24px",         // px-6 → 1.5rem
  paddingTop: "12px",           // py-3 → 0.75rem
  paddingBottom: "12px",        // py-3 → 0.75rem
  borderRadius: "12px",         // rounded-lg → 0.75rem
  fontSize: "1.125rem",         // text-lg → 18px
  fontWeight: 600,              // font-semibold
  transition: "background-color 0.3s ease, color 0.3s ease", // transition
  cursor: "pointer",            // 👈 added for pointer effect
}}

        className="bg-white text-prussian px-6 py-3 rounded-lg text-lg font-semibold hover:bg-powder transition"
      >
        📊 Export CSV
      </button>
    </header>
  );
}

export default Header;

