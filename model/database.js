import mysql from "mysql2/promise";

class Database {
    static #instance;

    constructor() {
        if (Database.#instance) {
            throw new Error("Erro ao obter instância.");
        }

        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'svpldb',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }
        return Database.#instance;
    }

    async getConnection() {
        return await this.pool.getConnection();
    }
}

export default Database;