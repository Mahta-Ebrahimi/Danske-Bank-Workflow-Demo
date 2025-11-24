import React from "react";
import { useApp } from "../context/AppContext";
import { generateSuggestion } from "../utils/aiSuggestions";

function SuggestionTable({ steps }) {
  return (
    <table className="w-full border-collapse border border-gray-300 rounded-lg mt-3">
      <thead className="bg-blue-100 text-blue-900">
        <tr>
          <th className="border border-gray-300 p-3 text-left">Step #</th>
          <th className="border border-gray-300 p-3 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {steps.map((step, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-3 font-semibold">
              {index + 1}
            </td>
            <td className="border border-gray-300 p-3">{step}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TaskBoard() {
  const { tasks, setTasks } = useApp();

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const priorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <span className="flex items-center gap-1 bg-red-600 text-white font-semibold px-2 py-1 rounded text-xs border border-red-700">
            ⚠️ {priority}
          </span>
        );
      case "Medium":
        return (
          <span className="flex items-center gap-1 bg-yellow-500 text-white font-semibold px-2 py-1 rounded text-xs border border-yellow-600">
            ⚡ {priority}
          </span>
        );
      case "Low":
        return (
          <span className="flex items-center gap-1 bg-green-600 text-white font-semibold px-2 py-1 rounded text-xs border border-green-700">
            ✅ {priority}
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-gray-300 text-black font-medium px-2 py-1 rounded text-xs border border-gray-400">
            ➖ {priority}
          </span>
        );
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      {/* Wrapper limited to 4/5 width */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-4/5 max-w-6xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Task Board
        </h2>

        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="border border-gray-300 p-4">Title</th>
              <th className="border border-gray-300 p-4">Category</th>
              <th className="border border-gray-300 p-4">Priority</th>
              <th className="border border-gray-300 p-4">Deadline</th>
              <th className="border border-gray-300 p-4">Suggestion</th>
              <th className="border border-gray-300 p-4">Status</th>
              <th className="border border-gray-300 p-4">Actions</th>
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

              return (
                <tr key={task.id} className="hover:bg-gray-50 align-top">
                  <td className="border border-gray-300 p-4 font-medium">
                    {task.title}
                  </td>
                  <td className="border border-gray-300 p-4">{task.category}</td>
                  <td className="border border-gray-300 p-4">
                    {priorityBadge(task.priority)}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {task.deadline || "—"}
                  </td>
                  <td className="border border-gray-300 p-4 text-sm text-gray-700">
                    <SuggestionTable steps={steps} />
                  </td>
                  <td className="border border-gray-300 p-4">{task.status}</td>
                  <td className="border border-gray-300 p-4">
                    {task.status === "Pending" && (
                      <button
                        onClick={() => moveTask(task.id, "In Progress")}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                      >
                        🚀 In Progress
                      </button>
                    )}
                    {task.status === "In Progress" && (
                      <button
                        onClick={() => moveTask(task.id, "Completed")}
                        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                      >
                        ✅ Completed
                      </button>
                    )}
                    {task.status === "Completed" && (
                      <button
                        onClick={() => moveTask(task.id, "Pending")}
                        className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center gap-1"
                      >
                        🔄 Reset → Pending
                      </button>
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
