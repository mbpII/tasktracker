import React, { useState, useEffect } from "react";
import Task from "./Task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks/")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = () => {
    fetch("/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, completed: false }),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]))
      .catch((error) => console.error("Error adding task:", error));
    setNewTask("");
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
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} toggleComplete={toggleComplete} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
