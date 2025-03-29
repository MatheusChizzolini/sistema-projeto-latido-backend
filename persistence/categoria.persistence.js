import Categoria from "../model/categoria.model.js";
import Database from "../model/database.js";
export default class CategoriaPersistence {


    constructor (){
        this.init();
    }

    async init() {
        try {
            const conexao = await Database.getInstance().getConnection();
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    idCategoria INT NOT NULL AUTO_INCREMENT,
                    nomeCategoria VARCHAR(45) NOT NULL,
                    CONSTRAINT pk_categoria PRIMARY KEY(idCategoria)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (erro) {
            console.error("Erro ao iniciar a tabela categoria:", erro); // Registra o erro completo
        }
    }

    async incluir(conexao, categoria) {
        if (categoria instanceof Categoria) {
            const sql = `INSERT INTO categoria(nomeCategoria) values (?)`;

            let parametros = [categoria.nomeCategoria];

            const resultado = await conexao.execute(sql, parametros);
            categoria.idCategoria = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(conexao, categoria) {
        if (categoria instanceof Categoria) {
            const sql = `UPDATE categoria SET nomeCategoria = ? WHERE idCategoria = ?`;

            let parametros = [categoria.nomeCategoria,categoria.idCategoria];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
    
    async excluir(conexao, categoria) {
        if (categoria instanceof Categoria) {
            const sql = `DELETE FROM categoria WHERE idCategoria = ?`;
            let parametros = [categoria.idCategoria];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(conexao, termo) {
        let sql = "SELECT * FROM categoria";
        let parametros = [];

        if (termo) {
            sql += ` WHERE idCategoria LIKE ?`;
            parametros = [termo];
        }

        const [dataBase, campos] = await conexao.execute(sql, parametros);
        await conexao.release();
        return dataBase;
    }
}
