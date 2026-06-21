# Resolução dos Exercícios

## Exercício 1

Para trazer apenas projetos que têm detalhamento, usei `INNER JOIN`, porque ele só retorna quando existe correspondência nas duas tabelas.

```sql
SELECT
  p.nome,
  d.descricao_longa,
  d.prazo_final
FROM projetos p
INNER JOIN detalhes_projeto d
  ON d.projeto_id = p.id;
```

---

## Exercício 2

O banco não deixa inserir dois registros com o mesmo `projeto_id` porque existe uma restrição (tipo `UNIQUE`).

Isso garante que cada projeto tenha apenas um detalhamento, ou seja, relação 1:1.

---

## Exercício 3

### Parte 1

```sql
SELECT
  t.descricao,
  tag.nome
FROM tarefas t
JOIN tarefa_tag tt ON tt.tarefa_id = t.id
JOIN tags tag ON tag.id = tt.tag_id;
```

---

### Parte 2

```sql
SELECT
  t.id,
  t.descricao,
  COUNT(tt.tag_id)
FROM tarefas t
JOIN tarefa_tag tt ON tt.tarefa_id = t.id
GROUP BY t.id
HAVING COUNT(tt.tag_id) > 1;
```

Aqui usei `GROUP BY` pra agrupar e `HAVING` pra filtrar só as tarefas com mais de uma tag.

---

## Exercício 4

1. Usuário → Perfil → 1:1
2. Cliente → Pedido → 1:N
3. Artigo → Categoria → N:N

Tabelas do caso 3:

```sql
artigos (id, titulo, conteudo)
categorias (id, nome)

artigo_categoria (
  artigo_id,
  categoria_id
)
```

---

## Exercício 5

Para trazer as tags na API, precisei fazer JOIN com `tarefa_tag` e `tags`.

```sql
SELECT
  t.id,
  t.descricao,
  tag.nome
FROM tarefas t
LEFT JOIN tarefa_tag tt ON tt.tarefa_id = t.id
LEFT JOIN tags tag ON tag.id = tt.tag_id
WHERE t.id = $1;
```

O resultado vem repetido (uma linha por tag), então tratei no service para virar um array.

Exemplo final:

```json
{
  "id": 1,
  "descricao": "Estudar",
  "tags": ["JS", "Node"]
}
```
