import Animal from "../model/animal.model.js";

export default class AnimalCtrl
{
    incluir(requisicao, resposta)
    {
        resposta.type("application/json");
        if(requisicao.method == 'POST')
    }
}