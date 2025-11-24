import React, { useState } from "react";
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
          <span className="bg-yellow-500 text-white font-semibold px-2 py-1 rounded text-xs">
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
          <span className="bg-gray-300 text-black font-medium px-2 py-1 rounded text-xs">
            ➖ {priority}
          </span>
        );
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-4/5 max-w-6xl my-[80px]">
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
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        💾 Save
                      </button>
                    ) : (
                      <>
                        {task.status === "Pending" && (
                          <button
                            onClick={() => moveTask(task.id, "In Progress")}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            🚀In Progress
                          </button>
                        )}
                        {task.status === "In Progress" && (
                          <button
                            onClick={() => moveTask(task.id, "Completed")}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            ✅ Completed
                          </button>
                        )}
                        {task.status === "Completed" && (
                          <button
                            onClick={() => moveTask(task.id, "Pending")}
                            className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            🔄  Pending
                          </button>
                        )}
                        <button
                          onClick={() => startEdit(task)}
                          className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
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
