# Josua Kerievsky - Refactoring to Patterns

## Index do Livro

1. Por que escrevi o livro

+ 26 => 43 (17 páginas)

2. Refatoração

+ 43 => 69 (26 páginas)

+ In this chapter I offer a few thoughts on what refactoring is and
what you need to do to be good at it. This chapter is best read
in accompaniment with the chapter "Principles in Refactoring"

3. Padrões

+ 69 => 95 (26 páginas)

+ This chapter looks at what a pattern is; what it means to be
patterns happy; the importance of understanding that patterns
can be implemented in many ways; considerations for
refactoring to, towards, or away from patterns; whether or not
patterns make code more complex; what it means to have
"pattern knowledge"; and when it may make sense to do up-
front design with patterns.

4. Problemas de códgo (Code Smells)

+ 95 => 117 (22 páginas)

5. Um catalogo de rafotoraçao de padroes

+ 117 => 130 (13 páginas)

+ This chapter looks at the format of the refactorings in this book,
the projects referenced in the refactorings, the maturity level of
the refactorings, as well as a suggested study sequence for the
catalog. 

6. Criaçao

+ 130 => 247 (117 páginas)

7. Simplificação

+ 247 => 378 (131 páginas)

8. Genrealizaçao

+ 378 =>  517 (139 páginas)

+ Generalization is the transformation of specific code into
general-purpose code. The production of generalized code
frequently occurs as a result of refactoring. All seven
refactorings in this chapter yield generalized code. The most
common motivation for applying them is to remove duplicated
code. A secondary motivation is to simplify or clarify code.

9. Proteção

+ 517 => 568 (51 páginas)

+ A refactoring that improves the protection of existing code must
do so in a way that doesn't alter the behavior of the existing
code. All three refactorings in this section do just that. Your
motivation for applying them may be to improve protection or it
may be a standard refactoring motivation, such as to reduce
duplication or to simplify or clarify code.

10. Acumulação
+ 568 => 612 (44 páginas)

11. Utilitários

+ 612 => 631 (19 páginas)



# Bad Smell and Solutions

| Smell                                          | Refactoring                                                  |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Duplicated Code                                | Form Template Method;<br>Introduce Polymorphic Creation with Factory Method;<br>Chain Constructors;<br>Replace One/Many Distinctions with Composite;<br>Extract Composite;<br>Unify Intrefaces with Adapter;<br>Introduce Null Object; |
| Long Method                                    | Compose Method;<br>Move Accumulaton to Collecting Parameter;<br>Replace Conditional Dispatcher with Command;<br>Move Accumulation to Visitor;<br>Replace Conditional Logic with Strategy; |
| Conditional Complexity                         | Replace Conditional Logic with Strategy;<br>Move Embellishment to Decorator;<br>Replace State-Altering Conditionals with State;<br>Introduce Null Object; |
| Primitive Obsession                            | Replace Type Code with Class;<br>Replace State-Altering Conditionals with State;<br>Replace Conditional Logic with Strategy;<br>Replace Implicit Tree with Composite;<br>Replace Implicitt Language with Interpreter;<br>Move Embellishment to Decorator;<br>Encapsulate Composite with Builder; |
| Indecent Exposure                              | Encapsulate Classes with Factory                             |
| Solution Sprawl                                | Move Creation KNowledge to Factory                           |
| Alternativ Classes<br>with Diferent Interfaces | Unify Interfaces with Adapter                                |
| Lazy Class                                     | Inline Singleton                                             |
| Large Class                                    | Replace Conditional Dispatcher with Command;<br>Replace State-Altering Conditionals with State;<br>Replace Implicit Language with Interpreter; |
| Switch Statements                              | Replace Condicional Dispatcher with Command;<br>Move Accumulation to Visitor |
| Combinatorial Explosion                        | Replace Implicit Language with Interpreter                   |
| Oddball Solution                               | Unify Interfaces with Adapter                                |



# Design Patterns usados nos Refactoring to Patterns

| Design to Refact     | To                                                           | Towards                                         | Away                               |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------- | ---------------------------------- |
| Adapter              | Extract Adapter; Unify Interfaces with Adapter               |                                                 |                                    |
| Builder              | Encapsulate Composite with Builder                           |                                                 |                                    |
| Collecting Parameter | Move Accumulation to Collecting Parameter                    |                                                 |                                    |
| Command              | Replace Condicional Dispatcher with Command                  | Replace Considiconal Dispatcher with Command    |                                    |
| Composed Method      | Compose Method                                               |                                                 |                                    |
| Composite            | Replace One/Many Distinctions with Composite; Extract Composite; Replace implicit Tree with Composite; |                                                 | Encapsulate Composite with Builder |
| Creation Method      | Replace Constructos with Creation Methods                    |                                                 |                                    |
| Decorator            | Move Embellishment to Decorator;                             | Move Embellishment to Decorator;                |                                    |
| Factory              | Move Creation Knowledge to Factory; Encapsulate Classes with Factory; |                                                 |                                    |
| Factory Method       | Introduce Polymorphic Creation with Factory Method           |                                                 |                                    |
| Interpreter          | Replace Implicit Language with Interpreter                   |                                                 |                                    |
| Iterator             |                                                              |                                                 | Move Accumulation to Visitor       |
| Null Object          | Introduce Null Object                                        |                                                 |                                    |
| Observer             | Replace Hard-Coded Notifications with Observer               | Replace Hard-Coded Notifications with  Observer |                                    |
| Singleton            | Limit Instantiation with Singleton                           |                                                 | Inline Singleton                   |
| State                | Replace State-Altering Conditionals with State               | Replace State-Altering Conditionals with State  |                                    |
| Strategy             | Replace Conditional Logic with Strategy                      | Replace Conditional Logic with Strategy         |                                    |
| Template Method      | Form Template Method                                         |                                                 |                                    |
| Visitor              | Move Accumulation to Visitor                                 | Move Accumulation to Visitor                    |                                    |



## Listagem dos Métodos de Refatoração que iremos ver no livro



| Refactoring                                           | N Alfa | Ordem no livro | .    |
| ----------------------------------------------------- | ------ | -------------- | ---- |
| Chain Constructors 340                                | 01     | 25             |      |
| Compose Method 123                                    | 02     | 07             |      |
| Encapsulate Classes with Factory 80                   | 03     | 05             |      |
| Encapsulate Composite with Builder 96                 | 04     | 18             |      |
| Extract Adapter 258                                   | 05     | 14             |      |
| Extract Composite 214                                 | 06     | 14             |      |
| Extract Parameter 346                                 | 07     | 27             |      |
| Form Template Method 205                              | 08     | 13             |      |
| Inline Singleton 114                                  | 09     | 06             |      |
| Introduce Null Object 301                             | 10     | 22             |      |
| Introduce Polymorphic Creation with Factory Method 88 | 11     | 04             |      |
| Limit Instantiation with Singleton 296                | 12     | 21             |      |
| Move Accumulation to Collecting Parameter 313         | 13     | 23             |      |
| Move Accumulation to Visitor 320                      | 14     | 24             |      |
| Move Creation Knowledge to Factory 68                 | 15     | 02             |      |
| Move Embellishment to Decorator 144                   | 16     | 09             |      |
| Replace Conditional Dispatcher with Command 191       | 17     | 12             |      |
| Replace Conditional Logic with Strategy 129           | 18     | 08             |      |
| Replace Constructors with Creation Methods 57         | 19     | 01             |      |
| Replace Hard-Coded Notifications with Observer 236    | 20     | 16             |      |
| Replace Implicit Language with Interpreter 269        | 21     | 19             |      |
| Replace Implicit Tree with Composite 178              | 22     | 11             |      |
| Replace One/Many Distinctions with Composite 224      | 23     | 15             |      |
| Replace State-Altering Conditionals with State 166    | 24     | 10             |      |
| Replace Type Code with Class 286                      | 25     | 20             |      |
| Unify Interfaces 343                                  | 26     | 26             |      |
| Unify Interfaces with Adapter 247                     | 27     | 17             |      |