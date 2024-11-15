const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Change `name` to `title`
  description: { type: String, required: true },
  dueDate: { type: Date },  // Optional: Add this field if you want to use it
  priority: { type: String },  // Optional: Add this field if you want to use it
  status: { type: String }  // Optional: Add this field if you want to use it
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
