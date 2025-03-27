import Animal from "../model/animal.model.js";
import Database from "../model/database.js";

export default class AnimalControl {
    async incluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const nomeAnimal = requisicao.body.nomeAnimal;
            const animal = new Animal(0, nomeAnimal);
            const conexao = await Database.getInstance().getConnection();

            try {
                if (animal.validarAnimal()) {
                    await animal.incluir(conexao);
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
            const idAnimal = parseInt(requisicao.params.idAnimal);
            const nomeAnimal = requisicao.body.nomeAnimal;
            const animal = new Animal(idAnimal, nomeAnimal);
            const conexao = await Database.getInstance().getConnection();

            try {
                if (animal.validarAnimal()) {
                    await animal.editar(conexao);
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
            const idAnimal = parseInt(requisicao.params.idAnimal);
            const animal = new Animal(idAnimal);
            const conexao = await Database.getInstance().getConnection();

            try {
                if (animal.validarId()) {
                    await animal.excluir(conexao);
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
            let idAnimal = parseInt(requisicao.params.idAnimal) || null;
            const animal = new Animal();
            const conexao = await Database.getInstance().getConnection();

            try {
                const listaAnimal = await animal.consultar(conexao, idAnimal);
                resposta.status(200).json(listaAnimal);
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
