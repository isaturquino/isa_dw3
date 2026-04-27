export default class ProdutoModel {
  // Exercício 6.1 

  // Array privado que armazena os produtos em memória
  #produtos

  // Controla o próximo ID a ser gerado
  #proximoId

  constructor() {
    // Inicializa com 3 produtos fixos
    this.#produtos = [
      { id: 1, nome: 'Notebook', preco: 3500 },
      { id: 2, nome: 'Mouse', preco: 80 },
      { id: 3, nome: 'Monitor', preco: 1200 }
    ]

    // Próximo ID começa em 4
    this.#proximoId = 4
  }

  // Retorna todos os produtos
  async findAll() {
    return this.#produtos
  }

  // Busca um produto pelo ID
  async findById(id) {
    return this.#produtos.find(produto => produto.id === id)
  }

  // Cria um novo produto
  async create(dados) {
    // Monta o novo objeto produto
    const novoProduto = {
      id: this.#proximoId++, // usa e incrementa o ID
      nome: dados.nome,
      preco: dados.preco
    }

    // Adiciona no array
    this.#produtos.push(novoProduto)

    // Retorna o produto criado
    return novoProduto
  }

  // Remove um produto pelo ID
  async delete(id) {
    // Encontra o índice do produto
    const index = this.#produtos.findIndex(produto => produto.id === id)

    // Se não encontrou, retorna false
    if (index === -1) return false

    // Remove do array
    this.#produtos.splice(index, 1)

    // Retorna true indicando sucesso
    return true
  }

  // ===== Exercício 6.2 =====

  // Método estático para validar os dados antes de criar um produto
  static validar(dados) {
    const erros = []

    // Verifica se o body foi enviado
    if (!dados) {
      erros.push('Dados não enviados.')
      return { valido: false, erros }
    }

    // Validação do nome
    if (!dados.nome || dados.nome.trim() === '') {
      erros.push('O campo "nome" é obrigatório.')
    }

    // Validação do preço
    if (dados.preco === undefined) {
      erros.push('O campo "preco" é obrigatório.')
    } else if (typeof dados.preco !== 'number' || dados.preco <= 0) {
      erros.push('O campo "preco" deve ser um número maior que 0.')
    }

    // Se houver erros, retorna inválido com lista de erros
    if (erros.length > 0) {
      return { valido: false, erros }
    }

    // Caso esteja tudo certo
    return { valido: true }
  }
}