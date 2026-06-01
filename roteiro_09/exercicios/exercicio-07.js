class ValidationError extends Error {
  constructor(message, details) {
    super(message)
    this.name = 'ValidationError'
    this.details = details
  }
}

function validarAluno(aluno) {
  const erros = []

  if (!aluno.nome) {
    erros.push('Nome é obrigatório')
  }

  if (!aluno.email || !aluno.email.includes('@')) {
    erros.push('Email deve conter @')
  }

  if (typeof aluno.idade !== 'number' || aluno.idade < 16) {
    erros.push('Idade deve ser um número maior ou igual a 16')
  }

  if (erros.length > 0) {
    throw new ValidationError('Dados do aluno inválidos', erros)
  }

  return true
}

try {
  console.log(validarAluno({
    nome: 'Ana',
    email: 'ana@email.com',
    idade: 17
  }))

  console.log(validarAluno({
    nome: '',
    email: 'anaemail.com',
    idade: 15
  }))
} catch (erro) {
  if (erro instanceof ValidationError) {
    console.log(`Erro de validação: ${erro.message}`)
    console.log(erro.details)
  } else {
    console.log('Erro inesperado')
  }
}