# Exercício 3 — Raciocinar sobre a chave composta

Os pares `(2, 1)`, `(2, 3)` e `(4, 1)` podem coexistir porque são combinações diferentes de `tarefa_id` e `tag_id`.

* `(2, 1)` representa a associação da tarefa 2 com a tag 1.
* `(2, 3)` representa a associação da tarefa 2 com a tag 3.
* `(4, 1)` representa a associação da tarefa 4 com a tag 1.

Uma nova ocorrência de `(2, 1)` seria rejeitada porque esse par já existe e os dois campos juntos formam a chave primária composta da tabela `tarefas_tags`.

A chave composta permite que uma tarefa tenha várias tags e que uma tag seja utilizada em várias tarefas, mantendo apenas a regra de que a mesma associação não pode ser cadastrada duas vezes.

Se `tarefa_id` tivesse uma restrição individual de unicidade, uma tarefa poderia aparecer em apenas uma associação. Por exemplo, depois de cadastrar `(2, 1)`, não seria possível cadastrar `(2, 3)`. Isso impediria que uma tarefa tivesse várias tags e, portanto, quebraria a relação **N:N** entre tarefas e tags.
