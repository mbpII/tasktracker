import React from "react";

const Task = ({ task, toggleComplete, removeTask }) => {
  return (
    <div className="task" style={{ padding: "5px" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {task.title}
      <button
        onClick={() => removeTask(task.id)}
        style={{ backgroundColor: "#E72725", color: "white" }}
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
