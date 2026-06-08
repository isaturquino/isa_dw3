## Exercício 04 — Explicação da arquitetura

Escreva, com suas palavras:

- por que o SQL de laboratório não deveria continuar no `server.js`;
- por que o `Repository` é o lugar correto para acesso a dados;
- o que mudou e o que não mudou na arquitetura do sistema.

### Resposta
Na arquitetura da aplicação, o SQL utilizado inicialmente no server.js não deve permanecer ali, pois esse arquivo tem como responsabilidade principal apenas iniciar o servidor e configurar rotas. Misturar lógica de acesso a dados com a inicialização da aplicação torna o código desorganizado, difícil de manter e pouco escalável.

O Repository é o local correto para o acesso a dados porque ele centraliza toda a comunicação com o banco de dados. Dessa forma, caso haja mudanças no banco ou nas queries SQL, elas ficam isoladas em uma única camada, sem impactar diretamente o restante do sistema.

Com a separação em camadas (Controller, Service e Repository), houve uma melhora na organização do código. O Controller continua responsável por lidar com requisições e respostas HTTP, o Service pela lógica de negócio, e o Repository pelo acesso aos dados. Essa divisão facilita a manutenção, testes e evolução da aplicação.

Apesar dessas mudanças estruturais, a regra de negócio da aplicação não foi alterada. Ou seja, o comportamento do sistema permanece o mesmo, mas agora com uma arquitetura mais limpa, organizada e alinhada com boas práticas de desenvolvimento.
