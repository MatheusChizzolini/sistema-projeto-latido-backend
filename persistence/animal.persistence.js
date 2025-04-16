import Animal from "../model/animal.model.js";
import Database from "../model/database.js";

export default class AnimalDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await Database.getInstance().getConnection();
            const sql = `
                CREATE TABLE IF NOT EXISTS Animal (
                    id INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(50) NOT NULL,
                    raca VARCHAR(50) NOT NULL,
                    status VARCHAR(5) NOT NULL,
                    peso FLOAT NOT NULL,
                    porte CHAR(1),
                    observacao VARCHAR(500) NOT NULL,
                    chip INT NOT NULL,
                    sexo VARCHAR(10) NOT NULL,
                    foto VARCHAR(255) NOT NULL,
                    CONSTRAINT pk_id PRIMARY KEY (id)
                );
            `;
            await conexao.execute(sql);
        } catch (erro) {
            console.error("Erro ao iniciar a tabela Animal:", erro);
        }
    }

    async incluir(conexao, animal) {
        if (animal instanceof Animal) {
            const sql = `
                INSERT INTO Animal (nome, raca, status, peso, porte, observacao, chip, sexo, foto)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const parametros = [
                animal.nome,
                animal.raca,
                animal.status,
                animal.peso,
                animal.porte,
                animal.observacao,
                animal.chip,
                animal.sexo,
                animal.foto
            ];
            const resultado = await conexao.execute(sql, parametros);
            animal.id = resultado[0].insertId;
            await conexao.release();
        }
    }

    async editar(conexao, animal) {
        if (animal instanceof Animal) {
            const sql = `
                UPDATE Animal 
                SET nome = ?, raca = ?, status = ?, peso = ?, porte = ?, observacao = ?, chip = ?, sexo = ?, foto = ? 
                WHERE id = ?
            `;
            const parametros = [
                animal.nome,
                animal.raca,
                animal.status,
                animal.peso,
                animal.porte,
                animal.observacao,
                animal.chip,
                animal.sexo,
                animal.foto
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(conexao, animal) {
        if (animal instanceof Animal) {
            const sql = `DELETE FROM Animal WHERE id = ?`;
            let parametros = [animal.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(conexao, termo) {
        let sql = "SELECT * FROM animal";
        let parametros = [];
    
        if (termo) {
            const id = parseInt(termo);
            if (!isNaN(id)) {
                sql += ` WHERE id = ?`;
                parametros = [id];
            } else {
                sql += ` WHERE nome LIKE ?`;
                parametros = [`%${termo}%`];
            }
        }
    
        const [dataBase, campos] = await conexao.execute(sql, parametros);
        await conexao.release();
        return dataBase;
    }
}
