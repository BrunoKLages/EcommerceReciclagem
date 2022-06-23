//NODE PACKAGE MANAGER
//npm install baixa todos os "node_modules", que foram especificados no package.json e não estão em sua máquina
//nodemon -D, monitora alterações e reinica servidor sozinho
//ctrl c cancela 
//ctrl l limpa

const express = require("express")
const server = express()


server.get("/", (req,res)=>{
   // res.send("Cheguei, chegando")
   //__dirname, variavel global que indica o endereço
    res.sendFile(__dirname + "/views/index.html")
})

//ligar o servidor
server.listen(3000)