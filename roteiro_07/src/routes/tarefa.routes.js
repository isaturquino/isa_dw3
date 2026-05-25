// @file: src/routes/tarefa.routes.js

// 1. Importamos as CLASSES usando as chaves (Named Exports)
import { TarefaRepository } from '../repositories/tarefa.repository.js'
import { TarefaService } from '../services/tarefa.service.js'
import { TarefaController } from '../controllers/tarefa.controller.js'

export default async function tarefaRoutes(server) {

  // ==========================================
  // INJEÇÃO DE DEPENDÊNCIA (A MONTAGEM)
  // ==========================================

  // A. Criamos o banco de dados (Estoquista)
  const repository = new TarefaRepository()

  // B. Criamos a regra de negócio (Chef) INJETANDO o Estoquista
  const service = new TarefaService(repository)

  // C. Criamos a camada Web (Garçom) INJETANDO o Chef
  const controller = new TarefaController(service)

  // ==========================================
  // REGISTRO DAS ROTAS
  // ==========================================

  // DICA: Usamos arrow functions (() =>) para que o `this` dentro do Controller
  // aponte para a nossa instância recém-criada e não se perca.

  server.get('/tarefas', async (request, reply) => controller.listar(request, reply))
  server.post('/tarefas', async (request, reply) => controller.criar(request, reply))
  server.get('/tarefas/:id', async (request, reply) => controller.buscar(request, reply))
  server.patch('/tarefas/:id', async (request, reply) => controller.atualizar(request, reply))
  server.patch('/tarefas/:id/concluir', async (request, reply) => controller.concluir(request, reply))
  server.delete('/tarefas/:id', async (request, reply) => controller.remover(request, reply))
}