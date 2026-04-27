// Exercício 4.2 — Biblioteca e Livros

class Livro {
  constructor(titulo, autor) {
    this.titulo = titulo
    this.autor = autor
    this.disponivel = true
  }

  emprestar() {
    if (!this.disponivel) {
      console.log("Livro indisponível.")
      return
    }
    this.disponivel = false
  }

  devolver() {
    this.disponivel = true
  }

  exibir() {
    const status = this.disponivel ? "Disponível" : "Indisponível"
    return `${this.titulo} — ${this.autor} — ${status}`
  }
}

class Biblioteca {
  constructor(nome) {
    this.nome = nome
    this.acervo = []
  }

  adicionar(livro) {
    this.acervo.push(livro)
  }

  buscar(titulo) {
    return this.acervo.find(l => l.titulo === titulo) || null
  }

  emprestar(titulo) {
    const livro = this.buscar(titulo)
    if (!livro) {
      console.log("Livro não encontrado.")
      return
    }
    livro.emprestar()
  }

  devolver(titulo) {
    const livro = this.buscar(titulo)
    if (!livro) {
      console.log("Livro não encontrado.")
      return
    }
    livro.devolver()
  }

  exibirAcervo() {
    this.acervo.forEach(l => console.log(l.exibir()))
  }
}

const biblioteca = new Biblioteca("Biblioteca Central")
biblioteca.adicionar(new Livro("O Alquimista", "Paulo Coelho"))
biblioteca.adicionar(new Livro("Dom Casmurro", "Machado de Assis"))
biblioteca.adicionar(new Livro("1984", "George Orwell"))

biblioteca.emprestar("O Alquimista")
biblioteca.emprestar("Dom Casmurro")
biblioteca.devolver("O Alquimista")

biblioteca.exibirAcervo()