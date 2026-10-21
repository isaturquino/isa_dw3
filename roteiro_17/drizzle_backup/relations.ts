import { relations } from "drizzle-orm/relations";
import { projetos, detalhesProjeto, tarefas, tarefasTags, tags } from "./schema";

export const detalhesProjetoRelations = relations(detalhesProjeto, ({one}) => ({
	projeto: one(projetos, {
		fields: [detalhesProjeto.projetoId],
		references: [projetos.id]
	}),
}));

export const projetosRelations = relations(projetos, ({many}) => ({
	detalhesProjetos: many(detalhesProjeto),
	tarefas: many(tarefas),
}));

export const tarefasRelations = relations(tarefas, ({one, many}) => ({
	projeto: one(projetos, {
		fields: [tarefas.projetoId],
		references: [projetos.id]
	}),
	tarefasTags: many(tarefasTags),
}));

export const tarefasTagsRelations = relations(tarefasTags, ({one}) => ({
	tarefa: one(tarefas, {
		fields: [tarefasTags.tarefaId],
		references: [tarefas.id]
	}),
	tag: one(tags, {
		fields: [tarefasTags.tagId],
		references: [tags.id]
	}),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	tarefasTags: many(tarefasTags),
}));