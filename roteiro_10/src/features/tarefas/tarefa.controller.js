// @file: src/features/tarefas/tarefa.controller.js

export class TarefaController {
  constructor(service) {
    this.service = service
  }

  async listar(request, reply) {
    const { busca, status } = request.query
    const tarefas = await this.service.listarTarefas({ busca, status })
    return reply.send(tarefas)
  }

  async buscar(request, reply) {
    const { id } = request.params
    // Se não encontrar, o Service lança o erro e o código para aqui.
    // Se passar para a linha de baixo, temos garantia que a tarefa existe.
    const tarefa = await this.service.buscarPorId(id)
    return reply.send(tarefa)
  }

  async criar(request, reply) {
    const tarefa = await this.service.criarTarefa(request.body)
    return reply.status(201).send(tarefa)
  }

  async atualizar(request, reply) {
    const { id } = request.params
    const tarefa = await this.service.atualizarTarefa(id, request.body)
    return reply.send(tarefa)
  }

  async concluir(request, reply) {
    const { id } = request.params
    const tarefa = await this.service.concluirTarefa(id)
    return reply.send(tarefa)
  }

  async remover(request, reply) {
    const { id } = request.params
    await this.service.removerTarefa(id)
    return reply.status(204).send()
  }
}