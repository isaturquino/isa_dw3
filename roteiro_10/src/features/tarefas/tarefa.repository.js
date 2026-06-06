// @file: src/repositories/tarefa.repository.js

export class TarefaRepository {
  #tarefas = []
  #proximoId = 1

  async listarTodos() {
    return [...this.#tarefas]
  }

  async buscarPorId(id) {
    return this.#tarefas.find(t => t.id === Number(id)) || null
  }

  async salvar(tarefa) {
    const novaTarefa = {
      id: this.#proximoId++,
      ...tarefa,
      criadaEm: new Date().toISOString()
    }
    this.#tarefas.push(novaTarefa)
    return novaTarefa
  }

  async atualizar(id, dados) {
    const tarefa = await this.buscarPorId(id)
    if (!tarefa) return null

    Object.assign(tarefa, dados)
    return tarefa
  }

  async remover(id) {
    const index = this.#tarefas.findIndex(t => t.id === Number(id))
    if (index === -1) return false

    this.#tarefas.splice(index, 1)
    return true
  }
}