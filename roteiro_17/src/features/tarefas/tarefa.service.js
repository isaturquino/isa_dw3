// @file: src/features/tarefas/tarefa.service.js

import { AppError } from "../../errors/AppError.js";

export class TarefaService {
  constructor(repository) {
    this.repository = repository;
  }

  // EXERCÍCIO 3 — TRANSFORMAÇÃO DE DADOS (MAP)
  mapearTarefa(tarefa) {
    return {
      id: tarefa.id,
      descricao: tarefa.descricao,
      concluido: tarefa.concluido,
      projeto: tarefa.projeto_id
        ? {
            id: tarefa.projeto_id,
            nome: tarefa.projeto_nome,
          }
        : null,
    };
  }

  // EXERCÍCIO 3 — LISTAR COM TRANSFORMAÇÃO
  async listarTarefas(filtros = {}) {
    const tarefas = await this.repository.listarTodos(filtros);
    return tarefas.map((t) => this.mapearTarefa(t));
  }

  // EXERCÍCIO 3 — BUSCAR POR ID COM TRANSFORMAÇÃO
  async buscarPorId(id) {
    const tarefa = await this.repository.buscarPorId(id);

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    return this.mapearTarefa(tarefa);
  }

  // EXERCÍCIO 1 — CRIAR TAREFA COM VALIDAÇÕES COMPLETAS
  async criarTarefa(dados) {
    // validação de regra de negócio (projeto obrigatório)
    if (!dados.projetoId) {
      throw new AppError("Projeto é obrigatório", 400);
    }

    // validação de entrada (descrição obrigatória)
    if (!dados.descricao || dados.descricao.trim() === "") {
      throw new AppError("A descrição é obrigatória", 400);
    }

    const tarefas = await this.repository.listarTodos();

    // verificação de duplicidade
    const descricaoJaExiste = tarefas.some(
      (t) =>
        t.descricao.toLowerCase() ===
        dados.descricao.toLowerCase().trim()
    );

    if (descricaoJaExiste) {
      throw new AppError(
        "Já existe uma tarefa com essa descrição",
        400
      );
    }

    // salvar tarefa
    return this.repository.salvar({
      descricao: dados.descricao.trim(),
      concluido: false,
      projetoId: dados.projetoId,
    });
  }

  // EXERCÍCIO 2 — REGRA: NÃO ATUALIZAR SE CONCLUÍDA
  async atualizarTarefa(id, dados) {
    const tarefa = await this.repository.buscarPorId(id);

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    if (tarefa.concluido) {
      throw new AppError(
        "Não é possível atualizar uma tarefa já concluída",
        400
      );
    }

    return this.repository.atualizar(id, dados);
  }

  // EXERCÍCIO 2 — TOGGLE DE CONCLUSÃO
  async concluirTarefa(id) {
    const tarefa = await this.repository.buscarPorId(id);

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    const novoStatus = !tarefa.concluido;

    return this.repository.atualizar(id, {
      concluido: novoStatus,
    });
  }

  // EXERCÍCIO 2 — REGRA: NÃO REMOVER SE CONCLUÍDA
  async removerTarefa(id) {
    const tarefa = await this.repository.buscarPorId(id);

    if (!tarefa) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    if (tarefa.concluido) {
      throw new AppError(
        "Não é possível remover uma tarefa já concluída",
        400
      );
    }

    return this.repository.remover(id);
  }

  // EXERCÍCIO 3 — RESUMO (AGREGAÇÃO NO BANCO)
  async resumo() {
    return this.repository.resumo();
  }
}