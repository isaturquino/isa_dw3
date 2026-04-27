import Fastify from 'fastify'
import ProdutoController from './controllers/produto.controller.js'
import produtoRoutes from './routes/produto.routes.js'

const server = Fastify()

const produtoController = new ProdutoController()

server.register(produtoRoutes, { prefix: '/produtos', controller: produtoController })

const start = async () => {
  try {
    await server.listen({ port: 3000 })
    console.log('Servidor rodando em <http://localhost:3000>')
  } catch (erro) {
    console.error(erro)
    process.exit(1)
  }
}

start()