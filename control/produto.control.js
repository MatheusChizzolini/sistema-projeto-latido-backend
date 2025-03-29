import Produto from "../model/produto.model.js";
import Database from "../model/database.js"
import Categoria from "../model/categoria.model.js";

export default class ProdutoControl {

    async gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const descricao = requisicao.body.descricao;
            const marca = requisicao.body.marca;
            const quantidade = requisicao.body.quantidade;

            const categoria = requisicao.body.categoria;
            const idCategoria = new Categoria(categoria.idCategoria);

            const produto = new Produto(0, descricao, marca, quantidade, idCategoria);

            const conexao = await Database.getInstance().getConnection();
            try {
                if (produto.validarProduto(produto)) {
                    produto.incluir(conexao, produto)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Produto adicionado com sucesso!",
                                "idProduto": produto.idProduto
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível incluir o produto: " + erro.message
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
            catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível incluir o produto (Conexão): " + erro.message
                });
            }
        }
    }

    async editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const idProduto = requisicao.params.idProduto;
            const descricao = requisicao.body.descricao;
            const marca = requisicao.body.marca;
            const quantidade = requisicao.body.quantidade;
            const categoria = requisicao.body.categoria;
            const idCategoria = new Categoria(categoria.idCategoria);

            const produto = new Produto(idProduto, descricao, marca, quantidade, idCategoria);
            const conexao = await Database.getInstance().getConnection();
            try {
                if (produto.validarProduto(produto)) {
                    produto.editar(conexao, produto)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Produto editado com sucesso!",
                                "codigo": produto.idProduto
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível editar o produto: " + erro.message
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
            catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível editar o produto (Conexão): " + erro.message
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
            const idProduto = requisicao.params.idProduto;

            const produto = new Produto(idProduto);
            const conexao = await Database.getInstance().getConnection();
            try {
                if (produto.validarIdProduto(produto.idProduto)) {
                    produto.excluir(conexao, produto)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Produto excluído com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível excluir o produto: " + erro.message
                            });
                        });
                }
                else {
                    resposta.status(400).json(
                        {
                            "status": false,
                            "mensagem": "Informe um código válido de um produto conforme documentação da API."
                        }
                    );
                }
            }
            catch (erro) {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível excluir o produto (Conexão): " + erro.message
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
            const termo = requisicao.query.search;

            const produto = new Produto();
            const conexao = await Database.getInstance().getConnection();
            try {
                produto.consultar(conexao, termo)
                    .then((listaProdutos) => {
                        resposta.status(200).json(
                            listaProdutos
                        );
                    })
                    .catch((erro) => {
                        resposta.status(500).json(
                            {
                                "status": false,
                                "mensagem": "Erro ao consultar produtos: " + erro.message
                            }
                        );
                    });
            }
            catch (erro) {
                resposta.status(500).json(
                    {
                        "status": false,
                        "mensagem": "Erro ao consultar produtos (Conexão): " + erro.message
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