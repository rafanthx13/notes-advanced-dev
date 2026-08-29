# Estudos de Design Patterns

**O que é**: O que são Design Patterns? Design Patterns ou padrões de projetos são soluções generalistas para problemas recorrentes durante o desenvolvimento de um software. Não se trata de um framework ou um código pronto, mas de uma definição de alto nível de como um problema comum pode ser solucionado

## Links

DESIGN PATTERS

+ https://www.opus-software.com.br/design-patterns/
+ https://github.com/kamranahmedse/design-patterns-for-humans

Aulas excelente de design pattern:
https://github.com/luizomf/design-patterns-typescript

SOLID

+ https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530

CLEAN CODE

+ https://medium.com/desenvolvendo-com-paixao/2-clean-code-boas-pr%C3%A1ticas-para-escrever-c%C3%B3digos-impec%C3%A1veis-361997b3c8b5

## Design Patterns

Criado pelo GoF do livro “Design Patterns: Elements of Reusable Object-Oriented Software”

**Creational Design Patterns**

+ Abstract Factory
+ Builder
+ Factory Method
+ Prototype
+ Singleton

**Structural Design Patterns**

+ Adapter
+ Bridge
+ Composite
+ Decorator
+ Façade
+ Flyweight
+ Proxy

**Behavioral Patterns**

+ Chain of Responsibility
+ Command
+ Interpreter
+ Iterator
+ Mediator
+ Memento
+ Observer
+ State
+ Strategy
+ Template Method
+ Visitor

## **Behavioral Patterns**

**Chain of Responsibility**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/chain-of-resposibility.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/chain-of-responsibility.png)

**Refactoring Guru:** Permite que você passe pedidos por uma corrente de handlers. Ao receber um pedido, cada handler decide se processa o pedido ou passa para o próximo handler da corrente.

**Meu Resumo:** Encadeamento em tempo de execução de Handler. Semelhante ao Decorator mas caapz de interromper o processo

**Command**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/command.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/command.png)

**Refactoring Guru:** Transforma o pedido em um objeto independente que contém toda a informação sobre o pedido. Essa Transformação permite que você parametrize métodos com diferentes pedidos, atrase ou coloque a execução do pedido em uma fila, e suporte operações que não podem ser feitas.

**Meu Resumo:**É como uma transação do SQL, em que é possível dar commit e até rollback, capaz de fazer `undo`.

**Iterator**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/iterator.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/iterator.png)

**Refactoring Guru:** Permite que você percorra elementos de uma coleção sem expor as representações estruturais deles (lista, pilha, árvore, etc.)

**Meu Resumo:** Serve Percorrer estruturas complexas como árvores

**Mediator**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/mediator.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/mediator.png)

**Refactoring Guru:** Permite que você reduza as dependências caóticas entre objetos. O padrão restringe comunicações diretas entre objetos e os força a colaborar apenas através do objeto mediador.

**Meu Resumo:** É como um controlador de tráfego aéreo, voce centraliza a comunicação entre os objetos num lugar só, e gerencia o tráfego.

**Memento**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/memento.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/memento.png)

**Refactoring Guru:** Permite que você salve e restaure o estado anterior de um objeto sem revelar os detalhes de sua implementação.

**Meu Resumo:** Salvar um estado

**Observer**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/observer.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/observer.png)

**Refactoring Guru:** Permite que você defina um mecanismo de assinatura para notificar múltiplos objetos sobre quaisquer eventos que aconteçam com o objeto que eles estão observando.

**Meu Resumo:** Modelo de Publisher-Subscriber, eu recebo a notificaçâo de que um estado mudou desde que eu me inscreva nele

**State**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/state.md)

 ![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/state.png)

**Refactoring Guru:** Permite que um objeto altere seu comportamento quando seu estado interno muda. Parece como se o objeto mudasse de classe.

**Meu Resumo:** É você usar para gerar States, e usál-lo como composição na classe principla, assim, cada estado vai vir com uma śerie de métodos implementados que vai mudar o comportamento da classe base a depender de qual `State` ela tem durante a execução.

**Strategy**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/strategy.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/strategy.png)

**Refactoring Guru:** Permite que você defina uma família de algoritmos, coloque-os em classes separadas, e faça os objetos deles intercambiáveis.

**Meu Resumo:** Ao invéz de IF, ou flag para executar algo, usar um objeto que possa ser trocado.

**Template Method**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/template-method.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/template-method.png)

**Refactoring Guru:** Define o esqueleto de um algoritmo na superclasse mas deixa as subclasses sobrescreverem etapas específicas do algoritmo sem modificar sua estrutura.

**Meu Resumo:** Escever metade de um método e o restante deixar para usar o que vinher de parâmetro ou de classe filha.

**Visitor**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/behavioral/visitor.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/visitor.png)

**Refactoring Guru:** Permite que você separe algoritmos dos objetos nos quais eles operam.

**Meu Resumo:** É adicionar um comportamento a um objeto sem modificá-lo. Fazemos isso colocamos ele dentro de outra classe, o Visitor, que pode acessá-lo e fazer outras coisas com ele.

## Structural Design Patterns

**Adapter**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/structural/adapter.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/adapter.png)

**Refactoring Guru:** Permite a colaboração de objetos de interfaces incompatíveis.

**Meu Resumo:** É você adaptar uma classe, ou seja, usar interface de *A e fazer com que *B execute algo igual a um A real.*

**Bridge**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/structural/bridge.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/bridge.png)

**Refactoring Guru:** Permite que você divida uma classe grande ou um conjunto de classes intimamente ligadas em duas hierarquias separadas—abstração e implementação—que podem ser desenvolvidas independentemente umas das outras.

**Meu Resumo:** Ao invéz de usar múltipla herança e ter n-heranaças, use composição e sub-classe para gerar as n combiaçoes. Brige é: uma classe principal e 1 ou mais inteface tais que a classe principla. tem por composiçao essas interfaces. Voce faz a variabildiade por: Filhas da classe princiapl e Implementaçoes da interface.

**Composite**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/structural/composite.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/composite.png)

**Refactoring Guru:** Permite que você componha objetos em estrutura de árvores e então trabalhe com essas estruturas como se fossem objetos individuais.

**Meu Resumo:** Basicamente é usar uma interface para implementar uma árvore, e fazer operações por recursão.

**Decorator**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/structural/decorator.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/decorator.png)

**Refactoring Guru:** Permite que você adicione novos comportamentos a objetos colocando eles dentro de um envoltório (wrapper) de objetos que contém os comportamentos.

**Meu Resumo:** Uma espécie de boneca russa, que facilita a vida. Ao invés de usar herança para resolver um problema, usa-se composição. Você coloca um objeto dentro de outro (na sua criaçao) e entao, num momento, faz a recursao para executar cada um dos objetos, como tirar todas as bonecas russas. Ou seja, envolve recursão na hora de executar algo no final.

**Facade**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/structural/facade.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/facade.png)

**Refactoring Guru:** Fornece uma interface simplificada para uma biblioteca, um framework, ou qualquer outro conjunto complexo de classes.

**Meu Resumo:** Em suma, é uma forma de abrigar vários métodos que costumam ser executados juntos em uma única chamada de método.

**Flyweight**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/structural/flyweight.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/flyweight.png)

**Refactoring Guru:** Permite que você coloque mais objetos na quantidade disponível de RAM ao compartilhar partes do estado entre múltiplos objetos ao invés de manter todos os dados em cada objeto.

**Meu Resumo:** Fazer o cache de um dado meio qu constante mas que é compartilhado por vários objetos, e por isso, faz gastar muita memória.

**Proxy**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/structural/proxy.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/proxy.png)

**Refactoring Guru:** Permite que você forneça um substituto ou um espaço reservado para outro objeto. Um proxy controla o acesso ao objeto original, permitindo que você faça algo ou antes ou depois do pedido chegar ao objeto original.

**Meu Resumo:** Uma classe que tem o objeot real por composiaçao e implementa a mesma interface. ELa entâo intercepta chamdas podendo fazer algo antes ou dpois da chamada do objeto real. Ela encapsula o objeto real. POde ser usadas para loggin, cacing, acl ou alterar a cahamda ao objj original sem auteralo. É algo parecido com o que é feito na relaçâoe entre controller e services (o controller pode fazer umonte de oisa antes e depois de chamar o servic correspondendete)

É criar uma classe que intercepta mensagens e lida melhor com ela, deixando a clase principal mais folgada (algo como lazy programming).

## Creational Design Patterns

**Factory Method**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/creational/factory-method.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/factory-method.png)

**Refactoring Guru:** Fornece uma interface para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados.

**Meu Resumo:** É um método estático de criaçâo de objeto que permite seus filhos criarem outros objetos desde que repeitando uma interface.

**Abstract Factory**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/creational/abstract-factory.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/abstract-factory.png)

**Refactoring Guru:** Permite que você produza famílias de objetos relacionados sem ter que especificar suas classes concretas.

**Meu Resumo:** Obj: produzairfamílias de objetos relacionados sem ter que especificar suas classes concretas. Resolve: Quando queremos trabalhar com famílias de objetos, qusse cque como temas para objetos. Ex: Imagine que voe vai prepar um conjunto para siar, há o conjunto apra: jogar fudebol, casamento, trabahlo e etc.c. Para ca da um deles há os mesmsos itens: calçado, camisa, roupa de baixo bermuda/calça e etcc. O ABstractory Factory permite voce gernciar tudos isos, um conjunto de objetos para cada uma desses temas

**Builder**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/creational/builder.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/builder.png)

**Refactoring Guru:** Permite construir objetos complexos passo a passo. O padrão permite produzir diferentes tipos e representações de um objeto usando o mesmo código de construção.

**Meu Resumo:** Uma forma mais fácil de criar objetos ultra customizados, sem precisar fazer sobreposiçâo de métodos.

**Prototype**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/creational/prototype.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/prototype.png)

**Refactoring Guru:** Permite que você copie objetos existentes sem fazer seu código ficar dependente de suas classes.

**Meu Resumo:** É uma forma eficiente de clonar um objeto, deixando esse método já dentro deele e não clonando de fora.

**Singleton**

[Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/creational/singleton.md)

![](https://github.com/rafanthx13/design-patterns-study/blob/main/imgs/all-design-patterns/singleton.png)

**Refactoring Guru:** Permite a você garantir que uma classe tem apenas uma instância, enquanto provê um ponto de acesso global para esta instância.

**Meu Resumo:** Criar um objeto único, centralizador e garantir que só exista uma únca instância durante a execução

OBS: É considerado um anti-pattern pois isso implica em um estado global, algo que deve ser evitado com injeção de dependência

## SOLID Principle

Esses princípios ajudam o programador a escrever códigos mais limpos, separando responsabilidades, diminuindo acoplamentos, facilitando na refatoração e estimulando o reaproveitamento do código.

**S — Single Responsiblity Principle**

+ [Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/solid/1-single-responsiblity-principle.md)
+ (Princípio da responsabilidade única)
+ Em suma: evitar um GOdCLass, ou seja, uma classe que faça tudo

**O — Open-Closed Principle**

+ [Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/solid/1-single-responsiblity-principle.md)
+ (Princípio Aberto-Fechado)
+ O que dá de errado se nâo for seguido:
    + Alterar uma classe já existente para adicionar um novo comportamento, corremos um sério risco de introduzir bugs em algo que já estava funcionando.
+ Soluçâo:
    + Separe o comportamento extensível por trás de uma interface e inverta as dependências.
+ Em suma: Se, para fazer um procedimento, voce tenha que verificar qual é o tipo da classe e com isso mudar o comporatemtneo, ao invez de fazr isso, voce deve usar INTERFACE para realizar esse procedimento. Asism, se uma nova classe for adiciconada, voce nao precisa mais fazer um novo IF, pois já estará usando um método da interface que é igal para todos
+ Esse principio é a base do padrao de projeto Strategy

**L — Liskov Substitution Principle**

+ [Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/solid/1-single-responsiblity-principle.md)
+ (Princípio da substituição de Liskov) - Uma classe derivada deve ser substituível por sua classe base.
+ Seguir o LSP nos permite usar o polimorfismo com mais confiança. Podemos chamar nossas classes derivadas referindo-se à sua classe base sem preocupações com resultados inesperados.

**I — Interface Segregation Principle**

+ [Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/solid/1-single-responsiblity-principle.md)
+ (Princípio da Segregação da Interface)
+ Uma classe não deve ser forçada a implementar interfaces e métodos que não irão utilizar.Esse princípio basicamente diz que é melhor criar interfaces mais específicas ao invés de termos uma única interface genérica
+ Em suma: Nâo crie interface genericas, apenas especificas, é melhor ter 3 intrfaces especificas do que 1 generica

**D — Dependency Inversion Principle**

+ [Link](https://github.com/rafanthx13/design-patterns-study/blob/main/design-patterns/solid/1-single-responsiblity-principle.md)
+ (Princípio da inversão da dependência)
+ Dependa de abstrações e não de implementações.
+ OBS: Inversão de Dependência não é igual a Injeção de Dependência, fique ciente disso! A Inversão de Dependência é um princípio (Conceito) e a Injeção de Dependência é um padrão de projeto (Design Pattern)
+ Em suma: AO invez de criar um objeto dentro de um metodo de uma clase é melhor realizar duas coisa
    + Passar esse objeto que seria criado dentro por parametro
    + Esse objeto ser uma interface obrigatoriamente

## Clean Code

+ Use SEMPRE Nomes que façam sentido (em ingels)
    + ao inves de `for p in persons` use `for person i persons`
+ Use nomes passíveis de busca
    + ou seja, nada de `e` para error, pois se voce der um CTRL +F por 'e' vaia char em todo lugar
+ Não use numeros magicos
    + Se voce tem uma constante, é emlhor por elea numa variavel em que seu nome revele sua inençao do que jogar do nada o valor no codigo. Isso melhora a leitura do código
+ eviete fazer if que comece com not
+ encapsule condicinais
    + Ao invez de `var == 'x'` dê preferencia a chamar um método, isso deixa essa expressão boleana mais intercambeável no código.
+ Evite funçâo com flag
    + Se uma funçâo tem dois comportamentos distintos a depedner de um único valro,  entao é melhor separa em das funções

## Outros

### Dependency Injection

### KISS

### DRY

## Mudança feita pelo GanG

[Link](https://www.informit.com/articles/article.aspx?p=1404056)

So here are some of the changes:

+ Interpreter and Flyweight should be moved into a separate category that we referred to as "Other/Compound" since they really are different beasts than the other patterns. Factory Method would be generalized to Factory.
+ The categories are: Core, Creational, Peripheral and Other. The intent here is to emphasize the important patterns and to separate them from the less frequently used ones.
+ The new members are: Null Object, Type Object, Dependency Injection, and Extension Object/Interface (see "Extension Object" in Pattern Languages of Program Design 3, Addison- Wesley, 1997).
+ These were the categories:
    + Core: Composite, Strategy, State, Command, Iterator, Proxy, Template Method, Facade

+ Creational: Factory, Prototype, Builder, Dependency Injection
+ Peripheral: Abstract Factory, Visitor, Decorator, Mediator, Type Object, Null Object, Extension Object
+ Other: Flyweight, Interpreter
