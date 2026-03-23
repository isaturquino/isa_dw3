import Fastify from 'fastify'
const server = Fastify({logger: true})

const tarefas = [
    {id: 1, descricao: "Fazer compras"},
    {id: 2, descricao: "Limpar a casa"},
    {id: 3, descricao: "Estudar para a prova"}]

server.get('/tarefas', async (request, reply) => {
    reply.send(tarefas)}
)
server.post('/tarefas', async (request, reply) => {
    const tarefa =request.body
    tarefas.push(tarefa)
    reply.send({status: 'sucesso', message: "Tarefa adicionada com sucesso!"})
})

    try {
    console.log('Iniciando o servidor...')
     await server.listen({port: 3000})

}catch (error){
    console.error('Erro ao iniciar o servidor:', error)

} 