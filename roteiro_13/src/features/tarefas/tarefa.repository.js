// @file: src/repositories/tarefa.repository.js

import pool from "../../database/pool.js";

export class TarefaRepository {

  // EXERCÍCIO 1 + 2 (filtros via SQL)
  async listarTodos(filtros = {}) {
    let query = `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      WHERE 1=1
    `;

    const values = [];

    // filtro por descrição
    if (filtros.descricao) {
      values.push(`%${filtros.descricao}%`);
      query += ` AND t.descricao ILIKE $${values.length}`;
    }

    // filtro por concluído
    if (filtros.concluido !== undefined) {
      values.push(filtros.concluido);
      query += ` AND t.concluido = $${values.length}`;
    }

    query += ` ORDER BY t.id`;

    const resultado = await pool.query(query, values);
    return resultado.rows;
  }

  async buscarPorId(id) {
    const resultado = await pool.query(
      `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      WHERE t.id = $1
    `,
      [id]
    );

    return resultado.rows[0] ?? null;
  }

  async buscarTodos() {
    const resultado = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p ON p.id = t.projeto_id
      ORDER BY t.id
    `);

    return resultado.rows;
  }

  async salvar(tarefa) {
    const resultado = await pool.query(
      `
      INSERT INTO tarefas (descricao, concluido, projeto_id)
      VALUES ($1, $2, $3)
      RETURNING id, descricao, concluido, criada_em, projeto_id
    `,
      [
        tarefa.descricao,
        tarefa.concluido ?? false,
        tarefa.projetoId ?? null,
      ]
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

    const resultado = await pool.query(
      `
      UPDATE tarefas
      SET descricao = $1,
          concluido = $2,
          projeto_id = $3
      WHERE id = $4
      RETURNING id, descricao, concluido, criada_em, projeto_id
    `,
      [
        tarefaFinal.descricao,
        tarefaFinal.concluido,
        tarefaFinal.projeto_id,
        id,
      ]
    );

    return resultado.rows[0] ?? null;
  }

  async remover(id) {
    const resultado = await pool.query(
      `
      DELETE FROM tarefas
      WHERE id = $1
    `,
      [id]
    );

    return resultado.rowCount > 0;
  }

  // EXERCÍCIO 3 — RESUMO
  async resumo() {
    const resultado = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE concluido = true) AS concluidas,
        COUNT(*) FILTER (WHERE concluido = false) AS pendentes
      FROM tarefas
    `);

    return resultado.rows[0];
  }

  // BUSCAR TAREFAS DE UM PROJETO
  async buscarPorProjeto(projetoId) {
    const resultado = await pool.query(
      `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      INNER JOIN projetos p ON p.id = t.projeto_id
      WHERE p.id = $1
      ORDER BY t.id
    `,
      [projetoId]
    );

    return resultado.rows;
  }
}

export default TarefaRepository;