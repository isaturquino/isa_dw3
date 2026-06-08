// @file: src/repositories/tarefa.repository.js

import client from "../../database/client.js";

export class TarefaRepository {

  //  EXERCÍCIO 1 + 2 (filtros via SQL)
  async listarTodos(filtros = {}) {
    let query = `
      SELECT id, descricao, concluido, criada_em
      FROM tarefas
      WHERE 1=1
    `;

    const values = [];

    // filtro por descrição
    if (filtros.descricao) {
      values.push(`%${filtros.descricao}%`);
      query += ` AND descricao ILIKE $${values.length}`;
    }

    // filtro por concluído (true/false)
    if (filtros.concluido !== undefined) {
      values.push(filtros.concluido);
      query += ` AND concluido = $${values.length}`;
    }

    query += ` ORDER BY id`;

    const resultado = await client.query(query, values);

    return resultado.rows;
  }

  async buscarPorId(id) {
    const resultado = await client.query(
      `
      SELECT id, descricao, concluido, criada_em
      FROM tarefas
      WHERE id = $1
    `,
      [Number(id)],
    );

    return resultado.rows[0] ?? null;
  }

  async salvar(tarefa) {
    const resultado = await client.query(
      `
      INSERT INTO tarefas (descricao, concluido)
      VALUES ($1, $2)
      RETURNING id, descricao, concluido, criada_em
    `,
      [tarefa.descricao, tarefa.concluido],
    );

    return resultado.rows[0];
  }

  async atualizar(id, dadosAtualizados) {
    const tarefaAtual = await this.buscarPorId(id);

    if (!tarefaAtual) return null;

    const tarefaFinal = {
      ...tarefaAtual,
      ...dadosAtualizados,
      id: tarefaAtual.id,
    };

    const resultado = await client.query(
      `
      UPDATE tarefas
      SET descricao = $1,
          concluido = $2
      WHERE id = $3
      RETURNING id, descricao, concluido, criada_em
    `,
      [tarefaFinal.descricao, tarefaFinal.concluido, id],
    );

    return resultado.rows[0] ?? null;
  }

  async remover(id) {
    const resultado = await client.query(
      `
      DELETE FROM tarefas
      WHERE id = $1
    `,
      [id],
    );

    return resultado.rowCount > 0;
  }

  // EXERCÍCIO 3 — RESUMO DIRETO NO BANCO (FORMA CORRETA)
  async resumo() {
    const resultado = await client.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE concluido = true) AS concluidas,
        COUNT(*) FILTER (WHERE concluido = false) AS pendentes
      FROM tarefas
    `);

    return resultado.rows[0];
  }
}

export default TarefaRepository;