class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

function criarProduto(dados) {
  if (!dados.nome) {
    throw new ValidationError('Nome é obrigatório')
  }

  if (typeof dados.preco !== 'number' || dados.preco <= 0) {
    throw new ValidationError('Preço deve ser um número maior que zero')
  }

  if (!Number.isInteger(dados.estoque) || dados.estoque < 0) {
    throw new ValidationError('Estoque deve ser um número inteiro maior ou igual a zero')
  }

  return {
    nome: dados.nome,
    preco: dados.preco,
    estoque: dados.estoque
  }
}

try {
  console.log(criarProduto({ nome: 'Mouse', preco: 80, estoque: 5 }))
  console.log(criarProduto({ nome: 'Mouse', preco: -10, estoque: 5 }))
} catch (erro) {
  if (erro instanceof ValidationError) {
    console.log(`Erro de validação: ${erro.message}`)
    console.log(erro.name)
  } else {
    console.log('Erro inesperado')
  }
}