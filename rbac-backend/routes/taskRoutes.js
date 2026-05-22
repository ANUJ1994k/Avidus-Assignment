const express = require("express");

const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");


// CREATE TASK
router.post(
  "/",
  authMiddleware,
  createTask
);


// GET OWN TASKS
router.get(
  "/my",
  authMiddleware,
  getMyTasks
);


// UPDATE TASK
router.put(
  "/:id",
  authMiddleware,
  updateTask
);


// DELETE TASK
router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

module.exports = router;