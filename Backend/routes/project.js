const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send("Error fetching projects");
  }
});

// Create a new project
router.post("/projects", async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    // Create a new project
    const newProject = new Project({
      title,
      description,
      dueDate,
      priority,
      status
    });

    // Save to the database
    await newProject.save();
    res.status(201).send("Project created successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error creating project");
  }
});

// Get a specific project by ID
router.get("/get-projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send("Error fetching projects");
  }
});

// Delete a project by ID
router.delete("/delete-project/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the project
    const deletedProject = await Project.findByIdAndDelete(id);

    // Check if project was found and deleted
    if (!deletedProject) {
      return res.status(404).send("Project not found");
    }

    res.status(200).send("Project deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error deleting project");
  }
});


module.exports = router;

