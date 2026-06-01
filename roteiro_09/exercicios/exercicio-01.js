function dividir(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Os valores devem ser números')
  }

  if (b === 0) {
    throw new Error('Não é possível dividir por zero')
  }

  return a / b
}

try {
  console.log(dividir(10, 2))
  console.log(dividir(10, 0))
  console.log(dividir('10', 2))
} catch (erro) {
  console.log(erro.message)
}