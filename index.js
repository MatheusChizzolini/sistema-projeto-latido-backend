import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaCategoria from "./routes/categoria.routes.js";

const host = "0.0.0.0";
const porta = 4000;

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({
    "origin":"*",
    "Access-Control-Allow-Origin":"*"
}));


app.use('/categorias', rotaCategoria);



app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
