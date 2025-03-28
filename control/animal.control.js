import Animal from "../model/animal.model.js";
import Database from "../model/database.js";

export default class AnimalControl {
    async incluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const  { nome, raca, status, peso, porte, observacao, chip } = requisicao.body;
            const animal = new Animal(0, nome, raca, status, peso, porte, observacao, chip);
            
            const conexao = await Database.getInstance().getConnection();
            try {
                if (animal.validarAnimal(animal)) {
                    await animal.incluir(conexao, animal);
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Animal adicionado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Requisição inválida! Consulte a documentação da API."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Não foi possível incluir o animal: " + erro.message
                });
            }
        }
    }

    async editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")) {
            const id = requisicao.params.id;
            const  { nome, raca, status, peso, porte, observacao, chip } = requisicao.body;
            const animal = new Animal(id, nome, raca, status, peso, porte, observacao, chip);
            
            const conexao = await Database.getInstance().getConnection();
            try {
                if (animal.validarAnimal(animal)) {
                    await animal.editar(conexao, animal);
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Animal editado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Requisição inválida! Consulte a documentação da API."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Não foi possível editar o animal: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    async deletar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "DELETE") {
            const id = requisicao.params.id;
            const animal = new Animal(id);
            
            const conexao = await Database.getInstance().getConnection();

            try {
                if (animal.validarIdAnimal(animal.id)) {
                    await animal.excluir(conexao, animal);
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Animal excluído com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        status: false,
                        mensagem: "Informe um ID válido de um animal conforme a documentação da API."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Não foi possível excluir o animal: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            let id = requisicao.params.id;
            if (isNaN(id)) {
                id = "";
            }

            const animal = new Animal();
            const conexao = await Database.getInstance().getConnection();

            try {
                animal.consultar(conexao, id)
                .then((listaAnimais) => {
                    resposta.status(200).json(
                        listaAnimais
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar animais: " + erro.message
                        }
                    );
                });
            } catch (erro) {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar o animal: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}
