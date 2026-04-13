// DADOS (simulando banco de dados em memória)
const tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true },
];

// LISTAR tarefas (com filtros opcionais)
export async function listar({ busca, concluido }) {
  console.log("Model: listar chamado");

  let resultado = tarefas;

  if (busca) {
    resultado = resultado.filter((t) =>
      t.descricao.toLowerCase().includes(busca.toLowerCase())
    );
  }

  if (concluido !== undefined) {
    const concluidoBool = concluido === "true";
    resultado = resultado.filter((t) => t.concluido === concluidoBool);
  }

  return resultado;
}

// CRIAR nova tarefa
export async function criar(descricao) {
  console.log("Model: criar chamado");

  const novoId =
    tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;

  const novaTarefa = {
    id: novoId,
    descricao,
    concluido: false,
  };

  tarefas.push(novaTarefa);

  return novaTarefa;
}

// BUSCAR tarefa por ID
export async function buscarPorId(id) {
  console.log("Model: buscarPorId chamado");

  return tarefas.find((t) => t.id === id);
}

// ATUALIZAR tarefa
export async function atualizar(id, dadosAtualizados) {
  console.log("Model: atualizar chamado");

  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) return null;

  tarefas[index] = {
    ...tarefas[index],
    ...dadosAtualizados,
    id,
  };

  return tarefas[index];
}

// ALTERNAR status de conclusão
export async function alternarConcluido(id) {
  console.log("Model: alternarConcluido chamado");

  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) return null;

  tarefa.concluido = !tarefa.concluido;

  return tarefa;
}

// REMOVER tarefa
export async function remover(id) {
  console.log("Model: remover chamado");

  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) return false;

  tarefas.splice(index, 1);

  return true;
}

// OBTER resumo
export async function obterResumo() {
  console.log("Model: obterResumo chamado");

  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.concluido).length;
  const pendentes = total - concluidas;

  return {
    total,
    concluidas,
    pendentes,
  };
}
// LISTAR tarefas pendentes
export async function listarPendentes() {
  console.log("Model: listarPendentes chamado");

  return tarefas.filter((t) => t.concluido === false);
}