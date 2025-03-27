import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaApoiador from "./routes/apoiador.routes.js";
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


app.use('/apoiadores', rotaApoiador);
//app.use('/exemplo', rotaExemplo);


app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
