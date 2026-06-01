// src/modules/produtos/produto.errors.js
import { AppError } from "../../shared/errors/app-error.js";

export class ProdutoIdInvalidoError extends AppError {
  constructor() {
    super("ID do produto deve ser um número.", 400);
  }
}

export class ProdutoNaoEncontradoError extends AppError {
  constructor() {
    super("Produto não encontrado.", 404);
  }
}