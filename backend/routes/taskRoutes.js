const express = require("express");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, addTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
router.put("/toggle-status/:id", auth, toggleTaskStatus);

module.exports = router;
