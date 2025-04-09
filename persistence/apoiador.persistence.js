import Apoiador from "../model/apoiador.model.js";
import Database from "../model/database.js";

export default class ApoiadorDAO {
    constructor(){
        this.init();
    }
        async init() {
        try {
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

            await conexao.execute(sql);
            await conexao.release();
            
        } catch (erro) {
            console.log("Não foi possível iniciar o banco de dados: " + erro.message);
        }
    }

    async incluir(conexao, apoiador) {
        if (apoiador instanceof Apoiador) {
            const sql = `INSERT INTO apoiador(cpf, nome, email, endereco, telefone) VALUES (?, ?, ?, ?, ?)`;

            let parametros = [
                apoiador.cpf.replace(/[^\d]+/g, ""),
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
            const sql = `UPDATE apoiador SET  nome = ?, email = ?, endereco = ?, telefone = ? WHERE cpf = ?`;

            let parametros = [
                apoiador.nome,
                apoiador.email,
                apoiador.endereco,
                apoiador.telefone,
                apoiador.cpf.replace(/[^\d]+/g, "")
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(conexao, apoiador) {
        if (apoiador instanceof Apoiador) {
            const sql = `DELETE FROM apoiador WHERE idApoiador = ?`;

            let parametros = [
                apoiador.idApoiador
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(conexao, termo) {
        let sql = "SELECT * FROM apoiador";
        let parametros = [];    
        if(termo){
            termo = termo.replace(/[^\d]+/g, "");
            sql += ` WHERE cpf LIKE ?`;
            termo = [`%${termo}%`];
            parametros = termo;
        }
        const [dataBase, campos] = await conexao.execute(sql, parametros);
        await conexao.release();
        return dataBase;
    }
    
}
