import ProdutoDAO from "../persistence/produto.persistence.js";
import Categoria from "./categoria.model.js"; // se for esse nome, senão muda dps

export default class Produto{
    //Atributos
    #idProduto
    #descricao
    #marca
    #quantidade
    #categoria

    //Get e Set's

    get idProduto(){
        return this.#idProduto;
    }

    set idProduto(novoId){
        this.#idProduto = novoId;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get marca(){
        return this.#marca;
    }

    set marca(novaMarca){
        this.#marca = novaMarca;
    }

    get quantidade(){
        return this.#quantidade;
    }

    set quantidade(novaQtd){
        this.#quantidade = novaQtd;
    }

    get categoria(){
        return this.#categoria
    }

    set categoria(novaCategoria){
        if (novaCategoria instanceof Categoria){
            this.#categoria = novaCategoria;
        }
    }

    //Constructor
    constructor(idProduto = 0, descricao = "", marca = "", quantidade = 0, categoria = {}){
        this.#idProduto = idProduto;
        this.#descricao = descricao;
        this.#marca = marca;
        this.#quantidade = quantidade;
        this.#categoria = categoria;
    }


}