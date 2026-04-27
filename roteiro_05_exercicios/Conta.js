class Conta {
    #saldo;

    constructor(numero){
        this.#saldo = 0;
        this.numero = numero;
    }
    depositar(valor){
        this.#saldo += valor;

    }
    sacar(valor) {
        if (valor > this.#saldo) {  
            console.log("Saldo insuficiente.");
            return;
    }
    this.#saldo -= valor;       
  }
 
  getSaldo() {
    return this.#saldo;         
  }
}
 
const conta1 = new Conta(1);
const conta2 = new Conta(2);
 
conta1.depositar(100);
conta2.depositar(50);
 
console.log(`Conta ${conta1.numero} | Saldo: R$ ${conta1.getSaldo().toFixed(2)}`);
console.log(`Conta ${conta2.numero} | Saldo: R$ ${conta2.getSaldo().toFixed(2)}`);
