import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
    // State to store form data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('To Do');
    const [assignees, setAssignees] = useState(''); // For simplicity, assuming assignee is a string (user ID)

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the new task object
        const newTask = {
            title,
            description,
            dueDate,
            priority,
            status,
            assignees: assignees.split(','), // Assuming assignees are passed as a comma-separated string of user IDs
        };

        try {
            await axios.post('http://localhost:5000/api/tasks/tasks', newTask); // No need for 'response'
            setSuccessMessage('Task created successfully!');
            setError(null);
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
        </div>
    );
};

export default AddTask;
