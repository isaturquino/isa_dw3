// @file: src/features/tarefas/tarefa.routes.js

import { TarefaRepository } from '../tarefas/tarefa.repository.js'
import { TarefaService } from './tarefa.service.js'
import { TarefaController } from './tarefa.controller.js'

export default async function tarefaRoutes(server) {

  const repository = new TarefaRepository()
  const service = new TarefaService(repository)
  const controller = new TarefaController(service)

  //  LISTAR (com filtros)
  server.get('/',
    async (request, reply) =>
      controller.listar(request, reply)
  )

  //  CRIAR
  server.post('/',
    async (request, reply) =>
      controller.criar(request, reply)
  )

  //  BUSCAR POR ID
  server.get('/:id',
    async (request, reply) =>
      controller.buscar(request, reply)
  )

  //  ATUALIZAR
  server.patch('/:id',
    async (request, reply) =>
      controller.atualizar(request, reply)
  )

  // CONCLUIR
  server.patch('/:id/concluir',
    async (request, reply) =>
      controller.concluir(request, reply)
  )

  //  REMOVER
  server.delete('/:id',
    async (request, reply) =>
      controller.remover(request, reply)
  )

  //  EXERCÍCIO 3 — RESUMO
  server.get('/resumo',
    async (request, reply) =>
      controller.resumo(request, reply)
  )
}