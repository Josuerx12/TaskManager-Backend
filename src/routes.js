const express = require("express");

// Auth
const {
  userLoginValidations,
  userRegisterValidations,
  validation,
} = require("./middlewares/UserMiddlewares");
const AuthGuard = require("./middlewares/AuthGuard");
const { Register, Login } = require("./controllers/UserController");

// Tasks
const {
  createTaskValidations,
  taskExistsValidation,
  taskEditionValidation,
} = require("./middlewares/TaskMiddlewares");
const {
  CreateTask,
  GetTasks,
  DeleteTask,
  EditTask,
} = require("./controllers/TaskController");

const Router = express.Router();

Router.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a api TAKS MANAGER" });
});

// Auth Routes
Router.post("/register", userRegisterValidations, validation, Register);
Router.post("/login", userLoginValidations, validation, Login);

// Tasks Routes
Router.post(
  "/createTask",
  AuthGuard,
  createTaskValidations,
  validation,
  CreateTask
);
Router.get("/tasks", AuthGuard, GetTasks);
Router.delete(
  "/task/:id",
  AuthGuard,
  taskExistsValidation,
  validation,
  DeleteTask
);
Router.put(
  "/task/:id",
  AuthGuard,
  taskExistsValidation,
  taskEditionValidation,
  validation,
  EditTask
);

module.exports = Router;
