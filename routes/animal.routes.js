import { Router } from "express";
import AnimalControl from "../control/animal.control.js";

const animalctrl = new AnimalControl();
const rotaAnimal = Router();

rotaAnimal.post("/", animalctrl.incluir);
rotaAnimal.put("/:id", animalctrl.editar);
rotaAnimal.patch("/:id", animalctrl.editar);
rotaAnimal.delete("/:id", animalctrl.deletar);
rotaAnimal.get("/:id", animalctrl.consultar);
rotaAnimal.get("/",animalctrl.consultar);

export default rotaAnimal;
