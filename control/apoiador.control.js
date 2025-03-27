import Database from "../model/database.js";
import Apoiador from "../model/apoiador.model.js";

export default class ApoiadorControl {
    async gravar(requisicao, resposta) {
        resposta.type("application/json");
        
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { cpf, nome, email, endereco, telefone } = requisicao.body;
            const apoiador = new Apoiador(0, cpf, nome, email, endereco, telefone);
            const conexao = await Database.getInstance().getConnection();

            try {
                if (apoiador.validarApoiador()) { // Removido o argumento desnecessário
                    await apoiador.incluir(conexao, apoiador);
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Apoiador adicionado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Dados inválidos! Consulte a documentação da API."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao incluir o apoiador: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    async editar(requisicao, resposta) {
        resposta.type("application/json");

        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const idApoiador = requisicao.params.idApoiador;
            const { cpf, nome, email, endereco, telefone } = requisicao.body;
            const apoiador = new Apoiador(idApoiador, cpf, nome, email, endereco, telefone);
            const conexao = await Database.getInstance().getConnection();

            try {
                if (apoiador.validarApoiador()) { // Removido argumento repetido
                    await apoiador.editar(conexao, apoiador);
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Apoiador editado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Dados inválidos! Consulte a documentação da API."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao editar o apoiador: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'DELETE') {
            const idApoiador = requisicao.params.idApoiador;
            const conexao = await Database.getInstance().getConnection();

            try {
                if (idApoiador) {
                    const apoiador = new Apoiador(idApoiador);
                    await apoiador.excluir(conexao, apoiador);
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Apoiador excluído com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "ID do apoiador não informado ou inválido."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao excluir o apoiador: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    async consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            let idApoiador = requisicao.params.idApoiador;

            if (isNaN(idApoiador)) {
                idApoiador = ""; // Permitir busca geral caso idApoiador seja inválido
            }

            const conexao = await Database.getInstance().getConnection();

            try {
                const listaApoiadores = await new Apoiador().consultar(conexao, idApoiador);
                resposta.status(200).json(listaApoiadores);
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar apoiadores: " + erro.message
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}
