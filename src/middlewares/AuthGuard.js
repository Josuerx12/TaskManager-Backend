const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function AuthGuard(req, res, next) {
  const headerToken = req.header("Authorization");

  try {
    if (!headerToken) {
      return res.status(401).json({
        msg: "Token não encotrado. Realize autenticacao para continuar.",
      });
    }
    const token = headerToken.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET);

    if (!decodedToken) {
      return res.status(401).json({ msg: "Token invalido." });
    }

    req.body.createdBy = decodedToken.name;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ msg: "Falha ao realizar à autenticacao." });
  }
}

module.exports = AuthGuard;
