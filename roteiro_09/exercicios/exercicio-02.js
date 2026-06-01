function criarProduto(dados) {
  if (!dados.nome) {
    throw new Error('Nome é obrigatório')
  }

  if (typeof dados.preco !== 'number' || dados.preco <= 0) {
    throw new Error('Preço deve ser um número maior que zero')
  }

  if (!Number.isInteger(dados.estoque) || dados.estoque < 0) {
    throw new Error('Estoque deve ser um número inteiro maior ou igual a zero')
  }

  return {
    nome: dados.nome,
    preco: dados.preco,
    estoque: dados.estoque
  }
}

try {
  console.log(criarProduto({ nome: 'Teclado', preco: 150, estoque: 10 }))
  console.log(criarProduto({ preco: 150, estoque: 10 }))
} catch (erro) {
  console.log(erro.message)
}