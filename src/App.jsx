import React from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import KanbanBoard from "./components/KanbanBoard";
import TaskBoard from "./components/TaskBoard.jsx";
import Analytics from "./components/Analytics";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen p-6 transition-colors duration-300 
                      bg-pampas text-mineshaft 
                      dark:bg-mineshaft dark:text-pampas">
        <Header />
        <TaskForm />
        <TaskBoard />
        {/* <KanbanBoard /> */}
        <Analytics />
        {/* <DarkModeToggle /> */}
      </div>

    </AppProvider>
  );
}

export default App;

