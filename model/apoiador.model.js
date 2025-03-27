export default class Apoiador {
    #idAdotante;
    #cpf;
    #nome;
    #email;
    #endereco;
    #telefone;

    constructor(idAdotante = 0, cpf = "", nome = "", email = "", endereco = "", telefone = ""){
        this.#idAdotante = idAdotante;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#email = email;
        this.#endereco = endereco;
        this.#telefone = telefone;
    }

    get idAdotante(){
        return this.#idAdotante;
    }

    set idAdotante(value){
        this.#idAdotante = value;   
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    async incluir(conexao, apoiador){
        const apoiadorPersist = new ApoiadorPersistence();
        return await apoiadorPersist.incluir(conexao, apoiador);
    }

    async editar(conexao, apoiador){
        const apoiadorPersist = new ApoiadorPersistence();
        return await apoiadorPersist.editar(conexao, apoiador);
    }

    async excluir(conexao, apoiador){
        const apoiadorPersist = new ApoiadorPersistence();
        return await apoiadorPersist.excluir(conexao, apoiador);
    }

    async consultar(conexao, termo){
        const apoiadorPersist = new ApoiadorPersistence();
        return await apoiadorPersist.consultar(conexao, termo);
    }

    validarApoiador(apoiador) {
        if (apoiador instanceof Apoiador) {
            if (apoiador.email != "" && apoiador.cpf != "" && apoiador.idAdotante!= 0) {
                return 1;
            }
            return 0;
        }
    }

    validarIdAdotante(idAdotante){
        if(idAdotante > 0){
            return 1;
        }
        return 0;
    }
}