import Produto from "../model/produto.model.js";
import Categoria from "../model/categoria.model.js";
import Database from "../model/database.js";

export default class ProdutoPersistence {
    constructor(){
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await Database.getInstance().getConnection();
            const sql = `
            CREATE TABLE IF NOT EXISTS produto(
                idProduto INT NOT NULL AUTO_INCREMENT,
                descricao VARCHAR(45) NOT NULL,
                marca VARCHAR(45) NOT NULL,
                quantidade INT NOT NULL,
                idCategoria INT NOT NULL,
                CONSTRAINT pk_produto PRIMARY KEY(idProduto),
                CONSTRAINT fk_categoria FOREIGN KEY(idCategoria) REFERENCES categoria(idCategoria)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(conexao, produto) {
        if (produto instanceof Produto) {
            const sql = `INSERT INTO produto(descricao, marca, quantidade, idCategoria)
                values(?,?,?,?)
            `;
            let parametros = [
                produto.descricao,
                produto.marca,
                produto.quantidade,
                produto.categoria.idCategoria
            ];

            const resultado = await conexao.execute(sql, parametros);
            produto.idProduto = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(conexao, produto) {
        if (produto instanceof Produto) {
            const sql = `UPDATE produto SET descricao = ?, marca = ?, quantidade = ?, idCategoria = ? WHERE idProduto = ?
            `;
            let parametros = [
                produto.descricao,
                produto.marca,
                produto.quantidade,
                produto.categoria.idCategoria,
                produto.idProduto
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(conexao, produto) {
        if (produto instanceof Produto) {
            const sql = `DELETE FROM produto WHERE idProduto = ?`;
            let parametros = [
                produto.idProduto
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(conexao, termo) {
        let sql = "";
        let parametros = [];
    
        if (isNaN(parseInt(termo))) {   
            sql = `SELECT p.*, c.idCategoria, c.nomeCategoria
                   FROM produto p
                   LEFT JOIN categoria c ON p.idCategoria = c.idCategoria
                   WHERE p.descricao LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT p.*, c.idCategoria, c.nomeCategoria 
                   FROM produto p
                   LEFT JOIN categoria c ON p.idCategoria = c.idCategoria
                   WHERE p.idProduto = ?`;
            parametros = [termo];
        }
    
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaProdutos = [];
    
        for (const linha of linhas) {
            const categoria = linha.idCategoria 
                ? { idCategoria: linha.idCategoria, nomeCategoria: linha.nomeCategoria }
                : null;
    
            const produto = {
                idProduto: linha.idProduto,
                descricao: linha.descricao,
                marca: linha.marca,
                quantidade: linha.quantidade,
                categoria
            };
    
            listaProdutos.push(produto);
        }
    
        conexao.release();
        return listaProdutos;
    }
    
    
    
}