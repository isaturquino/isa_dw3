# Exercício 2 — Diagnosticar uma representação incompleta

O schema está incompleto porque a tabela `projetos` possui a coluna `criado_em`, que não foi representada no código.

No banco, essa coluna foi definida como:

```sql
criado_em TIMESTAMP NOT NULL DEFAULT NOW()
```

A representação correspondente em Drizzle é:

```js
criadoEm: timestamp('criado_em').notNull().defaultNow(),
```

Assim, a definição completa de `projetos` deve conter:

```js
export const projetos = pgTable('projetos', {
  id: serial('id').primaryKey(),
  nome: text('nome').notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
})
```

Uma leitura com `SELECT` pode funcionar mesmo que essa coluna não esteja representada no schema, pois o banco continuará permitindo a consulta dos dados. Portanto, uma leitura bem-sucedida não garante que o schema esteja representando todas as colunas e regras da tabela.

Para identificar a omissão, é necessário comparar a estrutura real da tabela no PostgreSQL com sua representação no `schema.js`.
