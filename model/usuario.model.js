import UsuarioPersistence from "../persistence/usuario.persistence.js";

export default class Usuario {
    #email;
    #senha;
    #privilegio;

    constructor(email = "", senha = "", privilegio = "") {
        this.#email = email;
        this.#senha = senha;
        this.#privilegio = privilegio;
    }

    get email() {
        return this.#email;
    }

    get senha() {
        return this.#senha;
    }

    get privilegio() {
        return this.#privilegio;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    set senha(novaSenha) {
        this.#senha = novaSenha;
    }

    set privilegio(novoPrivilegio) {
        this.#privilegio = novoPrivilegio;
    }

    validarUsuario(usuario) {
        if (usuario instanceof Usuario) {
            if (usuario.email != "" && usuario.senha != "" && usuario.privilegio != "") {
                return 1;
            }

            return 0;
        }
    }

    validarEmail(usuario) {
        if (usuario instanceof Usuario) {
            if (usuario.email != "") {
                return 1;
            }

            return 0;
        }
    }

    async incluir(conexao, usuario) {
        const usuarioPersist = new UsuarioPersistence();
        return await usuarioPersist.incluir(conexao, usuario);
    }

    async editar(conexao, usuario) {
        const usuarioPersist = new UsuarioPersistence();
        return await usuarioPersist.alterar(conexao, usuario);
    }

    async excluir(conexao, usuario) {
        const usuarioPersist = new UsuarioPersistence();
        return await usuarioPersist.excluir(conexao, usuario);
    }

    async consultar(conexao, termo) {
        const usuarioPersist = new UsuarioPersistence();
        return await usuarioPersist.consultar(conexao, termo);
    }
}
