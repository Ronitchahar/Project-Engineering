import { useRef, useState } from "react";
import "./App.css";

const filters = ["All", "Active", "Completed"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("All");
  const nextId = useRef(0);

  function addTask(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    nextId.current += 1;
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: nextId.current, title: cleanTitle, completed: false },
    ]);
    setTitle("");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
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
    <main className="page">
      <section className="task-card" aria-labelledby="page-title">
        <p className="eyebrow">A little more focus</p>
        <h1 id="page-title">Task Manager</h1>
        <p className="intro">Make a list. Take it one step at a time.</p>

        <form className="task-form" onSubmit={addTask}>
          <label className="visually-hidden" htmlFor="task-title">
            Task title
          </label>
          <input
            id="task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to get done?"
          />
          <button className="add-button" type="submit">
            Add
          </button>
        </form>

        <ul className="task-list" aria-label="Tasks">
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <button
                className={`task-row${task.completed ? " is-complete" : ""}`}
                type="button"
                aria-pressed={task.completed}
                onClick={() => toggleTask(task.id)}
              >
                <span className="task-check" aria-hidden="true">
                  {task.completed ? "✓" : ""}
                </span>
                <span>{task.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <nav className="filters" aria-label="Filter tasks">
          {filters.map((name) => (
            <button
              key={name}
              className={filter === name ? "filter-button is-selected" : "filter-button"}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </nav>

        <p className="remaining">{remaining} tasks remaining</p>
      </section>
    </main>
  );
}
