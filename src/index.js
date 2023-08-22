require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./database/db");
const Router = require("./routes");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(Router);

db().then(app.listen(port, console.log(`Servidor rodando na porta: ${port}`)));
