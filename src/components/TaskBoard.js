import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks/get-tasks');
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  // Update task status and move it between sections
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Update task status in the backend
      await axios.post(`http://localhost:5000/api/tasks/update-tasks/${taskId}`, {
        status: newStatus,
      });

      // Update task status in the frontend state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Task Board</h3>
      <div className="row">
        {/* To Do Section */}
        <div className="col-md-4">
          <h4 className="text-center">To Do</h4>
          <div className="card p-3">
            {tasks.filter((task) => task.status === 'To Do').length > 0 ? (
              tasks
                .filter((task) => task.status === 'To Do')
                .map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdateStatus={updateTaskStatus}
                  />
                ))
            ) : (
              <p>No tasks available.</p>
            )}
          </div>
        </div>

        {/* In Progress Section */}
        <div className="col-md-4">
          <h4 className="text-center">In Progress</h4>
          <div className="card p-3">
            {tasks.filter((task) => task.status === 'In Progress').length > 0 ? (
              tasks
                .filter((task) => task.status === 'In Progress')
                .map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdateStatus={updateTaskStatus}
                  />
                ))
            ) : (
              <p>No tasks available.</p>
            )}
          </div>
        </div>

        {/* Done Section */}
        <div className="col-md-4">
          <h4 className="text-center">Done</h4>
          <div className="card p-3">
            {tasks.filter((task) => task.status === 'Done').length > 0 ? (
              tasks
                .filter((task) => task.status === 'Done')
                .map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdateStatus={updateTaskStatus}
                  />
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
