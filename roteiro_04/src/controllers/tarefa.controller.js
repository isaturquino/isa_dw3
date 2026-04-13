import {
  listar,
  criar,
  buscarPorId,
  atualizar,
  alternarConcluido,
  remover,
  obterResumo as obterResumoModel,
  listarPendentes,
} from "../models/tarefa.model.js";

// GET /tarefas
export async function listarTarefas(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: listarTarefas chamado");

  const { busca, concluido } = request.query;

  const resultado = await listar({ busca, concluido });

  return reply.send(resultado);
}

// POST /tarefas
export async function criarTarefa(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: criarTarefa chamado");

  const { descricao } = request.body;

  if (!descricao || descricao.trim() === "") {
    return reply.status(400).send({
      status: "error",
      message: "A descrição da tarefa é obrigatória",
    });
  }

  const novaTarefa = await criar(descricao);

  return reply.status(201).send(novaTarefa);
}

// GET /tarefas/resumo
export async function obterResumo(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: obterResumo chamado");

  const resumo = await obterResumoModel();

  return reply.send(resumo);
}

// GET /tarefas/:id
export async function obterTarefa(request, reply) {
  // LOG para indicar que a função foi chamada 
  console.log("Controller: obterTarefa chamado");

  const id = Number(request.params.id);

  const tarefa = await buscarPorId(id);

  if (!tarefa) {
    return reply.status(404).send({
      status: "error",
      message: "Tarefa não encontrada",
    });
  }

  return reply.send(tarefa);
}

// PATCH /tarefas/:id
export async function atualizarTarefa(request, reply) {
  // LOG para indicar que a função foi chamada 
  console.log("Controller: atualizarTarefa chamado");

  const id = Number(request.params.id);

  const tarefaAtualizada = await atualizar(id, request.body);

  if (!tarefaAtualizada) {
    return reply.status(404).send({
      status: "error",
      message: "Tarefa não encontrada",
    });
  }

  return reply.send(tarefaAtualizada);
}

// PATCH /tarefas/:id/concluir
export async function concluirTarefa(request, reply) {
  // LOG para indicar que a função foi chamada 
  console.log("Controller: concluirTarefa chamado");

  const id = Number(request.params.id);

  const tarefa = await alternarConcluido(id);

  if (!tarefa) {
    return reply.status(404).send({
      status: "error",
      message: "Tarefa não encontrada",
    });
  }

  return reply.send(tarefa);
}

// DELETE /tarefas/:id
export async function removerTarefa(request, reply) {
  // LOG para indicar que a função foi chamada 
  console.log("Controller: removerTarefa chamado");

  const id = Number(request.params.id);

  const removido = await remover(id);

  if (!removido) {
    return reply.status(404).send({
      status: "error",
      message: "Tarefa não encontrada",
    });
  }

  return reply.status(204).send();
}

// GET /tarefas/pendentes
export async function listarTarefasPendentes(request, reply) {
  console.log("Controller: listarTarefasPendentes chamado");

  const resultado = await listarPendentes();

  return reply.send(resultado);
}