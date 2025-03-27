import Animal from "../model/animal.model.js";
import Database from "./database.js";

export default class AnimalDAO{

    constructor(){
        this.init();
    }

    async init()
    {
        try{
            const database = await conectar();
            const sql=`
                CREATE TABLE IF NOT EXISTS Animal(
                id INT NOT NULL,
                nome VARCHAR(50) NOT NULL,
                raca VARCHAR(50) NOT NULL,
                status VARCHAR(5) NOT NULL,
                peso FLOAT NOT NULL,
                porte CHAR(1),
                observacao VARCHAR(500) NOT NULL,
                chip INT NOT NULL,
                CONSTRAINT pk_id PRIMARY KEY (id)
            );
            `
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(erro)
        {
            console.log("Erro ao iniciar a tabela animal!")
        }
    }

    async incluir(animal)
    {
        if(animal instanceof Animal)
        {
            if(!animal.id|| !)
        }
    }
}