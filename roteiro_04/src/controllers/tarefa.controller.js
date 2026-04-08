// @file: src/ROUTES/tarefa.routes.js

// DADOS (array de tarefas) - movido para o controlador para ser acessado no processamento das requisições
const tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true },
];

// Processa requisições da rota `GET /tarefas`
export async function listarTarefas(request, reply) {
  // LOG para indicar que a função foi chamada
  console.log("Controller: listarTarefas chamado");

  const { busca, concluido } = request.query;
  let resultado = tarefas;
  if (busca) {
    resultado = resultado.filter((t) =>
      t.descricao.toLowerCase().includes(busca.toLowerCase()),
    );
  }
  if (concluido !== undefined) {
    const concluidoBool = concluido === "true";
    resultado = resultado.filter((t) => t.concluido === concluidoBool);
  }
  return reply.send(resultado);
}

// Processa requisições da rota `POST /tarefas`
export async function criarTarefa(request, reply) {
  console.log("Controller: criarTarefa chamado");

    const { descricao } = request.body;
    if (!descricao || descricao.trim() === "") {
      return reply.status(400).send({
        status: "error",
        message: "A descrição da tarefa é obrigatória",
      });
    }
    const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;
    const novaTarefa = { id: novoId, descricao, concluido: false };

    tarefas.push(novaTarefa);
    return reply.status(201).send(novaTarefa);
}

// Processa requisições da rota `GET /tarefas/resumo`
export async function obterResumo(request, reply) {
    console.log("Controller: obterResumo chamado");
    const total = tarefas.length;
    const concluidas = tarefas.filter((t) => t.concluido).length;
    const pendentes = total - concluidas;

    return reply.send({
      total,
      concluidas,
      pendentes,
    });
}

// Processa requisições da rota `GET /tarefas/:id`
export async function obterTarefa(request, reply) {
    console.log("Controller: obterTarefa chamado");
    const id = Number(request.params.id);
    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) {
        return reply
            .status(404)
            .send({ status: "error", message: "Tarefa não encontrada" });
    }

    return reply.send(tarefa);
}

// Processa requisições da rota `PATCH /tarefas/:id`
export async function atualizarTarefa(request, reply) {
    console.log("Controller: atualizarTarefa chamado");
    const id = Number(request.params.id);
    const index = tarefas.findIndex((t) => t.id === id);
    if (index === -1) {
        return reply
            .status(404)
            .send({ status: "error", message: "Tarefa não encontrada" });
    }
    const tarefaAtualizada = request.body;
    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id };

    return reply.send(tarefas[index]);
}

// Processa requisições da rota `PATCH /tarefas/:id/concluir`
export async function concluirTarefa(request, reply) {
    console.log("Controller: concluirTarefa chamado");
    const id = Number(request.params.id);
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    tarefas[index].concluido = !tarefas[index].concluido;
    return reply.send(tarefas[index]);
}

// Processa requisições da rota `DELETE /tarefas/:id`
export async function removerTarefa(request, reply) {
    console.log("Controller: removerTarefa chamado");
    const id = Number(request.params.id);
    const index = tarefas.findIndex((t) => t.id === id);

    if (index === -1) {
      return reply
        .status(404)
        .send({ status: "error", message: "Tarefa não encontrada" });
    }

    tarefas.splice(index, 1);
    return reply.status(204).send();
}
