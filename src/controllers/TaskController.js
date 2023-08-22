const TaskModel = require("../models/TaskModel");

async function CreateTask(req, res) {
  const { task, createdBy } = req.body;

  try {
    const Task = await TaskModel.create({
      task: task,
      done: false,
      doing: false,
      createdBy: createdBy,
    });
    return res.status(201).json({ msg: Task });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Não foi possivel criar sua nova tarefa, tente novamente mais tarde.",
    });
  }
}

async function GetTasks(req, res) {
  const { createdBy } = req.body;

  try {
    const tasks = await TaskModel.find({ createdBy: createdBy });

    if (tasks.length <= 0) {
      return res.status(404).json({
        msg: "Payload failed.",
        error: "Nenhuma task cadastrada.",
      });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Não foi possivel coletar as tasks criadas, tente novamente mais tarde.",
    });
  }
}

async function DeleteTask(req, res) {
  const id = req.params.id;
  try {
    const task = await TaskModel.findByIdAndDelete({ _id: id });
    console.log(task);
    res
      .status(200)
      .json({ msg: `Task id ${id} deletada com sucesso.`, task: task });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      msg: "Não foi possivel deletar a tarefa, tente novamente mais tarde.",
    });
  }
}

async function EditTask(req, res) {
  const id = req.params.id;
  const { task, done, doing } = req.body;

  try {
    const taskEdit = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { task: task, done: done, doing: doing }
    );
    res.status(201).json({
      msg: `A tarefa id: ${id} foi editada com sucesso.`,
      task: taskEdit,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Não foi possivel editar sua tarefa." });
  }
}

module.exports = { CreateTask, GetTasks, DeleteTask, EditTask };
