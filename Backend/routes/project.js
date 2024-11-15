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

module.exports = router;
