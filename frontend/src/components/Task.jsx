import React from "react";

const Task = ({ task, toggleComplete, removeTask }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      {task.title}
      <button onClick={() => removeTask(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
