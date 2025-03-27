import CategoriaPersistence from "../persistence/categoria.persistence.js";

export default class Categoria {
    #idCategoria 
    #nomeCategoria

    constructor(idCategoria = 0, nomeCategoria = "") {
        this.#idCategoria = idCategoria;
        this.#nomeCategoria = nomeCategoria;
    }

    get idCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(novoidCategoria) {
        this.#idCategoria = novoidCategoria;
    }

    get nomeCategoria() {
        return this.#nomeCategoria;
    }

    set nomeCategoria(novoNomeCategoria) {
        this.#nomeCategoria = novoNomeCategoria;
    }

    

    validarCategoria(categoria) {
        if (categoria instanceof Categoria) {
            if (categoria.nomeCategoria && categoria.nomeCategoria.trim() !== "") {
                return 1;
            }
            return 0;
        }
    }

    validarId(categoria) {
        if (categoria instanceof Categoria) {
            if (categoria.idCategoria > 0) {
                return 1;
            }
            return 0;
        }
    }

    async incluir(conexao, categoria) {
        const categoriaPersist = new CategoriaPersistence();
        return await categoriaPersist.incluir(conexao, categoria);
    }

    async editar(conexao, categoria) {
        const categoriaPersist = new CategoriaPersistence();
        return await categoriaPersist.alterar(conexao, categoria);
    }

    async excluir(conexao, categoria) {
        const categoriaPersist = new CategoriaPersistence();
        return await categoriaPersist.excluir(conexao, categoria);
    }

    async consultar(conexao, termo) {
        const categoriaPersist = new CategoriaPersistence();
        return await categoriaPersist.consultar(conexao, termo);
    }
}
