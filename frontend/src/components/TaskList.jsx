import React, { useState, useEffect } from "react";
import Task from "./Task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/tasks/")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }

    fetch("/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, completed: false }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask("");
        setError("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setError("Failed to add task");
      });
  };

  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    fetch(`/api/tasks/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(tasks.map((t) => (t.id === id ? data : t)));
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const removeTask = (id) => {
    fetch(`/api/tasks/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        setError("Failed to delete task");
      });
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      {error && <p className="error">{error}</p>}
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
