import Animal from "../model/animal.model.js";
import Database from "../model/database.js"

export default class AnimalControl
{
    async incluir(requisicao, resposta)
    {
        resposta.type("application/json");
        if(requisicao.method == 'POST' && requisicao.is("application/json"))
        {
            const nomeAnimal = requisicao.body.nomeAnimal;
            const animal = new Animal(0, nomeAnimal);
            const conexao = await Database.getInstance().getConnection();
            try {
                if (animal.validarAnimal(animal)) {
                    await animal.incluir(conexao, animal);
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Animal adicionada com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Requisição inválida! Consulte a documentação da API."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível incluir o animal: " + erro.message
                });
            }
        }
    }

    async editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const idAnimal = requisicao.params.idAnimal;
            const nomeAnimal = requisicao.body.nomeAnimal;
            const animal = new Animal(idAnimal,nomeAnimal);

            const conexao = await Database.getInstance().getConnection();
            try{
                if (animal.validarAnimal(animal)) {
                    animal.editar(conexao,animal)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Animal editada com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível editar a animal: " + erro.message
                            });
                        });
                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Requisição inválida! Consulte a documentação da API."
                    });
                }
            }
            catch(erro){
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível editar o animal (Conexão): " + erro.message
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    async deletar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'DELETE') {
            const idAnimal = requisicao.params.idAnimal;

            const animal = new Animal(idAnimal);

            const conexao = await Database.getInstance().getConnection();
            try{
                if (animal.validarId(animal)) {                
                    animal.excluir(conexao, animal)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "ANimal excluída com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível excluir o animal: " + erro.message
                            });
                        });
                }
                else {
                    resposta.status(400).json(
                        {
                            "status": false,
                            "mensagem": "Informe um id válido de um animal conforme documentação da API."
                        }
                    );
                }
            }
            catch(erro){
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível excluir o animal (Conexão): " + erro.message
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let idAnimal = requisicao.params.idAnimal;
            if (isNaN(idAnimal)) {
                idAnimal = "";
            }

            const animal = new Animal();
            const conexao = await Database.getInstance().getConnection();
            try{
                animal.consultar(conexao, idAnimal)
                .then((listaAnimal) => {
                    resposta.status(200).json(
                        listaAnimal
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar o animal: " + erro.message
                        }
                    );
                });
            }
            catch (erro) {
                resposta.status(500).json(
                    {
                        "status": false,
                        "mensagem": "Erro ao consultar o animal (Conexão): " + erro.message
                    }
                );
            }
        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }
}