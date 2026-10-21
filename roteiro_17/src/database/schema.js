import {
  boolean,
  date,
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core'

// Tabela projetos
export const projetos = pgTable('projetos', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
})

// Tabela tarefas
export const tarefas = pgTable('tarefas', {
  id: serial('id').primaryKey(),
  descricao: text('descricao').notNull(),
  concluido: boolean('concluido').notNull().default(false),
  criadaEm: timestamp('criada_em').notNull().defaultNow(),
  projetoId: integer('projeto_id'),
  prioridade: text('prioridade').default('media'),
}, (table) => [
  foreignKey({
    columns: [table.projetoId],
    foreignColumns: [projetos.id],
    name: 'tarefas_projeto_id_fkey',
  }),
])

// Tabela detalhes_projeto
export const detalhesProjeto = pgTable('detalhes_projeto', {
  id: serial('id').primaryKey(),
  projetoId: integer('projeto_id').notNull(),
  descricaoLonga: text('descricao_longa'),
  observacoes: text('observacoes'),
  prazoFinal: date('prazo_final'),
}, (table) => [
  foreignKey({
    columns: [table.projetoId],
    foreignColumns: [projetos.id],
    name: 'detalhes_projeto_projeto_id_fkey',
  }),
  unique('detalhes_projeto_projeto_id_key').on(table.projetoId),
])

// Tabela tags
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
}, (table) => [
  unique('tags_nome_key').on(table.nome),
])

// Tabela tarefas_tags
export const tarefasTags = pgTable('tarefas_tags', {
  tarefaId: integer('tarefa_id').notNull(),
  tagId: integer('tag_id').notNull(),
}, (table) => [
  foreignKey({
    columns: [table.tarefaId],
    foreignColumns: [tarefas.id],
    name: 'tarefas_tags_tarefa_id_fkey',
  }),
  foreignKey({
    columns: [table.tagId],
    foreignColumns: [tags.id],
    name: 'tarefas_tags_tag_id_fkey',
  }),
  primaryKey({
    columns: [table.tarefaId, table.tagId],
    name: 'tarefas_tags_pkey',
  }),
])