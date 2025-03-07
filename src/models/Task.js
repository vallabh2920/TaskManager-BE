const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["completed", "ongoing", "not started"],
      default: "not started",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
