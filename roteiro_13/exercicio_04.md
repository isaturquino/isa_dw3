Aqui está uma versão **simples em Markdown** 👇

---

## Exercício 4 — Respostas

### 1. JOINs com intenção

* `LEFT JOIN` é usado na listagem geral porque traz **todas as tarefas**, mesmo sem projeto.
* `INNER JOIN` é usado na busca por projeto porque traz **apenas tarefas que têm projeto**.

**Exemplo:**

* Tarefa "Fazer café" sem projeto:

  * aparece no `LEFT JOIN`
  * não aparece no `INNER JOIN`

---

### 2. Limite do modelo atual

Não, `projeto_id` não resolve.

Porque ele representa um relacionamento **1:N (um para muitos)**:

* uma tarefa → um projeto

Mas o novo requisito é:

* uma tarefa → várias tags
* uma tag → várias tarefas

Isso é **N:N (muitos para muitos)**, que não funciona com uma única chave estrangeira.

---

### 3. Novo modelo (esboço)

Precisamos de 3 tabelas:

* `tarefas`
* `tags`
* `tarefa_tags` (tabela intermediária)

**Exemplo:**

* tarefas

  * id, descricao

* tags

  * id, nome

* tarefa_tags

  * tarefa_id
  * tag_id

---

### Resumo

* `LEFT JOIN` → traz tudo
* `INNER JOIN` → traz só relacionados
* `projeto_id` → funciona para 1:N
* tags → precisam de N:N
* solução → tabela intermediária (`pivot`) 🚀
