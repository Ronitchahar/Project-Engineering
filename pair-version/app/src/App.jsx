import { useState } from "react";
import "./App.css";
export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("All");

  function addTask(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setTasks([
      ...tasks,
      { id: Date.now(), title: cleanTitle, completed: false },
    ]);
    setTitle("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <main className="app">
      <h1>Task Manager</h1>

      <form className="task-form" onSubmit={addTask}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
          aria-label="Task title"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <button
              className={`task ${task.completed ? "completed" : ""}`}
              type="button"
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="filters" aria-label="Filter tasks">
        {["All", "Active", "Completed"].map((name) => (
          <button
            key={name}
            type="button"
            className={filter === name ? "selected" : ""}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <p className="remaining">{remaining} tasks remaining</p>
    </main>
  );
}