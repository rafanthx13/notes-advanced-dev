
Difenreça do Command
+ Estou escolhendo entre operações completamente diferentes?
+ Ex: Imagine que meu front recebe numsero de 1 a 7, onde cada um é uma açao difenrete a ser tomada: Aí é command e não strategy

Difrença do Strategy:
+ Strategy: Executar uma aão de formas difenrete para ocntexto difernetes
+ Estou fazendo exatamente a mesma operação, mas existem várias maneiras de executá-la? (Para objetos difenrete): **STRATEGY**

# Padrão Command

## O que é

O **Command** é um padrão de projeto comportamental (Behavioral Pattern) que **transforma uma ação em um objeto**.

Em vez de chamar um método diretamente:

```
$userService->create($user);
```

você cria um objeto que representa essa ação:

```
$command = new CreateUserCommand($user);

$command->execute();
```

À primeira vista isso pode parecer apenas "dar uma volta maior", mas a grande vantagem é que **a ação passa a ser tratada como um objeto**. E objetos podem ser armazenados, passados como parâmetro, colocados em filas, registrados em logs, desfeitos (undo), repetidos, etc.

## Quando vale a pena usar?

O Command é muito útil quando você quer desacoplar **quem pede uma ação** de **quem a executa**.

Casos comuns:

- Menus de aplicações
- Botões de interface gráfica
- APIs que despacham ações
- Filas de processamento (Jobs)
- Operações com Undo/Redo
- Macros (executar uma sequência de comandos)
- Sistemas onde as ações são registradas ou reagendadas

---
----
---
# GPT001 - Fale sobre Replace Conditional dispatcher with command

O padrão **Replace Conditional Dispatcher with Command** é um refactoring descrito por Martin Fowler para eliminar grandes blocos de `if`, `else` ou `switch` que decidem **qual ação executar**.

A ideia é simples:

> Em vez de uma classe decidir o que fazer através de condicionais, cada ação vira um objeto (Command) responsável por executar sua própria lógica.

## Antes

Imagine uma API que recebe uma ação:

```php
switch ($action) {
    case 'create':
        $this->createUser($data);
        break;

    case 'update':
        $this->updateUser($data);
        break;

    case 'delete':
        $this->deleteUser($data);
        break;

    default:
        throw new Exception("Ação inválida");
}
```

O problema é que, sempre que surge uma nova ação, você precisa modificar esse `switch`.

Isso viola o **Open/Closed Principle (OCP)**: a classe precisa ser alterada para ser estendida.

---

## Depois (Command)

Cada operação vira uma classe.

```php
interface Command
{
    public function execute(array $data);
}
```

```php
class CreateUserCommand implements Command
{
    public function execute(array $data)
    {
        // cria usuário
    }
}
```

```php
class UpdateUserCommand implements Command
{
    public function execute(array $data)
    {
        // atualiza usuário
    }
}
```

Agora existe apenas um despachante:

```php
$commands = [
    'create' => new CreateUserCommand(),
    'update' => new UpdateUserCommand(),
    'delete' => new DeleteUserCommand(),
];

$commands[$action]->execute($data);
```

Não há mais um `switch` gigante.

---

## Vantagens

* Cada comando tem responsabilidade única.
* Adicionar uma nova ação significa criar apenas uma nova classe.
* Código mais fácil de testar.
* Evita classes enormes.

---

## Onde isso aparece no dia a dia

### Controllers

Em vez de:

```php
switch ($request->type) {
    case 'PIX':
        ...
    case 'TED':
        ...
}
```

Você pode ter:

```
PixTransferCommand
TedTransferCommand
DocTransferCommand
```

---

### Importadores

Em vez de:

```php
if ($type == "csv") ...
else if ($type == "xml") ...
else if ($type == "json") ...
```

Cada formato é um comando.

---

### Menus

```php
switch ($button) {
    case "Save":
    case "Open":
    case "Print":
}
```

Esse é justamente um dos usos clássicos do padrão Command em interfaces gráficas.

---

## Dispatcher

O "Dispatcher" normalmente fica extremamente pequeno.

```php
class Dispatcher
{
    private array $commands;

    public function dispatch(string $name, array $data)
    {
        if (!isset($this->commands[$name])) {
            throw new InvalidArgumentException();
        }

        $this->commands[$name]->execute($data);
    }
}
```

Ele apenas encontra o comando correto.

---

## Isso é o padrão Command?

Sim.

Na prática, esse refactoring é uma aplicação do **Command Pattern**.

O "Replace Conditional Dispatcher with Command" nada mais é do que substituir um mecanismo de decisão (`if`/`switch`) por objetos Command.

---

## Relação com Strategy

Os dois padrões são parecidos porque ambos eliminam condicionais, mas têm focos diferentes:

| Command                                                         | Strategy                                                                      |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Representa uma ação ou operação                                 | Representa um algoritmo ou forma de executar algo                             |
| Geralmente possui um método `execute()`                         | Geralmente possui um método como `calculate()`, `export()`, `validate()` etc. |
| Pode encapsular todos os dados necessários para executar a ação | Recebe dados e aplica um algoritmo específico                                 |
| Muito usado para menus, filas, jobs, controllers e dispatchers  | Muito usado para regras de negócio, cálculos, ordenações e validações         |

Uma forma simples de diferenciar:

* **Command responde à pergunta:** *"O que deve ser feito?"*
* **Strategy responde à pergunta:** *"Como isso deve ser feito?"*

No seu contexto de desenvolvimento (PHP, Zend/Laravel e sistemas de negócio), esse refactoring é especialmente útil quando você encontra métodos enormes com dezenas de `if` ou `switch` escolhendo uma operação com base em um tipo, ação ou status. Em vez de concentrar todas as possibilidades em uma única classe, cada operação ganha sua própria classe, tornando o código mais modular, extensível e fácil de testar.


# GPT002- Qual a diferença para o Strategy

> (Mina mensagem) Deixa eu ver se entendino Command é trocar de açao (ou seja uma é completamente difenrete) enquanto que no strategy é tipo a mesma funçao mas que tem que ser executa de forma difenrete para tratar coisa difernetes, é isso?


Sim, essa é uma excelente forma de enxergar a diferença. Eu só faria um pequeno ajuste na forma de pensar.

### Command → **qual ação executar**

Cada comando representa uma ação diferente do sistema.

Por exemplo, em um sistema bancário:

```text
CadastrarClienteCommand
ExcluirClienteCommand
GerarRelatorioCommand
EnviarEmailCommand
```

Perceba que são coisas completamente diferentes. Não faz sentido dizer que uma é uma "estratégia" da outra.

O código pergunta:

> **"O que eu quero fazer?"**

---

### Strategy → **como executar a mesma tarefa**

Agora imagine que você sempre precisa **calcular um desconto**.

O que muda não é a ação ("calcular desconto"), mas a forma de calcular.

```text
DescontoClienteVipStrategy
DescontoClienteComumStrategy
DescontoBlackFridayStrategy
```

Todas fazem exatamente a mesma coisa:

```php
$desconto = $strategy->calcular($pedido);
```

O que muda é **o algoritmo**.

O código pergunta:

> **"Como devo fazer isso?"**

---

## Um exemplo lado a lado

Imagine um sistema de exportação.

### Command

```text
ExportarExcelCommand
EnviarEmailCommand
ExcluirArquivoCommand
```

São ações completamente diferentes.

---

### Strategy

Agora olhe só a exportação.

```text
ExportarCsvStrategy
ExportarPdfStrategy
ExportarHtmlStrategy
```

A ação continua sendo:

> Exportar.

O que muda é **como** ela será realizada.

---

## Uma regra prática

Sempre gosto de fazer duas perguntas:

### 1. Estou escolhendo entre operações completamente diferentes?

```
Cadastrar
Excluir
Importar
Exportar
Enviar Email
```

➡️ **Command**

---

### 2. Estou fazendo exatamente a mesma operação, mas existem várias maneiras de executá-la?

```
Calcular imposto
Validar documento
Exportar
Ordenar
Calcular frete
```

➡️ **Strategy**

---

### No seu projeto de exportação

Pelo que você me contou nas conversas anteriores, você tem uma classe abstrata `Exporter`, e cada implementação gera um formato diferente (Excel, PDF etc.), enquanto o fluxo geral (header → body → footer) permanece o mesmo.

Isso é um caso clássico de **Strategy** (e também tem características de **Template Method** por causa do fluxo fixo).

Se, por outro lado, você tivesse um menu como:

```text
Exportar
Importar
Excluir
Enviar por e-mail
```

A escolha entre essas ações faria mais sentido ser modelada com **Command**.

Então, sua frase resume muito bem a ideia:

- **Command:** "qual ação vou executar?"
    
- **Strategy:** "como vou executar essa mesma ação?"

