// @file: src/services/tarefa.service.js
// ❌ Apague o import do tarefaRepository!

export class TarefaService {

  // O Service agora exige que alguém entregue o Repository para ele
  constructor(repository) {
    this.repository = repository
  }

  async listarTarefas(filtros = {}) {
    const tarefas = await this.repository.listarTodos()
    let resultado = tarefas

    if (filtros.busca) {
      resultado = resultado.filter(t => t.titulo.toLowerCase().includes(filtros.busca.toLowerCase()))
    }
    if (filtros.status) {
      resultado = resultado.filter(t => t.status === filtros.status)
    }

    return resultado
  }

  async buscarPorId(id) {
    return this.repository.buscarPorId(id)
  }

  async criarTarefa(dados) {
    if (!dados.titulo || dados.titulo.trim() === '') return null

    // REGRA: Impedir título duplicado
    const tarefas = await this.repository.listarTodos()
    const tituloJaExiste = tarefas.some(t => t.titulo.toLowerCase() === dados.titulo.toLowerCase().trim())

    if (tituloJaExiste) return null

    return this.repository.salvar({
      titulo: dados.titulo.trim(),
      descricao: dados.descricao || '',
      status: 'pendente'
    })
  }

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id)

    // REGRA: Tarefa concluída não pode ser atualizada
    if (!tarefa || tarefa.status === 'concluida') return null

    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)
    if (!tarefa) return null

    const novoStatus = tarefa.status === 'concluida' ? 'pendente' : 'concluida'
    return this.repository.atualizar(id, { status: novoStatus })
  }

  async removerTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    // REGRA: Tarefa concluída não pode ser removida
    if (!tarefa || tarefa.status === 'concluida') return false

    return this.repository.remover(id)
  }
}