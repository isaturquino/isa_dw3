-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "detalhes_projeto" (
	"id" serial PRIMARY KEY NOT NULL,
	"projeto_id" integer NOT NULL,
	"descricao_longa" text,
	"observacoes" text,
	"prazo_final" date,
	CONSTRAINT "detalhes_projeto_projeto_id_key" UNIQUE("projeto_id")
);

CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	CONSTRAINT "tags_nome_key" UNIQUE("nome")
);

CREATE TABLE "projetos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"criado_em" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "tarefas" (
	"id" serial PRIMARY KEY NOT NULL,
	"descricao" text NOT NULL,
	"concluido" boolean DEFAULT false NOT NULL,
	"criada_em" timestamp DEFAULT now() NOT NULL,
	"projeto_id" integer
);

CREATE TABLE "tarefas_tags" (
	"tarefa_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "tarefas_tags_pkey" PRIMARY KEY("tarefa_id","tag_id")
);

ALTER TABLE "detalhes_projeto" ADD CONSTRAINT "detalhes_projeto_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "public"."tarefas"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
*/