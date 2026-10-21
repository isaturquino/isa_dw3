ALTER TABLE "detalhes_projeto" DROP CONSTRAINT "detalhes_projeto_projeto_id_unique";
ALTER TABLE "tags" DROP CONSTRAINT "tags_nome_unique";
ALTER TABLE "detalhes_projeto" DROP CONSTRAINT "detalhes_projeto_projeto_id_projetos_id_fk";

ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_projeto_id_projetos_id_fk";

ALTER TABLE "tarefas_tags" DROP CONSTRAINT "tarefas_tags_tarefa_id_tarefas_id_fk";

ALTER TABLE "tarefas_tags" DROP CONSTRAINT "tarefas_tags_tag_id_tags_id_fk";

ALTER TABLE "tarefas_tags" DROP CONSTRAINT "tarefas_tags_tarefa_id_tag_id_pk";
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_pkey" PRIMARY KEY("tarefa_id","tag_id");
ALTER TABLE "detalhes_projeto" ADD CONSTRAINT "detalhes_projeto_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "public"."projetos"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_tarefa_id_fkey" FOREIGN KEY ("tarefa_id") REFERENCES "public"."tarefas"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "tarefas_tags" ADD CONSTRAINT "tarefas_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "detalhes_projeto" ADD CONSTRAINT "detalhes_projeto_projeto_id_key" UNIQUE("projeto_id");
ALTER TABLE "tags" ADD CONSTRAINT "tags_nome_key" UNIQUE("nome");