// src/modules/produtos/produto.service.js
import {
  ProdutoIdInvalidoError,
  ProdutoNaoEncontradoError
} from "./produto.errors.js";

const produtos = [
  { id: 1, nome: "Teclado", preco: 150 },
  { id: 2, nome: "Mouse", preco: 80 }
];

export async function buscarProdutoPorId(id) {
  const idNumerico = Number(id);

  if (Number.isNaN(idNumerico)) {
    throw new ProdutoIdInvalidoError();
  }

  const produto = produtos.find((produto) => produto.id === idNumerico);

  if (!produto) {
    throw new ProdutoNaoEncontradoError();
  }

  return produto;
}