// Exercício 1.2 — Produto

class Produto {
  constructor(nome, preco, estoque) {
    this.nome = nome
    this.preco = preco
    this.estoque = estoque
  }

  disponivel() {
    return this.estoque > 0
  }

  exibir() {
    const status = this.disponivel() ? "Em estoque" : "Fora de estoque"
    console.log(`${this.nome} — R$ ${this.preco.toFixed(2)} — ${status}`)
  }
}

// Instanciando dois produtos
const notebook = new Produto("Notebook", 3500, 5)
notebook.exibir() // Notebook — R$ 3500.00 — Em estoque

const fone = new Produto("Fone de ouvido", 150, 0)
fone.exibir() // Fone de ouvido — R$ 150.00 — Fora de estoque