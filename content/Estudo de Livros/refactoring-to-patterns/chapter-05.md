# Chapter 5. A Catalog of Refactorings to Patterns

## Projetos referenciados neste catálogo

Os exemplos neste livro vêm de projetos do mundo real ou são inspirados em
projetos do mundo real em que trabalhei. Eu uso código do mundo real em
vez de código de brinquedo porque quando refatoramos o código do mundo
real, nossas decisões de refatoração são limitadas por forças presentes no
código. Isso não acontece tanto com o código de brinquedo. Além disso, o
código de brinquedo, que tende a não ter essas forças ou a conter apenas
uma parte delas, nunca parece oferecer uma experiência educacional tão rica
quanto o código do mundo real.

O código do mundo real pode exigir um pouco mais de esforço para entender
do que o código de brinquedo. Tentei facilitar a compreensão do código do
mundo real neste livro removendo a maioria dos detalhes estranhos. No
entanto, é impossível remover todas as arestas do código do mundo real, e
isso pode até diminuir o que pode ser aprendido com as refatorações do
mundo real.

O código usado nas seções de exemplo vem de diversos projetos. Alguns
desses projetos são referenciados apenas uma vez, enquanto outros são
referenciados várias vezes em diferentes refatorações. Os projetos que
você encontrará referenciados em várias refatorações são descritos
brevemente nas subseções a seguir

## Construtores XML (XML Builder)

Muitos sistemas de informação nos quais trabalhei produziram XML e
quase todos esses sistemas usaram os fundamentos do XML: tags
abertas e fechadas, com valores e atributos. Quando você trabalha
com o básico de XML, muitas vezes faz pouco sentido criar XML usando
uma biblioteca sofisticada de terceiros, mesmo que seja
livre. Você pode facilmente escrever seu próprio código para criar XML exatamente
como você precisa. Descobri que meu próprio código XML é mais simples do que
aquele criado por ferramentas de terceiros, que devem fornecer maneiras
complexas de criar ou manipular XML.

Ao longo dos anos, escrevi código para criar XML de várias maneiras.
Neste livro, você encontrará referências a umXMLBuilderName, a
Construtor de DOM, aTagBuilder, e umTagNode. O TagBuilderé meu
construtor de XML favorito; evoluiu de meu trabalho em outros
construtores XML.
As seguintes refatorações contêm código de exemplo envolvido na
construção de XML:

+ Substituir Árvore Implícita por Composta (178)

+ Introduza a criação polimórfica com o método de fábrica (88)

+ Encapsular composição com construtor (96)

+ Mover Acumulação para Parâmetro de Coleta (313)

+ Unificar interfaces com adaptador (247)

## Analisador HTML (HTML Parser)

O analisador de HTML (http://sourceforge.net/projects/htmlparser ) é uma
biblioteca de código aberto que permite que os programas analisem
facilmente o HTML. É o analisador de HTML mais popular no SourceForge (
http://sourceforge.net ) e é usado por muitas pessoas em todo o mundo.
Este projeto foi iniciado por Somik Raha. Somik e outros no projeto
fizeram questão de escrever muitos testes enquanto desenvolviam o
analisador. Quando entrei no projeto, encontrei áreas no código que
exigiam melhorias de design. Então comecei a refatorar, muitas vezes
durante a programação em par com Somik. Esse
O trabalho rendeu muitas refatorações interessantes, incluindo inúmeras
refatorações de padrões.

As seguintes refatorações contêm exemplos do analisador:

+ Mover enfeite para decorador (144)
+ Mover conhecimento de criação para a fábrica (68)
+ Extrair composto (214)
+ Mover Acumulação para o Visitante (320)

## Calculadora de Risco de Empréstimo (Loan Risk Calculator)

Passei os primeiros oito anos de minha carreira programando para um banco
em Wall Street, criando calculadoras de empréstimos para avaliar crédito,
mercado e risco global. Na época, eu até usava terno! Alguns dos meus
primeiros sistemas orientados a objetos foram escritos usando Turbo Pascal e
C++. Embora eu não possa mostrar o código desses sistemas neste livro,
posso mostrar o código inspirado por eles. Para cálculos sensíveis, modifiquei
o código para usar cálculos que você pode encontrar em qualquer livro
financeiro.

As refatorações a seguir contêm exemplos relacionados ao meu trabalho na
calculadora de risco de empréstimos:

+ Construtores de Cadeia (340)
+ Substituir construtores por métodos de criação (57)
+ Substitua a lógica condicional pela estratégia (129)

## Um ponto de partida

Em uma seção chamada "Quão maduras são essas refatorações?"
Martin Fowler escreve:

> Ao usar as refatorações [neste livro], tenha em mente que elas são
um ponto de partida. Você sem dúvida encontrará lacunas neles.
Estou publicando-os agora porque, embora não sejam perfeitos,
acredito que sejam úteis. Acredito que eles lhe darão um ponto de
partida que melhorará sua capacidade de refatorar com eficiência.
Isso é o que eles fazem por mim. [F , 107]

O mesmo pode ser dito das refatorações neste livro. Eles também são um
ponto de partida. Com a evolução das ferramentas de hoje e a variedade de
linguagens orientadas a objetos, há muitas maneiras de realizar refatorações.

É melhor tratar minhas refatorações como uma receita que você adapta
ao seu ambiente. Isso pode significar pular algumas etapas na
mecânica de uma refatoração ou pode significar realizar a refatoração
de uma maneira diferente. O que importa no final não são as etapas
que você segue, mas se você melhora ou não o design do seu código.
Se este livro lhe der ideias úteis para melhorar seu código, ficarei feliz.

Este catálogo não descreve todas as possíveis refatorações direcionadas
a padrões que eu poderia ter incluído. Depois de escrever 27
refatorações, parecia que era hora de lançar um livro. No entanto, minha
esperança é que outros autores ajudem a estender este catálogo para
documentar refatorações adicionais direcionadas a padrões que serão
úteis para programadores.

| N  | Método de Refact                                                                           |
|----|--------------------------------------------------------------------------------------------|
| 1  | Replace Constructors with Creation Methods (57)<br>Chain Constructors (340)                |
| 2  | Encapsulate Classes with Factory (80)                                                      |
| 3  | Introduce Polymorphic Creation with Factory Method<br>(88)                                 |
| 4  | Replace Conditional Logic with Strategy (129)                                              |
| 5  | Form Template Method (205)                                                                 |
| 6  | Compose Method (123)                                                                       |
| 7  | Replace Implicit Tree with Composite (178)                                                 |
| 8  | Encapsulate Composite with Builder (96)                                                    |
| 9  | Move Accumulation to Collecting Parameter (313)                                            |
| 10 | Extract Composite (214);<br>Replace One/Many Distinctions with Composite (224)             |
| 11 | Replace Conditional Dispatcher with Command (191)                                          |
| 12 | Extract Adapter (258);<br>Unify Interfaces with Adapter (247)                              |
| 13 | Replace Type Code with Class (286)                                                         |
| 14 | Replace State-Altering Conditionals with State (166)                                       |
| 15 | Introduce Null Object (301)                                                                |
| 16 | Inline Singleton (114);<br>Limit Instantiation with Singleton (296)                        |
| 17 | Replace Hard-Coded Notifications with Observer<br>(236)                                    |
| 18 | Move Embellishment to Decorator (144)<br>Unify Interfaces (343)<br>Extract Parameter (346) |
| 19 | Move Creation Knowledge to Factory (68)                                                    |
| 20 | Move Accumulation to Visitor (320)                                                         |
| 21 | Replace Implicit Language with Interpreter (269)                                           |
