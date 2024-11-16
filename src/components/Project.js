import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Project = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDueDate, setProjectDueDate] = useState('');
  const [projectPriority, setProjectPriority] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [projects, setProjects] = useState([]);

  // Fetch all projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects/projects');
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects when component mounts
  }, []);

  // Handle form submission to create a new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      title: projectTitle,
      description: projectDescription,
      dueDate: projectDueDate,
      priority: projectPriority,
      status: projectStatus
    };

    try {
      await axios.post('http://localhost:5000/api/projects/projects', newProject);
      alert('Project created successfully');
      fetchProjects(); // Re-fetch the project list after creation
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Error creating project');
    }
  };

  // Handle project deletion
// Handle project deletion
const handleDelete = async (projectId) => {
  try {
    // Updated the URL to match the backend delete route
    await axios.delete(`http://localhost:5000/api/projects/delete-project/${projectId}`);
    alert('Project deleted successfully');
    fetchProjects(); // Re-fetch the project list after deletion
  } catch (err) {
    console.error('Error deleting project:', err);
    alert('Error deleting project');
  }
};


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Projects</h1>

      {/* Project Creation Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="projectTitle" className="form-label">Project Title</label>
              <input
                type="text"
                id="projectTitle"
                className="form-control"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label">Project Description</label>
              <textarea
                id="projectDescription"
                className="form-control"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="projectDueDate"
                className="form-control"
                value={projectDueDate}
                onChange={(e) => setProjectDueDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectPriority" className="form-label">Priority</label>
              <input
                type="text"
                id="projectPriority"
                className="form-control"
                value={projectPriority}
                onChange={(e) => setProjectPriority(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectStatus" className="form-label">Status</label>
              <input
                type="text"
                id="projectStatus"
                className="form-control"
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Project</button>
          </form>
        </div>
      </div>

      <h2 className="text-center mb-4">All Projects</h2>
      <div className="row">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <p className="card-text">Due Date: {project.dueDate}</p>
                  <p className="card-text">Priority: {project.priority}</p>
                  <p className="card-text">Status: {project.status}</p>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default Project;
