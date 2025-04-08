// import Apoiador from "../model/apoiador.model.js";
// import Database from "../model/database.js";

// export default class ApoiadorDAO {
//     constructor() {
//         this.init();
//     }

//     async init() {
//         try {
//             const conexao = await Database.getInstance().getConnection();
//             const sql = `
//                 CREATE TABLE IF NOT EXISTS apoiador (
//                     idApoiador INT AUTO_INCREMENT PRIMARY KEY,
//                     cpf VARCHAR(14) NOT NULL UNIQUE,
//                     nome VARCHAR(100) NOT NULL,
//                     email VARCHAR(100) NOT NULL UNIQUE,
//                     endereco VARCHAR(200) NOT NULL,
//                     telefone VARCHAR(15) NOT NULL
//                 );
//             `;
//             await conexao.execute(sql);
//         } catch (erro) {
//             console.log("Não foi possível iniciar o banco de dados: " + erro.message);
//         } finally {
//             if (conexao) await conexao.release();
//         }
//     }

//     async incluir(conexao, apoiador) {
//         if (!(conexao && apoiador instanceof Apoiador)) return;

//         const sql = `INSERT INTO apoiador(cpf, nome, email, endereco, telefone) VALUES (?, ?, ?, ?, ?)`;
//         const parametros = [
//             apoiador.cpf,
//             apoiador.nome,
//             apoiador.email,
//             apoiador.endereco,
//             apoiador.telefone
//         ];

//         try {
//             await conexao.execute(sql, parametros);
//         } catch (erro) {
//             console.error("Erro ao incluir apoiador:", erro.message);
//             throw erro;
//         } finally {
//             await conexao.release();
//         }
//     }

//     async alterar(conexao, apoiador) {
//         if (!(conexao && apoiador instanceof Apoiador)) return;

//         const sql = `UPDATE apoiador SET cpf = ?, nome = ?, email = ?, endereco = ?, telefone = ? WHERE idApoiador = ?`;
//         const parametros = [
//             apoiador.cpf,
//             apoiador.nome,
//             apoiador.email,
//             apoiador.endereco,
//             apoiador.telefone,
//             apoiador.idApoiador
//         ];

//         try {
//             await conexao.execute(sql, parametros);
//         } catch (erro) {
//             console.error("Erro ao alterar apoiador:", erro.message);
//             throw erro;
//         } finally {
//             await conexao.release();
//         }
//     }

//     async excluir(conexao, apoiador) {
//         if (!(conexao && apoiador instanceof Apoiador)) return;

//         const sql = `DELETE FROM apoiador WHERE idApoiador = ?`;
//         const parametros = [apoiador.idApoiador];

//         try {
//             await conexao.execute(sql, parametros);
//         } catch (erro) {
//             console.error("Erro ao excluir apoiador:", erro.message);
//             throw erro;
//         } finally {
//             await conexao.release();
//         }
//     }

//     async consultar(conexao, termo) {
//         if (!conexao) throw new Error("Conexão inválida.");

//         let sql = "SELECT * FROM apoiador";
//         let parametros = [];

//         if (termo) {
//             sql += ` WHERE nome LIKE ? OR cpf LIKE ? OR email LIKE ?`;
//             termo = `%${termo}%`;
//             parametros = [termo, termo, termo];
//         }

//         try {
//             const [dataBase] = await conexao.execute(sql, parametros);
//             return dataBase;
//         } catch (erro) {
//             console.error("Erro ao consultar apoiador:", erro.message);
//             throw erro;
//         } finally {
//             await conexao.release();
//         }
//     }
// }
