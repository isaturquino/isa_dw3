# Exercício 1 — Justificar a diferença entre os vínculos

A diferença entre `tarefas.projetoId` e `detalhesProjeto.projetoId` está nas regras de relacionamento entre as tabelas.

Em `tarefas.projetoId`, não utilizamos `.notNull()` porque uma tarefa pode existir sem estar associada a um projeto. Também não utilizamos `.unique()`, pois várias tarefas podem pertencer ao mesmo projeto, representando uma relação **1:N**, em que um projeto pode possuir várias tarefas.

Já em `detalhesProjeto.projetoId`, utilizamos `.notNull()` porque todo detalhamento precisa estar associado a um projeto. Também utilizamos `.unique()` porque cada projeto pode possuir no máximo um detalhamento. Dessa forma, esse vínculo representa uma relação **1:1**, mais precisamente, um projeto pode ter zero ou um detalhamento.

Portanto:

* `tarefas.projetoId`: pode ser `NULL` e pode se repetir;
* `detalhesProjeto.projetoId`: não pode ser `NULL` e não pode se repetir.

Além disso, a existência de `.unique()` em `detalhesProjeto.projetoId` não obriga todo projeto a possuir um detalhamento. Um projeto pode existir sem nenhum registro correspondente em `detalhes_projeto`.
