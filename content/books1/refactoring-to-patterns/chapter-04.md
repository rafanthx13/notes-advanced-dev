# Chapter 4. Code Smells

> Quando você aprender a olhar para suas palavras com desapego crítico, descobrirá que reler uma peça cinco ou seis vezes seguidas trará à luz novos pontos problemáticos. [Barzun , 229]

Refatorar, ou melhorar o design do código existente, requer que você saiba qual código precisa ser melhorado. Catálogos de refatorações ajudam você a obter esse conhecimento, mas sua situação pode ser diferente do que você vê em um catálogo. Portanto, é necessário aprender problemas de design comuns para que você possa reconhecêlos em seu próprio código.

Em seu capítulo "Bad Smells in Code" emReestruturação[F ], Martin Fowler e Kent Beck fornecem orientação adicional para identificar problemas de projeto. Eles comparam problemas de design a Traduzido do Inglês para o Português - www.onlinedoctranslator.com cheiros e explique quais refatorações, ou combinações de refatorações, funcionam melhor para eliminar os odores.

O código de Fowler e Beck detecta problemas de destino que ocorrem em todos os lugares: em métodos, classes, hierarquias, pacotes (namespaces, módulos) e sistemas inteiros. Os nomes de seus cheiros, como Feature Envy, Primitive Obsession e Speculative Generality, fornecem um vocabulário rico e colorido com o qual os programadores podem se comunicar rapidamente sobre problemas de design.

Decidi que seria útil descobrir quais dos 22 cheiros de código de Fowler e Beck são abordados pelas refatorações que apresento neste livro. Ao concluir esta tarefa, descobri 5 novos cheiros de código que sugerem a necessidade de refatorações direcionadas a padrões. Ao todo, as refatorações neste livro tratam de 12 code smells.

Tabela 4.1 lista os 12 cheiros e algumas refatorações a serem consideradas quando você quiser remover os cheiros. A melhor maneira de desodorizar esses cheiros é considerar as refatorações associadas. As seções neste capítulo discutem cada um dos 12 cheiros e fornecem orientação para quando usar as diferentes refatorações. 

tabela de bad smell (bad-smell-table.md)

| Smell                                          | Refactoring                                                  |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Duplicated Code                                | Form Template Method;<br>Introduce Polymorphic Creation with Factory Method;<br>Chain Constructors;<br>Replace One/Many Distinctions with Composite;<br>Extract Composite;<br>Unify Intrefaces with Adapter;<br>Introduce Null Object; |
| Long Method                                    | Compose Method;<br>Move Accumulaton to Collecting Parameter;<br>Replace Conditional Dispatcher with Command;<br>Move Accumulation to Visitor;<br>Replace Conditional Logic with Strategy; |
| Conditional Complexity                         | Replace Conditional Logic with Strategy;<br>Move Embellishment to Decorator;<br>Replace State-Altering Conditionals with State;<br>Introduce Null Object; |
| Primitive Obsession                            | Replace Type Code with Class;<br>Replace State-Altering Conditionals with State;<br>Replace Conditional Logic with Strategy;<br>Replace Implicit Tree with Composite;<br>Replace Implicitt Language with Interpreter;<br>Move Embellishment to Decorator;<br>Encapsulate Composite with Builder; |
| Indecent Exposute                              | Encapsulate Classes with Factory                             |
| Solution Sprawl                                | Move Creation KNowledge to Factory                           |
| Alternativ Classes<br>with Diferent Interfaces | Unify Interfaces with Adapter                                |
| Lazy Class                                     | Inline Singleton                                             |
| Large Class                                    | Replace Conditional Dispatcher with Command;<br>Replace State-Altering Conditionals with State;<br>Replace Implicit Language with Interpreter; |
| Switch Statements                              | Replace Condicional Dispatcher with Command;<br>Move Accumulation to Visitor |
| Combinatorial Explosion                        | Replace Implicit Language with Interpreter                   |
| Oddball Solution                               | Unify Interfaces with Adapter                                |


## Código duplicado (Duplicated Code)

Código duplicado é o cheiro mais penetrante e pungente em software. Tende a ser explícito ou sutil. A duplicação explícita existe em código idêntico, enquanto a duplicação sutil existe em estruturas ou etapas de processamento que são externamente diferentes, mas essencialmente as mesmas.

Muitas vezes você pode remover duplicações explícitas e/ou sutis em subclasses de uma hierarquia aplicando **Método de modelo de formulário (205)**. Se um método nas subclasses for implementado de forma semelhante, exceto para uma etapa de criação de objeto, aplicando **Introduza a criação polimórfica com o método de fábrica (88)** abrirá o caminho para remover mais duplicações por meio de um Método de modelo.

Se os construtores de uma classe contiverem código duplicado, muitas vezes você pode eliminar a duplicação aplicando **Construtores de Cadeia (340)**.

Se você tiver um código separado para processar um único objeto ou uma coleção de objetos, poderá remover a duplicação aplicando **Substitua uma/várias distinções por composição (224)**.

Se cada subclasse de uma hierarquia implementa seu próprio Composite, as implementações podem ser idênticas, caso em que você pode usar **Extrair composto (214)**.

Se você processar objetos de maneira diferente apenas porque eles têm interfaces diferentes, aplicar **Unificar interfaces com adaptador (247)** abrirá o caminho para remover a lógica de processamento duplicada.

Se você tem lógica condicional para lidar com um objeto quando ele é nulo e a mesma lógica nula é duplicada em todo o sistema, aplicando **Introduzir Objeto Nulo (301)** eliminará a duplicação e simplificará o sistema.

## Método Longo (Long Method)

Em sua descrição desse cheiro, Fowler e Beck [F ] explicam várias boas razões pelas quais os métodos curtos são superiores aos métodos longos. Uma razão principal envolve o compartilhamento da lógica. Dois métodos longos podem muito bem conter código duplicado. No entanto, se você dividir esses métodos em outros menores, muitas vezes poderá encontrar maneiras de compartilhar a lógica.

Fowler e Beck também descrevem como pequenos métodos ajudam a explicar o código. Se você não entender o que um pedaço de código faz e extrair esse código para um método pequeno e bem nomeado, será mais fácil entender o código original. Os sistemas que têm a maioria de métodos pequenos tendem a ser mais fáceis de estender e manter porque são mais fáceis de entender e contêm menos duplicação.

Qual é o tamanho preferido de métodos pequenos? Eu diria dez linhas de código ou menos, com a maioria de seus métodos usando de uma a cinco linhas de código. Se você tornar pequena a grande maioria dos métodos de um sistema, poderá ter alguns métodos maiores, desde que sejam simples de entender e não contenham duplicação.

Alguns programadores optam por não escrever métodos pequenos porque temem os custos de desempenho associados ao encadeamento de chamadas para muitos métodos pequenos. Esta é uma escolha infeliz por várias razões. Primeiro, bons designers não otimizam código prematuramente. Em segundo lugar, o encadeamento de pequenas chamadas de método geralmente custa muito pouco em desempenho - um fato que você pode confirmar usando um criador de perfil. Em terceiro lugar, se você tiver problemas de desempenho, muitas vezes você pode refatorar para melhorar o desempenho sem ter que desistir de seus pequenos métodos.

Quando me deparo com um método longo, um dos meus primeiros impulsos é decompô-lo em um Método Composto [Beck, SBPP ] aplicando a refatoração **Método de composição (123)**. Este trabalho geralmente envolve a aplicaçãoExtrair Método[F ]. Se o código que você está transformando em um método composto acumula informações em uma variável comum, considere aplicar **Mover Acumulação para Parâmetro de Coleta (313)**.

Se o seu método for longo porque contém uma grande instrução switch para despachar e manipular solicitações, você pode encolher o método usando **Substitua o Despachante Condicional pelo Comando (191)**.

Se você usar uma instrução switch para coletar dados de várias classes com diferentes interfaces, poderá diminuir o tamanho do método aplicando **Mover Acumulação para o Visitante (320)**. 

Se um método for longo porque contém várias versões de um algoritmo e lógica condicional para escolher qual versão usar em tempo de execução, você pode diminuir o tamanho do método aplicando **Substitua a lógica condicional pela estratégia (129)**.

## Complexidade Condicional (Conditional COmplexity)

A lógica condicional é inocente em sua infância, quando é simples de entender e contida em algumas linhas de código. Infelizmente, raramente envelhece bem. Por exemplo, você implementa vários novos recursos e, de repente, sua lógica condicional se torna complicada e expansiva. Várias refatorações em Reestruturação[F ] e este catálogo aborda tais problemas.

Se a lógica condicional controlar qual das várias variantes de um cálculo executar, considere aplicar **Substitua a lógica condicional pela estratégia (129)**.

Se a lógica condicional controlar quais das várias partes do comportamento de caso especial devem ser executadas além do comportamento principal da classe, você pode querer usar **Mover enfeite para decorador (144)**.

Se as expressões condicionais que controlam as transições de estado de um objeto forem complexas, considere simplificar a lógica aplicando **Substituir condicionais de alteração de estado por estado (166)**.

Lidar com casos nulos geralmente leva à criação de lógica condicional. Se a mesma lógica condicional nula for duplicada em todo o sistema, você poderá limpá-la usando **Introduzir Objeto Nulo (301)**.

## Obsessão Primitiva (Primitive Obsession)

Primitivos, que incluem inteiros, strings, doubles, arrays e outros elementos de linguagem de baixo nível, são genéricos porque muitas pessoas os utilizam. As classes, por outro lado, podem ser tão específicas quanto você precisa, porque você as cria para propósitos específicos. Em muitos casos, as classes fornecem uma maneira mais simples e natural de modelar as coisas do que as primitivas. Além disso, depois de criar uma classe, você frequentemente descobrirá que outro código em um sistema pertence a essa classe.

Fowler e Beck [F ] explicar como Primitive Obsession se manifesta quando o código depende muito de primitivos. Isso geralmente ocorre quando você ainda não viu como uma abstração de nível superior pode esclarecer ou simplificar seu código. As refatorações de Fowler incluem muitas das soluções mais comuns para lidar com esse problema. Este livro se baseia nessas soluções e oferece mais. 

Se um valor primitivo controla a lógica em uma classe e o valor primitivo não é seguro para o tipo (ou seja, os clientes podem atribuí-lo a um valor inseguro ou incorreto), considere aplicar **Substitua o código do tipo pela classe (286)**. O resultado será um código de tipo seguro e capaz de ser estendido por um novo comportamento (algo que você não pode fazer com um primitivo).

Se as transições de estado de um objeto forem controladas por lógica condicional complexa que usa valores primitivos, você pode usar **Substituir condicionais de alteração de estado por estado (166)**. O resultado serão inúmeras classes para representar cada estado e lógica de transição de estado simplificada.

Se a lógica condicional complicada controlar qual algoritmo executar e essa lógica depender de valores primitivos, considere aplicar **Substitua a lógica condicional pela estratégia (129)**.

Se você criar implicitamente uma estrutura de árvore usando uma representação primitiva, como uma string, seu código pode ser difícil de trabalhar, sujeito a erros e/ou cheio de duplicações. Aplicando **Substituir Árvore Implícita por Composta (178**)reduzirá esses problemas.

Se existirem muitos métodos de uma classe para suportar inúmeras combinações de valores primitivos, você pode ter uma linguagem implícita. Em caso afirmativo, considere aplicar **Substituir linguagem implícita por intérprete (269)**.

Se existirem valores primitivos em uma classe apenas para fornecer embelezamentos para a responsabilidade central da classe, você pode querer usar **Mover enfeite para decorador (144)**.

Finalmente, mesmo se você tiver uma classe, ela ainda pode ser muito primitiva para facilitar a vida dos clientes. Este pode ser o caso se você tiver um Composto [DP ] implementação que é difícil de trabalhar. Você pode simplificar como os clientes constroem o Composite aplicando **Encapsular composição com construtor (96)**.

## Exposição indecente (Indecent Exposure)

Esse cheiro indica a falta do que David Parnas chamou de "ocultação de informações".Parnas ]. O cheiro ocorre quando métodos ou classes que não deveriam ser visíveis para os clientes são publicamente visíveis para eles. Expor tal código significa que os clientes sabem sobre o código que não é importante ou apenas indiretamente importante. Isso contribui para a complexidade de um projeto.

A refatoração **Encapsule Classes com Factory (80)** desodoriza esse cheiro. Nem toda classe útil para os clientes precisa ser pública (ou seja, ter um construtor público). Algumas classes devem ser referenciadas apenas por meio de suas interfaces comuns. Você pode fazer isso acontecer se tornar os construtores da classe não públicos e usar uma fábrica para produzir instâncias.

## Expansão de soluções (Solution Sprawl)

Quando o código e/ou os dados usados para executar uma responsabilidade se espalham por várias classes, o Solution Sprawl está no ar. Esse cheiro geralmente resulta da adição rápida de um recurso a um sistema sem gastar tempo suficiente simplificando e consolidando o design para acomodar melhor o recurso.

Solution Sprawl é o irmão gêmeo idêntico de Shotgun Surgery, um cheiro descrito por Fowler e Beck [F ]. Você fica ciente desse cheiro quando adicionar ou atualizar um recurso do sistema faz com que você faça alterações em muitas partes diferentes do código. Solution Sprawl e Shotgun Surgery abordam o mesmo problema, mas são percebidos de forma diferente. Nós nos tornamos conscientes do Solution Sprawl ao observá-lo, enquanto nos tornamos conscientes da Shotgun Surgery ao fazê-lo.

**Mover conhecimento de criação para a fábrica (68)** é uma refatoração que resolve o problema de uma extensa responsabilidade de criação de objetos.

## Classes Alternativas com Interfaces Diferentes

Este Fowler e Beck [F ] O cheiro de codificação ocorre quando as interfaces de duas classes são diferentes e, no entanto, as classes são bastante semelhantes. Se você puder encontrar as semelhanças entre as duas classes, muitas vezes poderá refatorar as classes para fazê-las compartilhar uma interface comum. No entanto, às vezes você não pode alterar diretamente a interface de uma classe porque não tem controle sobre o código. O exemplo típico é quando você está trabalhando com uma biblioteca de terceiros. Nesse caso, você pode aplicar **Unificar interfaces com adaptador (247)** para produzir uma interface comum para as duas classes.

## Classe preguiçosa (Lazy Class)

Ao descrever esse cheiro, Fowler e Beck escrevem: "Uma classe que não está fazendo o suficiente para se pagar deve ser eliminada" [F , 83]. Não é incomum encontrar um Singleton [DP ] que não está se pagando. Na verdade, o Singleton pode estar lhe custando caro ao tornar seu projeto muito dependente do que equivale a dados globais. **Singleton embutido (114)** explica um procedimento rápido e humano para eliminar um Singleton.

## Classe Grande (Large Class)

Fowler e Beck [F ] observe que a presença de muitas variáveis de instância geralmente indica que uma classe está tentando fazer demais. Em geral, turmas grandes geralmente contêm muitas responsabilidades. Extrair classe[F ] eExtrair subclasse[F ], que são algumas das principais refatorações usadas para lidar com esse cheiro, ajudam a mover responsabilidades para outras classes. As refatorações dirigidas a padrões neste livro fazem uso dessas refatorações para reduzir o tamanho das classes.

**Substitua o Despachante Condicional pelo Command (191)** extrai o comportamento para o Comando [DP ] classes, o que pode reduzir muito o tamanho de uma classe que executa uma variedade de comportamentos em resposta a diferentes solicitações.

**Substituir condicionais de alteração de estado por estado (166)** pode reduzir uma classe grande preenchida com código de transição de estado em uma classe pequena que delega para uma família de State [DP ] Aulas.

**Substituir linguagem implícita por intérprete (269)** pode reduzir uma classe grande em uma pequena, transformando código abundante para emular uma linguagem em um pequeno interpretador [DP ].

## Declarações de troca (Switch Statements)

Comandos switch (ou seus equivalentes, if... else... elseif... estruturas) não são inerentemente ruins. Eles se tornam ruins apenas quando tornam seu projeto mais complicado ou rígido do que o necessário. Nesse caso, é melhor refatorar as instruções switch para uma solução mais baseada em objeto ou polimórfica.

**Substitua o Despachante Condicional pelo Comando (191)** descreve como dividir uma grande instrução switch em uma coleção de comandos [DP ] objetos, cada um dos quais pode ser consultado e invocado sem depender da lógica condicional.

**Mover Acumulação para o Visitante (320)** descreve um exemplo em que as instruções switch são usadas para obter dados de instâncias de classes que possuem diferentes interfaces. Refatorando o código para usar um Visitor [DP ], nenhuma lógica condicional é necessária e o design se torna mais flexível.

## Explosão combinatória (Combinatorial Explosion)

Esse cheiro é uma forma sutil de duplicação. Ele existe quando você tem vários trechos de código que fazem a mesma coisa usando diferentes tipos ou quantidades de dados ou objetos.

Por exemplo, digamos que você tenha vários métodos em uma classe para realizar consultas. Cada um desses métodos realiza uma consulta usando condições e dados específicos. Quanto mais consultas especializadas você precisar oferecer suporte, mais métodos de consulta deverá criar. Logo você terá uma explosão de métodos para lidar com as diversas formas de realizar consultas. Você também tem uma linguagem de consulta implícita. Você pode remover todos esses métodos e o cheiro de explosão combinatória aplicando **Substituir linguagem implícita por intérprete (269)**.

## Solução Excêntrica (Oddball Solution)

Quando um problema é resolvido de uma maneira em um sistema e o mesmo problema é resolvido de outra maneira no mesmo sistema, uma das soluções é a estranha ou inconsistente. A presença desse cheiro geralmente indica código sutilmente duplicado.

Para remover essa duplicação, primeiro determine sua solução preferida. Em alguns casos, a solução usada com menos frequência pode ser sua solução preferida se for melhor do que a solução usada na maioria das vezes. Depois de determinar sua solução preferida, muitas vezes você pode aplicar Algoritmo Substituto[F ] para produzir uma solução consistente em todo o seu sistema. Dada uma solução consistente, você pode mover todas as instâncias da solução para um local, removendo assim a duplicação.

O cheiro Oddball Solution geralmente está presente quando você tem uma maneira preferida de se comunicar com um conjunto de classes, mas as diferenças nas interfaces das classes impedem que você se comunique com elas de maneira consistente. Nesse caso, considere aplicar **Unificar interfaces com adaptador (247)** para produzir uma interface comum pela qual você pode se comunicar consistentemente com todas as classes. Depois de fazer isso, muitas vezes você pode descobrir maneiras de remover a lógica de processamento duplicada. 


