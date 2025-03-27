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
            if (!animal.nome || !animal.raca) {
                throw new Error("Todos os campos devem ser preenchidos!");
            }

            const sql = `
                INSERT INTO Animal (nome, raca, status, peso, porte, observacao, chip)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const parametros = [
                animal.nome,
                animal.raca,
                animal.status,
                animal.peso,
                animal.porte,
                animal.observacao,
                animal.chip
            ];
            const [resultado] = await conexao.execute(sql, parametros);
            animal.id = resultado.insertId;
        }
    }

    async alterar(conexao, animal) {
        if (animal instanceof Animal) {
            const sql = `
                UPDATE Animal 
                SET nome = ?, raca = ?, status = ?, peso = ?, porte = ?, observacao = ?, chip = ? 
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
                animal.id
            ];
            await conexao.execute(sql, parametros);
        }
    }

    async deletar(conexao, animal) {
        if (animal instanceof Animal) {
            const sql = `DELETE FROM Animal WHERE id = ?`;
            const parametros = [animal.id];
            await conexao.execute(sql, parametros);
        }
    }

    async consultar(conexao, termo) {
        let sql = "";
        let parametros = [];

        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM Animal WHERE nome LIKE ?`;
            parametros = [`%${termo}%`];
        } else {
            sql = `SELECT * FROM Animal WHERE id = ?`;
            parametros = [termo];
        }

        const [linhas] = await conexao.execute(sql, parametros);
        return linhas.map(linha => ({
            id: linha.id,
            nome: linha.nome,
            raca: linha.raca,
            status: linha.status,
            peso: linha.peso,
            porte: linha.porte,
            observacao: linha.observacao,
            chip: linha.chip
        }));
    }
}
