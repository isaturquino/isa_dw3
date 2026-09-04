import { eq } from 'drizzle-orm'

import db from '../database/drizzle.js'
import pool from '../database/pool.js'
import { tarefas } from '../database/schema.js'

const descricaoLaboratorio = 'Laboratório Drizzle — Roteiro 15'

try {
  const tarefasAntes = await db.select().from(tarefas).orderBy(tarefas.id)

  console.log('Tarefas antes da inserção:')
  console.table(tarefasAntes)

  const tarefaLaboratorio = await db
    .select()
    .from(tarefas)
    .where(eq(tarefas.descricao, descricaoLaboratorio))

  if (tarefaLaboratorio.length === 0) {
    await db.insert(tarefas).values({
      descricao: descricaoLaboratorio,
      concluido: false,
    })

    console.log('Tarefa de laboratório inserida.')
  } else {
    console.log('A tarefa de laboratório já existia; nenhuma nova tarefa foi inserida.')
  }

  const tarefasDepois = await db.select().from(tarefas).orderBy(tarefas.id)

  console.log('Tarefas depois da inserção:')
  console.table(tarefasDepois)
} finally {
  await pool.end()
}