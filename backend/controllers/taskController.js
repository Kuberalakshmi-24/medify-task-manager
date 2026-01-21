const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, status } = req.body;
    const task = await Task.create({ title, status, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Tasks for logged in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Task (Status change matrum Title Edit renduமே handle pannum)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, title } = req.body; // Title edit-kum sethu update pannalaam
    
    // Status update pannalaam or Title update pannalaam
    const updateData = {};
    if (status) updateData.status = status;
    if (title) updateData.title = title;

    await Task.update(updateData, { where: { id, userId: req.user.id } });
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Task Logic (Ippo ithai add pannunga)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // User-oda swanthama task-ah mattum delete panna check
    const task = await Task.destroy({ where: { id, userId: req.user.id } });

    if (task) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};