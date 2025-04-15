import UsuarioPersistence from "../persistence/usuario.persistence.js";

export default class Usuario {
    #email;
    #senha;
    #senhaConfirmada;
    #privilegio;
    #nome;
    #telefone;

    constructor(email = "", senha = "", senhaConfirmada = "", privilegio = "", nome = "", telefone = "") {
        this.#email = email;
        this.#senha = senha;
        this.#senhaConfirmada = senhaConfirmada;
        this.#privilegio = privilegio;
        this.#nome = nome;
        this.#telefone = telefone;
    }

    get email() {
        return this.#email;
    }

    get senha() {
        return this.#senha;
    }

    get senhaConfirmada() {
        return this.#senhaConfirmada;
    }

    get privilegio() {
        return this.#privilegio;
    }

    get nome() {
        return this.#nome;
    }

    get telefone() {
        return this.#telefone;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    set senha(novaSenha) {
        this.#senha = novaSenha;
    }

    set senhaConfirmada(novaSenhaConfirmada) {
        this.#senhaConfirmada = novaSenhaConfirmada;
    }

    set privilegio(novoPrivilegio) {
        this.#privilegio = novoPrivilegio;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    validarUsuario(usuario) {
        if (usuario instanceof Usuario) {
            if (usuario.email != "" && usuario.senha != "" && usuario.senhaConfirmada != "" && usuario.privilegio != "" && usuario.nome  != "" && usuario.telefone != "") {
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

    async contaAdm(conexao) {
        const usuarioPersist = new UsuarioPersistence();
        return await usuarioPersist.contaAdm(conexao);
    }

    async login(conexao, termo) {
        const usuarioPersist = new UsuarioPersistence();
        return await usuarioPersist.login(conexao, termo);
    }
}
