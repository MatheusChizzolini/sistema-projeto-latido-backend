import { Router } from "express";
import AnimalCtrl from "../control/animal.control.js";

const animalctrl = new AnimalCtrl();
const rotaAnimal = Router();

rotaAnimal.post("/", animalctrl.gravar);
rotaAnimal.put("/:id", animalctrl.editar);
rotaAnimal.patch("/:id", animalctrl.editar);
rotaAnimal.delete("/:id", animalctrl.excluir);
rotaAnimal.get("/:id", animalctrl.consultar);
rotaAnimal.get("/",animalctrl.consultar);