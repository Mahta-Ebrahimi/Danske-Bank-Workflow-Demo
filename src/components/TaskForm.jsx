import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { generateSuggestion } from "../utils/aiSuggestions";

function TaskForm() {
  const { setTasks } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !category || !priority) return;

    const suggestion = generateSuggestion(title, category, priority, deadline);

    const newTask = {
      id: Date.now(),
      title,
      status: "Pending",
      category,
      priority,
      deadline,
      suggestion,
    };

    setTasks((prev) => [...prev, newTask]);

    setTitle("");
    setCategory("");
    setPriority("");
    setDeadline("");
  };

  return (
    <div className="flex justify-center mb-6">
      {/* Wrapper limited to 4/5 width */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-4/5 flex flex-wrap gap-6 items-end"
      >
        {/* Task Title */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-prussian mb-2">
            Task Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
            className="border px-4 py-3 w-full rounded-lg"
          />
        </div>

        {/* Category */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-prussian mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-3 rounded-lg w-full"
          >
            <option value="" disabled hidden>
              Choose Category
            </option>
            <option>Finance</option>
            <option>HR</option>
            <option>IT</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-prussian mb-2">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border px-4 py-8 rounded-lg w-full"
          >
            <option value="" disabled hidden>
              Choose Priority
            </option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Deadline */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-prussian mb-2">
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border px-4 py-3 rounded-lg w-full"
          />
        </div>

        {/* Add Button */}
        <div className="flex-1 min-w-[200px]">
          <button className="bg-cerulean text-white px-6 py-3 rounded-lg w-full hover:bg-prussian transition-colors">
            ➕ Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
