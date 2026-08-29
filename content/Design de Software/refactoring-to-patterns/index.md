O livro **_Refactoring to Patterns_**, de **Joshua Kerievsky**, é praticamente uma ponte entre o livro _Refactoring_ de Martin Fowler e o _Design Patterns_ da GoF. A ideia não é "aplique padrões em tudo", mas sim **refatore para um padrão quando o código pedir isso**.

Abaixo está uma visão geral das principais refatorações do livro.

| Refatoração                                        | Kebab-case                                           | O que faz                                                   |
| -------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| Compose Method                                     | `compose-method`                                     | Quebra métodos longos em pequenos métodos com nomes claros. |
| Move Accumulation to Visitor                       | `move-accumulation-to-visitor`                       | Move lógica de agregação para um Visitor.                   |
| Replace Conditional Logic with Strategy            | `replace-conditional-logic-with-strategy`            | Troca `if/switch` que escolhem algoritmos por Strategy.     |
| Replace State-Altering Conditionals with State     | `replace-state-altering-conditionals-with-state`     | Troca condicionais baseadas em estado pelo padrão State.    |
| Replace Conditional Dispatcher with Command        | `replace-conditional-dispatcher-with-command`        | Cada ação vira um Command, eliminando grandes `switch`.     |
| Replace Constructors with Creation Methods         | `replace-constructors-with-creation-methods`         | Substitui construtores por métodos de fábrica.              |
| Replace Constructors with Factory Method           | `replace-constructors-with-factory-method`           | Usa Factory Method para criar objetos.                      |
| Replace Constructors with Abstract Factory         | `replace-constructors-with-abstract-factory`         | Centraliza criação de famílias de objetos.                  |
| Introduce Null Object                              | `introduce-null-object`                              | Elimina verificações de `null` usando um objeto "vazio".    |
| Replace One/Many Distinctions with Composite       | `replace-one-many-distinctions-with-composite`       | Trata objetos únicos e coleções da mesma forma.             |
| Replace Implicit Language with Interpreter         | `replace-implicit-language-with-interpreter`         | Modela uma linguagem interna usando Interpreter.            |
| Replace Hard-Coded Notifications with Observer     | `replace-hard-coded-notifications-with-observer`     | Desacopla notificações usando Observer.                     |
| Replace Exception Handling with Callback           | `replace-exception-handling-with-callback`           | Substitui certos tratamentos repetitivos por callbacks.     |
| Encapsulate Composite with Builder                 | `encapsulate-composite-with-builder`                 | Builder monta estruturas complexas.                         |
| Unify Interfaces with Adapter                      | `unify-interfaces-with-adapter`                      | Faz APIs diferentes terem a mesma interface.                |
| Chain Constructors                                 | `chain-constructors`                                 | Construtores delegam entre si.                              |
| Form Template Method                               | `form-template-method`                               | Extrai algoritmo comum para uma classe base.                |
| Introduce Polymorphic Creation with Factory Method | `introduce-polymorphic-creation-with-factory-method` | Subclasses decidem qual objeto criar.                       |
| Replace Type Code with Class                       | `replace-type-code-with-class`                       | Um código (`int`, `string`) vira uma classe.                |
| Replace Type Code with Subclasses                  | `replace-type-code-with-subclasses`                  | Cada tipo vira uma subclasse.                               |
| Replace Type Code with State/Strategy              | `replace-type-code-with-state-strategy`              | Usa State ou Strategy em vez de códigos de tipo.            |
| Introduce Parameter Object                         | `introduce-parameter-object`                         | Agrupa muitos parâmetros em um objeto.                      |
| Preserve Whole Object                              | `preserve-whole-object`                              | Passa o objeto inteiro em vez de vários atributos.          |
| Replace Conditional Tests with Polymorphism        | `replace-conditional-tests-with-polymorphism`        | Elimina `if/switch` usando polimorfismo.                    |

> Dependendo da edição do livro, alguns nomes variam ligeiramente ou aparecem agrupados, mas a essência é essa.

---

# As mais úteis para um desenvolvedor Web

Conhecendo as conversas que tivemos sobre PHP, Zend, Laravel e código legado, eu colocaria estas como prioridade.

| Refatoração                                            | Utilidade                                                                                |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| ⭐⭐⭐⭐⭐ `compose-method`                                 | Métodos menores e mais legíveis. Você vai usar praticamente todos os dias.               |
| ⭐⭐⭐⭐⭐ `replace-conditional-logic-with-strategy`        | Muito útil quando surgem vários `if` para regras de negócio.                             |
| ⭐⭐⭐⭐⭐ `replace-conditional-dispatcher-with-command`    | Excelente para controllers, ações, menus e dispatchers.                                  |
| ⭐⭐⭐⭐⭐ `form-template-method`                           | Muito útil quando existe um fluxo fixo com pequenas variações.                           |
| ⭐⭐⭐⭐⭐ `replace-constructors-with-creation-methods`     | Facilita a criação de objetos complexos e melhora a legibilidade.                        |
| ⭐⭐⭐⭐☆ `introduce-null-object`                          | Elimina muitos `if ($obj !== null)` espalhados pelo código.                              |
| ⭐⭐⭐⭐☆ `introduce-parameter-object`                     | Resolve métodos com listas enormes de parâmetros.                                        |
| ⭐⭐⭐⭐☆ `replace-conditional-tests-with-polymorphism`    | Um dos refactorings mais importantes para código orientado a objetos.                    |
| ⭐⭐⭐⭐☆ `replace-type-code-with-state-strategy`          | Muito útil quando há muitos `status`, `tipo` ou `categoria` controlando o comportamento. |
| ⭐⭐⭐⭐☆ `unify-interfaces-with-adapter`                  | Excelente para integrar APIs externas com uma interface consistente.                     |
| ⭐⭐⭐⭐☆ `replace-hard-coded-notifications-with-observer` | Muito útil para eventos e notificações desacopladas.                                     |
| ⭐⭐⭐☆☆ `encapsulate-composite-with-builder`             | Útil para montar objetos ou documentos complexos (como seu exportador HTML/Excel).       |

---

# As que eu estudaria primeiro

Se o objetivo é evoluir como desenvolvedor de sistemas corporativos (PHP, Laravel, Java/Spring, arquitetura e código legado), eu faria esta ordem:

1. `compose-method`
    
2. `form-template-method`
    
3. `replace-conditional-logic-with-strategy`
    
4. `replace-conditional-tests-with-polymorphism`
    
5. `replace-conditional-dispatcher-with-command`
    
6. `introduce-null-object`
    
7. `introduce-parameter-object`
    
8. `replace-constructors-with-creation-methods`
    
9. `replace-type-code-with-state-strategy`
    
10. `unify-interfaces-with-adapter`
    

Essa sequência começa com refatorações que você consegue aplicar imediatamente em qualquer código e avança para padrões mais estruturais e comportamentais.

Pelas nossas conversas sobre seu projeto de exportação, sobre o uso de `Builder`, sobre `Strategy`, sobre tratamento de exceções repetitivo e sobre o livro _Patterns of Enterprise Application Architecture_, essa seleção cobre justamente os padrões e refatorações que tendem a trazer mais benefício no tipo de sistema que você desenvolve.