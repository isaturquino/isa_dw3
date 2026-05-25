// @file: src/controllers/tarefa.controller.js
// ❌ Apague o import do tarefaService!

export class TarefaController {

  // O Controller agora exige que alguém entregue o Service para ele
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
    const tarefa = await this.service.buscarPorId(id)
    if (!tarefa) return reply.status(404).send()

    return reply.send(tarefa)
  }

  async criar(request, reply) {
    const tarefa = await this.service.criarTarefa(request.body)
    if (!tarefa) return reply.status(400).send({ erro: 'Regra de negócio violada' })

    return reply.status(201).send(tarefa)
  }

  async atualizar(request, reply) {
    const { id } = request.params
    const tarefa = await this.service.atualizarTarefa(id, request.body)
    if (!tarefa) return reply.status(400).send({ erro: 'Operação inválida' })

    return reply.send(tarefa)
  }

  async concluir(request, reply) {
    const { id } = request.params
    const tarefa = await this.service.concluirTarefa(id)
    if (!tarefa) return reply.status(400).send({ erro: 'Operação inválida' })

    return reply.send(tarefa)
  }

  async remover(request, reply) {
    const { id } = request.params
    const sucesso = await this.service.removerTarefa(id)
    if (!sucesso) return reply.status(400).send({ erro: 'Operação inválida' })

    return reply.status(204).send()
  }
}

// ❌ O "export default new TarefaController()" não existe mais.