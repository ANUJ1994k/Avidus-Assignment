const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");


// VIEW ALL USERS
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);


// DELETE USER
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);


// UPDATE USER STATUS
router.patch(
  "/users/:id/status",
  authMiddleware,
  adminMiddleware,
  updateUserStatus
);


// VIEW ALL TASKS
router.get(
  "/tasks",
  authMiddleware,
  adminMiddleware,
  getAllTasks
);


// DELETE ANY TASK
router.delete(
  "/tasks/:id",
  authMiddleware,
  adminMiddleware,
  deleteAnyTask
);

module.exports = router;