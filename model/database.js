import mysql from "mysql2/promise";

class Database {
    static #instance;
    #pool;

    constructor() {
        if (Database.#instance) {
            throw new Error("A instância do banco de dados já foi criada. Use Database.getInstance().");
        }

        try {
            this.#pool = mysql.createPool({
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '',
                database: 'svpldb',
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            console.log("Banco de dados conectado com sucesso.");
        } catch (erro) {
            console.error("Erro ao conectar ao banco de dados:", erro);
            throw erro;
        }
    }

    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }
        return Database.#instance;
    }

    async getConnection() {
        return await this.#pool.getConnection();
    }

    async closePool() {
        try {
            await this.#pool.end();
            console.log("Conexão com o banco de dados encerrada.");
        } catch (erro) {
            console.error("Erro ao fechar conexões do banco:", erro);
        }
    }
}

export default Database;
