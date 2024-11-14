import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import TaskCard from './TaskCard';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const taskData = await getTasks();
            setTasks(taskData);
        };
        fetchTasks();
    }, []);

    return (
        <div className="task-board">
            <h3>Task Board</h3>
            <div className="task-column">
                <h4>To Do</h4>
                {tasks.filter(task => task.status === 'To Do').map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
            <div className="task-column">
                <h4>In Progress</h4>
                {tasks.filter(task => task.status === 'In Progress').map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
            <div className="task-column">
                <h4>Done</h4>
                {tasks.filter(task => task.status === 'Done').map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;
