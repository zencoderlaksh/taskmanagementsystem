const Task = require("../models/Task");
const { validateTask } = require("../validation/taskValidation");

// CRUD Operations
// 1. Get Tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
};

// 2. Add Task
exports.addTask = async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, description, dueDate } = req.body;
  const newTask = new Task({ title, description, dueDate, userId: req.user });

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//3. Update Task
exports.updateTask = async (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const task = await Task.findById(req.params.id);
  if (!task || task.userId.toString() !== req.user) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

// 4. Delete Task
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.userId.toString() !== req.user) {
    return res.status(404).json({ message: "Task not found" });
  }

  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// 5. Toggle Task Status
exports.toggleTaskStatus = async (req, res) => {
  const { completed } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task || task.userId.toString() !== req.user) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;

  try {
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
