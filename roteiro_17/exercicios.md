## Exercício 1

Mantivemos os comandos `CREATE TABLE` comentados porque as cinco tabelas já existiam no banco, tendo sido criadas anteriormente com SQL. Executá-los novamente causaria conflitos por tentar criar tabelas existentes. Ao aplicar a baseline com o SQL comentado, o Drizzle registrou a etapa inicial no histórico sem recriar as tabelas.

## Exercício 2

Logo após executar `generate`, mas antes de `migrate`, a coluna `prioridade` está descrita no arquivo JavaScript `schema.js` e no arquivo SQL gerado. Entretanto, ela ainda não foi acrescentada à tabela real no PostgreSQL.

## Exercício 3

Eu não executaria o comando `migrate`. Primeiro, verificaria o arquivo `schema.js`, o caminho configurado em `drizzle.config.js` e a comparação entre o schema atual e a baseline. Depois, corrigiria a diferença ou pediria ajuda ao professor antes de aplicar uma alteração que não foi planejada.