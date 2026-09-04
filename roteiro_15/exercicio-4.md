# Exercício 4

Para comparar SQL e Drizzle, foi utilizada a operação de listagem das tarefas.

Na versão utilizando SQL, a consulta é escrita diretamente com `SELECT`, `FROM` e `ORDER BY`. Dessa forma, temos maior controle sobre a consulta e uma representação mais próxima do que é executado diretamente no banco de dados.

Na versão utilizando Drizzle, a mesma consulta é construída através de métodos JavaScript e das tabelas definidas no `schema.js`. Isso deixa o código mais integrado à aplicação e pode facilitar sua organização.

O SQL possui maior proximidade com o banco de dados e permite um controle mais direto das consultas. Já o Drizzle reduz a necessidade de escrever SQL diretamente e torna a interação com o banco mais integrada ao código JavaScript.

Assim, o Drizzle facilita o desenvolvimento, mas o conhecimento de SQL continua sendo importante para entender e controlar o que está acontecendo no banco de dados.
