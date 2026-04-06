import Fastify from 'fastify'
import cors from '@fastify/cors'

const server = Fastify()

// Habilita o CORS para permitir requisições do Frontend
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

const tarefas = [
    {id: 1, descricao: "Fazer compras", concluido: false}, 
    {id: 2, descricao: "Lavar o carro", concluido: false},
    {id: 3, descricao: "Estudar Fastify", concluido: true},
    {id: 4, descricao: "Estudar JavaScript", concluido: true}
]

// R: Ler todas as tarefas (com filtro opcional usando Query String)
server.get('/tarefas', async (request, reply) => {
    // request.query acessa os parâmetros passados na URL após o '?' (ex: ?busca=estudar)
    const busca = request.query.busca

    if (busca) {
        // Filtra as tarefas garantindo a busca correta independente de maiúsculas/minúsculas
        const tarefasFiltradas = tarefas.filter(t => 
            t.descricao.toLowerCase().includes(busca.toLowerCase())
        )
        return reply.send(tarefasFiltradas)
    }

    return reply.send(tarefas)
})

server.post('/tarefas', async (request, reply) => {
    const { descricao } = request.body

    // Exercício 1: Validação de dados
    if (!descricao || descricao.trim() === '') {
        return reply.status(400).send({ 
            status: 'error', 
            message: 'A descrição da tarefa é obrigatória' 
        })
    }
    
    // Gerando um ID automaticamente no Backend
    const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1
    const novaTarefa = { id: novoId, descricao, concluido: false }
    
    tarefas.push(novaTarefa)
    // Retornar 201 Created é uma boa prática ao criar um recurso
    return reply.status(201).send(novaTarefa)
})

// R: Ler uma tarefa específica (READ)
server.get('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const tarefa = tarefas.find(t => t.id === id)
    
    if (!tarefa) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }
    
    reply.send(tarefa)
})

// U: Atualizar uma tarefa parcialmente (UPDATE - PATCH)
server.patch('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)
    
    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }
    
    const tarefaAtualizada = request.body
    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id }
    
    return reply.send(tarefas[index])
})

// Exercício 2: Rota de "Toggle" Concluir (PATCH)
server.patch('/tarefas/:id/concluir', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    tarefas[index].concluido = !tarefas[index].concluido
    return reply.send(tarefas[index])
})

// D: Deletar uma tarefa (DELETE)
server.delete('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)
    
    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }
    
    tarefas.splice(index, 1)
    // 204 No Content indica sucesso sem corpo de resposta
    return reply.status(204).send()
})

// Exercício 4: Rota de Estatísticas/Resumo (GET)
server.get('/tarefas/resumo', async (request, reply) => {
    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido).length
    const pendentes = total - concluidas

    return reply.send({
        total,
        concluidas,
        pendentes
    })
})

server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',    
  })
})




const PORT = 3000

const start = async () => {
    try {
        await server.listen({port: PORT})
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    } catch (erro) {
        console.error(erro)
        process.exit(1)
    }
}

start()
