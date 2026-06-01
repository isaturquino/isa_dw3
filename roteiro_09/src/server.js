// src/server.js
import Fastify from "fastify";
import produtoRoutes from "./modules/produtos/produto.routes.js";
import { errorHandler } from "./shared/http/error-handler.js";

const server = Fastify({
  logger: true
});

server.register(produtoRoutes);

server.setErrorHandler(errorHandler);

server.listen({ port: 3000 }, () => {
  console.log("Servidor rodando em <http://localhost:3000>");
});