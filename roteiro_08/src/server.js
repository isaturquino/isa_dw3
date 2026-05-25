// @file: src/server.js
import Fastify from 'fastify'
import tarefaRoutes from './features/tarefas/tarefa.routes.js'
import { AppError } from './errors/AppError.js'

const server = Fastify({ logger: true })

// ==========================================
// TRATAMENTO DE ERROS GLOBAL (A Rede de Segurança)
// ==========================================
server.setErrorHandler((error, request, reply) => {
  // 1. Verifica se o erro foi intencional (Regra de Negócio / Validação)
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message
    })
  }

  // 2. Se o erro NÃO for um AppError, é um erro inesperado
  // (ex: banco de dados caiu, digitação errada no código).
  // Aqui logamos o erro real no console para o desenvolvedor investigar...
  console.error('🔥 ERRO INTERNO:', error)

  // ... e devolvemos um 500 genérico para não expor dados sensíveis do servidor
  return reply.status(500).send({
    status: 'error',
    message: 'Internal Server Error'
  })
})

// ==========================================
// REGISTRO DE ROTAS
// ==========================================
server.register(tarefaRoutes)

const start = async () => {
  await server.listen({ port: 3000 })
}
start()