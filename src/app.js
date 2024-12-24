import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/parking.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

app.use("/parking", routes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
