async function buscarPedido(id) {
  if (!id) {
    throw new Error('ID do pedido é obrigatório')
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (id !== 1) {
    throw new Error('Pedido não encontrado')
  }

  return { id: 1, total: 150 }
}

async function executar() {
  try {
    const pedido = await buscarPedido(1)
    console.log(pedido)

    const pedidoInexistente = await buscarPedido(99)
    console.log(pedidoInexistente)
  } catch (erro) {
    console.log(erro.message)
  }
}

executar()