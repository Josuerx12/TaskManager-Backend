const { body, param } = require("express-validator");
const TaskModel = require("../models/TaskModel");
const mongoose = require("mongoose");

const createTaskValidations = [
  body("task")
    .isString()
    .withMessage("Digite alguma tarefa para criar uma nova tarefa.")
    .isLength({ min: 5 })
    .withMessage(
      "A tarefa precisa conter mais de 5 caracteres para ser válida."
    ),
  body("createdBy")
    .isString()
    .withMessage(
      "Informe o nome do usuário que está criando está nova tarefa."
    ),
];

const taskExistsValidation = [
  param("id")
    .isString()
    .withMessage("Id é obrigatorio para deletar a task")
    .custom(async (value) => {
      const task = await TaskModel.findById({ _id: value });
      if (!task) {
        throw new Error(`A tarefa id: ${value} não existe no banco de dados.`);
      }
      return true;
    }),
];

const taskEditionValidation = [
  body("task")
    .isString()
    .withMessage("Para editar a tarefa é necessario uma descricão.")
    .isLength({ min: 5 })
    .withMessage("A descricão da task precisa conter no mínimo 5 caracteres."),
  body("done")
    .isBoolean()
    .withMessage(
      "Para editar a taréfa é necessario informar a tarefa foi concluida ou não."
    ),
  body("doing")
    .isBoolean()
    .withMessage(
      "Para editar a taréfa é necessario informar se a tarefa está sendo feita ou não."
    ),
];

module.exports = {
  createTaskValidations,
  taskExistsValidation,
  taskEditionValidation,
};
