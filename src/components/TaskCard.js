// TaskCard.js
import React from 'react';

const TaskCard = ({ task }) => {
    if (!task) return null; // Early return if task is undefined

    return (
        <div className="task-card p-2 mb-2 border">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
        </div>
    );
};

export default TaskCard;
