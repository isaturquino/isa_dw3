// src/shared/http/error-handler.js
import { AppError } from "../errors/app-error.js";

export function errorHandler(error, request, reply) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: "error",
      message: error.message
    });
  }

  request.log.error(error);

  return reply.status(500).send({
    status: "error",
    message: "Erro interno do servidor."
  });
}