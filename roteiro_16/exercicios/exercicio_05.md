# Exercício 5 — Conferir uma tabela de ponta a ponta

## Tabela escolhida: `detalhes_projeto`

### 1. CREATE TABLE

A estrutura estudada para `detalhes_projeto` é:

```sql
CREATE TABLE IF NOT EXISTS detalhes_projeto (
  id SERIAL PRIMARY KEY,
  projeto_id INTEGER NOT NULL UNIQUE,
  descricao_longa TEXT,
  observacoes TEXT,
  prazo_final DATE,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);
```

### 2. Representação em Drizzle

```js
export const detalhesProjeto = pgTable('detalhes_projeto', {
  id: serial('id').primaryKey(),
  projetoId: integer('projeto_id').notNull().unique().references(() => projetos.id),
  descricaoLonga: text('descricao_longa'),
  observacoes: text('observacoes'),
  prazoFinal: date('prazo_final'),
})
```
### 3. Correspondência entre SQL e Drizzle

| SQL                     | Drizzle                          | Função                                     |
| ----------------------- | -------------------------------- | ------------------------------------------ |
| `id SERIAL PRIMARY KEY` | `serial('id').primaryKey()`      | Identificador único                        |
| `projeto_id INTEGER`    | `integer('projeto_id')`          | Identifica o projeto relacionado           |
| `NOT NULL`              | `.notNull()`                     | Impede valores nulos                       |
| `UNIQUE`                | `.unique()`                      | Permite apenas um detalhamento por projeto |
| `FOREIGN KEY`           | `.references(() => projetos.id)` | Garante que o projeto exista               |
| `descricao_longa TEXT`  | `text('descricao_longa')`        | Armazena a descrição longa                 |
| `observacoes TEXT`      | `text('observacoes')`            | Armazena observações                       |
| `prazo_final DATE`      | `date('prazo_final')`            | Armazena a data final                      |

No caso de `projeto_id`, as restrições são combinadas no Drizzle:

```ts
projetoId: integer('projeto_id')
  .notNull()
  .unique()
  .references(() => projetos.id)
```

Assim, o campo é obrigatório, não pode se repetir e deve fazer referência a um projeto existente.

Os campos `descricao_longa`, `observacoes` e `prazo_final` não possuem `.notNull()`, portanto podem receber `NULL`, conforme a estrutura estudada.

## 4. Execução

Após criar a tabela `detalhes_projeto` e configurar sua representação no Drizzle ORM, foi executado um script para consultar os registros armazenados na tabela.

A consulta realizada retornou o seguinte resultado:

```text
Detalhes dos projetos:
┌─────────┬────┬───────────┬────────────────────────────────────────────────┬──────────────────────────────────────┬──────────────┐
│ (index) │ id │ projetoId │ descricaoLonga                                 │ observacoes                          │ prazoFinal   │
├─────────┼────┼───────────┼────────────────────────────────────────────────┼──────────────────────────────────────┼──────────────┤
│ 0       │ 1  │ 1         │ 'Projeto focado na evolução da API de tarefas' │ 'Organizar endpoints e persistência' │ '2026-07-10' │
└─────────┴────┴───────────┴────────────────────────────────────────────────┴──────────────────────────────────────┴──────────────┘
```

O resultado demonstra que a tabela foi acessada corretamente pelo Drizzle ORM e que os dados foram retornados utilizando os nomes das propriedades definidos no schema.

O registro retornado possui `id` igual a `1` e `projetoId` igual a `1`, além dos valores preenchidos para `descricaoLonga`, `observacoes` e `prazoFinal`.

Essa execução comprova que a tabela pode ser consultada pelo Drizzle e que seus registros estão sendo recuperados corretamente. Entretanto, o resultado do `SELECT` não comprova sozinho todas as restrições definidas na tabela, como `NOT NULL`, `UNIQUE` e a chave estrangeira, que devem ser verificadas diretamente na estrutura do banco de dados.
