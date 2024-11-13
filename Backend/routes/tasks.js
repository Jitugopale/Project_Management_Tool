const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../config/auth');
const router = express.Router();

// Create Task Route
router.post('/tasks', authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority, assignees } = req.body;
  
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      assignees,
    });

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get All Tasks Route
router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Update Task Route
router.put('/tasks/:id', authMiddleware, async (req, res) => {
  const { title, description, dueDate, priority, assignees, status } = req.body;
  
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, assignees, status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;