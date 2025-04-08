import { Router } from "express";
import ApoiadorControl from "../control/apoiador.control.js";

const apoiadorControl = new ApoiadorControl();
const rotaApoiador = Router();

rotaApoiador.post("/", apoiadorControl.gravar);
rotaApoiador.put("/:idApoiador", apoiadorControl.editar);
rotaApoiador.patch("/:idApoiador", apoiadorControl.editar);
rotaApoiador.delete("/:idApoiador", apoiadorControl.excluir);
rotaApoiador.get("/:cpf", apoiadorControl.consultar);
rotaApoiador.get("/", apoiadorControl.consultar);

export default rotaApoiador;