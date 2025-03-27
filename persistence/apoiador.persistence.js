import Apoiador from "../model/apoiador.model.js";
import Database from "../model/database.js";

export default class ApoiadorDAO {
    static async init() {
        const conexao = await Database.getInstance().getConnection();

        const sql = `
            CREATE TABLE IF NOT EXISTS apoiador (
                idApoiador INT AUTO_INCREMENT PRIMARY KEY,
                cpf VARCHAR(14) NOT NULL UNIQUE,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                endereco VARCHAR(200) NOT NULL,
                telefone VARCHAR(15) NOT NULL
            );
        `;

        try {
            await conexao.execute(sql);
            console.log("Tabela 'apoiador' criada com sucesso!");
        } catch (erro) {
            console.error("Erro ao criar a tabela 'apoiador': ", erro.message);
        } finally {
            await conexao.release();
        }
    }

    async incluir(conexao, apoiador) {
        if (apoiador instanceof Apoiador) {
            const sql = `INSERT INTO apoiador(cpf, nome, email, endereco, telefone) VALUES (?, ?, ?, ?, ?)`;

            const parametros = [
                apoiador.cpf,
                apoiador.nome,
                apoiador.email,
                apoiador.endereco,
                apoiador.telefone
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(conexao, apoiador) {
        if (apoiador instanceof Apoiador) {
            const sql = `UPDATE apoiador SET cpf = ?, nome = ?, email = ?, endereco = ?, telefone = ? WHERE idApoiador = ?`;

            const parametros = [
                apoiador.cpf,
                apoiador.nome,
                apoiador.email,
                apoiador.endereco,
                apoiador.telefone,
                apoiador.idApoiador
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(conexao, apoiador) {
        if (apoiador instanceof Apoiador) {
            const sql = `DELETE FROM apoiador WHERE idApoiador = ?`;

            const parametros = [
                apoiador.idApoiador
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(conexao, termo) {
        let sql = "SELECT * FROM apoiador";
        const parametros = [];

        if (termo) {
            sql += ` WHERE nome LIKE ? OR email LIKE ? OR cpf LIKE ?`;
            parametros.push(`%${termo}%`, `%${termo}%`, `%${termo}%`);
        }

        const [dataBase, campos] = await conexao.execute(sql, parametros);
        await conexao.release();
        return dataBase;
    }
}
