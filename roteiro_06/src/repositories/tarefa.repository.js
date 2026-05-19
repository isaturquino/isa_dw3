// @file: src/repositories/tarefa.repository.js

class TarefaRepository {
  constructor() {
    this.tarefas = [
      { id: 1, descricao: "Fazer compras", concluido: false },
      { id: 2, descricao: "Lavar o carro", concluido: false },
      { id: 3, descricao: "Estudar Fastify", concluido: true }
    ]
  }

  async buscarTodos() {
    console.log("Repository: buscarTodos chamado")
    return this.tarefas
  }

  async buscarPendentes() {
    console.log("Repository: buscarPendentes chamado")
    return this.tarefas.filter(t => t.concluido === false)
  }

  async buscarPorId(id) {
    console.log("Repository: buscarPorId chamado")
    return this.tarefas.find(t => t.id === id) ?? null
  }

  async salvar(tarefa) {
    console.log("Repository: salvar chamado")

    const novoId = this.tarefas.length > 0
      ? this.tarefas[this.tarefas.length - 1].id + 1
      : 1

    const novaTarefa = {
      id: novoId,
      ...tarefa
    }

    this.tarefas.push(novaTarefa)

    return novaTarefa
  }

  async atualizar(id, dadosAtualizados) {
    console.log("Repository: atualizar chamado")

    const index = this.tarefas.findIndex(t => t.id === id)

    if (index === -1) {
      return null
    }

    this.tarefas[index] = {
      ...this.tarefas[index],
      ...dadosAtualizados,
      id
    }

    return this.tarefas[index]
  }

  async remover(id) {
    console.log("Repository: remover chamado")

    const index = this.tarefas.findIndex(t => t.id === id)

    if (index === -1) {
      return false
    }

    this.tarefas.splice(index, 1)

    return true
  }
}

export default TarefaRepository