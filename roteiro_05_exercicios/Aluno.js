// Exercício 1.3 — Aluno

class Aluno {
  constructor(nome) {
    this.nome = nome
    this.notas = []  // array vazio inicializado no constructor
  }

  adicionarNota(nota) {
    this.notas.push(nota)
  }

  calcularMedia() {
    if (this.notas.length === 0) return 0
    const soma = this.notas.reduce((acc, nota) => acc + nota, 0)
    return soma / this.notas.length
  }

  situacao() {
    return this.calcularMedia() >= 6 ? "Aprovado" : "Reprovado"
  }

  exibir() {
    const media = this.calcularMedia().toFixed(2)
    console.log(`${this.nome} | Média: ${media} | ${this.situacao()}`)
  }
}

// Instanciando um aluno e adicionando três notas
const aluno = new Aluno("Ana")
aluno.adicionarNota(8)
aluno.adicionarNota(7)
aluno.adicionarNota(7.5)
aluno.exibir() // Ana | Média: 7.50 | Aprovado