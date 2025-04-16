import AnimalDAO from "../persistence/animal.persistence.js";

export default class Animal {
    #id;
    #nome;
    #raca;
    #status;
    #peso;
    #porte;
    #observacao;
    #chip;
    #sexo;
    #foto;

    constructor(id = 0, nome = "", raca = "", status = "", peso = 0, porte = "", observacao = "", chip = 0, sexo = "", foto = "") {
        this.#id = id;
        this.#nome = nome;
        this.#raca = raca;
        this.#status = status;
        this.#peso = peso;
        this.#porte = porte;
        this.#observacao = observacao;
        this.#chip = chip;
        this.#sexo = sexo;
        this.#foto = foto;
    }

    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get raca() {
        return this.#raca;
    }

    set raca(novaRaca) {
        this.#raca = novaRaca;
    }

    get status() {
        return this.#status;
    }

    set status(novoStatus) {
        this.#status = novoStatus;
    }

    get peso() {
        return this.#peso;
    }

    set peso(novoPeso) {
        this.#peso = novoPeso;
    }

    get porte() {
        return this.#porte;
    }

    set porte(novoPorte) {
        this.#porte = novoPorte;
    }

    get observacao() {
        return this.#observacao;
    }

    set observacao(novaObs) {
        this.#observacao = novaObs;
    }

    get chip() {
        return this.#chip;
    }

    set chip(novoChip) {
        this.#chip = novoChip;
    }

    get sexo() {
        return this.#sexo;
    }

    set sexo(novoSexo) {
        this.#sexo = novoSexo;
    }

    get foto() {
        return this.#foto;
    }

    set foto(novaFoto) {
        this.#foto = novaFoto;
    }

    validarAnimal(animal) {
        if (animal instanceof Animal) {
            if (
                animal.nome !== "" &&
                animal.raca !== "" &&
                animal.status !== "" &&
                animal.peso > 0 &&
                animal.porte !== "" &&
                animal.observacao !== "" &&
                animal.chip !== "" &&
                animal.sexo !== "" &&
                animal.foto !== ""
            ) {
                return 1;
            }
            return 0;
        }
    }

    validarIdAnimal(id) {
        if(id > 0){
            return 1;
        }
        return 0;
    }

    async incluir(conexao, animal) {
        const animalDAO = new AnimalDAO();
        return await animalDAO.incluir(conexao, animal);
    }

    async consultar(conexao, termo) {
        const animalDAO = new AnimalDAO();
        return await animalDAO.consultar(conexao, termo);
    }

    async excluir(conexao, animal) {
        const animalDAO = new AnimalDAO();
        return await animalDAO.excluir(conexao, animal);
    }

    async editar(conexao, animal) {
        const animalDAO = new AnimalDAO();
        return await animalDAO.editar(conexao, animal);
    }
}
