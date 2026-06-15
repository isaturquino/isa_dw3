// @file: src/errors/AppError.js

export class AppError extends Error {
  constructor(message, statusCode = 400) {
    // Chama o construtor da classe pai (Error) passando a mensagem
    super(message)

    this.statusCode = statusCode
    this.name = 'AppError' // Facilita a identificação interna
  }
}