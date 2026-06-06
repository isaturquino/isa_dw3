## Comparação entre memória e persistência

Guardar tarefas em um array é algo mais simples, mas tem uma grande limitação: os dados ficam só na memória da aplicação. Isso significa que, quando o servidor é reiniciado, todas as tarefas são perdidas. Ou seja, não existe persistência nesse caso.

Já quando usamos o PostgreSQL, os dados ficam salvos no banco de dados. Isso muda bastante, porque mesmo que o servidor seja desligado ou reiniciado, as tarefas continuam lá. Esse é o conceito de persistência: os dados não dependem mais da aplicação estar rodando.

Outra diferença importante é a responsabilidade do banco. Quando usamos PostgreSQL, ele passa a ser responsável por armazenar e organizar os dados de forma segura. A aplicação não precisa mais “guardar tudo sozinha”, ela só envia e busca informações do banco.

O impacto disso na aplicação é que ela fica mais próxima de um sistema real. Em vez de trabalhar com dados temporários, o backend passa a lidar com dados persistentes, usando consultas SQL e se conectando a uma estrutura externa.

Resumindo, usar array é útil para testes e aprendizado, mas usar PostgreSQL é essencial para aplicações reais, porque garante que os dados não serão perdidos ao reiniciar o servidor.
