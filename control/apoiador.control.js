import Database from "../model/database";
import Apoiador from "../model/apoiador.model";
import { Request, response } from "express";

export default class ApoiadorControl {
    async gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { cpf, nome, email, endereco, telefone } = requisicao.body;
            const apoiador = new Apoiador(0, cpf, nome, email, endereco, telefone);
            const conexao = await Database.getInstance().getConnection();
            
            try {
                if (apoiador.validarApoiador(apoiador)) {
                    apoiador.incluir(conexao, apoiador)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Apoiador adicionado com sucesso!"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível incluir o apoiador: " + erro.message
                            });
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
                    "mensagem": "Não foi possível incluir o apoiador (Conexão): " + erro.message
                });
            }
        }
    }

    async editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const { idApoiador, cpf, nome, email, endereco, telefone } = requisicao.body;
            const apoiador = new Apoiador(idApoiador, cpf, nome, email, endereco, telefone);
            const conexao = await Database.getInstance().getConnection();

            try {
                if (apoiador.validarApoiador(apoiador)) {
                    apoiador.editar(conexao, apoiador)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Apoiador editado com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível editar o apoiador: " + erro.message
                            });
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
                    "mensagem": "Erro de conexão ao editar apoiador: " + erro.message
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
                    apoiador.excluir(conexao, apoiador)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Apoiador excluído com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Erro ao excluir o apoiador: " + erro.message
                            });
                        });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Informe um ID de apoiador válido conforme a documentação da API."
                    });
                }
            } catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro de conexão ao excluir apoiador: " + erro.message
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
