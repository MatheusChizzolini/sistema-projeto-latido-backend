
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

    set id(novoId)
    {
        this.#id=novoId;
    }
    get nome()
    {
        return this.#nome;
    }

    set nome(novoNome)
    {
        this.#nome=novoNome;
    }
    get raca()
    {
        return this.#raca;
    }

    set raca(novaRaca)
    {
        this.#raca=novaRaca;
    }
    get status()
    {
        return this.#status;
    }

    set status(novoStatus)
    {
        this.#status=novoStatus;
    }
    get peso()
    {
        return this.#peso;
    }

    set peso(novoPeso)
    {
        this.#peso=novoPeso;
    }
    get porte()
    {
        return this.#porte;
    }

    set porte(novoPorte)
    {
        this.#porte=novoPorte;
    }
    get observacao()
    {
        return this.#observacao;
    }

    set observacao(novaObs)
    {
        this.#observacao=novaObs;
    }
    get chip()
    {
        return this.#chip;
    }

    set chip(novoChip)
    {
        this.#chip=novoChip
    }

    validarAnimal(animal)
    {
        if(animal instanceof Animal)
        {
            if(animal.nome != "" && animal.raca != "")
                return 1;       
            return 0;
        }
    }

    validarIdAnimal(idAnimal)
    {
        if(idAnimal>0)
            return 1;
        return 0;
    }

    async incluir(conexao, animal)
    {
        const animalDAO = new AnimalDAO();
        return await animalDAO.incluir(conexao, animalctrl);
    }

    async consultar(conexao, termo)
    {
        const animalDAO = new AnimalDAO();
        return await animalDAO.consultar(conexao, animalctrl);
    }

    async deletar(conexao, animal)
    {
        const animalDAO = new AnimalDAO();
        await animalDAO.deletar(conexao, animalctrl);
    }

    async alterar(conexao, animal)
    {
        const animalDAO = new AnimalDAO();
        await animalDAO.alterar(conexao, animalctrl);
    }
}