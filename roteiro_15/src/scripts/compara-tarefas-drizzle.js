import db from '../database/drizzle.js'
import pool from '../database/pool.js'
import { tarefas } from '../database/schema.js'

// Versão usando SQL
const resultadoSQL = await pool.query(`
  SELECT id, descricao, concluido
  FROM tarefas
  ORDER BY id
`)

console.log('Lista usando SQL:')
console.table(resultadoSQL.rows)

// Versão usando Drizzle
const resultadoDrizzle = await db
  .select({
    id: tarefas.id,
    descricao: tarefas.descricao,
    concluido: tarefas.concluido,
  })
  .from(tarefas)
  .orderBy(tarefas.id)

console.log('Lista usando Drizzle:')
console.table(resultadoDrizzle)

await pool.end()