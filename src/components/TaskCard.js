import React from 'react';

const TaskCard = ({ task, onUpdateStatus }) => {
    if (!task) return null;

    return (
        <div className="task-card p-2 mb-2 border">
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <p>
                <strong>Status:</strong> {task.status}
            </p>
            <p>
                <strong>Priority:</strong> {task.priority}
            </p>

            {/* Buttons for task status updates */}
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onUpdateStatus(task._id, 'To Do')}
                >
                    To Do
                </button>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onUpdateStatus(task._id, 'In Progress')}
                >
                    Progress
                </button>
                <button
                    className="btn btn-success btn-sm"
                    onClick={() => onUpdateStatus(task._id, 'Done')}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
