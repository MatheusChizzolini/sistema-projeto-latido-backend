import Animal from "../model/animal.model.js";
import Database from "../model/database.js";

export default class AnimalDAO{

    constructor(){
        this.init();
    }

    async init()
    {
        try{
            const conexao = await Database.getInstance().getConnection();
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

    async incluir(conexao, animal)
    {
        if(animal instanceof Animal)
        {
            if(!animal.id|| !animal.nome)
                throw new Error("Todos os campos devem ser preenchidos!");        
            
            const database = await conectar();
            const sql = `
                INSERT INTO animal(nome, raca, status, peso, porte, porte, obs, chip)
                VALUES (?, ?, ?, ?, ?, ? ,?)
            `;
            const parametro =[
               animal.nome,
               animal.raca,
               animal.status, 
               animal.peso,
               animal.porte,
               animal.observacao,
               animal.chip
            ];
            const resultado = await conexao.execute(sql, parametro);
            animal.id = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(conexao, animal){
        if(animal instanceof Animal)
        {
            const sql=`UPDATE animal SET nome=?, raca=?, status=?, peso=?, porte=?, obeservacao=?, chip=?
            WHERE id=?
            `;
            let parametro=[
               animal.nome,
               animal.raca,
               animal.status, 
               animal.peso,
               animal.porte,
               animal.observacao,
               animal.chip
            ];
            await conexao.execute(sql, parametro);
            await conexao.release();
        }
    }

    async deletar(conexao, animal){
        if(animal instanceof Animal)
        {
            const sql=`DELETE FROM animal WHERE id=?`;
            let parametro=[
                animal.id
            ];
            await conexao.execute(sql, parametro);
            await conexao.release();
        }
    }

    async consultar(conexao, termo){
        let sql="";
        let parametro = [];

        if(isNaN(parseInt(termo)))
        {
            sql=`SELECT * FROM animal a
                 WHERE a.nome =?`;
            parametro = ['%' + termo + '%']
        }
        else
        {
            sql = `SELECT * FROM animal a
                   WHERE a.id=?`;
            parametro = [termo];
        }
        const[linhas, campos] = await conexao.execute(sql, parametro);
        let listaAnimal = [];
        for(const linha of linhas){

            const animal = {
                codigo: linha.id,
                nome: linha.nome,
                raca: linha.raca,
                status: linha.status,
                peso: linha.peso,
                porte: linha.porte,
                observacao: linha.observacao,
                chip: linha.chip
            };
            listaAnimal.push(animal);
        }
        conexao.release();
        return listaAnimal;
    }
}