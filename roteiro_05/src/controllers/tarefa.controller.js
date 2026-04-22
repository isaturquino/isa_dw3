// @file: src/controllers/tarefa.controller.js

import model from '../models/tarefa.model.js'

class TarefaController {
  constructor() {
    this.model = model
  }

  async listarTarefas(request, reply) {
    console.log("Controller: listarTarefas chamado")
    const { busca, concluido } = request.query
    const resultado = await this.model.listar({ busca, concluido })
    return reply.send(resultado)
  }

  async criarTarefa(request, reply) {
    console.log("Controller: criarTarefa chamado")
    const { descricao } = request.body

    if (!descricao || descricao.trim() === '') {
      return reply.status(400).send({
        status: 'error',
        message: 'A descrição da tarefa é obrigatória'
      })
    }

    const novaTarefa = await this.model.criar(descricao)
    return reply.status(201).send(novaTarefa)
  }

  async obterTarefa(request, reply) {
    console.log("Controller: obterTarefa chamado")
    const id = Number(request.params.id)

    const tarefa = await this.model.buscarPorId(id)

    if (!tarefa) {
      return reply.status(404).send({
        status: 'error',
        message: 'Tarefa não encontrada'
      })
    }

    return reply.send(tarefa)
  }

  async atualizarTarefa(request, reply) {
    console.log("Controller: atualizarTarefa chamado")
    const id = Number(request.params.id)

    const tarefa = await this.model.atualizar(id, request.body)

    if (!tarefa) {
      return reply.status(404).send({
        status: 'error',
        message: 'Tarefa não encontrada'
      })
    }

    return reply.send(tarefa)
  }

  async concluirTarefa(request, reply) {
    console.log("Controller: concluirTarefa chamado")
    const id = Number(request.params.id)

    const tarefa = await this.model.alternarConcluido(id)

    if (!tarefa) {
      return reply.status(404).send({
        status: 'error',
        message: 'Tarefa não encontrada'
      })
    }

    return reply.send(tarefa)
  }

  async removerTarefa(request, reply) {
    console.log("Controller: removerTarefa chamado")
    const id = Number(request.params.id)

    const removido = await this.model.remover(id)

    if (!removido) {
      return reply.status(404).send({
        status: 'error',
        message: 'Tarefa não encontrada'
      })
    }

    return reply.status(204).send()
  }

  async obterResumo(request, reply) {
    console.log("Controller: obterResumo chamado")
    const resumo = await this.model.obterResumo()
    return reply.send(resumo)
  }

  // ✅ NOVO MÉTODO (ROTEIRO 05)
  async obterPendentes(request, reply) {
    console.log("Controller: obterPendentes chamado")
    const resultado = await this.model.listarPendentes()
    return reply.send(resultado)
  }
}

export default new TarefaController()