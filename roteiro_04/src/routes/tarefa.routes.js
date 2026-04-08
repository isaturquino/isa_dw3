import { listarTarefas } from "../controllers/tarefa.controller.js";

export default async function tarefaRoutes(server, options) {


  // ROTAS e PROCESSAMENTO das requisições relacionadas às tarefas.
  server.get("/tarefas", async (request, reply) => {
    // LOG para indicar que a rota foi chamada
    console.log("Routes: GET /tarefas chamada");
    // Chama a função do controlador para processar a requisição
    listarTarefas(request, reply);
  });

  server.post("/tarefas", async (request, reply) => {
    console.log("Routes: POST /tarefas chamada");
    criarTarefa(request, reply);
  });

  server.get("/tarefas/resumo", async (request, reply) => {
    console.log("Routes: GET /tarefas/resumo chamada");
    obterResumo(request, reply);
  });

  server.get("/tarefas/:id", async (request, reply) => {
    console.log("Routes: GET /tarefas/:id chamada");
    obterTarefa(request, reply);
  });

  server.patch("/tarefas/:id", async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id chamada");
    atualizarTarefa(request, reply);
  });

  server.patch("/tarefas/:id/concluir", async (request, reply) => {
    console.log("Routes: PATCH /tarefas/:id/concluir chamada");
    concluirTarefa(request, reply);
  });

  server.delete("/tarefas/:id", async (request, reply) => {
    console.log("Routes: DELETE /tarefas/:id chamada");
    removerTarefa(request, reply);
  });
}
