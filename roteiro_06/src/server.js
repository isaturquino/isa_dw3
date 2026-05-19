// @file: src/server.js

import Fastify from 'fastify'
import cors from '@fastify/cors'

import tarefaRoutes from './routes/tarefa.routes.js'
import TarefaRepository from './repositories/tarefa.repository.js'
import TarefaService from './services/tarefa.service.js'
import TarefaController from './controllers/tarefa.controller.js'

const server = Fastify()

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// Composition Root
const repository = new TarefaRepository()
const service = new TarefaService(repository)
const controller = new TarefaController(service)

// Registra as rotas de tarefas passando o controller
server.register(tarefaRoutes, { controller })

server.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    status: 'error',
    message: 'O recurso solicitado não existe nesta API.',
  })
})

const PORT = 3000

const start = async () => {
  try {
    await server.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  } catch (erro) {
    console.error(erro)
    process.exit(1)
  }
}

start()