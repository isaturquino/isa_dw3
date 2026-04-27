export default async function produtoRoutes(server, options) {
  const { controller } = options

  server.get('/', (req, reply) => controller.getAll(req, reply))
  server.get('/:id', (req, reply) => controller.getById(req, reply))
  server.post('/', (req, reply) => controller.create(req, reply))
  server.delete('/:id', (req, reply) => controller.delete(req, reply))
}