const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ status: 200, success: true, data: tasks });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: false, message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json({ status: 201, success: true, data: task });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, success: false, message: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Task not found" });
    }
    res.status(200).json({ status: 200, success: true, data: task });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: false, message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status } },
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: 200, success: true, data: updatedTask });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, success: false, message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({
        status: 200,
        success: true,
        message: "Task deleted successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: false, message: error.message });
  }
};
