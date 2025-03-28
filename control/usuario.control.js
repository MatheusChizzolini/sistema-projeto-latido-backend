import Database from "../model/database.js";
import Usuario from "../model/usuario.model.js"

export default class UsuarioControl {
    async gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;
            const privilegio = requisicao.body.privilegio;

            const usuario = new Usuario(email, senha, privilegio);

            const conexao = await Database.getInstance().getConnection();
            try {
                if (usuario.validarUsuario(usuario)) {
                    usuario.incluir(conexao, usuario)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Usuário adicionado com sucesso!"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível incluir o usuário: " + erro.message
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
                    "mensagem": "Não foi possível incluir o usuario (Conexão): " + erro.message
                });
            }
        }
    }

    async editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;
            const privilegio = requisicao.body.privilegio;

            const usuario = new Usuario(email, senha, privilegio);
            const conexao = await Database.getInstance().getConnection();
            try{
                if (usuario.validarUsuario(usuario)) {
                   usuario.editar(conexao,usuario)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Usuário editado com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível editar o usuário: " + erro.message
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
                    "mensagem": "Não foi possível editar o usuário (Conexão): " + erro.message
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
            const email = requisicao.params.email;

            const usuario = new Usuario(email);
            const conexao = await Database.getInstance().getConnection();
            try{
                if (usuario.validarEmail(usuario)) {                
                    usuario.excluir(conexao, usuario)
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Usuário excluído com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível excluir o usuário: " + erro.message
                            });
                        });
                }
                else {
                    resposta.status(400).json(
                        {
                            "status": false,
                            "mensagem": "Informe um email válido de um usuario conforme documentação da API."
                        }
                    );
                }
            }
            catch(erro){
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível excluir o usuário (Conexão): " + erro.message
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
            let email = requisicao.query.email;
    
            if (!email) {
                email = "";
            }
    
            const usuario = new Usuario();
            const conexao = await Database.getInstance().getConnection();
            try{
                usuario.consultar(conexao, email)
                .then((listaUsuarios) => {
                    resposta.status(200).json(
                        listaUsuarios
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar usuários: " + erro.message
                        }
                    );
                });
            }
            catch (erro) {
                resposta.status(500).json(
                    {
                        "status": false,
                        "mensagem": "Erro ao consultar usuários (Conexão): " + erro.message
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
