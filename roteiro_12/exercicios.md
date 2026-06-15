### Exercício 1 — Comparando `Client` e `Pool`

O `Client` resolve bem situações mais simples, onde a aplicação faz poucas conexões com o banco. Ele permite abrir uma conexão, executar consultas e depois fechar, sendo útil para testes ou scripts pequenos.

Já o `Pool` passa a fazer mais sentido neste ponto porque a aplicação começa a crescer e pode ter várias requisições ao mesmo tempo. O pool reutiliza conexões, evitando o custo de ficar abrindo e fechando conexões constantemente, o que melhora o desempenho.

Esse assunto só aparece agora porque antes estávamos focando em entender o básico de conexão e consultas. Só depois que a aplicação começa a ficar mais estruturada é que faz sentido pensar em desempenho e organização de conexões.

---

### Exercício 2 — Configuração do pool

Na configuração do Pool de conexões do PostgreSQL, é possível definir alguns parâmetros que controlam como as conexões com o banco de dados serão gerenciadas.

* `max`: define o número máximo de conexões simultâneas que o Pool pode manter com o banco de dados.

* `idleTimeoutMillis`: define o tempo máximo que uma conexão pode permanecer ociosa antes de ser encerrada.

Essas configurações são importantes para controlar o uso de conexões, evitando desperdício de recursos e melhorando o desempenho da aplicação.

---

### Exercício 3 — Limites do `Repository`

**Pertencem ao módulo `database`:**

* criação e configuração do `Pool`;
* definição das credenciais e conexão com o banco;
* controle de ciclo de vida das conexões.

**Pertencem ao `Repository`:**

* escrita das queries SQL;
* execução de consultas usando o pool;
* organização e retorno dos dados para a aplicação.

---

### Exercício 4 — Revisão de arquitetura

No Roteiro 10, a aplicação apresentava uma estrutura mais simples, em que o acesso ao banco de dados era realizado de forma direta. Nesse estágio, ainda não havia uma separação bem definida de responsabilidades, fazendo com que a lógica de conexão e execução de consultas ficasse mais concentrada e menos organizada.

No Roteiro 11, ocorre uma melhora na organização do projeto, com a introdução de um módulo específico para gerenciar a conexão com o banco de dados. Essa mudança permite separar a responsabilidade da conexão da lógica principal da aplicação, tornando o código mais estruturado e facilitando sua manutenção.

Já no Roteiro 12, a arquitetura é aprimorada com a adoção do padrão Repository. A partir desse momento, o Repository passa a ser responsável exclusivamente pelas operações de acesso aos dados (queries), enquanto o módulo de database se encarrega da configuração e gerenciamento das conexões, utilizando o Pool. Essa separação torna o sistema mais organizado, reutilizável e próximo de práticas profissionais.

Dessa forma, as mudanças entre os roteiros representam uma evolução gradual da aplicação: inicialmente focada em fazer o sistema funcionar, depois em melhorar sua organização e, por fim, em aplicar boas práticas de arquitetura, com clara separação de responsabilidades entre as camadas.
