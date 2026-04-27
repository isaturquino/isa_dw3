// Exercício 2.1 — Carrinho de Compras

class Carrinho {
  constructor() {
    this.itens = []
  }

  adicionar(nome, preco, quantidade) {
    this.itens.push({ nome, preco, quantidade })
  }

  remover(nome) {
    const index = this.itens.findIndex(i => i.nome === nome)
    if (index === -1) {
      console.log("Item não encontrado.")
      return
    }
    this.itens.splice(index, 1)
  }

  total() {
    return this.itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
  }

  exibir() {
    this.itens.forEach(i => {
      console.log(`${i.quantidade}x ${i.nome} — R$ ${(i.preco * i.quantidade).toFixed(2)}`)
    })
    console.log(`Total: R$ ${this.total().toFixed(2)}`)
  }
}

const carrinho = new Carrinho()
carrinho.adicionar("Arroz", 5, 2)
carrinho.adicionar("Sabão", 5.50, 1)
carrinho.adicionar("Leite", 4, 3)
carrinho.remover("Leite")
carrinho.exibir()