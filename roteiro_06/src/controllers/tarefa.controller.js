// @file: src/controllers/tarefa.controller.js

class TarefaController {
  constructor(service) {
    this.service = service
  }

  async listarTarefas(request, reply) {
    console.log("Controller: listarTarefas chamado")
    const { busca, concluido } = request.query
    const resultado = await this.service.listar({ busca, concluido })
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

    const novaTarefa = await this.service.criar(descricao)
    return reply.status(201).send(novaTarefa)
  }

  async obterTarefa(request, reply) {
    console.log("Controller: obterTarefa chamado")
    const id = Number(request.params.id)

    const tarefa = await this.service.buscarPorId(id)

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

    const tarefa = await this.service.atualizar(id, request.body)

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

    const tarefa = await this.service.alternarConcluido(id)

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

    const removido = await this.service.remover(id)

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
    const resumo = await this.service.obterResumo()
    return reply.send(resumo)
  }

  async obterPendentes(request, reply) {
    console.log("Controller: obterPendentes chamado")
    const resultado = await this.service.listarPendentes()
    return reply.send(resultado)
  }
}

export default TarefaController