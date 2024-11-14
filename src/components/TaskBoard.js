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
        <div className="container mt-5">
            <h3 className="text-center mb-4">Task Board</h3>
            <div className="row">
                {/* To Do Column */}
                <div className="col-md-4">
                    <h4 className="text-center">To Do</h4>
                    <div className="card p-3">
                        {tasks.filter(task => task.status === 'To Do').length > 0 ? (
                            tasks.filter(task => task.status === 'To Do').map((task) => (
                                <TaskCard key={task._id} task={task} />
                            ))
                        ) : (
                            <p>No tasks available.</p>
                        )}
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="col-md-4">
                    <h4 className="text-center">In Progress</h4>
                    <div className="card p-3">
                        {tasks.filter(task => task.status === 'In Progress').length > 0 ? (
                            tasks.filter(task => task.status === 'In Progress').map((task) => (
                                <TaskCard key={task._id} task={task} />
                            ))
                        ) : (
                            <p>No tasks available.</p>
                        )}
                    </div>
                </div>

                {/* Done Column */}
                <div className="col-md-4">
                    <h4 className="text-center">Done</h4>
                    <div className="card p-3">
                        {tasks.filter(task => task.status === 'Done').length > 0 ? (
                            tasks.filter(task => task.status === 'Done').map((task) => (
                                <TaskCard key={task._id} task={task} />
                            ))
                        ) : (
                            <p>No tasks available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;
