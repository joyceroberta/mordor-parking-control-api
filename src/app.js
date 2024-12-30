const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/parking.routes.js");

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));
}

app.use("/parking", routes);

// app.listen(3000, () => {
//   console.log("Servidor rodando na porta 3000");
// });

module.exports = app;
