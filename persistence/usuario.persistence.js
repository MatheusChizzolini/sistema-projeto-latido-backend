import Usuario from "../model/usuario.model.js";

export default class UsuarioPersistence {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await Database.getInstance().getConnection();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario (
                    email VARCHAR(40) NOT NULL,
                    senha VARCHAR(30) NOT NULL,
                    senha_confirmada VARCHAR(30) NOT NULL,
                    privilegio CHAR(1) NOT NULL,
                    nome VARCHAR(45) NOT NULL,
                    telefone VARCHAR(15) NOT NULL,
                    CONSTRAINT PK_USU PRIMARY KEY (email)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(error) {
            console.log("Não foi possível iniciar o banco de dados: " + error.message);
        }
    }

    async incluir(conexao, usuario) {
        if (usuario instanceof Usuario) {
            const sql = `INSERT INTO usuario(email, senha, senha_confirmada, privilegio, nome, telefone) values (?, ?, ?, ?, ?, ?)`;

            let parametros = [
                usuario.email,
                usuario.senha,
                usuario.senhaConfirmada,
                usuario.privilegio,
                usuario.nome,
                usuario.telefone
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(conexao, usuario) {
        if (usuario instanceof Usuario) {
            const sql = `UPDATE usuario SET senha = ?, senha_confirmada = ?, privilegio = ?, nome = ?, telefone = ? WHERE email = ?`;

            let parametros = [
                usuario.senha,
                usuario.senhaConfirmada,
                usuario.privilegio,
                usuario.nome,
                usuario.telefone,
                usuario.email
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
    
    async excluir(conexao, usuario) {
        if (usuario instanceof Usuario) {
            const sql = `DELETE FROM usuario WHERE email = ?`;

            let parametros = [
                usuario.email
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(conexao, termo) {
        let sql = "SELECT * FROM usuario";
        let parametros = [];

        if (termo) {
            sql += ` WHERE email LIKE ?`;
            parametros = ['%' + termo + '%'];
        }

        const [dataBase] = await conexao.execute(sql, parametros);
        await conexao.release();
        return dataBase;
    }

    async contaAdm(conexao) {
        const sql = `SELECT COUNT(*) AS total FROM usuario WHERE privilegio = 'A'`;
        const [resultado] = await conexao.execute(sql);
        await conexao.release();
        return resultado[0].total;
    }

    async login(conexao, termo) {
        const sql = `SELECT senha, privilegio FROM usuario WHERE email = ?`;
        let parametros = [termo];
        const [dataBase] = await conexao.execute(sql,parametros);
        await conexao.release();
        return dataBase ? dataBase[0] : null;
    }
}
