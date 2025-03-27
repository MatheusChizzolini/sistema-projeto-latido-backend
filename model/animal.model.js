
import AnimalDAO from "../persistence/animal.persistence.js";
export default class Animal
{
    #id;
    #nome;
    #raca;
    #status;
    #peso;
    #porte;
    #observacao;
    #chip;

    constructor(id=0, nome="", raca="", status="", peso=0, porte="", observacao="", chip=0)
    {
        this.#id=id;
        this.#nome=nome;
        this.#raca=raca;
        this.#status=status;
        this.#peso=peso;
        this.#porte=porte;
        this.#observacao=observacao;
        this.#chip=chip
    }

    get id()
    {
        return this.#id;
    }

    set id(value)
    {
        this.#id=value;
    }
    get nome()
    {
        return this.#nome;
    }

    set nome(value)
    {
        this.#nome=value;
    }
    get raca()
    {
        return this.#raca;
    }

    set raca(value)
    {
        this.#raca=value;
    }
    get status()
    {
        return this.#status;
    }

    set status(value)
    {
        this.#status=value;
    }
    get peso()
    {
        return this.#peso;
    }

    set peso(value)
    {
        this.#peso=value;
    }
    get porte()
    {
        return this.#porte;
    }

    set porte(value)
    {
        this.#porte=value;
    }
    get observacao()
    {
        return this.#observacao;
    }

    set observacao(value)
    {
        this.#observacao=value;
    }
    get chip()
    {
        return this.#chip;
    }

    set chip(value)
    {
        this.#chip=value
    }

    toJSON()
    {
        return{
            "id": this.#id,
            "nome": this.#nome,
            "raca":this.#raca,
            "status":this.#status,
            "peso":this.#peso,
            "porte":this.#porte,
            "observacao":this.#observacao,
            "chip": this.#chip
        };
    }
    
    async incluir()
    {
        const animalDAO = new AnimalDAO();
        await animalDAO.incluir(this);
    }

    async consultar()
    {
        const animalDAO = new AnimalDAO();
        return await animalDAO.consultar(termo);
    }

    async deletar()
    {
        const animalDAO = new AnimalDAO();
        await animalDAO.deletar(this);
    }

    async alterar()
    {
        const animalDAO = new AnimalDAO();
        await animalDAO.alterar(this);
    }
}
