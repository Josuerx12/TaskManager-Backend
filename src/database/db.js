const mongoose = require("mongoose");

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const db = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${pass}@cluster0.zlla1j8.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Banco de dados conectado com o servidor.");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = db;
