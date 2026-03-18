import http from 'http'

http.createServer((req,res)=> {
    console.log("chegou uma requisição")
    res.end("olá mundo")
}).listen(3000)
console.log("Servidor rodando")