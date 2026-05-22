// CREATE TASK
const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

exports.createTask = async (req, res) => {

  try {

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      createdBy: req.user.id,
    });
    await ActivityLog.create({
  userId: req.user.id,
  action: "CREATE_TASK",
  details: `Task created: ${task.title}`,
});

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// GET MY TASKS
exports.getMyTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      tasks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// UPDATE TASK
exports.updateTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    // Check task exists
    if (!task) {

      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    }

    // Ownership validation
    if (task.createdBy.toString() !== req.user.id) {

      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });

    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
await ActivityLog.create({
  userId: req.user.id,
  action: "UPDATE_TASK",
  details: `Task updated: ${updatedTask.title}`,
});
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      updatedTask,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// DELETE TASK
exports.deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {

      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    }

    if (task.createdBy.toString() !== req.user.id) {

      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });

    }

    // CREATE ACTIVITY LOG
    await ActivityLog.create({
      userId: req.user.id,
      action: "DELETE_TASK",
      details: `Task deleted: ${task.title}`,
    });

    // DELETE TASK
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};