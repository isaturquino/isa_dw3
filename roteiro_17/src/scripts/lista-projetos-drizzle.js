import db from '../database/drizzle.js'
import pool from '../database/pool.js'
import { projetos } from '../database/schema.js'

try {
  const lista = await db
    .select()
    .from(projetos)
    .orderBy(projetos.id)

  console.table(lista)
} finally {
  await pool.end()
}