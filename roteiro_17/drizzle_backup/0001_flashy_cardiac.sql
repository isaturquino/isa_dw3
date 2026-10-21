ALTER TABLE "detalhes_projeto" DROP CONSTRAINT "detalhes_projeto_projeto_id_key";
ALTER TABLE "tags" DROP CONSTRAINT "tags_nome_key";
ALTER TABLE "detalhes_projeto" DROP CONSTRAINT "detalhes_projeto_projeto_id_fkey";

ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_projeto_id_fkey";

ALTER TABLE "tarefas_tags" DROP CONSTRAINT "tarefas_tags_tarefa_id_fkey";

ALTER TABLE "tarefas_tags" DROP CONSTRAINT "tarefas_tags_tag_id_fkey";

ALTER TABLE "tarefas_tags" DROP CONSTRAINT "tarefas_tags_pkey";
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_tarefa_id_tag_id_pk" PRIMARY KEY("tarefa_id","tag_id");
ALTER TABLE "tarefas" ADD COLUMN "prioridade" text DEFAULT 'media';
ALTER TABLE "detalhes_projeto" ADD CONSTRAINT "detalhes_projeto_projeto_id_projetos_id_fk" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_projeto_id_projetos_id_fk" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_tarefa_id_tarefas_id_fk" FOREIGN KEY ("tarefa_id") REFERENCES "public"."tarefas"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "detalhes_projeto" ADD CONSTRAINT "detalhes_projeto_projeto_id_unique" UNIQUE("projeto_id");
ALTER TABLE "tags" ADD CONSTRAINT "tags_nome_unique" UNIQUE("nome");