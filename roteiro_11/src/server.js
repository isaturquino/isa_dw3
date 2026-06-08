import Fastify from 'fastify'
import cors from '@fastify/cors'
import tarefaRoutes from './features/tarefas/tarefa.routes.js'
import client from './database/client.js'

const server = Fastify()

// CORS
server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// Rotas principais
server.register(tarefaRoutes, { prefix: '/tarefas' })

// Rota teste
server.get('/', async (request, reply) => {
  return reply.send('Servidor funcionando 🚀')
})

// Rota não encontrada
server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.'
  })
})

const PORT = 3000

// Inicialização
const start = async () => {
  try {
    await client.connect()
    console.log('Conectado ao PostgreSQL com sucesso')

    await server.listen({ port: PORT, host: '127.0.0.1' })

    console.log(`Servidor rodando em http://localhost:${PORT}`)
  } catch (erro) {
    console.error('Falha ao iniciar a aplicação:', erro)
    process.exit(1)
  }
}

start()