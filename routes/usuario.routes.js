import { Router } from "express";
import UsuarioControl from "../control/usuario.control.js";

const usuarioControl = new UsuarioControl();
const rotaUsuario = Router();

rotaUsuario.post("/", usuarioControl.gravar);
rotaUsuario.put("/:email", usuarioControl.editar);
rotaUsuario.patch("/:email", usuarioControl.editar);
rotaUsuario.delete("/:email", usuarioControl.excluir);
rotaUsuario.get("/:email", usuarioControl.consultar);
rotaUsuario.get("/", usuarioControl.consultar);
rotaUsuario.post("/login", usuarioControl.login);

export default rotaUsuario;
