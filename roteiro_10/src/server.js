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

// Rotas de tarefas
server.register(tarefaRoutes, { prefix: '/tarefas' })

// Rota teste
server.get('/', async (request, reply) => {
  return reply.send('Servidor funcionando 🚀')
})

// GET - listar tarefas do banco
server.get('/laboratorio/tarefas-db', async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})

// Get - listar tarefas concluídas do banco
server.get('/laboratorio/tarefas-concluidas', async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    WHERE concluido = true
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})

// POST - criar tarefa
server.post('/laboratorio/tarefas-db', async (request, reply) => {
  const { descricao } = request.body

  if (!descricao || descricao.trim() === '') {
    return reply.status(400).send({
      status: 'error',
      message: 'A descrição da tarefa é obrigatória'
    })
  }

  const resultado = await client.query(
    `
      INSERT INTO tarefas (descricao)
      VALUES ($1)
      RETURNING id, descricao, concluido, criada_em
    `,
    [descricao.trim()]
  )

  return reply.status(201).send(resultado.rows[0])
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
