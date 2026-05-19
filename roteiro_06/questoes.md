## Questões de reflexão

### 1. O que é um Fat Model?

Fat Model é quando o Model acumula responsabilidades demais. Ele cuida tanto das regras de negócio quanto do acesso aos dados.

Isso é um problema porque, conforme a aplicação cresce, o mesmo arquivo passa a ter muitos motivos para mudar. Por exemplo, se eu quiser alterar uma regra de negócio ou trocar o array por um banco de dados, teria que mexer no mesmo Model, aumentando o risco de quebrar partes do sistema.

---

### 2. Por que o TarefaService recebe o TarefaRepository via constructor?

O `TarefaService` recebe o `TarefaRepository` pelo constructor para diminuir o acoplamento entre as classes.

Assim, o Service não precisa criar diretamente um repository com `new TarefaRepository()`. Ele apenas recebe uma dependência pronta e usa os métodos dela.

A vantagem é que, se no futuro eu quiser trocar o repository em memória por outro que usa PostgreSQL, posso fazer essa troca no `server.js`, sem precisar alterar as regras de negócio dentro do Service.

---

### 3. Qual é o papel do server.js como Composition Root?

O `server.js` é o arquivo responsável por criar e conectar as partes da aplicação.

Nele são criadas as instâncias do `TarefaRepository`, `TarefaService` e `TarefaController`. Depois, essas dependências são passadas uma para a outra na ordem correta.

Ou seja, o `server.js` monta a aplicação e define como as camadas se comunicam.

---

### 4. Se trocasse para PostgreSQL, quais arquivos seriam criados ou modificados?

Com essa arquitetura, a principal mudança seria no Repository, porque ele é a camada responsável pelo acesso aos dados.

Eu poderia criar um novo arquivo, por exemplo:

`postgres-tarefa.repository.js`

Esse novo repository teria os mesmos métodos, como `buscarTodos`, `buscarPorId`, `salvar`, `atualizar`, `remover` e `buscarPendentes`, mas usando comandos SQL ou uma biblioteca de banco de dados.

Também seria necessário modificar o `server.js` para instanciar esse novo repository no lugar do repository em memória.

O Service, o Controller e as Routes não precisariam mudar muito, porque eles não sabem como os dados são armazenados.

---

### 5. Por que alternarConcluido fica no Service e não no Repository?

Essa lógica fica no Service porque ela representa uma regra de negócio.

O método `alternarConcluido` não apenas atualiza um dado. Ele precisa buscar a tarefa, verificar se ela existe e inverter o valor de `concluido`.

O Repository deve apenas cuidar do acesso aos dados, como buscar, salvar, atualizar e remover. Já o Service decide o que deve acontecer com esses dados de acordo com as regras da aplicação.