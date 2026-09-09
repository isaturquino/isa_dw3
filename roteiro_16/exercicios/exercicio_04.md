# Exercício 4 — Separar descrição e regra aplicada

Não. Remover `.unique()` do `schema.js` não remove a restrição `UNIQUE` do PostgreSQL.

O `schema.js` representa a estrutura e as regras que já existem no banco, mas editar esse arquivo não executa automaticamente comandos como `ALTER TABLE` no PostgreSQL.

A leitura dos dados também não é suficiente para descobrir essa divergência. Um `SELECT` pode funcionar normalmente mesmo que `.unique()` esteja ausente no schema, pois a restrição continua existindo no banco.

Para identificar a divergência, é necessário comparar a estrutura real da tabela no PostgreSQL com a representação feita no `schema.js`, verificando especialmente as restrições de unicidade.

Nesse caso, o correto seria conferir se `tags.nome` possui a restrição `UNIQUE` no PostgreSQL e se ela está representada no Drizzle por:

```js
nome: text('nome').notNull().unique(),
```

Assim, a estrutura do banco e sua representação no código permanecem correspondentes.
