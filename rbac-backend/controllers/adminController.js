const User = require("../models/User");
const Task = require("../models/Task");


// GET ALL USERS
exports.getAllUsers = async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// DELETE USER
exports.deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// UPDATE USER STATUS
exports.updateUserStatus = async (req, res) => {

  try {

    const { status } = req.body;

    if (
      status !== "Active" &&
      status !== "Inactive"
    ) {

      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });

    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// GET ALL TASKS
exports.getAllTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("createdBy", "name email role");

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


// DELETE ANY TASK
exports.deleteAnyTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {

      return res.status(404).json({
        success: false,
        message: "Task not found",
      });

    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully by admin",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};