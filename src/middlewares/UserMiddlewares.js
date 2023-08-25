const { body, validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");

const userRegisterValidations = [
  body("email")
    .isEmail()
    .withMessage("Insira um e-mail valido para continuar.")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error(
          "E-mail já em uso, insira outro e-mail valido para continuar."
        );
      }
      return true;
    }),
  body("name")
    .isString()
    .withMessage("Nome é obrigatorio.")
    .isLength({ min: 3 })
    .withMessage("Nome precisa conter no mínimo 3 caracteres."),
  body("password")
    .isStrongPassword()
    .withMessage(
      "A senha deve conter 8 caracteres contendo pelo menos 1 caractere especial, 1 letra maiuscula e 1 numero."
    ),
  body("confirmPassword")
    .isString()
    .withMessage("A confirmação da senha é obrigatória.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Senhas não conferem");
      }
      return true;
    }),
];

const userLoginValidations = [
  body("email")
    .isEmail()
    .withMessage("Insira um e-mail valido para continuar.")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (!user) {
        throw new Error(
          "E-mail não cadastrado, faça um novo cadastro para realizar o login."
        );
      }
      return true;
    }),
  body("password")
    .isStrongPassword()
    .withMessage(
      "A senha deve conter 8 caracteres contendo pelo menos 1 caractere especial, 1 letra maiuscula e 1 numero."
    ),
];

function validation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "payload validation failed",
      errors: errors.array().map((e) => e.msg),
    });
  }

  next();
}

module.exports = { userLoginValidations, userRegisterValidations, validation };
