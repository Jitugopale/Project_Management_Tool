import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('To Do');
    const [assignees, setAssignees] = useState('');
    const [tasks, setTasks] = useState([]); // Local state for tasks
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch tasks initially to populate the list
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

    // Handle form submission to add a new task
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            title,
            description,
            dueDate,
            priority,
            status,
            assignees: assignees.split(','),
        };

        try {
            const response = await axios.post('http://localhost:5000/api/tasks/tasks', newTask);
            setSuccessMessage('Task created successfully!');
            setError(null);

            // Add the new task to the local state
            setTasks([...tasks, response.data]);

            // Clear the form fields
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('');
            setStatus('To Do');
            setAssignees('');
        } catch (error) {
            setError('There was an error creating the task. Please try again.');
            setSuccessMessage(null);
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/delete-tasks/${taskId}`);
            setTasks(tasks.filter((task) => task._id !== taskId)); // Remove task from local state
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Add New Task</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        className="form-control"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="assignees">Assignees (comma-separated user IDs)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="assignees"
                        value={assignees}
                        onChange={(e) => setAssignees(e.target.value)}
                        placeholder="Enter user IDs separated by commas"
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <button type="submit" className="btn btn-primary mt-3">
                    Create Task
                </button>
            </form>

            {/* Display tasks below the form */}
            <div className="mt-5">
                <h4>Tasks</h4>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task._id} className="task-card p-2 mb-2 border">
                            <h5>{task.title}</h5>
                            <p>{task.description}</p>
                            <p>
                                <strong>Status:</strong> {task.status}
                            </p>
                            <p>
                                <strong>Priority:</strong> {task.priority}
                            </p>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>
        </div>
    );
};

export default AddTask;
