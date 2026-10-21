import db from '../database/drizzle.js'
import pool from '../database/pool.js'
import { detalhesProjeto, projetos, tags, tarefas, tarefasTags } from '../database/schema.js'

try {
  const listaProjetos = await db.select().from(projetos).orderBy(projetos.id)
  console.log('Projetos:')
  console.table(listaProjetos)

  const listaTarefas = await db.select().from(tarefas).orderBy(tarefas.id)
  console.log('Tarefas:')
  console.table(listaTarefas)

  const listaDetalhes = await db.select().from(detalhesProjeto).orderBy(detalhesProjeto.id)
  console.log('Detalhes dos projetos:')
  console.table(listaDetalhes)

  const listaTags = await db.select().from(tags).orderBy(tags.id)
  console.log('Tags:')
  console.table(listaTags)

  const listaAssociacoes = await db.select().from(tarefasTags)
    .orderBy(tarefasTags.tarefaId, tarefasTags.tagId)
  console.log('Associações entre tarefas e tags:')
  console.table(listaAssociacoes)
} finally {
  await pool.end()
}