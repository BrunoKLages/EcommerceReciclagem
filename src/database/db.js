//verbose da mais informação, mais verbo
const sqlite3 = require("sqlite3").verbose()

//construtor
const db = new sqlite3.Database("./src/database/database.db")

//exporta para require
module.exports = db

// db.serialize(() => {
//     //crase permite quebra de linha
//     //comandos sql, dificil identificar erro

//     //INTEGER tipo de dado
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     const query = `
//         INSERT INTO places (
//             image,
//             name, 
//             address, 
//             address2, 
//             state, 
//             city, 
//             items
//         ) VALUES (?,?,?,?,?,?,?)
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
        
//         console.log("Cadastrado com sucesso")
//         //this não permite arrow funcion
//         console.log(this)    
//     }

//     //afterInsertData função de callback, chamada apos realizar o chamado
//     db.run(query, values, afterInsertData)

//     //* = tudo
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err){
//             return console.log(err)
//         }

//         console.log("Aqui estão os seus registros")
//         console.log(rows)
//     })

//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
//     //     if(err){
//     //         return console.log(err)
//     //     }
//     //     console.log("Registro deletado com sucesso!")
//     // })

// })