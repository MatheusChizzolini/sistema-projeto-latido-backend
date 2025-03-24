import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const host = "0.0.0.0";
const porta = 4000;

const app = express();

app.use(express.json());
app.use(cors({
    "origin":"*",
    "Access-Control-Allow-Origin":"*"
}));

dotenv.config();

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});