import { useApp } from "../context/AppContext";

function Header() {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <header className="flex justify-between items-center p-4 bg-powder dark:bg-mineshaft">
      <h1 className="text-prussian dark:text-pampas font-bold">Workflow Dashboard</h1>
      <button
        onClick={toggleDarkMode}
        className="px-3 py-1 rounded-md font-medium shadow transition
                   bg-cerulean text-white hover:bg-prussian"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
