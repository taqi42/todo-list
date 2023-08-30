import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function Header() {
  return (
    <div className="Header">
      <h1>Todo List</h1>
    </div>
  );
}

function Main() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  function handleAddTask(e) {
    setInput(e.target.value);
  }

  function addTask() {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  }

  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function handleEditTask(index) {
    if (editingIndex === index) {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editedText;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
      setEditedText(tasks[index].text);
    }
  }
  function handleDeleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  return (
    <div className="Main">
      <div className="add-tasks-wrapper">
        <input
          className="task-input"
          type="text"
          placeholder="Add tasks here..."
          value={input}
          onChange={handleAddTask}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="tasks-list-wrapper">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className="task-content">
                <input className="tast-checkbox"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span className={task.completed ? "completed-task task-text" : "task-text"}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                  ) : (
                    task.text
                  )}
                </span>
              </div>
              <div className="task-buttons">
                <button onClick={() => handleEditTask(index)}>
                  {editingIndex === index ? "Save" : "Edit"}
                </button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
