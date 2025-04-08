import ApoiadorDAO from "../persistence/apoiador.persistence.js";

export default class Apoiador {
    #idApoiador;
    #cpf;
    #nome;
    #email;
    #endereco;
    #telefone;

    constructor(idApoiador = 0, cpf = "", nome = "", email = "", endereco = "", telefone = "") {
        this.#idApoiador = idApoiador;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#email = email;
        this.#endereco = endereco;
        this.#telefone = telefone;
    }

    // Getters e Setters
    get idApoiador() { return this.#idApoiador; }
    set idApoiador(value) { this.#idApoiador = value; }

    get cpf() { return this.#cpf; }
    set cpf(novoCpf) { this.#cpf = novoCpf; }

    get nome() { return this.#nome; }
    set nome(novoNome) { this.#nome = novoNome; }

    get email() { return this.#email; }
    set email(novoEmail) { this.#email = novoEmail; }

    get endereco() { return this.#endereco; }
    set endereco(novoEndereco) { this.#endereco = novoEndereco; }

    get telefone() { return this.#telefone; }
    set telefone(novoTelefone) { this.#telefone = novoTelefone; }

    // Métodos Assíncronos
    async incluir(conexao) {
        const apoiadorDAO = new ApoiadorDAO();
        return await apoiadorDAO.incluir(conexao, this);
    }

    async editar(conexao) {
        const apoiadorDAO = new ApoiadorDAO();
        return await apoiadorDAO.alterar(conexao, this);
    }

    async excluir(conexao) {
        const apoiadorDAO = new ApoiadorDAO();
        return await apoiadorDAO.excluir(conexao, this);
    }

    async consultar(conexao, termo) {
        const apoiadorDAO = new ApoiadorDAO();
        return await apoiadorDAO.consultar(conexao, termo);
    }

    // Validações
    validarApoiador() {
        return this.#email !== "" && this.#cpf !== "";
    }

    validarIdApoiador() {
        return this.#idApoiador > 0;
    }
    
    validarCpf() {
        return this.#cpf.length === 11 && !isNaN(this.#cpf);
    }
    
}
