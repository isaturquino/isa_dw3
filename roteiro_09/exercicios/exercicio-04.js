class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}

const usuarios = [
  { id: 1, nome: 'Ana' },
  { id: 2, nome: 'Bruno' },
  { id: 3, nome: 'Carla' }
]

function buscarUsuarioPorId(id) {
  if (typeof id !== 'number') {
    throw new ValidationError('ID deve ser um número')
  }

  const usuario = usuarios.find((usuario) => usuario.id === id)

  if (!usuario) {
    throw new NotFoundError('Usuário não encontrado')
  }

  return usuario
}

try {
  console.log(buscarUsuarioPorId(1))
  console.log(buscarUsuarioPorId('1'))
  console.log(buscarUsuarioPorId(99))
} catch (erro) {
  console.log(`${erro.name}: ${erro.message}`)
}