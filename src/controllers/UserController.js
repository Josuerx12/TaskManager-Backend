const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const SECRET = process.env.SECRET;

async function Register(req, res) {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await UserModel.create({
      name: name,
      email: email,
      password: passwordHash,
    });

    res.status(201).json({
      msg: "Usuário criado com sucesso.",
      Dados: { Nome: name, Email: email },
    });
  } catch (error) {
    console.log(error.msg);
    return res
      .status(401)
      .json({ errors: "Não foi possivel criar sua conta." });
  }
}

async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    const validatedUser = await bcrypt.compare(password, user.password);

    if (!validatedUser) {
      return res
        .status(401)
        .json({ errors: "Senha incorreta, corrija e tente novamente." });
    }

    const token = jwt.sign({ name: user.name, email: user.email }, SECRET);

    res.status(200).json({
      msg: "Login realizado com sucesso!",
      token: token,
      user: user.name,
      email: email,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(401)
      .json({ errors: "Erro ao fazer login, tente novamente mais tarde." });
  }
}

module.exports = { Register, Login };
