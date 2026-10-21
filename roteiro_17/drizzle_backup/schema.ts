import { pgTable, foreignKey, unique, serial, integer, text, date, timestamp, boolean, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const detalhesProjeto = pgTable("detalhes_projeto", {
	id: serial().primaryKey().notNull(),
	projetoId: integer("projeto_id").notNull(),
	descricaoLonga: text("descricao_longa"),
	observacoes: text(),
	prazoFinal: date("prazo_final"),
}, (table) => [
	foreignKey({
			columns: [table.projetoId],
			foreignColumns: [projetos.id],
			name: "detalhes_projeto_projeto_id_fkey"
		}),
	unique("detalhes_projeto_projeto_id_key").on(table.projetoId),
]);

export const tags = pgTable("tags", {
	id: serial().primaryKey().notNull(),
	nome: text().notNull(),
}, (table) => [
	unique("tags_nome_key").on(table.nome),
]);

export const projetos = pgTable("projetos", {
	id: serial().primaryKey().notNull(),
	nome: text().notNull(),
	criadoEm: timestamp("criado_em", { mode: 'string' }).defaultNow().notNull(),
});

export const tarefas = pgTable("tarefas", {
	id: serial().primaryKey().notNull(),
	descricao: text().notNull(),
	concluido: boolean().default(false).notNull(),
	criadaEm: timestamp("criada_em", { mode: 'string' }).defaultNow().notNull(),
	projetoId: integer("projeto_id"),
}, (table) => [
	foreignKey({
			columns: [table.projetoId],
			foreignColumns: [projetos.id],
			name: "tarefas_projeto_id_fkey"
		}),
]);

export const tarefasTags = pgTable("tarefas_tags", {
	tarefaId: integer("tarefa_id").notNull(),
	tagId: integer("tag_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tarefaId],
			foreignColumns: [tarefas.id],
			name: "tarefas_tags_tarefa_id_fkey"
		}),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "tarefas_tags_tag_id_fkey"
		}),
	primaryKey({ columns: [table.tarefaId, table.tagId], name: "tarefas_tags_pkey"}),
]);
