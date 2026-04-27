// Exercício 3.1 — Fila de Atendimento

class FilaAtendimento {
  constructor() {
    this._fila = []
    this.contador = 1
  }

  entrar(nome) {
    this._fila.push({ senha: this.contador, nome })
    console.log(`Senha ${this.contador} gerada para ${nome}.`)
    this.contador++
  }

  chamarProximo() {
    if (this._fila.length === 0) {
      console.log("Fila vazia.")
      return
    }
    const pessoa = this._fila.shift()
    console.log(`Chamando senha ${pessoa.senha} — ${pessoa.nome}`)
    return pessoa
  }

  tamanho() {
    return this._fila.length
  }
}

const fila = new FilaAtendimento()
fila.entrar("Ana")
fila.entrar("Bruno")
fila.entrar("Carla")
fila.chamarProximo()
fila.chamarProximo()
console.log(`Pessoas na fila: ${fila.tamanho()}`)