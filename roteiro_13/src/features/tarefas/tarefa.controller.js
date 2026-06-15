// @file: src/features/tarefas/tarefa.controller.js

export class TarefaController {
  constructor(service) {
    this.service = service;
  }

  //  LISTAR COM FILTROS (EX 1 + 2)
  async listar(request, reply) {
    const { descricao, concluido } = request.query;

    const filtros = {};

    if (descricao) {
      filtros.descricao = descricao;
    }

    if (concluido !== undefined) {
      filtros.concluido = concluido === "true";
    }

    const tarefas = await this.service.listarTarefas(filtros);

    return reply.send(tarefas);
  }

  async buscar(request, reply) {
    const { id } = request.params;

    const tarefa = await this.service.buscarPorId(id);

    return reply.send(tarefa);
  }

  async criar(request, reply) {
    const { descricao, projetoId } = request.body;

    const tarefa = await this.service.criarTarefa({
      descricao,
      projetoId,
    });

    return reply.status(201).send(tarefa);
  }

  async atualizar(request, reply) {
    const { id } = request.params;

    const tarefa = await this.service.atualizarTarefa(id, request.body);

    return reply.send(tarefa);
  }

  async concluir(request, reply) {
    const { id } = request.params;

    const tarefa = await this.service.concluirTarefa(id);

    return reply.send(tarefa);
  }

  async remover(request, reply) {
    const { id } = request.params;

    await this.service.removerTarefa(id);

    return reply.status(204).send();
  }

  //  EXERCÍCIO 3 — RESUMO
  async resumo(request, reply) {
    const dados = await this.service.resumo();

    return reply.send(dados);
  }

  // EXERCÍCIO 3 — Transformação de resposta:
  // Converter projeto_id + projeto_nome → objeto projeto
  async listarPorProjeto(req, res) {
    const { id } = req.params;

    const tarefas = await this.tarefaService.buscarPorProjeto(id);

    return res.json(tarefas);
  }
}
