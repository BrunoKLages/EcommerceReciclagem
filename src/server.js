//NODE PACKAGE MANAGER
//npm install baixa todos os "node_modules", que foram especificados no package.json e não estão em sua máquina
//nodemon -D, monitora alterações e reinica servidor sozinho
//npm start configurado no package.json
//ctrl c cancela 
//ctrl l limpa

const express = require("express")
const server = express()

//recebe bd
const db = require("./database/db")

//.use habilita configurações do server
// configuração para permiter acesso a pasta publica no navegador
server.use(express.static("public"))

//permite utilização do body 
server.use(express.urlencoded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
//configura nunjucks para o views
nunjucks.configure("src/views",{
    express: server,
    //não salva no cache, evita bugs por pegar sempre a nova versão
    noCache: true
})

//index configurado
server.get("/", (req,res)=>{
   // res.send("Cheguei, chegando")
   //__dirname, variavel global que indica o endereço
   //res.sendFile(__dirname + "/views/index.html")

   //(onde, objeto), html dinâmico
    return res.render("index.html", {title: "Um titulo"})
})

//create-point congfigurado
server.get("/create-point", (req,res)=>{
    
    //req query strings
    // console.log(req.query)
    
    //return evita bugs
    return res.render("create-point.html")
})

server.get("/contact", (req,res)=>{

    return res.render("contact.html")
})

server.post("/savepoint", (req, res) =>{
    //req.body corpo da requisição
    // console.log(req.body)
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

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }
        
        console.log("Cadastrado com sucesso")
        //this não permite arrow funcion
        console.log(this)    
        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)
    
})

server.get("/search", (req,res)=>{
    
    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", { total: 0 })
    }

    //Acha cidades com nome parecido, que contenha caracteres digitados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão os seus registros")
        console.log(rows)
        //mostrar pagina com dados do banco de dados
        return res.render("search-results.html", { places:rows, total:total})
    })    
})



server.post("/sendemail", (req, res) =>{


    const transporter = require("./services/smtp");
    // console.log(transporter)

    try {

        // configuração do transporter com o plugin
        // transporter.use("compile", hbs({
        //     viewEngine: "express-handlebars",
        //     viewPath: "./src"
        // }))
        console.log(req.body)
        // criação do email
        let mailOptions = {
            from: "Bruno Lages <brunocpejr@gmail.com>",
            to: "Bruno Lages <brunolages@cpejr.com.br>",
            subject: "Nodemailer",
            text:`
            nome ${req.body.name}
            email ${req.body.email}
            texto:${req.body.message}
            `,
            // template: "welcome",
        }
        // envio do email
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log(err)
                return res.status(500).send();
                
            } else {
                return res.render("contact.html", { send : true})
            }
        })

    } catch (error) {
        // tratamento de erros
        return res.status(500).send();
    }
})


//ligar o servidor
server.listen(3000)