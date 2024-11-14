import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Project = () => {
  // State to manage form input and project list
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projects, setProjects] = useState([]);

  // Fetch all projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects');
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
    const newProject = { name: projectName, description: projectDescription };
    
    try {
      await axios.post('http://localhost:5000/projects', newProject);
      alert('Project created successfully');
      fetchProjects(); // Re-fetch the project list after creation
    } catch (err) {
      console.error('Error creating project:', err);
      alert('Error creating project');
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
              <label htmlFor="projectName" className="form-label">Project Name</label>
              <input
                type="text"
                id="projectName"
                className="form-control"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
                  <h5 className="card-title">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
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
