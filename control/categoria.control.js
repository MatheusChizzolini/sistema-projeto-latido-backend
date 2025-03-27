import Database from "../model/database.js";
import Categoria from "../model/categoria.model.js"

export default class CategoriaControl {
    async gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nomeCategoria = requisicao.body.nomeCategoria;
            const categoria = new Categoria(0, nomeCategoria);
            const conexao = await Database.getInstance().getConnection();
            try {
                if (categoria.validarCategoria(categoria)) {
                    await categoria.incluir(conexao, categoria);
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Categoria adicionada com sucesso!"
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
                    "mensagem": "Não foi possível incluir a categoria: " + erro.message
                });
            }
        }
    }

    async editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const idCategoria = requisicao.params.idCategoria;
            const nomeCategoria = requisicao.body.nomeCategoria;
            const categoria = new Categoria(idCategoria,nomeCategoria);

            const conexao = await Database.getInstance().getConnection();
            try{
                if (categoria.validarCategoria(categoria)) {
                    categoria.editar(conexao,categoria)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Categoria editada com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível editar a categoria: " + erro.message
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
                    "mensagem": "Não foi possível editar a categoria (Conexão): " + erro.message
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

    async excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'DELETE') {
            const idCategoria = requisicao.params.idCategoria;

            const categoria = new Categoria(idCategoria);

            const conexao = await Database.getInstance().getConnection();
            try{
                if (categoria.validarId(categoria)) {                
                    categoria.excluir(conexao, categoria)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Categoria excluída com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível excluir a categoria: " + erro.message
                            });
                        });
                }
                else {
                    resposta.status(400).json(
                        {
                            "status": false,
                            "mensagem": "Informe um id válido de uma categoria conforme documentação da API."
                        }
                    );
                }
            }
            catch(erro){
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível excluir a categoria (Conexão): " + erro.message
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
            let idCategoria = requisicao.params.idCategoria;
            if (isNaN(idCategoria)) {
                idCategoria = "";
            }

            const categoria = new Categoria();
            const conexao = await Database.getInstance().getConnection();
            try{
                categoria.consultar(conexao, idCategoria)
                .then((listaCategorias) => {
                    resposta.status(200).json(
                        listaCategorias
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar categorias: " + erro.message
                        }
                    );
                });
            }
            catch (erro) {
                resposta.status(500).json(
                    {
                        "status": false,
                        "mensagem": "Erro ao consultar categorias (Conexão): " + erro.message
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
