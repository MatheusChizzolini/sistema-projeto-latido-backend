import Produto from "../model/produto.model.js";
//import Categoria from "../model/categoria.model.js"; se for esse o nome
import Database from "../model/database.js";

export default class ProdutoPersistence {

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
            produto.codigo = resultado[0].insertId;
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
            sql = `SELECT * FROM produto p
                   INNER JOIN categoria c ON p.idCategoria = c.idCategoria
                   WHERE descricao LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM produto p
                   INNER JOIN categoria c ON p.idCategoria = c.idCategoria
                   WHERE idProduto = ?`
            parametros = [termo];
        }

        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaProdutos = [];
        for (const linha of linhas) {
            //const categoria = new Categoria(linha.idCategoria,linha.descricao);
            const produto = {
                codigo:linha.idProduto,
                descricao:linha.descricao,
                marca:linha.marca,
                quantidade:linha.quantidade
                //categoria
            };
            //console.log(JSON.stringify(categoria));
            listaProdutos.push(produto);
            console.log(JSON.stringify(produto));
        }
        conexao.release();
        return listaProdutos;
    }
    
}