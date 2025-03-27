import { Router } from "express";
import ApoiadorControl from "../model/apoiador.model";

const apoiadorControl = new ApoiadorControl();
const rotaApoiador = Router();

rotaApoiador.post("/", apoiadorControl.gravar);
rotaApoiador.put("/:email", apoiadorControl.editar);
rotaApoiador.patch("/:email", apoiadorControl.editar);
rotaApoiador.delete("/:email", apoiadorControl.excluir);
rotaApoiador.get("/:email", apoiadorControl.consultar);
rotaApoiador.get("/", apoiadorControl.consultar);

export default rotaApoiador;