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
}