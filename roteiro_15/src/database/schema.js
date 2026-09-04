import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// Representação da tabela tarefas
export const tarefas = pgTable('tarefas', {
  id: serial('id').primaryKey(),
  descricao: text('descricao').notNull(),
  concluido: boolean('concluido').notNull().default(false),
  projetoId: integer('projeto_id'),
})

// Representação da tabela projetos
export const projetos = pgTable('projetos', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
})