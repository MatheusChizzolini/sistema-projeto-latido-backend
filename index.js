import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaProduto from "./routes/produto.routes.js";
import rotaUsuario from "./routes/usuario.routes.js";
import rotaApoiador from "./routes/apoiador.routes.js";
import rotaAnimal from "./routes/animal.routes.js";
import rotaCategoria from "./routes/categoria.routes.js";
//importa sua rota aqui

const host = "0.0.0.0";
const porta = 4000;

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({
    "origin":"*",
    "Access-Control-Allow-Origin":"*"
}));

app.use('/produtos', rotaProduto);
app.use('/usuarios', rotaUsuario);
app.use('/apoiadores', rotaApoiador);
app.use('/animal', rotaAnimal);
app.use('/categoria', rotaCategoria);
//app.use('/exemplo', rotaExemplo);

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
