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
                    email VARCHAR(45) NOT NULL,
                    senha VARCHAR(45) NOT NULL,
                    privilegio CHAR(1) NOT NULL,
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
            const sql = `INSERT INTO usuario(email, senha, privilegio) values (?, ?, ?)`;

            let parametros = [
                usuario.email,
                usuario.senha,
                usuario.privilegio
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(conexao, usuario) {
        if (usuario instanceof Usuario) {
            const sql = `UPDATE usuario SET senha = ?, privilegio = ? WHERE email = ?`;

            let parametros = [
                usuario.senha,
                usuario.privilegio,
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
            parametros = [termo];
        }

        const [dataBase, campos] = await conexao.execute(sql, parametros);
        await conexao.release();
        return dataBase;
    }
}
