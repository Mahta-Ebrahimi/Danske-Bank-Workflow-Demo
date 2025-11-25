import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { generateSuggestion } from "../utils/aiSuggestions";

function SuggestionTable({ steps }) {
  return (
    <table
      style={{
        width: "100%",                // full width
        borderCollapse: "collapse",   // collapse borders
        border: "1px solid #d1d5db",  // gray border
        overflow: "hidden",
      }}
    >
      <thead
        style={{
          backgroundColor: "#eff6ff", // lighter blue background
          color: "#1e3a8a",           // deep blue text
        }}
      >
        <tr>
          <th
            style={{
              border: "1px solid #d1d5db",
              padding: "12px",
              textAlign: "left",
            }}
          >
            Step #
          </th>
          <th
            style={{
              border: "1px solid #d1d5db",
              padding: "12px",
              textAlign: "left",
            }}
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {steps.map((step, index) => (
          <tr
            key={index}
            style={{ cursor: "pointer" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb") // hover effect
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <td
              style={{
                border: "1px solid #d1d5db",
                padding: "12px",
                fontWeight: 600,
              }}
            >
              {index + 1}
            </td>
            <td
              style={{
                border: "1px solid #d1d5db",
                padding: "12px",
              }}
            >
              {step}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


function TaskBoard() {
  const { tasks, setTasks } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditValues({
      title: task.title,
      category: task.category,
      priority: task.priority,
      deadline: task.deadline,
    });
  };

  const saveEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...editValues } : task
      )
    );
    setEditingId(null);
    setEditValues({});
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditValues({});
    }
  };

  const priorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <span className="bg-red-600 text-white font-semibold px-2 py-1 rounded text-xs">
            ⚠️ {priority}
          </span>
        );
      case "Medium":
        return (
  <span
    style={{
      backgroundColor: "#eab308", // bg-yellow-500
      color: "#ffffff",           // text-white
      fontWeight: 600,            // font-semibold
      padding: "4px 8px",         // px-2 py-1
      borderRadius: "6px",        // rounded
      fontSize: "12px",           // text-xs
      display: "inline-block",
    }}
  >
    ⚡ {priority}
  </span>
);

      case "Low":
        return (
          <span className="bg-green-600 text-white font-semibold px-2 py-1 rounded text-xs">
            ✅ {priority}
          </span>
        );
      default:
       return (
  <span
    style={{
      backgroundColor: "#d1d5db", // bg-gray-300
      color: "#000000",           // text-black
      fontWeight: 500,            // font-medium
      padding: "4px 8px",         // px-2 py-1
      borderRadius: "6px",        // rounded
      fontSize: "12px",           // text-xs
      display: "inline-block",
    }}
  >
    ➖ {priority}
  </span>
);

    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-4/5 max-w-6xl my-[80px]">
        <h2 style={{
    fontSize: "30px",       // text-3xl → 1.875rem
    fontWeight: 700,        // font-bold
    color: "#1e3a8a",       // text-blue-900
    marginBottom: "32px",   // mb-8 → 2rem
    textAlign: "center",    // text-center
  }} className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Task Board
        </h2>

        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th style={{
    border: "1px solid #d1d5db", // border-gray-300
    padding: "16px",             // p-4
  }} className="border border-gray-300 p-4">Title</th>
              <th style={{
    border: "1px solid #d1d5db", // border-gray-300
    padding: "16px",             // p-4 (1rem)
  }} >Category</th>
              <th style={{
    border: "1px solid #d1d5db", // border-gray-300
    padding: "16px",             // p-4 (1rem)
  }} className="border border-gray-300 p-4">Priority</th>
              <th style={{
    border: "1px solid #d1d5db", // border-gray-300
    padding: "16px",             // p-4 (1rem)
  }} className="border border-gray-300 p-4">Deadline</th>
              <th style={{
    border: "1px solid #d1d5db", // border-gray-300
    padding: "16px",             // p-4 (1rem)
  }} className="border border-gray-300 p-4">Suggestion</th>
              <th style={{
    border: "1px solid #d1d5db", // border-gray-300
    padding: "16px",             // p-4 (1rem)
  }} className="border border-gray-300 p-4">Status</th>
              <th style={{
    border: "1px solid #d1d5db", // border-gray-300
    padding: "16px",             // p-4 (1rem)
  }} className="border border-gray-300 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const steps = generateSuggestion(
                task.title,
                task.category,
                task.priority,
                task.deadline
              );

              const isEditing = editingId === task.id;

              return (
                <tr key={task.id} className="hover:bg-gray-50 align-top">
                  <td className="border border-gray-300 p-4 font-medium">
                    {isEditing ? (
                      <input
                        value={editValues.title}
                        onChange={(e) =>
                          setEditValues({ ...editValues, title: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {isEditing ? (
                      <select
                        value={editValues.category}
                        onChange={(e) =>
                          setEditValues({ ...editValues, category: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                      >
                        <option>Finance</option>
                        <option>HR</option>
                        <option>IT</option>
                      </select>
                    ) : (
                      task.category
                    )}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {isEditing ? (
                      <select
                        value={editValues.priority}
                        onChange={(e) =>
                          setEditValues({ ...editValues, priority: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    ) : (
                      priorityBadge(task.priority)
                    )}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {isEditing ? (
                      <input
                        type="date"
                        value={editValues.deadline}
                        onChange={(e) =>
                          setEditValues({ ...editValues, deadline: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      task.deadline || "—"
                    )}
                  </td>
                  <td className="border border-gray-300 p-4 text-sm text-gray-700">
                    <SuggestionTable steps={steps} />
                  </td>
                  <td className="border border-gray-300 p-4">{task.status}</td>
                  <td className="border border-gray-300 p-4 space-y-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(task.id)}
                          style={{
    width: "100%",               // w-full
    padding: "8px 16px",         // px-4 py-2
    backgroundColor: "#16a34a",  // bg-green-600
    color: "#ffffff",            // text-white
    borderRadius: "6px",         // rounded
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s ease",
  }} className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          💾 Save
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          style={{
    width: "100%",               // w-full
    padding: "8px 16px",         // px-4 py-2
    backgroundColor: "#dc2626",  // bg-red-600
    color: "#ffffff",            // text-white
    borderRadius: "6px",         // rounded
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s ease",
  }} className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    ) : (
                      <>
                        {task.status === "Pending" && (
                          <button
                            onClick={() => moveTask(task.id, "In Progress")}
                           style={{
    width: "100%",               // w-full
    padding: "8px 16px",         // px-4 py-2
    backgroundColor: "#2563eb",  // bg-blue-600
    color: "#ffffff",            // text-white
    borderRadius: "6px",         // rounded
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s ease",
  }} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            🚀 In Progress
                          </button>
                        )}
                        {task.status === "In Progress" && (
                          <button
                            onClick={() => moveTask(task.id, "Completed")}
              style={{
    backgroundColor: "#16a34a", // bg-green-600
    color: "#ffffff",           // text-white
    fontWeight: 500,            // font-medium / font-semibold
    padding: "8px 16px",        // px-4 py-2
    borderRadius: "6px",        // rounded
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  }}  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            ✅ Completed
                          </button>
                        )}
                        {task.status === "Completed" && (
                          <button
                            onClick={() => moveTask(task.id, "Pending")}
                           style={{
    width: "100%",               // w-full
    padding: "8px 16px",         // px-4 py-2
    backgroundColor: "#eab308",  // bg-yellow-500
    color: "#ffffff",            // text-white
    borderRadius: "6px",         // rounded
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s ease",
  }} className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            🔄 Pending
                          </button>
                        )}
                        <button
                          onClick={() => startEdit(task)}
                          style={{
    width: "100%",               // w-full
    padding: "8px 16px",         // px-4 py-2
    backgroundColor: "#4b5563",  // bg-gray-600
    color: "#ffffff",            // text-white
    borderRadius: "6px",         // rounded
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s ease",
  }} className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          ✏️ Edit
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskBoard;
