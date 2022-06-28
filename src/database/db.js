//verbose da mais informação, mais verbo
const sqlite3 = require("sqlite3").verbose()

//construtor
const db = new sqlite3.Database("./src/database/database.db")

//
db.serialize(() => {
    //crase permite quebra de linha
    //comandos sql, dificil identificar erro

    //INTEGER tipo de dado
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    const query = `
        INSERT INTO places (
            image,
            name, 
            address, 
            address2, 
            state, 
            city, 
            items
        ) VALUES (?,?,?,?,?,?,?)
    `

    db.run(query, )
})