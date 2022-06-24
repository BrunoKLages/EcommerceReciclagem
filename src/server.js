//NODE PACKAGE MANAGER
//npm install baixa todos os "node_modules", que foram especificados no package.json e não estão em sua máquina
//nodemon -D, monitora alterações e reinica servidor sozinho
//npm start configurado no package.json
//ctrl c cancela 
//ctrl l limpa

const express = require("express")
const server = express()

//configuração para permiter acesso a pasta publica no navegador
server.use(express.static("public"))



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
    //return evita bugs
    return res.render("create-point.html")
 })

 server.get("/search", (req,res)=>{
    return res.render("search-results.html")
 })
 

//ligar o servidor
server.listen(3000)