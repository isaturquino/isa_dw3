// Exercício 1.1 — Conta Bancária

class ContaBancaria {
  constructor(titular, saldo) {
    this.titular = titular
    this.saldo = saldo
  }

  depositar(valor) {
    this.saldo += valor
  }

  sacar(valor) {
    if (valor > this.saldo) {
      console.log("Saldo insuficiente.")
      return
    }
    this.saldo -= valor
  }

  exibirSaldo() {
    console.log(`Titular: ${this.titular} | Saldo: R$ ${this.saldo.toFixed(2)}`)
  }
}

// Instanciando dois objetos independentes
const contaAna = new ContaBancaria("Ana", 100)
contaAna.depositar(100)
contaAna.sacar(50)
contaAna.exibirSaldo() 

const contaCarlos = new ContaBancaria("Carlos", 200)
contaCarlos.sacar(120)
contaCarlos.exibirSaldo() 