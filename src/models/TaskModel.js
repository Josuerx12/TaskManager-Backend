const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: String,
    done: Boolean,
    doing: Boolean,
    createdBy: String,
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
