import Animal from "../model/animal.model.js";

export default class AnimalDAO{

    constructor(){
        this.init();
    }

    async init()
    {
        try{
            const conexao = await conectar();
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
                INSERT INTO animal(an_nome, an_raca, an_status, an_peso, an_porte, an_porte, an_obs, an_chip)
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
            const resultado = await database.execute(sql, parametro);
            animal.id = resultado[0].insertId;
            await conexao.release();
        }
    }

    async alterar(conexao, animal){
        if(animal instanceof Animal)
        {
            const sql=`UPDATE animal SET nome=?, raca=?, status=?, peso=?, porte=?, obeservacao=?, chip=?
            WHERE an_id=?
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

    async consultar(animal){
        let sql="";
        let parametro = [];

        if(termo)
        {
            sql=`SELECT * FROM animal 
                 WHERE nome =?`;
            parametro = ['%' + termo + '%']
        }
        const [database, campos] = await conexao.execute(sql, parametro);
        await conexao.release();
        return database;
    }
}