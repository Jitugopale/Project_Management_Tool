const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// Create or Get Projects
router.route("/projects")
  .get(async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (err) {
      res.status(500).send("Error fetching projects");
    }
  })
  .post(async (req, res) => {
    try {
      const newProject = new Project(req.body);
      await newProject.save();
      res.status(201).send("Project created successfully");
    } catch (err) {
      res.status(500).send("Error creating project");
    }
  });

module.exports = router;
