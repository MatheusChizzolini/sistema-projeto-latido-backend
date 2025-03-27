import { Router } from "express";
import ProdutoControl from "../control/produto.control.js";

const produtoControl = new ProdutoControl();
const rotaProduto = Router();

rotaProduto.post("/", produtoControl.gravar);
rotaProduto.put("/:idProduto", produtoControl.editar);
rotaProduto.patch("/:idProduto", produtoControl.editar);
rotaProduto.delete("/:idProduto", produtoControl.excluir);
rotaProduto.get("/:idProduto", produtoControl.consultar);
rotaProduto.get("/",produtoControl.consultar);

export default rotaProduto;