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
    <div>
      <h1>Projects</h1>

      {/* Project Creation Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Project</button>
      </form>

      <h2>All Projects</h2>
      <ul>
        {projects.length > 0 ? (
          projects.map((project) => (
            <li key={project._id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </li>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </ul>
    </div>
  );
};

export default Project;
