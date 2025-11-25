import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { generateSuggestion } from "../utils/aiSuggestions";

function TaskForm() {
  const { setTasks } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError("Please fill in the Title.");
      return;
    }
    if (!category) {
      setError("Please choose a Category.");
      return;
    }
    if (!priority) {
      setError("Please choose a Priority.");
      return;
    }

    // Generate suggestion
    const suggestion = generateSuggestion(title, category, priority, deadline);

    // Create new task
    const newTask = {
      id: Date.now(),
      title,
      status: "Pending",
      category,
      priority,
      deadline,
      suggestion,
    };

    // Add to context
    setTasks((prev) => [...prev, newTask]);

    // Reset form
    setTitle("");
    setCategory("");
    setPriority("");
    setDeadline("");
    setError("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          width: "80%",
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          alignItems: "flex-end",
          margin: "0 auto",
        }}
      >
        {/* Task Title */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#003153",
              marginBottom: "8px",
            }}
          >
            Task Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              padding: "16px 32px",
              borderRadius: "12px",
              width: "100%",
            }}
            placeholder="Enter task..."
          />
        </div>

        {/* Category */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#003153",
              marginBottom: "8px",
            }}
          >
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              padding: "16px 32px",
              borderRadius: "12px",
              width: "100%",
            }}
          >
            <option value="" disabled>
              Choose Category
            </option>
            <option>Finance</option>
            <option>HR</option>
            <option>IT</option>
          </select>
        </div>

        {/* Priority */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#003153",
              marginBottom: "8px",
            }}
          >
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              padding: "16px 32px",
              borderRadius: "12px",
              width: "100%",
            }}
          >
            <option value="" disabled>
              Choose Priority
            </option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Deadline */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#003153",
              marginBottom: "8px",
            }}
          >
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              padding: "16px 32px",
              borderRadius: "12px",
              width: "74%",
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              width: "100%",
              color: "#dc2626",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        {/* Add Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "rgba(14, 165, 233, 0.85)",
            color: "#ffffff",
            padding: "16px 24px",
            borderRadius: "12px",
            width: "80vw",
            transition: "background-color 0.2s ease",
            display: "block",
            margin: "0 auto",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(14, 165, 233, 1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(14, 165, 233, 0.85)")
          }
        >
          ➕ Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
