// Exercício 5.1 — O problema do this

//  CÓDIGO COM PROBLEMA:
// class Timer {
//   constructor(nome) {
//     this.nome = nome
//     this.segundos = 0
//   }
//   iniciar() {
//     setInterval(function() {
//       this.segundos++                        // errado: this aqui é undefined (strict mode)
//       console.log(`${this.nome}: ${this.segundos}s`) // ou refere ao objeto global
//     }, 1000)
//   }
// }

// RESPOSTAS:
// 1. O erro acontece porque function() cria seu próprio contexto de this.
//    Dentro do setInterval, o this não é mais o objeto Timer — em strict mode
//    é undefined, e fora dele aponta para o objeto global (window/global).
//    Por isso this.segundos e this.nome não existem.

// 2. CÓDIGO CORRIGIDO com arrow function:
class Timer {
  constructor(nome) {
    this.nome = nome
    this.segundos = 0
  }

  iniciar() {
    setInterval(() => {        // concertado: arrow function não cria seu próprio this
      this.segundos++
      console.log(`${this.nome}: ${this.segundos}s`)
    }, 1000)
  }
}

// 3. A arrow function não possui seu próprio this — ela herda o this do
//    escopo onde foi definida (o método iniciar). Assim, this continua
//    apontando para o objeto Timer, como esperado.

const t = new Timer('Cronômetro')
t.iniciar()