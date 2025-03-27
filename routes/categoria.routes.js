import { Router } from "express";
import CategoriaControl from "../control/categoria.control.js";

const categoriaControl = new CategoriaControl();
const rotaCategoria = Router();

rotaCategoria.post("/", categoriaControl.gravar);
rotaCategoria.put("/:idCategoria", categoriaControl.editar);
rotaCategoria.patch("/:idCategoria", categoriaControl.editar);
rotaCategoria.delete("/:idCategoria", categoriaControl.excluir);
rotaCategoria.get("/:idCategoria", categoriaControl.consultar);
rotaCategoria.get("/", categoriaControl.consultar);

export default rotaCategoria;
