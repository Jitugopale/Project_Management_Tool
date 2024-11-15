import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Updated URL to match backend route
                const response = await axios.get('http://localhost:5000/api/tasks/get-tasks');
                console.log("Fetched tasks:", response.data); // Log fetched tasks
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <p>Loading tasks...</p>;

    return (
        <div className="task-list">
            {tasks.length > 0 ? (
                tasks.map(task => <TaskCard key={task._id} task={task} />)
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
};

export default TaskList;
